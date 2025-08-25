import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main>
      <section className="hero-bg" style={{ padding: 48 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 28, alignItems: 'center' }}>
          <div>
            <div className="chip" style={{ marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand-accent)' }} />
              About Seva Sahayog
            </div>

            <h1 style={{ fontSize: 40, margin: '0 0 12px', color: 'var(--brand-primary)' }}>
              Building a trusted donation matching portal for communities
            </h1>

            <p className="muted" style={{ fontSize: 16, marginBottom: 18 }}>
              Seva Sahayog connects donors (individuals, corporates, institutes) with verified receivers (NGOs, schools, hostels, community organisations).
              We make matching simple, transparent and fast while keeping safety and authenticity checks central to the flow.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/signup" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Get started</Link>
              <Link to="/donate" className="pill btn-outline" style={{ fontWeight: 700 }}>Donate an item</Link>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 16 }}>
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" alt="team working" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 12 }} />
              <p className="muted" style={{ marginTop: 12 }}>Community-first, secure, and easy to use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ margin: 0, color: 'var(--brand-primary)' }}>Our mission</h2>
          <p className="muted" style={{ marginTop: 12 }}>
            Reduce coordinator overhead and enable faster, more transparent matches between donors and receivers.
            We prioritise verification, content safety checks, and auditability so items reach the right hands.
          </p>

          <div className="grid grid-2" style={{ marginTop: 20 }}>
            <div className="card" style={{ padding: 18 }}>
              <h3>For Donors</h3>
              <ul className="muted" style={{ marginTop: 8 }}>
                <li>Quick guided listing with photo upload and quality checks</li>
                <li>Automatic content screening (images & text)</li>
                <li>Notifications when donations are approved/matched</li>
              </ul>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <h3>For Receivers</h3>
              <ul className="muted" style={{ marginTop: 8 }}>
                <li>Submit verified needs with guided forms</li>
                <li>Search and filter available donations by category & location</li>
                <li>Receive notifications on approvals & matches</li>
              </ul>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <h3>For Admins</h3>
              <ul className="muted" style={{ marginTop: 8 }}>
                <li>Suggested matches with admin review and approval flow</li>
                <li>Export transaction history (CSV / PDF) and email reports</li>
                <li>Moderation tools and audit logs</li>
              </ul>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <h3>Platform</h3>
              <ul className="muted" style={{ marginTop: 8 }}>
                <li>Multi-role support (Donor / Receiver / Admin)</li>
                <li>Multilingual readiness — structure is prepared for translations</li>
                <li>Privacy-first storage and clear consent for photos and data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-muted)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <strong style={{ color: 'var(--brand-primary)' }}>Ready to help?</strong>
            <p className="muted" style={{ margin: 0 }}>Create an account and start listing or requesting items.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/signup" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Create account</Link>
            <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>Log in</Link>
          </div>
        </div>
      </section>
    </main>
  )
}