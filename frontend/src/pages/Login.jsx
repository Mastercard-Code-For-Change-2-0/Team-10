import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../api/client.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const { loginAs } = useAuth()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await login(form)
      if (res?.role) loginAs(res.role)
      // redirect heuristic
      if (res?.role === 'admin') window.location.href = '/admin'
      else if (res?.role === 'receiver') window.location.href = '/receiver'
      else window.location.href = '/donor'
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, color: 'var(--brand-primary)' }}>Welcome back</h1>
          <p className="muted" style={{ marginTop: 0 }}>Log in to manage your donations or requests.</p>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            {error && <div className="card" style={{ padding: 10, background: '#fff0f0', color: '#b00020' }}>{error}</div>}
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
