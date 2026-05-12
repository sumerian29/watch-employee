import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeePassword = 'emp123'; // ⭐ غيّر هذه
    if (password === employeePassword) {
      sessionStorage.setItem('employeeAuth', 'true');
      navigate('/employee');
    } else {
      setError('كلمة المرور غير صحيحة للموظفين');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">دخول الموظفين</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">كلمة مرور الموظفين</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="أدخل كلمة المرور"
              dir="ltr"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl">دخول</button>
        </form>
      </div>
    </div>
  );
}