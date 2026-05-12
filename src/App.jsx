import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DailyReportForm from './pages/DailyReportForm'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ background: '#1e3a8a', padding: '10px', textAlign: 'center', direction: 'rtl' }}>
          <Link to="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>نموذج الموظف</Link>
          <Link to="/admin" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>لوحة المسؤول</Link>
        </nav>
        <Routes>
          <Route path="/" element={<DailyReportForm />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}