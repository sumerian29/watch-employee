import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // استخدم الرقم السري الذي تريده (يمكن تغييره)
    const adminPassword = '123456'  // ⭐ غيّر هذا إلى الرقم الذي تريده
    if (password === adminPassword) {
      sessionStorage.setItem('adminAuthenticated', 'true')
      navigate('/admin')
    } else {
      setError('الرقم السري غير صحيح')
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">دخول مدير الجودة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الرقم السري</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل الرقم السري"
              dir="ltr"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  )
}