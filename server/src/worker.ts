import { Worker } from 'bullmq'
import { prisma, getRedis, guestLink } from './lib.js'
import { sendTemplate } from './whatsapp.js'

// Rate-limited sender: ~10 messages/second, retried with backoff by the queue.
export const worker = new Worker(
  'wa-send',
  async (job) => {
    const { messageId } = job.data as { messageId: string }
    const msg = await prisma.message.findUniqueOrThrow({
      where: { id: messageId },
      include: { guest: true, campaign: true },
    })
    if (msg.status !== 'QUEUED') return
    // Guest may have declined after a reminder was scheduled
    if (msg.campaign.kind === 'REMINDER' && msg.guest.rsvp === 'DECLINED') {
      await prisma.message.update({ where: { id: msg.id }, data: { status: 'FAILED', error: 'skipped: declined' } })
      return
    }
    try {
      const waId = await sendTemplate(msg.guest.phone, msg.campaign.template, [
        msg.guest.name,
        guestLink(msg.guest.token),
      ])
      await prisma.message.update({ where: { id: msg.id }, data: { waId, status: 'SENT' } })
    } catch (e) {
      await prisma.message.update({ where: { id: msg.id }, data: { error: String(e) } })
      throw e
    }
  },
  { connection: getRedis(), limiter: { max: 10, duration: 1000 } },
)

worker.on('failed', async (job, err) => {
  if (job && job.attemptsMade >= (job.opts.attempts ?? 1)) {
    await prisma.message.update({
      where: { id: job.data.messageId },
      data: { status: 'FAILED', error: err.message },
    })
  }
})

console.log('WhatsApp send worker running')
