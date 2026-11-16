import { useBackendGuestInvite, useGuestDisplay } from '../hooks/useGuestInvite'
import {
  formatDaysSummary,
  inviteRequestLine,
  isGroupInvite,
} from '../utils/invite'
import './GuestWelcome.css'

export default function GuestWelcome() {
  const guest = useGuestDisplay()
  const { data: backendGuest } = useBackendGuestInvite()
  if (!guest) return null

  const group = isGroupInvite(guest.invite)

  return (
    <div className="guest-welcome" role="status">
      <p className="guest-welcome__hi" lang="hi">
        {group ? (
          <>
            प्रिय <strong>परिवार व मित्रों</strong>,
          </>
        ) : (
          <>
            आदरणीय <strong>{guest.lineHi}</strong>,
          </>
        )}
      </p>
      <p className="guest-welcome__invite" lang="hi">
        {`${inviteRequestLine(guest.invite)}।`}
      </p>
      <p className="guest-welcome__days">
        {formatDaysSummary(guest.invite.d)}
      </p>
      {backendGuest && (
        <div className="guest-welcome__rsvp">
          <a
            href={`/rsvp?token=${encodeURIComponent(backendGuest.token)}`}
            className="btn btn-primary guest-welcome__rsvp-btn"
          >
            {backendGuest.rsvp === 'PENDING'
              ? 'RSVP & Travel Details'
              : `RSVP: ${backendGuest.rsvp} · Update`}
          </a>
        </div>
      )}
    </div>
  )
}
