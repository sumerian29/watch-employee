import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DailyReportForm from './pages/DailyReportForm'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import AdminGuard from './components/AdminGuard'

export default function App() {
  return (
    <Routes>
      {/* صفحة تسجيل دخول المسؤول */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* المسارات العامة للموظفين */}
      <Route path="/" element={<DailyReportForm />} />
      <Route path="/employee" element={<DailyReportForm />} />
      
      {/* مسار المسؤول مع الحماية */}
      <Route path="/admin" element={
        <AdminGuard>
          <Dashboard />
        </AdminGuard>
      } />
    </Routes>
  )
}