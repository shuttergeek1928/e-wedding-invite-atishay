/**
 * Two host families, one website.
 *
 * wedding.atishay.in → Atishay / Vishwakarma (groom)
 * wedding.anushka.in → Anushka / Singh (bride)
 *
 * Preview bride side locally:  http://localhost:5173/?side=anushka
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
    label: 'Atishay Family',
    hosts: ['wedding.atishay.in'],
    siteUrl: 'https://wedding.atishay.in',
    inviteFrom: 'Arvind Vishwakarma & Family',
  },
  bride: {
    id: 'bride',
    label: 'Anushka Family',
    hosts: ['wedding.anushka.in'],
    siteUrl: 'https://wedding.anushka.in',
    inviteFrom: 'Lt. Arvind Pratap Singh & Archana Singh',
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
  if (from === 'anushka' || from === 'bride' || from === 'as' || from === 'tulip') {
    return 'bride'
  }
  if (from === 'atishay' || from === 'groom' || from === 'av' || from === 'dofu') {
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
