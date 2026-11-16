import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'
import { Queue } from 'bullmq'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const env = (k: string, d = '') => process.env[k] ?? d

export const prisma = new PrismaClient()

let _redis: Redis | undefined
export function getRedis() {
  return (_redis ??= new Redis(env('REDIS_URL', 'redis://localhost:6379'), {
    maxRetriesPerRequest: null,
    lazyConnect: true,
  }))
}

let _sendQueue: Queue | undefined
export function getSendQueue() {
  return (_sendQueue ??= new Queue('wa-send', { connection: getRedis() }))
}

/**
 * Enqueue a message in BullMQ/Redis if Redis is reachable; otherwise return false
 * so the in-process Postgres dispatcher handles it automatically without Redis.
 */
export async function tryEnqueue(messageId: string, delay = 0): Promise<boolean> {
  if (!env('REDIS_URL')) return false
  try {
    const r = getRedis()
    if (r.status === 'wait' || r.status === 'end') {
      await Promise.race([
        r.connect(),
        new Promise((_, rej) => setTimeout(() => rej(new Error('Redis timeout')), 600)),
      ])
    }
    await getSendQueue().add(
      'send',
      { messageId },
      { delay, attempts: 4, backoff: { type: 'exponential', delay: 5000 } },
    )
    return true
  } catch {
    return false
  }
}

export const newToken = () => randomBytes(18).toString('base64url')

export function hashPassword(pw: string) {
  const salt = randomBytes(16).toString('hex')
  return `${salt}:${scryptSync(pw, salt, 64).toString('hex')}`
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(':')
  const a = Buffer.from(hash, 'hex')
  const b = scryptSync(pw, salt, 64)
  return a.length === b.length && timingSafeEqual(a, b)
}

export const guestLink = (token: string) => `${env('SITE_URL')}/i/${token}`
