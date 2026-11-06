import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Admin from './pages/Admin'
import AdminRsvp from './pages/AdminRsvp'
import Rsvp from './pages/Rsvp'
import { features } from './config/features'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

function Root() {
  if (path === '/admin/rsvp') return <AdminRsvp />
  if (path === '/admin') return <Admin />
  if (path === '/rsvp') return <Rsvp />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)

// Soft console hint in local RSVP mode only
if (features.rsvp && import.meta.env.DEV) {
  console.info('[rsvp] enabled → /rsvp and /admin/rsvp')
}
