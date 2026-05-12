import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DailyReportForm from './pages/DailyReportForm'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DailyReportForm />} />
      <Route path="/employee" element={<DailyReportForm />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  )
}