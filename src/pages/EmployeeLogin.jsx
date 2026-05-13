import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "employees"),
        where("employeeId", "==", employeeId),
        where("password", "==", password)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        sessionStorage.setItem("employeeAuth", "true");
        sessionStorage.setItem("employeeName", userData.fullName);
        sessionStorage.setItem("employeeId", employeeId);
        navigate("/employee");
      } else {
        setError("رقم الموظف أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">دخول الموظفين</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">رقم الموظف</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="أدخل رقمك الوظيفي"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="كلمة المرور"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl">دخول</button>
        </form>
        <div className="mt-6 text-center">
          <img src="/iso-certificate.jpg" alt="ISO 9001:2015" className="mx-auto w-56 border rounded shadow" />
        </div>
      </div>
      {/* التذييل الأسود السميك */}
      <div className="mt-8 text-center font-bold text-black text-sm border-t pt-4 w-full max-w-md">
        تصميم وتطوير الواجهة : رئيس مهندسين أقدم طارق مجيد عبد محمود
      </div>
    </div>
  );
}