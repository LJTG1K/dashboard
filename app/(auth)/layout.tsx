import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Negan Dashboard - Login',
  description: 'Login to project management dashboard',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
