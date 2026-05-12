import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, storageKey, redirectTo }) {
  const isAuth = sessionStorage.getItem(storageKey) === 'true'
  return isAuth ? children : <Navigate to={redirectTo} replace />
}