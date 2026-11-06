import { useRef } from 'react'
import { weddingConfig } from '../config/wedding'
import { useSite } from '../hooks/useSite'
import FloralCorners from './FloralCorners'
import GuestWelcome from './GuestWelcome'
import { SecretModal, useKonamiSecret } from './SecretModal'
import './Hero.css'

export default function Hero() {
  const { couple, date } = weddingConfig
  const { hero, blessing } = useSite()
  const { open, setOpen } = useKonamiSecret()
  const pressTimer = useRef<number | null>(null)

  const startPress = () => {
    pressTimer.current = window.setTimeout(() => setOpen(true), 1200)
  }
  const endPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current)
  }

  return (
    <section className="hero" id="home">
      <FloralCorners />

      <div className="hero__content">
        <p className="hero__blessing fade-in" lang="hi">
          {blessing}
        </p>

        <GuestWelcome />

        <button
          type="button"
          className="hero__logo-btn fade-in"
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          aria-label="Yashika and Somya monogram. Press and hold for a secret note."
        >
          <img src="/brand/logo-ys.png?v=4" alt="Yashika & Somya monogram" className="hero__logo" />
        </button>

        <p
          className="hero__tagline fade-in"
          lang={hero.tagline.match(/[\u0900-\u097F]/) ? 'hi' : undefined}
        >
          {hero.tagline}
        </p>

        <h1 className="hero__names fade-in">
          <span className="hero__name">{couple.partner2}</span>
          <span className="hero__ampersand">&</span>
          <span className="hero__name">{couple.partner1}</span>
        </h1>

        <p
          className="hero__closing fade-in"
          lang={hero.closing.match(/[\u0900-\u097F]/) ? 'hi' : undefined}
        >
          {hero.closing}
        </p>
        <p className="hero__date fade-in">{date.short}</p>

        <div className="hero__actions fade-in">
          <a href="#events" className="btn btn-primary">
            View Schedule
          </a>
          <a href="#share" className="btn btn-ghost">
            Share Invite
          </a>
          <a href="#travel" className="btn btn-ghost">
            Travel Info
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>

      <SecretModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
