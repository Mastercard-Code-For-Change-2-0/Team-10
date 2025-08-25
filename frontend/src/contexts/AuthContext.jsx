import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext()

const defaultUser = { role: 'guest', name: 'Guest' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || defaultUser } catch { return defaultUser }
  })

  useEffect(() => { try { localStorage.setItem('user', JSON.stringify(user)) } catch {} }, [user])

  const loginAs = (role) => setUser({ role, name: role === 'admin' ? 'Admin' : role === 'receiver' ? 'Receiver' : role === 'donor' ? 'Donor' : 'Guest' })
  const logout = () => setUser(defaultUser)

  const value = useMemo(() => ({ user, setUser, loginAs, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
