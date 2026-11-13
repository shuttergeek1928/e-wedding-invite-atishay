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
  const showDeparture = Boolean(travel.departureNote) &&
    (daySet === 'all' || daySet === '25-26')

  const venueChips = celebrationDays
    .filter((day) => days.has(day.day))
    .reduce<Array<{ key: string; label: string; venue: (typeof venues)[string] }>>(
      (list, day) => {
        const venue = venues[day.venueKey]
        if (!venue || list.some((item) => item.key === day.venueKey)) return list
        const label =
          day.day <= 24
            ? '24 Jan · Sehore'
            : daySet === '26'
              ? '26 Jan · Bhopal'
              : '25–26 Jan · Bhopal'
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
          {daySet === '26'
            ? 'Wedding day is in Bhopal — Shambhala Resort.'
            : daySet === '25-26'
              ? 'Celebrations on 25–26 Jan are in Bhopal.'
              : travel.note}
        </p>

        {showDeparture && (
          <div className="travel__leave reveal">
            <p className="travel__leave-label">Morning Departure · 25 January</p>
            <p>{travel.departureNote}</p>
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
              <div className="travel-mode__links">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="travel-mode__link"
                >
                  Open location →
                </a>
                {item.secondaryLink && (
                  <a
                    href={item.secondaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="travel-mode__link"
                  >
                    {item.secondaryLabel || 'Open station →'}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
