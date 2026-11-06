import { useReveal } from '../hooks/useReveal'
import { useGuestInvite } from '../hooks/useGuestInvite'
import { useSite } from '../hooks/useSite'
import { invitedDayNumbers, normalizeDaySet } from '../utils/invite'
import FloralCorners from './FloralCorners'
import './Travel.css'

export default function Travel() {
  const ref = useReveal<HTMLElement>()
  const invite = useGuestInvite()
  const site = useSite()
  const { travel, venues, celebrationDays } = site
  const days = new Set(invitedDayNumbers(invite?.d))
  const daySet = normalizeDaySet(invite?.d)
  const showLeaveIndore = Boolean(travel.leaveIndoreOn29) &&
    (daySet === 'all' || daySet === '29-30')

  const venueChips = celebrationDays
    .filter((day) => days.has(day.day))
    .reduce<Array<{ key: string; label: string; venue: (typeof venues)[string] }>>(
      (list, day) => {
        const venue = venues[day.venueKey]
        if (!venue || list.some((item) => item.key === day.venueKey)) return list
        const label =
          day.day === 28 && site.family === 'bride'
            ? '28 Nov · Ujjain'
            : day.day <= 28
              ? '27–28 Nov · Indore'
              : daySet === '30'
                ? '30 Nov · Ujjain'
                : '29–30 Nov · Ujjain'
        list.push({ key: day.venueKey, label, venue })
        return list
      },
      []
    )

  return (
    <section className="travel" id="travel" ref={ref}>
      <FloralCorners variant="compact" />
      <div className="container travel__content">
        <div className="section-ornament reveal">
          <span>✦</span>
        </div>
        <p className="section-kicker reveal">Getting there</p>
        <h2 className="section-title reveal">{travel.title}</h2>
        <p className="section-subtitle reveal">
          {daySet === '30'
            ? 'Wedding day is in Ujjain — Hotel Imperial Grand.'
            : daySet === '29-30'
              ? 'Celebrations on 29–30 Nov are in Ujjain.'
              : travel.note}
        </p>

        {showLeaveIndore && (
          <div className="travel__leave reveal">
            <p className="travel__leave-label">Leaving Indore · 29 November</p>
            <p>{travel.leaveIndoreOn29}</p>
          </div>
        )}

        <div className="travel__venues reveal">
          {venueChips.map((chip) => (
            <div className="venue-chip" key={chip.key}>
              <span>{chip.label}</span>
              <strong>{chip.venue.name}</strong>
              <p>{chip.venue.address}</p>
              <div className="venue-chip__maps">
                <a
                  href={chip.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
                <a
                  href={chip.venue.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="travel__modes">
          {travel.modes.map((item) => (
            <article key={item.mode} className="travel-mode reveal">
              <p className="travel-mode__label">{item.mode}</p>
              <h3 className="travel-mode__name">{item.name}</h3>
              <p className="travel-mode__detail">{item.detail}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="travel-mode__link"
              >
                Open location →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
