import { useReveal } from '../hooks/useReveal'
import { useHostFamily } from '../hooks/useHostFamily'
import { weddingConfig } from '../config/wedding'
import FloralCorners from './FloralCorners'
import './Story.css'

export default function Story() {
  const family = useHostFamily()
  const ref = useReveal<HTMLElement>()
  const { story } = weddingConfig

  if (family.id === 'bride') return null

  return (
    <section className="story" id="story" ref={ref}>
      <FloralCorners />
      <div className="container">
        <div className="section-ornament reveal">
          <span>✦</span>
        </div>
        <p className="section-kicker reveal">How we began</p>
        <h2 className="section-title reveal">{story.title}</h2>
        <p className="section-subtitle reveal">A friendship that became forever</p>

        <div className={`story__content ${story.paragraphs.length ? '' : 'story__content--timeline-only'}`}>
          {Boolean(story.paragraphs.length) && (
            <div className="story__text reveal">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          <div className="story__timeline reveal">
            {story.milestones.map((m) => (
              <div key={m.year} className="story__milestone">
                <span className="story__year">{m.year}</span>
                <span className="story__event">{m.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
