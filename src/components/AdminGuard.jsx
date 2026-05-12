import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminGuard({ children }) {
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" replace />
}