import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function RequireAuth({ children }) {
  const { isSignedIn } = useUser()
  const location = useLocation()

  if (!isSignedIn) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}
