import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPassword = "admin456"; // غيّرها حسب رغبتك
    if (password === adminPassword) {
      sessionStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("كلمة المرور غير صحيحة للمسؤول");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">دخول مدير الجودة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">كلمة مرور المسؤول</label>
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
          <button type="submit" className="w-full bg-green-900 text-white py-3 rounded-xl">دخول</button>
        </form>

        {/* إضافة شهادة ISO */}
        <div className="mt-6 text-center">
          <img src="/iso-certificate.jpg" alt="ISO 9001:2015" className="mx-auto w-56 border rounded shadow" />
          <p className="text-xs text-gray-500 mt-2">شهادة الجودة المعتمدة</p>
        </div>
      </div>
    </div>
  );
}