import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './lib.js'
import { adminRoutes } from './routes/admin.js'
import { publicRoutes } from './routes/public.js'
import { webhookRoutes } from './routes/webhook.js'

const app = Fastify({ logger: true })
await app.register(cors, { origin: env('CORS_ORIGIN', 'http://localhost:5173') })
await app.register(jwt, { secret: env('JWT_SECRET', 'dev-secret') })

app.setErrorHandler((err, _req, reply) => {
  if (err instanceof ZodError) return reply.code(400).send({ error: err.issues })
  reply.send(err)
})

app.get('/health', async () => ({ ok: true }))
await app.register(adminRoutes, { prefix: '/api' })
await app.register(publicRoutes, { prefix: '/api' })
// Registered separately so its raw-body JSON parser stays scoped to the webhook
await app.register(webhookRoutes)

await app.listen({ port: Number(env('PORT', '4000')), host: '0.0.0.0' })
