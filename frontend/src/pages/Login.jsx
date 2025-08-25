import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: Wire to backend auth
    alert('Login submitted')
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, color: 'var(--brand-primary)' }}>Welcome back</h1>
          <p className="muted" style={{ marginTop: 0 }}>Log in to manage your donations or requests.</p>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.org" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input id="password" name="password" type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange} required />
                <button type="button" className="pill btn-outline" onClick={() => setShowPwd((s) => !s)} style={{ position: 'absolute', right: 6, top: 6, padding: '6px 10px' }}>
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type="submit" className="pill" style={{ background: 'linear-gradient(135deg, #19486A, #0e2c42)' }}>Log in</button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <Link to="/signup" className="muted">Create account</Link>
            <a href="#" className="muted">Forgot password?</a>
          </div>
        </div>
      </div>
    </main>
  )
}
