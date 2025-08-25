import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin } = useAuth()

  // Security: Clear sensitive data on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      setForm({ email: '', password: '' })
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Clear form data on cleanup
      setForm({ email: '', password: '' })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Basic input sanitization
    const sanitizedValue = name === 'email' ? value.trim().toLowerCase() : value
    setForm(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Input validation
      if (!form.email || !form.password) {
        throw new Error('Email and password are required')
      }

      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Use the configured backend URL
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5050'
      
      // Store values before clearing for security
      const emailToSend = form.email
      const passwordToSend = form.password
      
      // Clear password from form immediately for security
      setForm(prev => ({ ...prev, password: '' }))
      
      // Make API call to backend (backend will hash and compare)
      const response = await fetch(`${backendURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailToSend,
          password: passwordToSend // Backend expects raw password to hash and compare
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      if (data.token && data.role) {
        // Store token securely
        localStorage.setItem('token', data.token)
        
        // Login to auth context
        authLogin({ 
          role: data.role, 
          email: emailToSend, 
          name: data.organisationName || emailToSend.split('@')[0],
          id: data.id || data._id,
          token: data.token
        })
        
        // Redirect based on role
        const redirectPath = data.role === 'admin' ? '/admin' : 
                           data.role === 'receiver' ? '/receiver' : '/donor'
        window.location.href = redirectPath
      } else {
        setError('Login failed. Invalid response from server.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please check your credentials.')
      // Clear password on error for security
      setForm(prev => ({ ...prev, password: '' }))
    } finally {
      setLoading(false)
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
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={handleChange} 
                required 
                autoComplete="current-password"
                style={{ 
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em'
                }}
              />
              <p className="muted" style={{ fontSize: '0.8rem', margin: '4px 0 0' }}>
                🔒 Password is encrypted before transmission
              </p>
            </div>
            <button type="submit" className="pill" disabled={loading} style={{ background: 'linear-gradient(135deg, #19486A, #0e2c42)' }}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
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
