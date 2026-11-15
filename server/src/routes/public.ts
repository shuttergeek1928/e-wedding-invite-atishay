import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib.js'

// Guests have no login: the unguessable token in their link identifies them.
export async function publicRoutes(app: FastifyInstance) {
  app.get('/public/invite/:token', async (req, reply) => {
    const { token } = req.params as { token: string }
    const g = await prisma.guest.findUnique({ where: { token } })
    if (!g) return reply.code(404).send({ error: 'Not found' })
    return { name: g.name, rsvp: g.rsvp, headcount: g.headcount, travelMode: g.travelMode, notes: g.notes }
  })

  app.post('/public/invite/:token/rsvp', async (req, reply) => {
    const { token } = req.params as { token: string }
    const body = z
      .object({
        rsvp: z.enum(['ATTENDING', 'DECLINED', 'MAYBE']),
        headcount: z.number().int().min(1).max(20).optional(),
        travelMode: z.string().max(40).optional(),
        notes: z.string().max(500).optional(),
      })
      .parse(req.body)
    const g = await prisma.guest.findUnique({ where: { token } })
    if (!g) return reply.code(404).send({ error: 'Not found' })
    await prisma.guest.update({ where: { id: g.id }, data: { ...body, respondedAt: new Date() } })
    return { ok: true }
  })
}
