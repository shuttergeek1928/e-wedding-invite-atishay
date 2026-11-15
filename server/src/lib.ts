import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'
import { Queue } from 'bullmq'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const env = (k: string, d = '') => process.env[k] ?? d

export const prisma = new PrismaClient()
export const redis = new Redis(env('REDIS_URL', 'redis://localhost:6379'), {
  maxRetriesPerRequest: null,
  lazyConnect: true,
})
export const sendQueue = new Queue('wa-send', { connection: redis })

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
