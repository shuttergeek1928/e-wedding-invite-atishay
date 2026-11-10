import { useMemo } from 'react'
import { decodeInviteToken, formatGuestLine, formatGuestLineEn, type InvitePayload } from '../utils/invite'

export function useGuestInvite(): InvitePayload | null {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    // Prefer opaque ?i= token; keep legacy ?from= only as fallback for old links
    const token = params.get('i')
    const decoded = decodeInviteToken(token)
    if (decoded) return decoded

    const legacy = params.get('from') || params.get('guest') || params.get('for')
    const sideWords = new Set([
      'anushka',
      'bride',
      'as',
      'tulip',
      'atishay',
      'groom',
      'av',
      'dofu',
    ])
    if (legacy && !sideWords.has(legacy.toLowerCase())) {
      const daysRaw = params.get('days') || params.get('d') || 'all'
      const d =
        daysRaw === '25-26' || daysRaw === '26' || daysRaw === 'all'
          ? daysRaw
          : 'all'
      try {
        return {
          n: decodeURIComponent(legacy).replace(/[+_]/g, ' ').trim().slice(0, 80),
          s: params.get('family') === '1' || params.get('saparivar') === '1',
          e: [],
          d,
        }
      } catch {
        return { n: legacy.trim().slice(0, 80), s: false, e: [], d }
      }
    }
    return null
  }, [])
}

export function useGuestDisplay() {
  const invite = useGuestInvite()
  if (!invite) return null
  return {
    invite,
    lineHi: formatGuestLine(invite),
    lineEn: formatGuestLineEn(invite),
  }
}
