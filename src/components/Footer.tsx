import { weddingConfig } from '../config/wedding'
import { useSite } from '../hooks/useSite'
import FloralCorners from './FloralCorners'
import './Footer.css'

export default function Footer() {
  const { couple, date, footer, credit } = weddingConfig
  const site = useSite()
  const { blessing } = site

  const coupleNames =
    site.family === 'groom'
      ? `${couple.partner1} & ${couple.partner2}`
      : `${couple.partner2} & ${couple.partner1}`

  return (
    <footer className="footer">
      <FloralCorners />
      <div className="container">
        <p className="footer__blessing" lang="hi">
          {blessing}
        </p>
        <img src="/brand/logo-aa.png?v=5" alt="" className="footer__logo" />
        <p className="footer__invite">JOIN US IN CELEBRATING</p>
        <p className="footer__names">
          {coupleNames}
        </p>
        <p className="footer__message">{footer.message}</p>
        <p className="footer__date">{date.short}</p>
        <p className="footer__note">
          Your presence and blessings mean the world to us.
        </p>
        <p className="footer__hashtag">{couple.hashtag}</p>
        <p className="footer__credit">{credit.line}</p>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {coupleNames}
        </p>
      </div>
    </footer>
  )
}
