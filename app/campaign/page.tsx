'use client'

export default function CampaignLanding() {
  return (
    <div style={{ minHeight: '100vh', background: 'white', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: 1 }}>
            🔍
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '15px',
            lineHeight: 1.2,
          }}>
            Discover 1500+ Verified Sellers
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '30px',
            opacity: 0.95,
            lineHeight: 1.5,
          }}>
            Authentic brands at factory prices. No middleman. No markup.
          </p>
          <button onClick={() => {
            window.open('https://www.sugargoo.com/register?memberId=3229302312621422771', '_blank')
          }} style={{
            background: 'white',
            color: '#2563eb',
            border: 'none',
            padding: '15px 40px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            Browse & Sign Up
          </button>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section style={{
        background: '#f9fafb',
        padding: '60px 20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '50px',
            color: '#111827',
          }}>
            Why RAPID?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
          }}>
            {[
              { icon: '🏪', stat: '104', label: 'Verified Brands' },
              { icon: '📦', stat: '3M+', label: 'Authentic Products' },
              { icon: '👥', stat: '100K+', label: 'Smart Shoppers' },
              { icon: '✓', stat: '100%', label: 'Verified Sellers' },
            ].map((item, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '30px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  marginBottom: '8px',
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  fontWeight: 500,
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{
        padding: '60px 20px',
        background: 'white',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '15px',
            color: '#111827',
          }}>
            Featured Brands
          </h2>
          <p style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '50px',
          }}>
            Browse 1500+ authentic products across streetwear, tech, collectibles & more
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
          }}>
            {[
              { emoji: '👕', name: 'Streetwear', desc: 'Premium brands & niche drops' },
              { emoji: '💻', name: 'Tech', desc: 'Electronics & gadgets' },
              { emoji: '🎴', name: 'Collectibles', desc: 'Cards, models & limited editions' },
              { emoji: '👟', name: 'Sneakers', desc: 'Rare & exclusive kicks' },
              { emoji: '⌚', name: 'Accessories', desc: 'Watches, bags & gear' },
              { emoji: '🎮', name: 'Gaming', desc: 'Consoles & peripherals' },
            ].map((category, idx) => (
              <div key={idx} style={{
                padding: '30px',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eff6ff'
                e.currentTarget.style.borderColor = '#2563eb'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f9fafb'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                  {category.emoji}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '5px',
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                }}>
                  {category.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        background: '#f3f4f6',
        padding: '60px 20px',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '50px',
            color: '#111827',
          }}>
            How It Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }}>
            {[
              {
                step: '1',
                title: 'Browse RAPID',
                desc: 'Explore 1500+ verified sellers & 3M+ authentic products. Filter by category, brand, or price.',
              },
              {
                step: '2',
                title: 'Sign Up with Sugargoo',
                desc: 'Create a free account in 60 seconds. Sugargoo is your trusted shipping agent.',
              },
              {
                step: '3',
                title: 'Place Your Order & Ship',
                desc: 'Order from sellers, consolidate with Sugargoo, and ship worldwide. That\'s it!',
              },
            ].map((item, idx) => (
              <div key={idx} style={{
                position: 'relative',
                padding: '30px',
                background: 'white',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  width: '40px',
                  height: '40px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '10px',
                  marginTop: '20px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Ready to Start Your First Haul?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: 1.6,
          }}>
            Join 100K+ smart shoppers who are discovering verified sellers & authentic brands at factory prices.
          </p>
          <button onClick={() => {
            window.open('https://www.sugargoo.com/register?memberId=3229302312621422771', '_blank')
          }} style={{
            background: 'white',
            color: '#2563eb',
            border: 'none',
            padding: '18px 50px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            Sign Up Now
          </button>
          <p style={{
            fontSize: '0.9rem',
            marginTop: '20px',
            opacity: 0.85,
          }}>
            It takes 60 seconds. No credit card required.
          </p>
        </div>
      </section>

      {/* Trust Footer Text */}
      <section style={{
        background: '#111827',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            opacity: 0.9,
            marginBottom: '20px',
          }}>
            RAPID is a curated marketplace connecting shoppers to verified sellers with 1500+ authentic brands. 
            We work with Sugargoo, the trusted shipping agent for the global shopping community.
          </p>
          <p style={{
            fontSize: '0.9rem',
            opacity: 0.7,
          }}>
            ✓ No fakes • ✓ Verified sellers • ✓ Factory prices • ✓ Worldwide shipping
          </p>
        </div>
      </section>
    </div>
  )
}
