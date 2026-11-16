import { useEffect, useMemo, useState } from 'react'
import { decodeInviteToken, formatGuestLine, formatGuestLineEn, type InvitePayload } from '../utils/invite'

export type BackendGuestInvite = {
  token: string
  name: string
  rsvp: 'PENDING' | 'ATTENDING' | 'DECLINED' | 'MAYBE'
  headcount: number
  travelMode: string | null
  notes: string | null
}

export function getPathInviteToken(): string | null {
  const m = window.location.pathname.match(/^\/i\/([^/?#]+)/)
  if (m?.[1]) return decodeURIComponent(m[1])
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}

export function useBackendGuestInvite(): {
  data: BackendGuestInvite | null
  loading: boolean
  error: string | null
  refresh: () => void
} {
  const token = useMemo(() => getPathInviteToken(), [])
  const [data, setData] = useState<BackendGuestInvite | null>(null)
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    setLoading(true)
    fetch(`/api/public/invite/${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Invite not found')
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData({ token, ...json })
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token, tick])

  return { data, loading, error, refresh: () => setTick((x) => x + 1) }
}

export function useGuestInvite(): InvitePayload | null {
  const { data: backendGuest } = useBackendGuestInvite()

  return useMemo(() => {
    if (backendGuest?.name) {
      return {
        n: backendGuest.name,
        s: backendGuest.headcount > 1,
        e: [],
        d: 'all',
      }
    }

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
  }, [backendGuest])
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
