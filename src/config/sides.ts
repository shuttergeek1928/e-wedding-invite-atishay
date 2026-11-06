/**
 * Two host families, one website.
 *
 * wedding.st59.in  → Somya / Tiwari (groom) — current live site
 * wedding.yashikabum.in → Yashika / Bum (bride) — same UI, different events
 *
 * Preview bride side locally:  http://localhost:5173/?side=yashika
 *
 * UI/CSS stays shared. Clone the site only if Yashika’s side needs a different look.
 */

export type HostFamily = 'groom' | 'bride'
export type EventHost = HostFamily | 'both'

export type HostFamilyConfig = {
  id: HostFamily
  label: string
  /** Hostnames that select this family (no www.) */
  hosts: string[]
  siteUrl: string
  inviteFrom: string
}

export const hostFamilies: Record<HostFamily, HostFamilyConfig> = {
  groom: {
    id: 'groom',
    label: "Somya’s family",
    hosts: ['wedding.st59.in'],
    siteUrl: 'https://wedding.st59.in',
    inviteFrom: 'Pankaj Tiwari & Family',
  },
  bride: {
    id: 'bride',
    label: "Yashika’s family",
    hosts: ['wedding.yashikabum.in'],
    siteUrl: 'https://wedding.yashikabum.in',
    inviteFrom: 'Pratibha & Deepak Bum',
  },
}

function hostnameOf(host: string) {
  return host.toLowerCase().replace(/^www\./, '').split(':')[0]
}

export function resolveHostFamily(
  hostname?: string,
  search?: string
): HostFamily {
  const params = new URLSearchParams(search || '')
  const from = (params.get('side') || '').toLowerCase()
  if (from === 'yashika' || from === 'bride' || from === 'yb' || from === 'bum') {
    return 'bride'
  }
  if (from === 'somya' || from === 'groom' || from === 'st59' || from === 'tiwari') {
    return 'groom'
  }

  const host = hostnameOf(hostname || '')
  if (hostFamilies.bride.hosts.includes(host)) return 'bride'
  return 'groom'
}

export function currentHostFamily(): HostFamily {
  if (typeof window === 'undefined') return 'groom'
  return resolveHostFamily(window.location.hostname, window.location.search)
}

export function hostFamilyConfig(id?: HostFamily): HostFamilyConfig {
  return hostFamilies[id || currentHostFamily()]
}

export function currentSiteUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    const origin = window.location.origin
    if (origin && origin !== 'null') return origin
  }
  return hostFamilyConfig().siteUrl
}

export function eventBelongsToHost(
  eventHost: EventHost | undefined,
  family: HostFamily
) {
  if (!eventHost || eventHost === 'both') return true
  return eventHost === family
}
