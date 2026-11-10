import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useSite } from '../hooks/useSite'
import FloralCorners from './FloralCorners'
import './Faq.css'

export default function Faq() {
  const ref = useReveal<HTMLElement>()
  const site = useSite()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="faq" id="faq" ref={ref}>
      <FloralCorners variant="compact" />
      <div className="container faq__content">
        <div className="section-ornament reveal">
          <span>✦</span>
        </div>
        <p className="section-kicker reveal">Good to know</p>
        <h2 className="section-title reveal">Guest FAQ</h2>
        <p className="section-subtitle reveal">{site.faqSubtitle}</p>

        {site.faqTip ? (
          <div className="faq__tip reveal">
            <p className="faq__tip-label">25 January travel</p>
            <p>{site.faqTip}</p>
          </div>
        ) : site.dinnerNote ? (
          <div className="faq__tip reveal" lang="hi">
            <p className="faq__tip-label">Night meal</p>
            <p>{site.dinnerNote}</p>
          </div>
        ) : null}

        <div className="faq__list">
          {site.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="faq__item reveal">
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__chevron">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq__answer">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
