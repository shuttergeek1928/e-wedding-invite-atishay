import type { FastifyInstance } from 'fastify'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { prisma, env } from '../lib.js'

const BUTTON_RSVP: Record<string, 'ATTENDING' | 'DECLINED' | 'MAYBE'> = {
  RSVP_YES: 'ATTENDING',
  RSVP_NO: 'DECLINED',
  RSVP_MAYBE: 'MAYBE',
}
const STATUS = { sent: 'SENT', delivered: 'DELIVERED', read: 'READ', failed: 'FAILED' } as const
const RANK = ['QUEUED', 'SENT', 'DELIVERED', 'READ']

export async function webhookRoutes(app: FastifyInstance) {
  // Keep the raw body to verify Meta's signature
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (_req, body, done) => done(null, body))

  app.get('/webhook/whatsapp', async (req, reply) => {
    const q = req.query as Record<string, string>
    if (q['hub.mode'] === 'subscribe' && q['hub.verify_token'] === env('WA_VERIFY_TOKEN'))
      return reply.send(q['hub.challenge'])
    reply.code(403).send()
  })

  app.post('/webhook/whatsapp', async (req, reply) => {
    const raw = req.body as string
    const secret = env('WA_APP_SECRET')
    if (secret) {
      const sig = String(req.headers['x-hub-signature-256'] ?? '').replace('sha256=', '')
      const expected = createHmac('sha256', secret).update(raw).digest('hex')
      const a = Buffer.from(sig)
      const b = Buffer.from(expected)
      if (a.length !== b.length || !timingSafeEqual(a, b)) return reply.code(401).send()
    }
    const payload = JSON.parse(raw)
    for (const entry of payload.entry ?? [])
      for (const change of entry.changes ?? []) {
        const v = change.value ?? {}
        for (const s of v.statuses ?? []) {
          const status = STATUS[s.status as keyof typeof STATUS]
          const msg = await prisma.message.findUnique({ where: { waId: s.id } })
          if (!status || !msg) continue
          // statuses can arrive out of order; never downgrade
          if (status !== 'FAILED' && RANK.indexOf(status) <= RANK.indexOf(msg.status)) continue
          await prisma.message.update({
            where: { id: msg.id },
            data: { status, error: s.errors?.[0]?.title },
          })
        }
        for (const m of v.messages ?? []) {
          const id = m.button?.payload ?? m.interactive?.button_reply?.id
          const rsvp = BUTTON_RSVP[id]
          if (!rsvp) continue
          await prisma.guest.updateMany({
            where: { phone: m.from },
            data: { rsvp, respondedAt: new Date() },
          })
        }
      }
    return { ok: true }
  })
}
