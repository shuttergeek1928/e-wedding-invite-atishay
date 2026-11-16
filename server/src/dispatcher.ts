import { prisma, guestLink } from './lib.js'
import { sendTemplate } from './whatsapp.js'

const pendingQueue: string[] = []
let processing = false

async function processOne(messageId: string, attempt = 1): Promise<void> {
  const msg = await prisma.message.findUnique({
    where: { id: messageId },
    include: { guest: true, campaign: true },
  })
  if (!msg || msg.status !== 'QUEUED') return

  if (msg.campaign.kind === 'REMINDER' && msg.guest.rsvp === 'DECLINED') {
    await prisma.message.update({
      where: { id: msg.id },
      data: { status: 'FAILED', error: 'skipped: declined' },
    })
    return
  }

  try {
    const waId = await sendTemplate(msg.guest.phone, msg.campaign.template, [
      msg.guest.name,
      guestLink(msg.guest.token),
    ])
    await prisma.message.update({ where: { id: msg.id }, data: { waId, status: 'SENT', error: null } })
  } catch (e) {
    const errText = e instanceof Error ? e.message : String(e)
    if (attempt < 3) {
      await prisma.message.update({ where: { id: msg.id }, data: { error: `Retry ${attempt}: ${errText}` } })
      setTimeout(() => {
        void processOne(messageId, attempt + 1)
      }, attempt * 5000)
    } else {
      await prisma.message.update({
        where: { id: msg.id },
        data: { status: 'FAILED', error: errText },
      })
    }
  }
}

async function drainQueue() {
  if (processing) return
  processing = true
  try {
    while (pendingQueue.length > 0) {
      const id = pendingQueue.shift()!
      await processOne(id)
      // Rate limit: ~10 messages/sec (100ms spacing)
      await new Promise((r) => setTimeout(r, 100))
    }
  } finally {
    processing = false
  }
}

export function scheduleInProcessSend(messageId: string, delayMs = 0) {
  if (delayMs > 0) {
    setTimeout(() => {
      pendingQueue.push(messageId)
      void drainQueue()
    }, delayMs)
  } else {
    pendingQueue.push(messageId)
    void drainQueue()
  }
}

