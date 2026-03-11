import { Routes, Route, Navigate } from 'react-router-dom'
import { MomentEnginePage } from './pages/MomentEnginePage'
import { IframeTestPage } from './pages/IframeTestPage'
import { SiteHeader } from './components/layout/SiteHeader'

// Toggle to true to show the persistent site header above all pages.
const SHOW_SITE_HEADER = true

export function App() {
  return (
    <>
      {SHOW_SITE_HEADER && <SiteHeader />}

      <Routes>
        <Route path="/"               element={<MomentEnginePage />} />
        <Route path="/moment-engine"  element={<MomentEnginePage />} />
        <Route path="/iframe-test"    element={<IframeTestPage />} />
        {/* Catch-all → redirect to root */}
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
