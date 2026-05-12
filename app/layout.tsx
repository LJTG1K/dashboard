import type { Metadata } from 'next'
import './globals.css'

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
              <a href="/#rapid" className="nav-link">
                🚀 RAPID
              </a>
              <a href="/#blanks" className="nav-link">
                📈 BLANKS
              </a>
              <a href="/#sugargoo" className="nav-link">
                🛒 SUGARGOO
              </a>
              <a href="/#gtoy" className="nav-link">
                🎴 GTOY
              </a>
            </nav>
            <div className="sidebar-footer">
              <p className="text-sm">Last updated: May 12, 2026</p>
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
