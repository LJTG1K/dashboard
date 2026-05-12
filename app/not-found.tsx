import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        href="/" 
        style={{ 
          color: 'white', 
          backgroundColor: 'var(--primary)', 
          padding: '0.625rem 1.25rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
