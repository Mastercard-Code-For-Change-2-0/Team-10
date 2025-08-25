import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup, login } from '../api/client.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Signup() {
  const [role, setRole] = useState('donor')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', organization: '' })
  const [error, setError] = useState('')
  const { loginAs } = useAuth()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup({ organisationName: form.name, email: form.email, password: form.password, role: role === 'receiver' ? 'receiver' : 'donor' })
      const res = await login({ email: form.email, password: form.password })
      if (res?.role) loginAs(res.role)
      window.location.href = res?.role === 'admin' ? '/admin' : (res?.role === 'receiver' ? '/receiver' : '/donor')
    } catch (err) {
      setError(err.message || 'Signup failed')
    }
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
            {error && <div className="card" style={{ padding: 10, background: '#fff0f0', color: '#b00020', gridColumn: '1 / -1' }}>{error}</div>}
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
