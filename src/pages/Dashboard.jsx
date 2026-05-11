import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(
        collection(db, "daily_reports"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    };

    fetchReports();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        لوحة مسؤول الجودة - التقارير اليومية
      </h1>

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
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{report.employeeName}</td>
                <td className="p-4">{report.department}</td>
                <td className="p-4">{report.taskTitle}</td>
                <td className="p-4 font-bold text-green-700">
                  {report.completion}%
                </td>
                <td className="p-4">{report.priority}</td>
                <td className="p-4">
                  {report.isUrgent ? "نعم" : "لا"}
                </td>
                <td className="p-4 max-w-md">{report.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}