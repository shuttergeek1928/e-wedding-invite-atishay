import { env } from './lib.js'

const GRAPH = 'https://graph.facebook.com/v21.0'

// Sends an approved template message. Template body variable {{1}} = guest name,
// {{2}} = personal invite link.
export async function sendTemplate(to: string, template: string, params: string[]) {
  const res = await fetch(`${GRAPH}/${env('WA_PHONE_NUMBER_ID')}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env('WA_ACCESS_TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: template,
        language: { code: env('WA_TEMPLATE_LANG', 'en') },
        components: [
          { type: 'body', parameters: params.map((text) => ({ type: 'text', text })) },
        ],
      },
    }),
  })
  const json = (await res.json()) as any
  if (!res.ok) throw new Error(json?.error?.message ?? `WhatsApp error ${res.status}`)
  return json.messages[0].id as string
}
