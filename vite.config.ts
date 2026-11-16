import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local RSVP API (legacy)
      '/api/rsvp': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      // WhatsApp Business & RBAC Backend (server/)
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/webhook': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
