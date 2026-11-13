import { useReveal } from '../hooks/useReveal'
import { useSite } from '../hooks/useSite'
import FloralCorners from './FloralCorners'
import './Faq.css'

export default function Patrika() {
  const ref = useReveal<HTMLElement>()
  const site = useSite()
  if (!site.people.length) return null

  const printed = site.printedCouple

  return (
    <section className="faq" id="patrika" ref={ref}>
      <FloralCorners variant="compact" />
      <div className="container faq__content">
        <div className="section-ornament reveal">
          <span>✦</span>
        </div>
        <p className="section-kicker reveal">The families</p>
        <h2 className="section-title reveal">Our people</h2>
        {printed && (
          <>
            <p className="section-subtitle reveal">
              {site.family === 'groom'
                ? `${printed.groom.printedEn} · S/o ${printed.groom.parentsEn} · ${printed.groom.city}`
                : `${printed.bride.printedEn} · D/o ${printed.bride.parentsEn} · ${printed.bride.city}`}
            </p>
            <p className="section-subtitle reveal">
              {site.family === 'groom'
                ? `Weds ${printed.bride.printedEn} · D/o ${printed.bride.parentsEn} · ${printed.bride.city}`
                : `Weds ${printed.groom.printedEn} · S/o ${printed.groom.parentsEn} · ${printed.groom.city}`}
            </p>
          </>
        )}
        {site.mangalShlok && (
          <div className="faq__tip reveal" lang="hi">
            <p className="faq__tip-label">Mangal shlok</p>
            <p>{site.mangalShlok}</p>
          </div>
        )}

        <div className="faq__list">
          {site.people.map((group) => (
            <div key={group.title} className="faq__item reveal">
              <p className="faq__question">
                <span>{group.title}</span>
                {group.note && (
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-gold)',
                      opacity: 0.9,
                      fontWeight: 500,
                    }}
                  >
                    {group.note}
                  </span>
                )}
              </p>
              <p className="faq__answer" lang="hi">
                {group.names.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
