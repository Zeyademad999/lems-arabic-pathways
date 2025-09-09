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
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">سجل الحضور</h1>
          <p className="text-muted-foreground">
            تابع سجل حضورك في جلسات التدريب والكورسات
          </p>
        </div>

        {/* Quick Check-in Section */}
        <Card className="lems-card bg-primary/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <QrCode className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-primary">تسجيل الحضور السريع</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">
                  الجلسة الحالية: <span className="font-medium">إدارة المخازن المتقدمة</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  الوقت: <span className="font-medium">09:00 - 11:30</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  المكان: <span className="font-medium">قاعة التدريب A</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="lems-button-primary">
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                  تسجيل الحضور
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 ml-2" />
                  رمز QR
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceStats.attendanceRate}%</p>
                <p className="text-sm text-muted-foreground">نسبة الحضور</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceStats.presentSessions}</p>
                <p className="text-sm text-muted-foreground">جلسات حضور</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceStats.lateSessions}</p>
                <p className="text-sm text-muted-foreground">تأخير</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 text-destructive rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceStats.absentSessions}</p>
                <p className="text-sm text-muted-foreground">غياب</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Calendar View */}
        <Card className="lems-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">عرض شهري - يناير 2024</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">الشهر السابق</Button>
                <Button variant="outline" size="sm">الشهر التالي</Button>
              </div>
            </div>
            
            {/* Calendar placeholder */}
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">التقويم الشهري سيظهر هنا</p>
                <p className="text-sm text-muted-foreground">يتضمن تفاصيل الحضور والغياب لكل يوم</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Attendance Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">سجل الحضور التفصيلي</h2>
          
          <div className="space-y-3">
            {mockAttendanceRecords.map((record) => (
              <Card key={record.id} className="lems-card">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <h3 className="font-semibold text-education-primary">
                          {record.session}
                        </h3>
                        {getStatusBadge(record.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{record.course}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{record.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{record.instructor}</span>
                        </div>
                      </div>
                      
                      {record.notes && (
                        <p className="text-sm text-warning bg-warning/10 p-2 rounded">
                          <strong>ملاحظة:</strong> {record.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-left space-y-2">
                      {record.checkIn && record.checkOut && (
                        <div className="text-center p-3 bg-success/10 rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-3 w-3" />
                              <span>دخول: {record.checkIn}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-3 w-3" />
                              <span>خروج: {record.checkOut}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              المدة: {formatDuration(record.checkIn, record.checkOut)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="lems-card">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">نصائح لتحسين الحضور</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium text-primary mb-2">حافظ على الانتظام</h4>
                <p className="text-sm text-muted-foreground">
                  الحضور المنتظم يساعد على تحسين الفهم والاستفادة القصوى من التدريب
                </p>
              </div>
              
              <div className="p-4 bg-success/10 rounded-lg">
                <h4 className="font-medium text-success mb-2">خطط مسبقاً</h4>
                <p className="text-sm text-muted-foreground">
                  راجع جدولك المسبق وخطط للمواصلات لتجنب التأخير
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Attendance;