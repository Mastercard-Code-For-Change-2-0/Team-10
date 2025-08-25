import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute({ children, allow = [] }) {
  const { user } = useAuth()
  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }
  return children
}
