import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext()

const defaultUser = { role: 'guest', name: 'Guest', email: null }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { 
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        return JSON.parse(userData)
      }
      return defaultUser 
    } catch { 
      return defaultUser 
    }
  })

  useEffect(() => { 
    try { 
      localStorage.setItem('user', JSON.stringify(user))
      if (user.role === 'guest') {
        localStorage.removeItem('token')
      }
    } catch {} 
  }, [user])

  const login = (userData) => {
    setUser({
      role: userData.role,
      name: userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email,
      id: userData.id
    })
  }

  const logout = () => {
    setUser(defaultUser)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const value = useMemo(() => ({ user, setUser, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
