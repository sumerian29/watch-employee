import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DailyReportForm from './pages/DailyReportForm'
import Dashboard from './pages/Dashboard'
import EmployeeLogin from './pages/EmployeeLogin'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/employee" element={
        <ProtectedRoute storageKey="employeeAuth" redirectTo="/employee-login">
          <DailyReportForm />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute storageKey="adminAuth" redirectTo="/admin-login">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/" element={<EmployeeLogin />} />
    </Routes>
  )
}