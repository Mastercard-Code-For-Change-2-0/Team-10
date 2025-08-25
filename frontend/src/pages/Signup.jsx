import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [role, setRole] = useState('donor')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', organization: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: Wire to backend register
    alert('Signup submitted')
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, color: 'var(--brand-primary)' }}>Create your account</h1>
          <p className="muted" style={{ marginTop: 0 }}>Join as a donor or receiver. Receivers are verified by admins.</p>

          <div style={{ display: 'flex', gap: 10, marginTop: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <button type="button" className="pill btn-outline" onClick={() => setRole('donor')} style={{ background: role==='donor' ? 'rgba(25,72,106,0.08)' : '#fff' }}>Donor</button>
            <button type="button" className="pill btn-outline" onClick={() => setRole('receiver')} style={{ background: role==='receiver' ? 'rgba(25,72,106,0.08)' : '#fff' }}>Receiver</button>
          </div>

          <form onSubmit={onSubmit} className="grid grid-2" style={{ marginTop: 8 }}>
            <div>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" placeholder="Priya Sharma" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.org" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
            {role === 'receiver' && (
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="organization">Organization</label>
                <input id="organization" name="organization" placeholder="Seva Trust, Pune" value={form.organization} onChange={handleChange} required={role==='receiver'} />
              </div>
            )}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
              <button type="submit" className="pill" style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>Create account</button>
              <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>I have an account</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
