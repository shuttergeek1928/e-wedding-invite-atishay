# Wedding WhatsApp API

Fastify + Prisma (Postgres) + BullMQ (Redis) + WhatsApp Cloud API.

## Run
```
cp .env.example .env   # fill in values
npm run db:push && npm run seed
npm run dev            # API on :4000
npm run worker         # sends queued WhatsApp messages
```
Point Meta's webhook at `https://<host>/webhook/whatsapp` using `WA_VERIFY_TOKEN`.

## Templates (create and get approved in Meta)
Body variables: `{{1}}` guest name, `{{2}}` personal invite link. Add quick-reply buttons with
payloads `RSVP_YES`, `RSVP_NO`, `RSVP_MAYBE` so replies update the RSVP.

## Endpoints
- `POST /api/auth/login` returns a JWT (roles: GROOM, BRIDE, FAMILY; family is limited to its side).
- `GET/POST /api/guests`, `POST /api/guests/import`, `DELETE /api/guests/:id` (delete/import: couple only).
- `POST /api/campaigns` sends INVITE/REMINDER templates, optionally with `scheduledAt`; `GET /api/campaigns/:id` shows delivery stats.
- `GET /api/reports/summary`, `GET /api/reports/guests.csv`.
- Guests (no login): `GET /api/public/invite/:token`, `POST /api/public/invite/:token/rsvp`.
