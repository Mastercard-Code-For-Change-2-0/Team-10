import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', organization: '', type: 'donor' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin } = useAuth()

  // Security: Clear sensitive data on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      setForm(prev => ({ ...prev, password: '' }))
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Clear form data on cleanup
      setForm(prev => ({ ...prev, password: '' }))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Basic input sanitization
    const sanitizedValue = name === 'email' ? value.trim().toLowerCase() : value.trim()
    setForm(prev => ({ ...prev, [name]: sanitizedValue }))
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Input validation
      if (!form.name || !form.email || !form.password) {
        throw new Error('All fields are required')
      }

      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Use the configured backend URL
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5050'
      
      // Determine role based on type selection
      const role = form.type === 'receiver' ? 'receiver' : 'donor' // Main server uses 'receiver'
      
      // Store values before clearing for security
      const signupData = {
        organisationName: form.name,
        email: form.email,
        password: form.password,
        role: role
      }
      
      // Clear password from form immediately for security
      setForm(prev => ({ ...prev, password: '' }))
      
      // Make API call to backend for signup
      const signupResponse = await fetch(`${backendURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })

      const signupResponseData = await signupResponse.json()

      if (!signupResponse.ok) {
        throw new Error(signupResponseData.message || 'Signup failed')
      }

      if (signupResponseData.id) {
        // Now login automatically
        const loginResponse = await fetch(`${backendURL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signupData.email,
            password: signupData.password
          })
        })

        const loginData = await loginResponse.json()

        if (loginResponse.ok && loginData.token) {
          // Store token securely
          localStorage.setItem('token', loginData.token)
          
          // Login to auth context
          authLogin({ 
            role: loginData.role, 
            email: signupData.email, 
            name: form.name,
            id: loginData.id || loginData._id,
            token: loginData.token
          })
          
          // Redirect based on role
          const redirectPath = loginData.role === 'receiver' ? '/receiver' : '/donor'
          window.location.href = redirectPath
        } else {
          setError('Account created but login failed. Please try logging in manually.')
        }
      } else {
        setError('Signup failed. Please try again.')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Signup failed')
      // Clear password on error for security
      setForm(prev => ({ ...prev, password: '' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, color: 'var(--brand-primary)' }}>Create your account</h1>
          <p className="muted" style={{ marginTop: 0 }}>Join as a donor or receiver. Receivers are verified by admins.</p>

          <div style={{ display: 'flex', gap: 10, marginTop: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <button type="button" className="pill btn-outline" onClick={() => setForm({...form, type: 'donor'})} style={{ background: form.type==='donor' ? 'rgba(25,72,106,0.08)' : '#fff' }}>
              💝 Donor - I want to donate items
            </button>
            <button type="button" className="pill btn-outline" onClick={() => setForm({...form, type: 'receiver'})} style={{ background: form.type==='receiver' ? 'rgba(25,72,106,0.08)' : '#fff' }}>
              🤝 Receiver - I represent an organization in need
            </button>
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
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={handleChange} 
                required 
                minLength={6}
                autoComplete="new-password"
                style={{ 
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em'
                }}
              />
              <p className="muted" style={{ fontSize: '0.8rem', margin: '4px 0 0' }}>
                🔒 Minimum 6 characters • Securely transmitted
              </p>
            </div>
            {form.type === 'receiver' && (
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="organization">Organization Name</label>
                <input id="organization" name="organization" placeholder="Seva Trust, Pune" value={form.organization} onChange={handleChange} required={form.type==='receiver'} />
              </div>
            )}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
              <button type="submit" className="pill" disabled={loading} style={{ background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', color: '#111', fontWeight: 800 }}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <Link to="/login" className="pill btn-outline" style={{ fontWeight: 700 }}>I have an account</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
