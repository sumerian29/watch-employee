import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  // جلب التقارير
  const fetchReports = async () => {
    const q = query(collection(db, "daily_reports"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // دالة حذف التقرير
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التقرير؟")) {
      await deleteDoc(doc(db, "daily_reports", id));
      setReports((prev) => prev.filter((report) => report.id !== id));
      toast.success("تم حذف التقرير بنجاح");
    }
  };

  // دالة طباعة
  const handlePrint = () => {
    window.print();
  };

  // تسجيل الخروج
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    window.location.href = "/admin-login";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-8">
      {/* رأس الصفحة مع الشعار */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Thi Qar Oil Company" className="w-16 h-16 object-contain bg-white rounded-full p-1 shadow" />
          <h1 className="text-3xl font-bold text-blue-900">لوحة مسؤول الجودة - التقارير اليومية</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="bg-green-700 text-white px-4 py-2 rounded-lg">🖨️ طباعة</button>
          <button onClick={handleLogout} className="bg-red-700 text-white px-4 py-2 rounded-lg">🚪 تسجيل خروج</button>
        </div>
      </div>

      {/* جدول التقارير */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-4">اسم الموظف</th>
              <th className="p-4">القسم</th>
              <th className="p-4">عنوان المهمة</th>
              <th className="p-4">نسبة الإنجاز</th>
              <th className="p-4">الأولوية</th>
              <th className="p-4">عاجلة؟</th>
              <th className="p-4">التفاصيل</th>
              <th className="p-4">حذف</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{report.employeeName}</td>
                <td className="p-4">{report.department}</td>
                <td className="p-4">{report.taskTitle}</td>
                <td className="p-4 font-bold text-green-700">{report.completion}%</td>
                <td className="p-4">{report.priority}</td>
                <td className="p-4">{report.isUrgent ? "نعم" : "لا"}</td>
                <td className="p-4 max-w-md">{report.details}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(report.id)} className="bg-red-600 text-white px-3 py-1 rounded">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}