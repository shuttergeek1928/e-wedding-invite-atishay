import { FormEvent, useEffect, useMemo, useState } from 'react'
import { weddingConfig } from '../config/wedding'
import { features, rsvpUrl } from '../config/features'
import { useBackendGuestInvite, useGuestInvite } from '../hooks/useGuestInvite'
import { formatGuestLine } from '../utils/invite'
import './Rsvp.css'

type Attending = 'yes' | 'no' | 'maybe'
type Days = 'all' | '25-26' | '26'

const RSVP_TO_BACKEND: Record<Attending, 'ATTENDING' | 'DECLINED' | 'MAYBE'> = {
  yes: 'ATTENDING',
  no: 'DECLINED',
  maybe: 'MAYBE',
}

const BACKEND_TO_RSVP: Record<string, Attending> = {
  ATTENDING: 'yes',
  DECLINED: 'no',
  MAYBE: 'maybe',
}

export default function Rsvp() {
  const invite = useGuestInvite()
  const { data: backendGuest, loading: backendLoading } = useBackendGuestInvite()
  const [name, setName] = useState(invite?.n || '')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<Attending>('yes')
  const [days, setDays] = useState<Days>((invite?.d as Days) || 'all')
  const [guestCount, setGuestCount] = useState(1)
  const [travelMode, setTravelMode] = useState('Car')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (backendGuest) {
      setName(backendGuest.name)
      if (BACKEND_TO_RSVP[backendGuest.rsvp]) {
        setAttending(BACKEND_TO_RSVP[backendGuest.rsvp])
      }
      if (backendGuest.headcount) setGuestCount(backendGuest.headcount)
      if (backendGuest.travelMode) setTravelMode(backendGuest.travelMode)
      if (backendGuest.notes) setMessage(backendGuest.notes)
    } else if (invite?.n && !name) {
      setName(invite.n)
    }
  }, [backendGuest, invite])

  const greeting = useMemo(() => {
    if (!invite) return null
    return formatGuestLine(invite)
  }, [invite])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    setError('')
    try {
      if (backendGuest?.token) {
        const res = await fetch(
          `/api/public/invite/${encodeURIComponent(backendGuest.token)}/rsvp`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rsvp: RSVP_TO_BACKEND[attending],
              headcount: attending === 'no' ? 1 : guestCount,
              travelMode: attending === 'no' ? undefined : travelMode,
              notes: message.trim() || undefined,
            }),
          }
        )
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Could not save RSVP')
        setStatus('ok')
        return
      }

      const res = await fetch(rsvpUrl('/api/rsvp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          attending,
          days: attending === 'no' ? 'all' : days,
          guestCount: attending === 'no' ? 0 : guestCount,
          message: message.trim(),
          inviteToken: new URLSearchParams(window.location.search).get('i') || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not save RSVP')
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (!features.rsvp && !backendGuest && !backendLoading) {
    return (
      <div className="rsvp rsvp--off">
        <p>Please open your personal invitation link from WhatsApp to submit your RSVP.</p>
        <a href="/">← Back to invite</a>
      </div>
    )
  }

  const backHref = backendGuest ? `/i/${encodeURIComponent(backendGuest.token)}` : '/'

  return (
    <div className="rsvp">
      <header className="rsvp__top">
        <p className="rsvp__blessing" lang="hi">
          {weddingConfig.blessing}
        </p>
        <h1>RSVP</h1>
        <p className="rsvp__sub">
          Atishay & Anushka · 24–26 January 2027
        </p>
        {greeting && (
          <p className="rsvp__hello" lang="hi">
            आदरणीय {greeting}
          </p>
        )}
        <a className="rsvp__back" href={backHref}>
          ← Wedding invite
        </a>
      </header>

      {status === 'ok' ? (
        <section className="rsvp__card rsvp__card--ok">
          <h2>Thank you</h2>
          <p>
            Your RSVP is recorded. We’ll see you
            {attending === 'no' ? ' in our thoughts' : ' at the celebrations'}.
          </p>
          <a className="btn btn-primary" href={backHref}>
            Back to invite
          </a>
        </section>
      ) : (
        <form className="rsvp__card" onSubmit={(e) => void onSubmit(e)}>
          <label>
            Your name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              placeholder="Full name"
              autoComplete="name"
              readOnly={Boolean(backendGuest)}
            />
          </label>

          {!backendGuest && (
            <label>
              WhatsApp number
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="98765 43210"
                autoComplete="tel"
              />
            </label>
          )}

          <fieldset>
            <legend>Will you attend?</legend>
            {(
              [
                ['yes', 'Joyfully yes'],
                ['maybe', 'Hoping to'],
                ['no', 'Regretfully no'],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="rsvp__radio">
                <input
                  type="radio"
                  name="attending"
                  checked={attending === value}
                  onChange={() => setAttending(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          {attending !== 'no' && (
            <>
              <fieldset>
                <legend>Which days?</legend>
                {(
                  [
                    ['all', 'All days (24–26)'],
                    ['25-26', '25 & 26 Jan (Bhopal)'],
                    ['26', '26 Jan only'],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="rsvp__radio">
                    <input
                      type="radio"
                      name="days"
                      checked={days === value}
                      onChange={() => setDays(value)}
                    />
                    {label}
                  </label>
                ))}
              </fieldset>

              <label>
                Number of guests (including you)
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
                />
              </label>

              <fieldset>
                <legend>How will you travel?</legend>
                {(['Car', 'Train', 'Flight', 'Bus', 'Local'] as const).map(
                  (mode) => (
                    <label key={mode} className="rsvp__radio">
                      <input
                        type="radio"
                        name="travelMode"
                        checked={travelMode === mode}
                        onChange={() => setTravelMode(mode)}
                      />
                      {mode}
                    </label>
                  )
                )}
              </fieldset>
            </>
          )}

          <label>
            Note for the family (optional)
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={400}
              placeholder="Travel plans, blessings, dietary needs…"
            />
          </label>

          {status === 'error' && <p className="rsvp__error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'saving'}
          >
            {status === 'saving' ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      )}
    </div>
  )
}
