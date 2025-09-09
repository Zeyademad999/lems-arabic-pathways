import React, { useState } from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
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
  QrCode,
  Search,
  Download,
  Filter,
  Camera,
  Wifi,
  History,
  Eye,
  BarChart3
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
  duration?: number; // in minutes
  isCurrentSession?: boolean;
}

interface UpcomingSession {
  id: string;
  course: string;
  session: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  qrCode?: string;
  isActive: boolean;
}

interface AttendanceStats {
  totalSessions: number;
  presentSessions: number;
  absentSessions: number;
  lateSessions: number;
  attendanceRate: number;
  totalHours: number;
  onTimeRate: number;
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

const mockUpcomingSessions: UpcomingSession[] = [
  {
    id: '1',
    course: 'أساسيات اللوجستيات',
    session: 'إدارة المخازن المتقدمة',
    date: '2024-01-16',
    startTime: '09:00',
    endTime: '11:30',
    location: 'قاعة التدريب A',
    instructor: 'د. محمد أحمد',
    qrCode: 'QR12345',
    isActive: true
  },
  {
    id: '2',
    course: 'إكسل للمبتدئين',
    session: 'تطبيقات الإكسل المتقدمة',
    date: '2024-01-16',
    startTime: '14:00',
    endTime: '16:00',
    location: 'معمل الحاسوب',
    instructor: 'أ. حسن محمود',
    qrCode: 'QR67890',
    isActive: false
  },
  {
    id: '3',
    course: 'التدريب السلوكي المهني',
    session: 'مراجعة السلوك المهني',
    date: '2024-01-17',
    startTime: '10:00',
    endTime: '12:00',
    location: 'قاعة التدريب B',
    instructor: 'أ. فاطمة علي',
    qrCode: 'QR11111',
    isActive: false
  }
];

const attendanceStats: AttendanceStats = {
  totalSessions: mockAttendanceRecords.length,
  presentSessions: mockAttendanceRecords.filter(r => r.status === 'present').length,
  absentSessions: mockAttendanceRecords.filter(r => r.status === 'absent').length,
  lateSessions: mockAttendanceRecords.filter(r => r.status === 'late').length,
  attendanceRate: 83,
  totalHours: Math.round(mockAttendanceRecords.reduce((sum, r) => sum + (r.duration || 0), 0) / 60),
  onTimeRate: 67
};

const Attendance = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<UpcomingSession | null>(null);
  const [currentTab, setCurrentTab] = useState('overview');

  const currentSession = mockUpcomingSessions.find(s => s.isActive);
  
  const filteredRecords = mockAttendanceRecords.filter(record => {
    const matchesSearch = record.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCheckIn = (sessionId: string) => {
    toast({
      title: "تم تسجيل الحضور",
      description: "تم تسجيل حضورك بنجاح في الجلسة"
    });
  };

  const handleCheckOut = (sessionId: string) => {
    toast({
      title: "تم تسجيل المغادرة",
      description: "تم تسجيل مغادرتك من الجلسة بنجاح"
    });
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setIsQRScannerOpen(false);
    toast({
      title: "تم مسح الكود بنجاح",
      description: "تم تسجيل حضورك باستخدام رمز QR"
    });
  };
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
            تابع سجل حضورك وسجل الدخول والخروج من الجلسات التدريبية
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="checkin">تسجيل الحضور</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
            <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Current Session Alert */}
            {currentSession && (
              <Card className="lems-card bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <h3 className="font-semibold text-primary">الجلسة الحالية متاحة</h3>
                    </div>
                    <p className="text-sm font-medium">{currentSession.session}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentSession.startTime} - {currentSession.endTime} • {currentSession.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsQRScannerOpen(true)}>
                      <QrCode className="h-4 w-4 ml-2" />
                      مسح QR
                    </Button>
                    <Button onClick={() => handleCheckIn(currentSession.id)} className="lems-button-primary">
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                      تسجيل الحضور
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="lems-card text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">{attendanceStats.attendanceRate}%</p>
                <p className="text-sm text-muted-foreground">نسبة الحضور</p>
              </Card>

              <Card className="lems-card text-center p-6">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <p className="text-3xl font-bold text-success">{attendanceStats.presentSessions}</p>
                <p className="text-sm text-muted-foreground">جلسات حضور</p>
              </Card>

              <Card className="lems-card text-center p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <p className="text-3xl font-bold text-warning">{attendanceStats.totalHours}</p>
                <p className="text-sm text-muted-foreground">ساعات تدريب</p>
              </Card>

              <Card className="lems-card text-center p-6">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <p className="text-3xl font-bold text-destructive">{attendanceStats.absentSessions}</p>
                <p className="text-sm text-muted-foreground">جلسات غياب</p>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card className="lems-card">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  الجلسات القادمة
                </h3>
                <div className="space-y-3">
                  {mockUpcomingSessions.map((session) => (
                    <div key={session.id} className={`p-4 rounded-lg border ${
                      session.isActive ? 'border-primary bg-primary/5' : 'border-border'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{session.session}</h4>
                            {session.isActive && (
                              <Badge className="bg-success text-white text-xs">متاحة الآن</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{session.course}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.startTime} - {session.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.location}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {session.isActive ? (
                            <>
                              <Button variant="outline" size="sm" onClick={() => setIsQRScannerOpen(true)}>
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handleCheckIn(session.id)} className="lems-button-primary">
                                <CheckCircle2 className="h-4 w-4 ml-1" />
                                حضور
                              </Button>
                            </>
                          ) : (
                            <Badge variant="outline">
                              {new Date(session.date) > new Date() ? 'قادمة' : 'منتهية'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Code Scanner */}
              <Card className="lems-card">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <QrCode className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">مسح رمز QR</h3>
                    <p className="text-sm text-muted-foreground">
                      امسح رمز QR المعروض في قاعة التدريب لتسجيل حضورك
                    </p>
                  </div>
                  <Button onClick={() => setIsQRScannerOpen(true)} className="w-full lems-button-primary">
                    <Camera className="h-4 w-4 ml-2" />
                    فتح الكاميرا
                  </Button>
                </div>
              </Card>

              {/* Manual Check-in */}
              <Card className="lems-card">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-10 w-10 text-success" />
                    </div>
                    <h3 className="font-semibold mb-2">تسجيل يدوي</h3>
                    <p className="text-sm text-muted-foreground">
                      في حالة عدم توفر رمز QR، يمكنك التسجيل يدوياً
                    </p>
                  </div>
                  
                  {currentSession ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <p className="font-medium">{currentSession.session}</p>
                        <p className="text-sm text-muted-foreground">{currentSession.location}</p>
                      </div>
                      <Button onClick={() => handleCheckIn(currentSession.id)} className="w-full lems-button-primary">
                        تسجيل الحضور
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">لا توجد جلسة متاحة حالياً</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في سجل الحضور..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="lems-input pr-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="حالة الحضور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="present">حاضر</SelectItem>
                    <SelectItem value="absent">غائب</SelectItem>
                    <SelectItem value="late">متأخر</SelectItem>
                    <SelectItem value="excused">معذور</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="lems-card hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(record.status)}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{record.session}</h4>
                        <p className="text-sm text-muted-foreground">{record.course}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {record.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {record.location}
                          </span>
                          {record.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.floor(record.duration / 60)}س {record.duration % 60}د
                            </span>
                          )}
                        </div>
                        {record.notes && (
                          <p className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">{record.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-left space-y-2">
                      {getStatusBadge(record.status)}
                      {record.checkIn && record.checkOut && (
                        <div className="text-xs text-muted-foreground">
                          <p>دخول: {record.checkIn}</p>
                          <p>خروج: {record.checkOut}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  لا توجد سجلات مطابقة
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  جرب تغيير معايير البحث أو الفلترة
                </p>
              </div>
            )}
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance Rate Chart */}
              <Card className="lems-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">معدل الحضور</h3>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">{attendanceStats.attendanceRate}%</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${attendanceStats.attendanceRate}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {attendanceStats.presentSessions + attendanceStats.lateSessions} من {attendanceStats.totalSessions} جلسة
                    </p>
                  </div>
                </div>
              </Card>

              {/* On-time Performance */}
              <Card className="lems-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">معدل الحضور في الوقت</h3>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-success">{attendanceStats.onTimeRate}%</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-500"
                        style={{ width: `${attendanceStats.onTimeRate}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {attendanceStats.presentSessions} من {attendanceStats.presentSessions + attendanceStats.lateSessions} جلسة
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Stats */}
            <Card className="lems-card">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  تفصيل الإحصائيات
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{attendanceStats.totalSessions}</div>
                    <div className="text-sm text-muted-foreground">إجمالي الجلسات</div>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{attendanceStats.presentSessions}</div>
                    <div className="text-sm text-muted-foreground">حضور كامل</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{attendanceStats.lateSessions}</div>
                    <div className="text-sm text-muted-foreground">حضور متأخر</div>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">{attendanceStats.absentSessions}</div>
                    <div className="text-sm text-muted-foreground">غياب</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* QR Scanner Modal */}
        <Dialog open={isQRScannerOpen} onOpenChange={setIsQRScannerOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>مسح رمز QR</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">توجيه الكاميرا نحو رمز QR</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4" />
                <span>تأكد من اتصال الإنترنت</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsQRScannerOpen(false)} className="flex-1">
                  إلغاء
                </Button>
                <Button onClick={handleQRScan} className="flex-1 lems-button-primary">
                  تسجيل الحضور
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LEMSLayout>
  );
};

export default Attendance;