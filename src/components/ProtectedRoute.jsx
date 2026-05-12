import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, storageKey = 'isAuthenticated', redirectTo = '/employee-login' }) {
  const isAuthenticated = sessionStorage.getItem(storageKey) === 'true';
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}