import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma, newToken, verifyPassword, sendQueue, guestLink } from '../lib.js'

type Role = 'GROOM' | 'BRIDE' | 'FAMILY'
type User = { id: string; role: Role; side: 'GROOM' | 'BRIDE' | null }

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: User
    payload: User
  }
}

const sideFilter = (u: User) => (u.role === 'FAMILY' && u.side ? { side: u.side } : {})

const guestInput = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^\d{8,15}$/, 'digits only, with country code'),
  side: z.enum(['GROOM', 'BRIDE']),
  group: z.string().optional(),
  headcount: z.number().int().min(1).max(20).optional(),
})

export async function adminRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (req, reply) => {
    const body = z.object({ email: z.string().email(), password: z.string() }).parse(req.body)
    const admin = await prisma.admin.findUnique({ where: { email: body.email } })
    if (!admin || !verifyPassword(body.password, admin.passwordHash))
      return reply.code(401).send({ error: 'Invalid credentials' })
    const user: User = { id: admin.id, role: admin.role, side: admin.side }
    return { token: app.jwt.sign(user, { expiresIn: '12h' }), user: { name: admin.name, ...user } }
  })

  app.register(async (a) => {
    a.addHook('onRequest', async (req, reply) => {
      try {
        await req.jwtVerify()
      } catch {
        reply.code(401).send({ error: 'Unauthorized' })
      }
    })
    // Only groom and bride may send messages or manage guests of both sides
    const couple = async (req: any, reply: any) => {
      if (req.user.role === 'FAMILY') reply.code(403).send({ error: 'Forbidden' })
    }

    a.get('/guests', async (req) =>
      prisma.guest.findMany({ where: sideFilter(req.user), orderBy: { name: 'asc' } }),
    )

    a.post('/guests', async (req, reply) => {
      const body = guestInput.parse(req.body)
      if (req.user.role === 'FAMILY' && body.side !== req.user.side)
        return reply.code(403).send({ error: 'Forbidden' })
      const guest = await prisma.guest.create({ data: { ...body, token: newToken() } })
      return { ...guest, link: guestLink(guest.token) }
    })

    a.post('/guests/import', { preHandler: couple }, async (req) => {
      const rows = z.array(guestInput).parse((req.body as any)?.guests)
      let created = 0
      for (const r of rows) {
        const res = await prisma.guest.upsert({
          where: { phone: r.phone },
          update: {},
          create: { ...r, token: newToken() },
        })
        if (res) created++
      }
      return { processed: created }
    })

    a.delete('/guests/:id', { preHandler: couple }, async (req) => {
      const { id } = req.params as { id: string }
      await prisma.message.deleteMany({ where: { guestId: id } })
      await prisma.guest.delete({ where: { id } })
      return { ok: true }
    })

    // Send invites or reminders. Optional filters and scheduledAt for delayed reminders.
    a.post('/campaigns', { preHandler: couple }, async (req) => {
      const body = z
        .object({
          kind: z.enum(['INVITE', 'REMINDER']),
          template: z.string().min(1),
          eventKey: z.string().optional(),
          side: z.enum(['GROOM', 'BRIDE']).optional(),
          rsvp: z.array(z.enum(['PENDING', 'ATTENDING', 'DECLINED', 'MAYBE'])).optional(),
          scheduledAt: z.string().datetime().optional(),
        })
        .parse(req.body)

      const guests = await prisma.guest.findMany({
        where: {
          ...(body.side ? { side: body.side } : {}),
          ...(body.rsvp ? { rsvp: { in: body.rsvp } } : body.kind === 'REMINDER' ? { rsvp: { not: 'DECLINED' } } : {}),
        },
      })
      const campaign = await prisma.campaign.create({
        data: { kind: body.kind, template: body.template, eventKey: body.eventKey },
      })
      const delay = body.scheduledAt ? Math.max(0, new Date(body.scheduledAt).getTime() - Date.now()) : 0
      for (const g of guests) {
        const m = await prisma.message.create({ data: { guestId: g.id, campaignId: campaign.id } })
        await sendQueue.add('send', { messageId: m.id }, { delay, attempts: 4, backoff: { type: 'exponential', delay: 5000 } })
      }
      return { campaignId: campaign.id, queued: guests.length }
    })

    a.get('/campaigns/:id', async (req) => {
      const { id } = req.params as { id: string }
      const grouped = await prisma.message.groupBy({ by: ['status'], where: { campaignId: id }, _count: true })
      return Object.fromEntries(grouped.map((g) => [g.status, g._count]))
    })

    // Guest report: who is coming, who is not, how they are travelling
    a.get('/reports/summary', async (req) => {
      const where = sideFilter(req.user)
      const guests = await prisma.guest.findMany({ where })
      const by = <K extends string>(f: (g: (typeof guests)[0]) => K) => {
        const o: Record<string, { guests: number; headcount: number }> = {}
        for (const g of guests) {
          const k = f(g)
          o[k] ??= { guests: 0, headcount: 0 }
          o[k].guests++
          o[k].headcount += g.rsvp === 'ATTENDING' ? g.headcount : 0
        }
        return o
      }
      return {
        total: guests.length,
        byRsvp: by((g) => g.rsvp),
        bySide: by((g) => g.side),
        byTravel: by((g) => g.travelMode ?? 'UNSPECIFIED'),
        expectedHeadcount: guests.filter((g) => g.rsvp === 'ATTENDING').reduce((s, g) => s + g.headcount, 0),
      }
    })

    a.get('/reports/guests.csv', async (req, reply) => {
      const guests = await prisma.guest.findMany({ where: sideFilter(req.user), orderBy: { name: 'asc' } })
      const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
      const rows = [
        'name,phone,side,group,rsvp,headcount,travelMode,notes',
        ...guests.map((g) => [g.name, g.phone, g.side, g.group, g.rsvp, g.headcount, g.travelMode, g.notes].map(esc).join(',')),
      ]
      reply.header('Content-Type', 'text/csv').send(rows.join('\n'))
    })
  })
}
