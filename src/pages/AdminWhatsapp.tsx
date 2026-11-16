import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../config/wedding'
import { whatsappInviteText } from '../utils/invite'
import { parseAllVCards, parseContactText } from '../utils/vcard'
import './Admin.css'

type Role = 'GROOM' | 'BRIDE' | 'FAMILY'
type Side = 'GROOM' | 'BRIDE'
type RsvpStatus = 'PENDING' | 'ATTENDING' | 'DECLINED' | 'MAYBE'

type AuthUser = {
  id: string
  name: string
  email?: string
  role: Role
  side: Side | null
}

type GuestRow = {
  id: string
  name: string
  phone: string
  side: Side
  group: string | null
  token: string
  link?: string
  rsvp: RsvpStatus
  headcount: number
  travelMode: string | null
  notes: string | null
  respondedAt: string | null
  createdAt: string
}

type CampaignRow = {
  id: string
  kind: string
  template: string
  eventKey: string | null
  createdAt: string
  total: number
  stats: Record<string, number>
  lastError: string | null
}

type SummaryReport = {
  total: number
  expectedHeadcount: number
  byRsvp: Record<string, { guests: number; headcount: number }>
  bySide: Record<string, { guests: number; headcount: number }>
  byTravel: Record<string, { guests: number; headcount: number }>
}

const TOKEN_KEY = 'aa-wa-rbac-token'
const USER_KEY = 'aa-wa-rbac-user'

const SEED_ACCOUNTS = [
  { label: 'Groom (Full Admin)', email: 'groom@example.com', role: 'GROOM' },
  { label: 'Bride (Full Admin)', email: 'bride@example.com', role: 'BRIDE' },
  { label: 'Groom Family (Groom Side)', email: 'groom-family@example.com', role: 'FAMILY' },
  { label: 'Bride Family (Bride Side)', email: 'bride-family@example.com', role: 'FAMILY' },
]

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `91${digits}`
  return digits
}

export default function AdminWhatsapp() {
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  })

  // Login form state
  const [email, setEmail] = useState('groom@example.com')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authBusy, setAuthBusy] = useState(false)

  // Portal tabs
  const [tab, setTab] = useState<'guests' | 'campaigns' | 'reports'>('guests')
  const [statusMsg, setStatusMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Guests state
  const [guests, setGuests] = useState<GuestRow[]>([])
  const [loadingGuests, setLoadingGuests] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestSide, setGuestSide] = useState<Side>('GROOM')
  const [guestGroup, setGuestGroup] = useState('')
  const [guestHeadcount, setGuestHeadcount] = useState(1)
  const [filterSide, setFilterSide] = useState<'ALL' | Side>('ALL')
  const [filterRsvp, setFilterRsvp] = useState<'ALL' | RsvpStatus>('ALL')
  const [search, setSearch] = useState('')
  const [bulkText, setBulkText] = useState('')
  const [showBulk, setShowBulk] = useState(false)
  const vcfRef = useRef<HTMLInputElement>(null)

  // Campaigns state
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([])
  const [campKind, setCampKind] = useState<'INVITE' | 'REMINDER'>('INVITE')
  const [campTemplate, setCampTemplate] = useState('wedding_invite')
  const [campEventKey, setCampEventKey] = useState('')
  const [campSide, setCampSide] = useState<'' | Side>('')
  const [campRsvps, setCampRsvps] = useState<RsvpStatus[]>(['PENDING'])
  const [campScheduledAt, setCampScheduledAt] = useState('')
  const [campBusy, setCampBusy] = useState(false)

  // Reports state
  const [report, setReport] = useState<SummaryReport | null>(null)

  const isCouple = user?.role === 'GROOM' || user?.role === 'BRIDE'

  const apiFetch = async (path: string, init?: RequestInit) => {
    const headers: Record<string, string> = {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((init?.headers as Record<string, string>) || {}),
    }
    const res = await fetch(path, { ...init, headers })
    if (res.status === 401) {
      logout()
      throw new Error('Session expired. Please sign in again.')
    }
    return res
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken('')
    setUser(null)
  }

  const loadAll = async (activeToken = token) => {
    if (!activeToken) return
    setLoadingGuests(true)
    setErrorMsg('')
    try {
      const [gRes, rRes, cRes] = await Promise.all([
        fetch('/api/guests', { headers: { Authorization: `Bearer ${activeToken}` } }),
        fetch('/api/reports/summary', { headers: { Authorization: `Bearer ${activeToken}` } }),
        fetch('/api/campaigns', { headers: { Authorization: `Bearer ${activeToken}` } }),
      ])
      if (gRes.status === 401) {
        logout()
        return
      }
      if (gRes.ok) setGuests((await gRes.json()) as GuestRow[])
      if (rRes.ok) setReport((await rRes.json()) as SummaryReport)
      if (cRes.ok) setCampaigns((await cRes.json()) as CampaignRow[])
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? `${err.message} — Make sure the backend is running (cd server && npm run dev)`
          : 'Could not reach backend server'
      )
    } finally {
      setLoadingGuests(false)
    }
  }

  useEffect(() => {
    document.title = 'WhatsApp & RBAC Admin — Atishay & Anushka'
    if (token) {
      void loadAll(token)
    }
  }, [token])

  useEffect(() => {
    if (user?.role === 'FAMILY' && user.side) {
      setGuestSide(user.side)
    } else if (user?.role === 'BRIDE') {
      setGuestSide('BRIDE')
    } else {
      setGuestSide('GROOM')
    }
  }, [user])

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()
    setAuthBusy(true)
    setAuthError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password')
      }
      const nextToken = data.token as string
      const nextUser = { ...data.user, email: email.trim() } as AuthUser
      localStorage.setItem(TOKEN_KEY, nextToken)
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      setToken(nextToken)
      setUser(nextUser)
      setPassword('')
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Login failed — check that server is running on port 4000'
      )
    } finally {
      setAuthBusy(false)
    }
  }

  const onAddGuest = async (e: FormEvent) => {
    e.preventDefault()
    setStatusMsg('')
    setErrorMsg('')
    const normalizedPhone = normalizePhone(guestPhone)
    if (!/^\d{8,15}$/.test(normalizedPhone)) {
      setErrorMsg('Enter a valid phone number (10 digits or with country code, e.g. 919876543210)')
      return
    }
    try {
      const res = await apiFetch('/api/guests', {
        method: 'POST',
        body: JSON.stringify({
          name: guestName.trim(),
          phone: normalizedPhone,
          side: user?.role === 'FAMILY' && user.side ? user.side : guestSide,
          group: guestGroup.trim() || undefined,
          headcount: guestHeadcount,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ? JSON.stringify(data.error) : 'Could not add guest')
      setGuestName('')
      setGuestPhone('')
      setStatusMsg(`Added ${data.name} (${data.phone})`)
      await loadAll()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to add guest')
    }
  }

  const importGuestList = async (
    rows: Array<{ name: string; phone: string }>,
    sourceLabel: string
  ) => {
    const valid = rows
      .map((r) => ({
        name: r.name.trim(),
        phone: normalizePhone(r.phone),
        side: guestSide,
        group: guestGroup.trim() || undefined,
        headcount: guestHeadcount,
      }))
      .filter((r) => r.name.length > 0 && /^\d{8,15}$/.test(r.phone))

    if (!valid.length) {
      setErrorMsg('No valid contacts with name + phone number found to import.')
      return
    }
    try {
      const res = await apiFetch('/api/guests/import', {
        method: 'POST',
        body: JSON.stringify({ guests: valid }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Import failed')
      setStatusMsg(`${sourceLabel}: Imported ${data.processed ?? valid.length} guest(s)`)
      setBulkText('')
      setShowBulk(false)
      await loadAll()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Bulk import failed')
    }
  }

  const onBulkPasteSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const lines = bulkText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
    const parsed = lines.map((line) => {
      if (line.includes(',')) {
        const [n, p] = line.split(',')
        return { name: n || '', phone: p || '' }
      }
      return parseContactText(line)
    })
    await importGuestList(parsed, 'Bulk paste')
  }

  const onVcfFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    e.target.value = ''
    if (!files?.length) return
    const all: Array<{ name: string; phone: string }> = []
    for (const f of Array.from(files)) {
      const text = await f.text()
      if (/BEGIN:VCARD/i.test(text)) {
        all.push(...parseAllVCards(text))
      } else {
        for (const line of text.split(/\r?\n/)) {
          if (!line.trim() || /^name\s*,/i.test(line)) continue
          const [n, p] = line.split(',')
          if (n && p) all.push({ name: n, phone: p })
        }
      }
    }
    await importGuestList(all, 'File import')
  }

  const updateGuestRsvp = async (id: string, rsvp: RsvpStatus) => {
    try {
      const res = await apiFetch(`/api/guests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ rsvp }),
      })
      if (!res.ok) throw new Error('Update failed')
      setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, rsvp } : g)))
      void loadAll()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not update RSVP')
    }
  }

  const deleteGuest = async (g: GuestRow) => {
    if (!window.confirm(`Delete ${g.name} (${g.phone})?`)) return
    try {
      const res = await apiFetch(`/api/guests/${g.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setStatusMsg(`Removed ${g.name}`)
      await loadAll()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const onSendCampaign = async (e: FormEvent) => {
    e.preventDefault()
    setCampBusy(true)
    setStatusMsg('')
    setErrorMsg('')
    try {
      const payload: Record<string, unknown> = {
        kind: campKind,
        template: campTemplate.trim(),
      }
      if (campEventKey.trim()) payload.eventKey = campEventKey.trim()
      if (campSide) payload.side = campSide
      if (campRsvps.length > 0) payload.rsvp = campRsvps
      if (campScheduledAt) payload.scheduledAt = new Date(campScheduledAt).toISOString()

      const res = await apiFetch('/api/campaigns', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ? JSON.stringify(data.error) : 'Campaign failed')
      setStatusMsg(
        `Campaign queued for ${data.queued} guest(s) (ID: ${data.campaignId}).`
      )
      await loadAll()
      setTimeout(() => void loadAll(), 1500)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to start campaign')
    } finally {
      setCampBusy(false)
    }
  }

  const downloadCsv = async () => {
    try {
      const res = await apiFetch('/api/reports/guests.csv')
      if (!res.ok) throw new Error('Could not download CSV')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wedding-guests-${user?.side?.toLowerCase() || 'all'}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'CSV download failed')
    }
  }

  const toggleCampRsvp = (st: RsvpStatus) => {
    setCampRsvps((prev) =>
      prev.includes(st) ? prev.filter((x) => x !== st) : [...prev, st]
    )
  }

  const filteredGuests = guests.filter((g) => {
    if (filterSide !== 'ALL' && g.side !== filterSide) return false
    if (filterRsvp !== 'ALL' && g.rsvp !== filterRsvp) return false
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      return (
        g.name.toLowerCase().includes(q) ||
        g.phone.includes(q) ||
        (g.group || '').toLowerCase().includes(q)
      )
    }
    return true
  })

  if (!token || !user) {
    return (
      <div className="admin admin--gate">
        <form className="admin__gate admin__gate--wide" onSubmit={(e) => void onLogin(e)}>
          <p className="admin__blessing" lang="hi">
            {weddingConfig.blessing}
          </p>
          <h1>WhatsApp & RBAC Portal</h1>
          <p className="admin__gate-sub">
            Sign in as Groom, Bride, or Family Admin
          </p>

          <div className="admin__role-pills">
            {SEED_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                className={`admin__mini ${email === acc.email ? 'is-on' : ''}`}
                onClick={() => setEmail(acc.email)}
              >
                {acc.label}
              </button>
            ))}
          </div>

          <label>
            Admin Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label>
            Password (from server/.env SEED_PASSWORD)
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              placeholder="Enter your SEED_PASSWORD"
            />
          </label>

          {authError && (
            <p className="admin__error" role="alert">
              {authError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary admin__big-btn"
            disabled={authBusy}
          >
            {authBusy ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="admin__top-actions" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            <a className="admin__back" href="/admin">
              ← Quick Invite Sender
            </a>
            <span style={{ color: 'var(--color-muted)' }}>·</span>
            <a className="admin__back" href="/">
              Wedding site
            </a>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <header className="admin__top admin__top--wide">
        <div>
          <p className="admin__blessing" lang="hi">
            {weddingConfig.blessing}
          </p>
          <h1>WhatsApp Business & RBAC</h1>
          <p className="admin__top-sub">
            Signed in as <strong>{user.name}</strong> · Role:{' '}
            <span className="admin__badge">{user.role}</span> · Scope:{' '}
            <strong>{user.side ? `${user.side} side only` : 'Both Groom & Bride sides'}</strong>
          </p>
        </div>
        <div className="admin__top-actions">
          <button
            type="button"
            className="admin__mini"
            onClick={() => void loadAll()}
            disabled={loadingGuests}
          >
            {loadingGuests ? 'Refreshing…' : '↻ Refresh'}
          </button>
          <a className="admin__mini" href="/admin">
            Quick Sender
          </a>
          <a className="admin__mini" href="/">
            Wedding Site
          </a>
          <button type="button" className="admin__mini" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin__simple admin__simple--wide">
        {statusMsg && <p className="admin__hint admin__banner--ok">{statusMsg}</p>}
        {errorMsg && (
          <p className="admin__error admin__banner--err" role="alert">
            {errorMsg}
          </p>
        )}

        <div className="admin__mode admin__mode--3" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'guests'}
            className={`admin__mode-btn ${tab === 'guests' ? 'is-on' : ''}`}
            onClick={() => setTab('guests')}
          >
            Guests ({guests.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'campaigns'}
            className={`admin__mode-btn ${tab === 'campaigns' ? 'is-on' : ''}`}
            onClick={() => setTab('campaigns')}
          >
            WhatsApp Campaigns
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'reports'}
            className={`admin__mode-btn ${tab === 'reports' ? 'is-on' : ''}`}
            onClick={() => setTab('reports')}
          >
            RSVP & Travel Reports
          </button>
        </div>

        {/* TAB 1: GUESTS */}
        {tab === 'guests' && (
          <>
            <form className="admin__panel" onSubmit={(e) => void onAddGuest(e)}>
              <div className="admin__batch-head">
                <p className="admin__step">Add Guest to Database</p>
                {isCouple && (
                  <div className="admin__batch-actions">
                    <input
                      ref={vcfRef}
                      type="file"
                      accept=".vcf,.VCF,.csv,text/vcard,text/csv"
                      multiple
                      className="admin__file-input"
                      onChange={(e) => void onVcfFileChange(e)}
                    />
                    <button
                      type="button"
                      className="admin__mini"
                      onClick={() => vcfRef.current?.click()}
                    >
                      Import .vcf / .csv
                    </button>
                    <button
                      type="button"
                      className="admin__mini"
                      onClick={() => setShowBulk((v) => !v)}
                    >
                      {showBulk ? 'Hide Bulk Paste' : 'Bulk Paste List'}
                    </button>
                  </div>
                )}
              </div>

              <div className="admin__grid-2">
                <label>
                  Guest Name
                  <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    required
                  />
                </label>
                <label>
                  WhatsApp Phone (with country code or 10 digits)
                  <input
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="919876543210 or 9876543210"
                    inputMode="tel"
                    required
                  />
                </label>
              </div>

              <div className="admin__grid-3">
                <label>
                  Side
                  <select
                    className="admin__select"
                    value={user.role === 'FAMILY' && user.side ? user.side : guestSide}
                    disabled={user.role === 'FAMILY'}
                    onChange={(e) => setGuestSide(e.target.value as Side)}
                  >
                    <option value="GROOM">GROOM (Atishay)</option>
                    <option value="BRIDE">BRIDE (Anushka)</option>
                  </select>
                </label>
                <label>
                  Group / Category (optional)
                  <input
                    value={guestGroup}
                    onChange={(e) => setGuestGroup(e.target.value)}
                    placeholder="Relatives, Friends, Office…"
                  />
                </label>
                <label>
                  Expected Headcount
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={guestHeadcount}
                    onChange={(e) => setGuestHeadcount(Number(e.target.value) || 1)}
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-primary admin__big-btn">
                + Add Guest & Generate Personal Link
              </button>
            </form>

            {isCouple && showBulk && (
              <form className="admin__panel" onSubmit={(e) => void onBulkPasteSubmit(e)}>
                <p className="admin__step">Bulk Paste Guests ({guestSide} Side)</p>
                <p className="admin__device-tip">
                  Paste one guest per line as <code>Name, 919876543210</code> or <code>Name 9876543210</code>.
                </p>
                <textarea
                  className="admin__textarea"
                  rows={5}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={'Ramesh Verma, 9876543210\nSuresh Jain, 919123456789'}
                />
                <button type="submit" className="btn btn-primary">
                  Import Pasted Guests
                </button>
              </form>
            )}

            <section className="admin__panel">
              <div className="admin__batch-head">
                <p className="admin__step">
                  Guest List ({filteredGuests.length} of {guests.length})
                </p>
                <button type="button" className="admin__mini" onClick={() => void downloadCsv()}>
                  ⬇ Export CSV
                </button>
              </div>

              <div className="admin__grid-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, phone, group…"
                />
                <select
                  className="admin__select"
                  value={filterSide}
                  onChange={(e) => setFilterSide(e.target.value as 'ALL' | Side)}
                >
                  <option value="ALL">All Sides</option>
                  <option value="GROOM">GROOM Side</option>
                  <option value="BRIDE">BRIDE Side</option>
                </select>
                <select
                  className="admin__select"
                  value={filterRsvp}
                  onChange={(e) => setFilterRsvp(e.target.value as 'ALL' | RsvpStatus)}
                >
                  <option value="ALL">All RSVP Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="ATTENDING">ATTENDING</option>
                  <option value="MAYBE">MAYBE</option>
                  <option value="DECLINED">DECLINED</option>
                </select>
              </div>

              {filteredGuests.length === 0 ? (
                <p className="admin__always">No guests match your filter yet.</p>
              ) : (
                <ul className="admin__batch-list">
                  {filteredGuests.map((g) => {
                    const personalLink =
                      g.link || `${window.location.origin}/i/${encodeURIComponent(g.token)}`
                    const waText = whatsappInviteText(
                      { n: g.name, s: g.headcount > 1, d: 'all' },
                      personalLink
                    )
                    const waUrl = `https://wa.me/${g.phone}?text=${encodeURIComponent(waText)}`

                    return (
                      <li key={g.id} className="admin__batch-item">
                        <div className="admin__guest-row">
                          <div>
                            <strong style={{ color: 'var(--color-gold-soft)', fontSize: '1.08rem' }}>
                              {g.name}
                            </strong>{' '}
                            <span className="admin__badge">{g.side}</span>
                            {g.group && <span className="admin__badge">{g.group}</span>}
                            <div className="admin__device-tip">
                              📞 +{g.phone} · 👥 {g.headcount} guest(s)
                              {g.travelMode ? ` · ✈️ Travel: ${g.travelMode}` : ''}
                              {g.notes ? ` · 💬 “${g.notes}”` : ''}
                            </div>
                          </div>

                          <div className="admin__batch-actions">
                            <select
                              className="admin__select admin__select--sm"
                              value={g.rsvp}
                              aria-label={`RSVP status for ${g.name}`}
                              onChange={(e) =>
                                void updateGuestRsvp(g.id, e.target.value as RsvpStatus)
                              }
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="ATTENDING">ATTENDING</option>
                              <option value="MAYBE">MAYBE</option>
                              <option value="DECLINED">DECLINED</option>
                            </select>

                            <a
                              className="admin__mini"
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              WhatsApp Chat
                            </a>

                            <button
                              type="button"
                              className="admin__mini"
                              onClick={() => {
                                void navigator.clipboard.writeText(personalLink)
                                setStatusMsg(`Copied personal invite link for ${g.name}`)
                              }}
                            >
                              Copy /i/ Link
                            </button>

                            {isCouple && (
                              <button
                                type="button"
                                className="admin__mini"
                                onClick={() => void deleteGuest(g)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </>
        )}

        {/* TAB 2: WHATSAPP CAMPAIGNS */}
        {tab === 'campaigns' && (
          <>
            {isCouple ? (
              <form className="admin__panel" onSubmit={(e) => void onSendCampaign(e)}>
                <p className="admin__step">Send WhatsApp Business Cloud API Campaign</p>
                <p className="admin__device-tip">
                  Sends your Meta-approved template to matching guests. Body variable{' '}
                  <code>{'{{1}}'}</code> is replaced with the guest’s name and{' '}
                  <code>{'{{2}}'}</code> with their personal <code>/i/&lt;token&gt;</code> link.
                  Quick-reply buttons with payloads <code>RSVP_YES</code>, <code>RSVP_NO</code>,{' '}
                  <code>RSVP_MAYBE</code> automatically update their RSVP via webhook.
                </p>

                <div className="admin__grid-2">
                  <label>
                    Campaign Kind
                    <select
                      className="admin__select"
                      value={campKind}
                      onChange={(e) => {
                        const k = e.target.value as 'INVITE' | 'REMINDER'
                        setCampKind(k)
                        if (k === 'REMINDER' && campTemplate === 'wedding_invite') {
                          setCampTemplate('wedding_reminder')
                        } else if (k === 'INVITE' && campTemplate === 'wedding_reminder') {
                          setCampTemplate('wedding_invite')
                        }
                      }}
                    >
                      <option value="INVITE">INVITE (Initial Invitation)</option>
                      <option value="REMINDER">REMINDER (Event / RSVP Reminder)</option>
                    </select>
                  </label>

                  <label>
                    Meta Approved Template Name
                    <input
                      value={campTemplate}
                      onChange={(e) => setCampTemplate(e.target.value)}
                      placeholder="wedding_invite"
                      required
                    />
                  </label>
                </div>

                <div className="admin__grid-3">
                  <label>
                    Target Side
                    <select
                      className="admin__select"
                      value={campSide}
                      onChange={(e) => setCampSide(e.target.value as '' | Side)}
                    >
                      <option value="">Both Sides (Groom + Bride)</option>
                      <option value="GROOM">GROOM Side Only</option>
                      <option value="BRIDE">BRIDE Side Only</option>
                    </select>
                  </label>

                  <label>
                    Event Key (optional)
                    <input
                      value={campEventKey}
                      onChange={(e) => setCampEventKey(e.target.value)}
                      placeholder="e.g. sangeet, wedding"
                    />
                  </label>

                  <label>
                    Schedule For Later (optional)
                    <input
                      type="datetime-local"
                      value={campScheduledAt}
                      onChange={(e) => setCampScheduledAt(e.target.value)}
                    />
                  </label>
                </div>

                <div>
                  <p className="admin__device-tip" style={{ marginBottom: '0.4rem' }}>
                    Target Guests with RSVP Status:
                  </p>
                  <div className="admin__batch-actions">
                    {(['PENDING', 'ATTENDING', 'MAYBE', 'DECLINED'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        className={`admin__mini ${campRsvps.includes(st) ? 'is-on' : ''}`}
                        onClick={() => toggleCampRsvp(st)}
                      >
                        {campRsvps.includes(st) ? '✓ ' : ''}
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary admin__big-btn"
                  disabled={campBusy}
                >
                  {campBusy
                    ? 'Queueing Campaign…'
                    : campScheduledAt
                    ? 'Schedule WhatsApp Campaign'
                    : 'Send WhatsApp Campaign Now'}
                </button>
              </form>
            ) : (
              <section className="admin__panel">
                <p className="admin__always">
                  Only <strong>GROOM</strong> and <strong>BRIDE</strong> roles can trigger bulk
                  WhatsApp Business campaigns. You can view campaign delivery status below.
                </p>
              </section>
            )}

            <section className="admin__panel">
              <div className="admin__batch-head">
                <p className="admin__step">Campaign Delivery Status</p>
                <button
                  type="button"
                  className="admin__mini"
                  onClick={() => void loadAll()}
                >
                  ↻ Refresh Status
                </button>
              </div>

              {campaigns.length === 0 ? (
                <p className="admin__always">No campaigns sent yet.</p>
              ) : (
                <ul className="admin__batch-list">
                  {campaigns.map((c) => (
                    <li key={c.id} className="admin__batch-item">
                      <div className="admin__guest-row">
                        <div>
                          <strong style={{ color: 'var(--color-gold-soft)' }}>
                            {c.kind} · <code>{c.template}</code>
                          </strong>
                          {c.eventKey && <span className="admin__badge">{c.eventKey}</span>}
                          <div className="admin__device-tip">
                            {new Date(c.createdAt).toLocaleString('en-IN')} · Total: {c.total}{' '}
                            message(s)
                          </div>
                          {c.lastError && (
                            <div className="admin__error" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                              Last error: {c.lastError}
                            </div>
                          )}
                        </div>
                        <div className="admin__batch-actions">
                          <span className="admin__badge">QUEUED: {c.stats.QUEUED || 0}</span>
                          <span className="admin__badge">SENT: {c.stats.SENT || 0}</span>
                          <span className="admin__badge">DELIVERED: {c.stats.DELIVERED || 0}</span>
                          <span className="admin__badge">READ: {c.stats.READ || 0}</span>
                          <span className="admin__badge">FAILED: {c.stats.FAILED || 0}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        {/* TAB 3: REPORTS */}
        {tab === 'reports' && (
          <section className="admin__panel">
            <div className="admin__batch-head">
              <p className="admin__step">
                Attendance & Travel Report ({user.side ? `${user.side} Side` : 'All Sides'})
              </p>
              <button type="button" className="btn btn-primary" onClick={() => void downloadCsv()}>
                ⬇ Download Guests CSV
              </button>
            </div>

            {!report ? (
              <p className="admin__always">Loading report…</p>
            ) : (
              <>
                <div className="admin__grid-2">
                  <div className="admin__day-card is-on">
                    <strong>{report.total}</strong>
                    <span>Total Guest Invitations</span>
                  </div>
                  <div className="admin__day-card is-on">
                    <strong>{report.expectedHeadcount}</strong>
                    <span>Confirmed Attending Headcount</span>
                  </div>
                </div>

                <p className="admin__step">By RSVP Response</p>
                <div className="admin__grid-2">
                  {(['ATTENDING', 'MAYBE', 'PENDING', 'DECLINED'] as const).map((status) => {
                    const row = report.byRsvp[status] || { guests: 0, headcount: 0 }
                    return (
                      <div key={status} className="admin__day-card">
                        <strong>
                          {status}: {row.guests} invite(s)
                        </strong>
                        <span>
                          {status === 'ATTENDING'
                            ? `${row.headcount} total headcount`
                            : 'Invitations in this status'}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <p className="admin__step">By Side (Groom vs Bride)</p>
                <div className="admin__grid-2">
                  {(['GROOM', 'BRIDE'] as const).map((side) => {
                    const row = report.bySide[side] || { guests: 0, headcount: 0 }
                    return (
                      <div key={side} className="admin__day-card">
                        <strong>
                          {side}: {row.guests} invite(s)
                        </strong>
                        <span>{row.headcount} confirmed attending guests</span>
                      </div>
                    )
                  })}
                </div>

                <p className="admin__step">By Guest Travel Mode</p>
                <div className="admin__grid-3">
                  {Object.entries(report.byTravel).map(([mode, stats]) => (
                    <div key={mode} className="admin__day-card">
                      <strong>
                        {mode}: {stats.guests}
                      </strong>
                      <span>{stats.headcount} attending guests</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

