import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import AudioPlayer from "../components/AudioPlayer";

export default function DailyReportForm() {
  const employeeName = sessionStorage.getItem("employeeName") || "غير معروف";
  const employeeId = sessionStorage.getItem("employeeId") || "";

  const [department, setDepartment] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [details, setDetails] = useState("");
  const [completion, setCompletion] = useState([50]);
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(new Date());
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "daily_reports"), {
        employeeName,
        employeeId,
        department,
        taskTitle,
        details,
        completion: completion[0],
        priority,
        date,
        isUrgent,
        createdAt: serverTimestamp(),
      });
      toast.success("تم إرسال التقرير بنجاح");
      setDepartment("");
      setTaskTitle("");
      setDetails("");
      setCompletion([50]);
      setPriority("");
      setDate(new Date());
      setIsUrgent(false);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حفظ التقرير");
    }
  };

  return (
    <>
      {/* تشغيل الموسيقى تلقائياً بعد تسجيل الدخول */}
      <AudioPlayer src="/background-music.mp3" autoPlay={true} loop={true} volume={0.3} />

      <div className="min-h-screen bg-slate-200 p-6 flex flex-col">
        <div className="max-w-5xl mx-auto w-full">
          <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <img src="/logo.png" alt="Thi Qar Oil Company" className="w-20 h-20 object-contain bg-white rounded-full p-1 shadow-lg" />
                  <div>
                    <CardTitle className="text-3xl font-black mb-2">نظام متابعة الأداء اليومي</CardTitle>
                    <p className="text-slate-200 text-sm">مرحباً {employeeName} (رقم {employeeId})</p>
                  </div>
                </div>
                <Badge className="bg-white text-blue-900 text-sm px-4 py-1">ISRM Advanced</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>القسم / الشعبة</Label>
                    <Input placeholder="اسم القسم" value={department} onChange={(e) => setDepartment(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>عنوان المهمة</Label>
                  <Input placeholder="عنوان المهمة اليومية" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>تفاصيل الإنجاز</Label>
                  <Textarea placeholder="اكتب تفاصيل الإنجاز اليومي..." className="min-h-[180px]" value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>مستوى الأولوية</Label>
                  <Select onValueChange={setPriority}>
                    <SelectTrigger><SelectValue placeholder="اختر الأولوية" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="critical">حرجة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between"><Label>نسبة الإنجاز</Label><Badge>{completion[0]}%</Badge></div>
                  <Slider defaultValue={[50]} max={100} step={1} value={completion} onValueChange={setCompletion} />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ التقرير</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between"><CalendarIcon className="h-4 w-4" />{date ? date.toLocaleDateString("ar-IQ") : "اختر التاريخ"}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} /></PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border bg-red-50 p-5">
                  <Checkbox checked={isUrgent} onCheckedChange={setIsUrgent} />
                  <Label className="text-red-700 font-bold text-lg">هل المهمة عاجلة؟</Label>
                </div>
                <Button type="submit" className="w-full h-14 text-lg rounded-2xl bg-blue-900 hover:bg-blue-800">إرسال التقرير اليومي</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="text-center font-bold text-black text-sm border-t pt-4 mt-8 max-w-5xl mx-auto w-full">
          تصميم وتطوير الواجهة : رئيس مهندسين أقدم طارق مجيد عبد محمود
        </div>
      </div>
    </>
  );
}