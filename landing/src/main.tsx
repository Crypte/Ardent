import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerStatsServiceWorker } from './utils/serviceWorker'

// Enregistrer le Service Worker pour le cache des stats
registerStatsServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
