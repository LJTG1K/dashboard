import type { Metadata } from 'next'
import './globals.css'
import { LogoutButton } from './components/LogoutButton'

export const metadata: Metadata = {
  title: 'Negan Dashboard',
  description: 'Project management for Lachlan\'s business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="dashboard-container">
          <aside className="sidebar">
            <div className="sidebar-header">
              <h1>🎯 Negan</h1>
              <p className="subtitle">Project Dashboard</p>
            </div>
            <nav className="sidebar-nav">
              <a href="/" className="nav-link">
                📊 Dashboard
              </a>
              <a href="/projects/JARVIS" className="nav-link">
                🤖 JARVIS
              </a>
              <a href="/projects/RAPID" className="nav-link">
                🚀 RAPID
              </a>
              <a href="/projects/BLANKS" className="nav-link">
                📈 BLANKS
              </a>
              <a href="/projects/SUGARGOO" className="nav-link">
                🛒 SUGARGOO
              </a>
              <a href="/projects/GTOY" className="nav-link">
                🎴 GTOY
              </a>
            </nav>
            <div className="sidebar-footer">
              <p className="text-sm">Last updated: May 12, 2026</p>
              <LogoutButton />
            </div>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
