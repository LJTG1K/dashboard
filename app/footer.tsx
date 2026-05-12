import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#1f2937',
      color: '#d1d5db',
      borderTop: '1px solid #374151',
      padding: '40px 20px',
      marginTop: '60px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* About */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '15px',
            }}>
              About RAPID
            </h3>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
            }}>
              RAPID connects global shoppers to 1500+ verified sellers with authentic brands at factory prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '15px',
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db'
                }}>
                  Dashboard
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/campaign" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db'
                }}>
                  Features
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="https://rapid-five-zeta.vercel.app/listings" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db'
                }} target="_blank" rel="noopener noreferrer">
                  Browse Products
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '15px',
            }}>
              Resources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="https://www.sugargoo.com" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db'
                }} target="_blank" rel="noopener noreferrer">
                  Sugargoo
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="https://github.com/LJTG1K/rapid.git" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db'
                }} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '30px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#9ca3af',
        }}>
          <p>© 2026 RAPID. Connecting global shoppers to verified sellers.</p>
        </div>
      </div>
    </footer>
  )
}
