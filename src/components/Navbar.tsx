import { useState, useEffect } from 'react'
import { useHostFamily } from '../hooks/useHostFamily'
import { weddingConfig } from '../config/wedding'
import './Navbar.css'

const allNavLinks = [
  { label: 'Story', href: '#story', groomOnly: true },
  { label: 'Events', href: '#events' },
  { label: 'Family', href: '#patrika' },
  { label: 'Travel', href: '#travel' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blessings', href: '#blessings' },
]

export default function Navbar() {
  const family = useHostFamily()
  const navLinks = allNavLinks.filter((link) => !link.groomOnly || family.id === 'groom')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled || menuOpen ? 'navbar--solid' : ''}`}>
      <div className="navbar__inner container--wide">
        <a href="#home" className="navbar__brand" onClick={closeMenu}>
          <img src="/brand/logo-aa-square.png?v=5" alt="" className="navbar__logo" />
          <span className="navbar__names">
            {family.id === 'groom'
              ? `${weddingConfig.couple.partner1} & ${weddingConfig.couple.partner2}`
              : `${weddingConfig.couple.partner2} & ${weddingConfig.couple.partner1}`}
          </span>
        </a>

        <button
          className={`navbar__toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
