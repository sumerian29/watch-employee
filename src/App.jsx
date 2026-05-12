import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';
import DailyReportForm from './pages/DailyReportForm';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* صفحات تسجيل الدخول العامة */}
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* مسار الموظفين المحمي */}
      <Route path="/employee" element={
        <ProtectedRoute storageKey="employeeAuth" redirectTo="/employee-login">
          <DailyReportForm />
        </ProtectedRoute>
      } />

      {/* مسار المسؤول المحمي */}
      <Route path="/admin" element={
        <ProtectedRoute storageKey="adminAuth" redirectTo="/admin-login">
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* افتراضياً نوجه إلى صفحة اختيار الدور أو تسجيل دخول الموظف (حسب رغبتك) */}
      <Route path="/" element={<EmployeeLogin />} />
    </Routes>
  );
}