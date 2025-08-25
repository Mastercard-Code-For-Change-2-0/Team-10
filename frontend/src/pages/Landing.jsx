import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
export default function Landing() {
  return (
    <main>
      <section className="hero-bg" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28, alignItems: 'center' }}>
          <div>
            <div className="chip" style={{ marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand-accent)' }} />
              Transparent, kind donations made simple
            </div>
            <h1 style={{ fontSize: 48, lineHeight: 1.05, margin: '0 0 12px', letterSpacing: -0.6, color: 'var(--brand-primary)' }}>
              Match donations to real needs—fast, fair, transparent.
            </h1>
            <p className="muted" style={{ fontSize: 18, margin: '0 0 22px' }}>
              Donors list items. Receivers post needs. Our admins verify and match—so every item reaches the right hands.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/signup" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Get started</Link>
              <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>I already have an account</Link>
            </div>
            <div className="grid grid-2" style={{ marginTop: 28 }}>
              <div className="card" style={{ padding: 16 }}>
                <strong>Donors</strong>
                <p className="muted" style={{ marginTop: 8 }}>Post items with photos. We’ll quality-check for relevance and safety.</p>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <strong>Receivers</strong>
                <p className="muted" style={{ marginTop: 8 }}>Share verified needs. Filter donations by category and location.</p>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ padding: 20 }}>
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d11?q=80&w=1200&auto=format&fit=crop" alt="donation" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 12 }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                {['Food', 'Clothing', 'Books', 'Electronics', 'Furniture', 'Medical'].map((x) => (
                  <span key={x} className="chip">{x}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ margin: 0, color: 'var(--brand-primary)' }}>How it works</h2>
          <div className="grid grid-2" style={{ marginTop: 20 }}>
            <div className="card" style={{ padding: 18 }}>
              <h3>1. Create account</h3>
              <p className="muted">Sign up as donor or receiver. Admins verify receiver authenticity.</p>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <h3>2. Post donations or needs</h3>
              <p className="muted">Guided forms with content checks keep listings helpful and safe.</p>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <h3>3. Get matched</h3>
              <p className="muted">Smart suggestions + admin review for transparent matches.</p>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <h3>4. Complete handover</h3>
              <p className="muted">Track status and receive notifications when approved.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
