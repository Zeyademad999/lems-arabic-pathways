import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Users,
  MapPin,
  CalendarDays,
  TrendingUp,
  QrCode
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  session: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  location: string;
  instructor: string;
  notes?: string;
}

interface AttendanceStats {
  totalSessions: number;
  presentSessions: number;
  absentSessions: number;
  lateSessions: number;
  attendanceRate: number;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    course: 'أساسيات اللوجستيات',
    session: 'إدارة المخازن المتقدمة',
    checkIn: '09:00',
    checkOut: '11:30',
    status: 'present',
    location: 'قاعة التدريب A',
    instructor: 'د. محمد أحمد'
  },
  {
    id: '2',
    date: '2024-01-14',
    course: 'التدريب السلوكي المهني',
    session: 'آداب التعامل مع العملاء',
    checkIn: '14:15',
    checkOut: '16:45',
    status: 'late',
    location: 'قاعة التدريب B',
    instructor: 'أ. فاطمة علي',
    notes: 'تأخر 15 دقيقة بسبب زحام المرور'
  },
  {
    id: '3',
    date: '2024-01-13',
    course: 'إكسل للمبتدئين',
    session: 'الدوال المتقدمة',
    checkIn: '10:00',
    checkOut: '12:00',
    status: 'present',
    location: 'معمل الحاسوب',
    instructor: 'أ. حسن محمود'
  },
  {
    id: '4',
    date: '2024-01-12',
    course: 'أساسيات اللوجستيات',
    session: 'أنظمة النقل والتوزيع',
    status: 'absent',
    location: 'قاعة التدريب A',
    instructor: 'د. محمد أحمد',
    notes: 'غياب بعذر طبي'
  },
  {
    id: '5',
    date: '2024-01-11',
    course: 'التدريب السلوكي المهني',
    session: 'العمل الجماعي والقيادة',
    checkIn: '14:00',
    checkOut: '16:30',
    status: 'present',
    location: 'قاعة التدريب B',
    instructor: 'أ. فاطمة علي'
  }
];

const attendanceStats: AttendanceStats = {
  totalSessions: mockAttendanceRecords.length,
  presentSessions: mockAttendanceRecords.filter(r => r.status === 'present').length,
  absentSessions: mockAttendanceRecords.filter(r => r.status === 'absent').length,
  lateSessions: mockAttendanceRecords.filter(r => r.status === 'late').length,
  attendanceRate: 85
};

const Attendance = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="lems-badge-success">حاضر</Badge>;
      case 'absent':
        return <Badge className="lems-badge-locked">غائب</Badge>;
      case 'late':
        return <Badge className="lems-badge-pending">متأخر</Badge>;
      case 'excused':
        return <Badge className="lems-badge-pending">معذور</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'excused':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const formatDuration = (checkIn?: string, checkOut?: string) => {
    if (!checkIn || !checkOut) return '-';
    
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const inTime = inHour * 60 + inMin;
    const outTime = outHour * 60 + outMin;
    const duration = outTime - inTime;
    
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    return `${hours}س ${minutes}د`;
  };

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">سجل الحضور</h1>
          <p className="text-muted-foreground">تابع سجل حضورك في التدريب</p>
        </div>

        {/* Quick Check-in */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">الجلسة الحالية</h3>
              <p className="text-sm text-muted-foreground">إدارة المخازن المتقدمة</p>
              <p className="text-xs text-muted-foreground">09:00 - 11:30 • قاعة A</p>
            </div>
            <Button>
              <CheckCircle2 className="h-4 w-4 ml-2" />
              تسجيل الحضور
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-2xl font-bold text-primary">{attendanceStats.attendanceRate}%</p>
            <p className="text-sm text-muted-foreground">نسبة الحضور</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-green-600">{attendanceStats.presentSessions}</p>
            <p className="text-sm text-muted-foreground">حضور</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-orange-500">{attendanceStats.lateSessions}</p>
            <p className="text-sm text-muted-foreground">تأخير</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-red-500">{attendanceStats.absentSessions}</p>
            <p className="text-sm text-muted-foreground">غياب</p>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">الجلسات القادمة</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <div>
                <p className="font-medium">تطبيقات الإكسل المتقدمة</p>
                <p className="text-sm text-muted-foreground">10:00 - 12:00 • معمل الحاسوب</p>
              </div>
              <Badge variant="outline">30 دقيقة</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <div>
                <p className="font-medium">مراجعة السلوك المهني</p>
                <p className="text-sm text-muted-foreground">14:00 - 16:00 • قاعة B</p>
              </div>
              <Badge variant="secondary">3 ساعات</Badge>
            </div>
          </div>
        </Card>

        {/* Recent Attendance */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">سجل الحضور الأخير</h3>
          <div className="space-y-3">
            {mockAttendanceRecords.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{record.session}</p>
                  <p className="text-sm text-muted-foreground">{record.date} • {record.location}</p>
                  {record.notes && (
                    <p className="text-xs text-orange-600 mt-1">{record.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  {getStatusBadge(record.status)}
                  {record.checkIn && record.checkOut && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {record.checkIn} - {record.checkOut}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Attendance;