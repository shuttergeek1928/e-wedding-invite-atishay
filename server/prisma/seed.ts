import { prisma, hashPassword, env } from '../src/lib.js'

const pw = hashPassword(env('SEED_PASSWORD', 'change-me'))
const admins = [
  { name: 'Groom', email: 'groom@example.com', role: 'GROOM', side: null },
  { name: 'Bride', email: 'bride@example.com', role: 'BRIDE', side: null },
  { name: 'Groom family', email: 'groom-family@example.com', role: 'FAMILY', side: 'GROOM' },
  { name: 'Bride family', email: 'bride-family@example.com', role: 'FAMILY', side: 'BRIDE' },
] as const

for (const a of admins)
  await prisma.admin.upsert({ where: { email: a.email }, update: {}, create: { ...a, passwordHash: pw } })
console.log('Seeded admins (change emails/passwords before going live)')
await prisma.$disconnect()
