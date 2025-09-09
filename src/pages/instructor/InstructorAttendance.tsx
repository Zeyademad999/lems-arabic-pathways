import React, { useState, useMemo } from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Calendar,
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  Edit,
  Plus,
  Save,
  X,
  CheckCircle,
  XCircle,
  Trash2,
  FileSpreadsheet,
  Bell,
  ChevronDown,
  QrCode,
  BarChart3,
  TrendingUp,
  MapPin,
  Camera,
  Wifi,
  RefreshCw,
  CalendarDays,
  History
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  course: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  notes?: string;
  lastModified?: string;
  modifiedBy?: string;
  method?: 'manual' | 'qr' | 'auto';
  location?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  courses: string[];
  phone?: string;
  studentId?: string;
  enrollmentDate?: string;
}

interface CourseAttendance {
  courseId: string;
  courseName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
  sessions: number;
  currentSession?: string;
  qrCode?: string;
}

interface AttendanceSession {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'upcoming' | 'active' | 'completed';
  qrCode?: string;
  attendanceCount: number;
}

const mockStudents: Student[] = [
  { 
    id: '1', 
    name: 'أحمد محمد علي', 
    email: 'ahmed.mohammed@email.com', 
    courses: ['أساسيات اللوجستيات', 'إكسل للمبتدئين'],
    phone: '+966501234567',
    studentId: 'ST001',
    enrollmentDate: '2024-01-01'
  },
  { 
    id: '2', 
    name: 'فاطمة السالم', 
    email: 'fatima.salem@email.com', 
    courses: ['أساسيات اللوجستيات', 'التدريب السلوكي'],
    phone: '+966501234568',
    studentId: 'ST002',
    enrollmentDate: '2024-01-01'
  },
  { 
    id: '3', 
    name: 'محمد عبد الله', 
    email: 'mohammed.abdullah@email.com', 
    courses: ['إكسل للمبتدئين', 'التدريب السلوكي'],
    phone: '+966501234569',
    studentId: 'ST003',
    enrollmentDate: '2024-01-02'
  },
  { 
    id: '4', 
    name: 'سارة أحمد', 
    email: 'sarah.ahmed@email.com', 
    courses: ['أساسيات اللوجستيات'],
    phone: '+966501234570',
    studentId: 'ST004',
    enrollmentDate: '2024-01-02'
  },
  { 
    id: '5', 
    name: 'علي حسن', 
    email: 'ali.hassan@email.com', 
    courses: ['إكسل للمبتدئين'],
    phone: '+966501234571',
    studentId: 'ST005',
    enrollmentDate: '2024-01-03'
  }
];

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'أحمد محمد علي',
    studentEmail: 'ahmed.mohammed@email.com',
    course: 'أساسيات اللوجستيات',
    courseId: '1',
    date: '2024-01-22',
    status: 'present',
    timeIn: '09:00',
    timeOut: '12:00',
    lastModified: '2024-01-22 09:05',
    modifiedBy: 'محمد المدرب'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'فاطمة السالم',
    studentEmail: 'fatima.salem@email.com',
    course: 'أساسيات اللوجستيات',
    courseId: '1',
    date: '2024-01-22',
    status: 'late',
    timeIn: '09:15',
    timeOut: '12:00',
    notes: 'تأخر بسبب ظروف المرور',
    lastModified: '2024-01-22 09:20',
    modifiedBy: 'محمد المدرب'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'محمد عبد الله',
    studentEmail: 'mohammed.abdullah@email.com',
    course: 'إكسل للمبتدئين',
    courseId: '2',
    date: '2024-01-22',
    status: 'absent',
    notes: 'غياب بعذر طبي',
    lastModified: '2024-01-22 10:00',
    modifiedBy: 'محمد المدرب'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'سارة أحمد',
    studentEmail: 'sarah.ahmed@email.com',
    course: 'أساسيات اللوجستيات',
    courseId: '1',
    date: '2024-01-22',
    status: 'excused',
    notes: 'إجازة مرضية',
    lastModified: '2024-01-22 08:30',
    modifiedBy: 'محمد المدرب'
  }
];

const mockCourseAttendance: CourseAttendance[] = [
  {
    courseId: '1',
    courseName: 'أساسيات اللوجستيات',
    totalStudents: 25,
    presentCount: 20,
    absentCount: 2,
    lateCount: 2,
    excusedCount: 1,
    attendanceRate: 88,
    sessions: 12,
    currentSession: 'إدارة المخازن المتقدمة',
    qrCode: 'QR12345'
  },
  {
    courseId: '2',
    courseName: 'التدريب السلوكي المهني',
    totalStudents: 18,
    presentCount: 15,
    absentCount: 1,
    lateCount: 1,
    excusedCount: 1,
    attendanceRate: 89,
    sessions: 10
  },
  {
    courseId: '3',
    courseName: 'إكسل للمبتدئين',
    totalStudents: 32,
    presentCount: 28,
    absentCount: 2,
    lateCount: 1,
    excusedCount: 1,
    attendanceRate: 91,
    sessions: 15
  }
];

const InstructorAttendance = () => {
  const { toast } = useToast();
  const [attendanceRecords, setAttendanceRecords] = React.useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [courseAttendance, setCourseAttendance] = React.useState<CourseAttendance[]>(mockCourseAttendance);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('all');
  const [selectedDate, setSelectedDate] = React.useState('2024-01-22');
  const [selectedRecord, setSelectedRecord] = React.useState<AttendanceRecord | null>(null);
  const [editingRecord, setEditingRecord] = React.useState<AttendanceRecord | null>(null);
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isBulkAttendanceOpen, setIsBulkAttendanceOpen] = React.useState(false);

  // Filter records based on search, course, and date
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || record.courseId === selectedCourse;
    const matchesDate = record.date === selectedDate;
    return matchesSearch && matchesCourse && matchesDate;
  });

  const handleMarkAttendance = (attendanceData: Partial<AttendanceRecord>) => {
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId: attendanceData.studentId || '',
      studentName: attendanceData.studentName || '',
      studentEmail: attendanceData.studentEmail || '',
      course: attendanceData.course || '',
      courseId: attendanceData.courseId || '',
      date: selectedDate,
      status: attendanceData.status || 'present',
      timeIn: attendanceData.timeIn,
      timeOut: attendanceData.timeOut,
      notes: attendanceData.notes,
      lastModified: new Date().toLocaleString('ar-SA'),
      modifiedBy: 'محمد المدرب'
    };

    setAttendanceRecords([...attendanceRecords, newRecord]);
    updateCourseAttendance(newRecord.courseId, newRecord.status, 'add');
    setIsMarkAttendanceOpen(false);
    
    toast({
      title: "تم تسجيل الحضور",
      description: `تم تسجيل حضور ${newRecord.studentName} بنجاح`
    });
  };

  const handleEditAttendance = (updatedRecord: AttendanceRecord) => {
    const oldRecord = attendanceRecords.find(r => r.id === updatedRecord.id);
    setAttendanceRecords(attendanceRecords.map(record => 
      record.id === updatedRecord.id ? { 
        ...updatedRecord, 
        lastModified: new Date().toLocaleString('ar-SA'),
        modifiedBy: 'محمد المدرب'
      } : record
    ));

    if (oldRecord && oldRecord.status !== updatedRecord.status) {
      updateCourseAttendance(updatedRecord.courseId, oldRecord.status, 'remove');
      updateCourseAttendance(updatedRecord.courseId, updatedRecord.status, 'add');
    }

    setIsEditModalOpen(false);
    setEditingRecord(null);
    
    toast({
      title: "تم تحديث الحضور",
      description: "تم تحديث سجل الحضور بنجاح"
    });
  };

  const handleDeleteRecord = (recordId: string) => {
    const record = attendanceRecords.find(r => r.id === recordId);
    if (record) {
      setAttendanceRecords(attendanceRecords.filter(r => r.id !== recordId));
      updateCourseAttendance(record.courseId, record.status, 'remove');
      
      toast({
        title: "تم حذف السجل",
        description: "تم حذف سجل الحضور بنجاح"
      });
    }
  };

  const updateCourseAttendance = (courseId: string, status: string, action: 'add' | 'remove') => {
    setCourseAttendance(courses => courses.map(course => {
      if (course.courseId === courseId) {
        const increment = action === 'add' ? 1 : -1;
        const updatedCourse = { ...course };
        
        switch (status) {
          case 'present':
            updatedCourse.presentCount += increment;
            break;
          case 'absent':
            updatedCourse.absentCount += increment;
            break;
          case 'late':
            updatedCourse.lateCount += increment;
            break;
          case 'excused':
            updatedCourse.excusedCount += increment;
            break;
        }
        
        const totalAttended = updatedCourse.presentCount + updatedCourse.lateCount;
        updatedCourse.attendanceRate = Math.round((totalAttended / updatedCourse.totalStudents) * 100);
        
        return updatedCourse;
      }
      return course;
    }));
  };

  const handleBulkAttendance = (courseId: string, defaultStatus: 'present' | 'absent') => {
    const studentsInCourse = mockStudents.filter(student => 
      student.courses.includes(courseAttendance.find(c => c.courseId === courseId)?.courseName || '')
    );
    
    const newRecords = studentsInCourse.map(student => ({
      id: `${Date.now()}-${student.id}`,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      course: courseAttendance.find(c => c.courseId === courseId)?.courseName || '',
      courseId,
      date: selectedDate,
      status: defaultStatus,
      timeIn: defaultStatus === 'present' ? '09:00' : undefined,
      lastModified: new Date().toLocaleString('ar-SA'),
      modifiedBy: 'محمد المدرب'
    }));

    setAttendanceRecords([...attendanceRecords, ...newRecords]);
    setIsBulkAttendanceOpen(false);
    
    toast({
      title: "تم تسجيل الحضور الجماعي",
      description: `تم تسجيل حضور ${newRecords.length} طالب`
    });
  };

  const handleExportReport = () => {
    const csvContent = [
      ['الطالب', 'البريد الإلكتروني', 'الكورس', 'التاريخ', 'الحالة', 'وقت الوصول', 'ملاحظات'],
      ...filteredRecords.map(record => [
        record.studentName,
        record.studentEmail,
        record.course,
        record.date,
        record.status === 'present' ? 'حاضر' : 
        record.status === 'absent' ? 'غائب' : 
        record.status === 'late' ? 'متأخر' : 'غياب بعذر',
        record.timeIn || '',
        record.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `attendance-report-${selectedDate}.csv`;
    link.click();
    
    toast({
      title: "تم تصدير التقرير",
      description: "تم تحميل تقرير الحضور بنجاح"
    });
  };

  const handleViewRecord = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700">حاضر</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700">غائب</Badge>;
      case 'late':
        return <Badge className="bg-orange-100 text-orange-700">متأخر</Badge>;
      case 'excused':
        return <Badge className="bg-blue-100 text-blue-700">غياب بعذر</Badge>;
      default:
        return null;
    }
  };

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-orange-500';
    return 'text-red-500';
  };

  const totalPresent = courseAttendance.reduce((sum, course) => sum + course.presentCount, 0);
  const totalAbsent = courseAttendance.reduce((sum, course) => sum + course.absentCount, 0);
  const totalLate = courseAttendance.reduce((sum, course) => sum + course.lateCount, 0);
  const totalExcused = courseAttendance.reduce((sum, course) => sum + course.excusedCount, 0);
  const totalStudents = courseAttendance.reduce((sum, course) => sum + course.totalStudents, 0);
  const overallRate = totalStudents > 0 ? Math.round(((totalPresent + totalLate) / totalStudents) * 100) : 0;

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">تتبع الحضور</h1>
            <p className="text-muted-foreground">متابعة حضور الطلاب وإدارة الغياب</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Dialog open={isBulkAttendanceOpen} onOpenChange={setIsBulkAttendanceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Users className="h-4 w-4 ml-2" />
                  حضور جماعي
                </Button>
              </DialogTrigger>
              <BulkAttendanceModal 
                courses={courseAttendance}
                onSave={handleBulkAttendance}
                onClose={() => setIsBulkAttendanceOpen(false)}
              />
            </Dialog>
            <Dialog open={isMarkAttendanceOpen} onOpenChange={setIsMarkAttendanceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserCheck className="h-4 w-4 ml-2" />
                  تسجيل الحضور
                </Button>
              </DialogTrigger>
              <MarkAttendanceModal 
                students={mockStudents}
                courses={courseAttendance}
                date={selectedDate}
                onSave={handleMarkAttendance}
                onClose={() => setIsMarkAttendanceOpen(false)}
              />
            </Dialog>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalPresent}</p>
                <p className="text-sm text-muted-foreground">حاضر</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserX className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{totalAbsent}</p>
                <p className="text-sm text-muted-foreground">غائب</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalLate}</p>
                <p className="text-sm text-muted-foreground">متأخر</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalExcused}</p>
                <p className="text-sm text-muted-foreground">غياب بعذر</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className={`text-2xl font-bold ${getAttendanceRateColor(overallRate)}`}>
                  {overallRate}%
                </p>
                <p className="text-sm text-muted-foreground">معدل الحضور</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Attendance Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">نظرة عامة على حضور الكورسات</h3>
          <div className="space-y-4">
            {courseAttendance.map((course) => (
              <div key={course.courseId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{course.courseName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.totalStudents} طالب مسجل
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600">{course.presentCount}</p>
                    <p className="text-xs text-muted-foreground">حاضر</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-red-600">{course.absentCount}</p>
                    <p className="text-xs text-muted-foreground">غائب</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-orange-600">{course.lateCount}</p>
                    <p className="text-xs text-muted-foreground">متأخر</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-600">{course.excusedCount}</p>
                    <p className="text-xs text-muted-foreground">بعذر</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${getAttendanceRateColor(course.attendanceRate)}`}>
                      {course.attendanceRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">المعدل</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course.courseId)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="البحث عن طالب..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="px-4 py-2 border rounded-md bg-white z-10 min-w-[150px]"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">جميع الكورسات</option>
                {courseAttendance.map(course => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="date"
              className="px-4 py-2 border rounded-md bg-white"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة متقدمة
            </Button>
          </div>
        </Card>

        {/* Attendance Records */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">سجل الحضور</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedDate}</Badge>
              <Badge variant="outline">{filteredRecords.length} سجل</Badge>
            </div>
          </div>
          
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">لا توجد سجلات</h4>
              <p className="text-muted-foreground mb-4">لم يتم العثور على سجلات حضور للفلاتر المحددة</p>
              <Button onClick={() => setIsMarkAttendanceOpen(true)}>
                <Plus className="h-4 w-4 ml-2" />
                تسجيل حضور جديد
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {record.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-medium">{record.studentName}</h4>
                      <p className="text-sm text-muted-foreground">{record.course}</p>
                      <p className="text-xs text-muted-foreground">{record.studentEmail}</p>
                      {record.notes && (
                        <p className="text-xs text-muted-foreground mt-1 italic">"{record.notes}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {record.timeIn && (
                      <div className="text-center">
                        <p className="text-sm font-medium">{record.timeIn}</p>
                        <p className="text-xs text-muted-foreground">وصول</p>
                      </div>
                    )}
                    {record.timeOut && (
                      <div className="text-center">
                        <p className="text-sm font-medium">{record.timeOut}</p>
                        <p className="text-xs text-muted-foreground">انصراف</p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(record.status)}
                      {record.status === 'absent' && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewRecord(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditRecord(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
                            handleDeleteRecord(record.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => setIsBulkAttendanceOpen(true)}
            >
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                تسجيل حضور جماعي
              </h4>
              <p className="text-sm text-muted-foreground">تسجيل حضور جميع طلاب الكورس بنقرة واحدة</p>
            </div>
            
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={handleExportReport}
            >
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-green-500" />
                تقرير شامل
              </h4>
              <p className="text-sm text-muted-foreground">تصدير تقرير مفصل عن حالات الحضور والغياب</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                إشعارات الغياب
              </h4>
              <p className="text-sm text-muted-foreground">إرسال تنبيهات للطلاب المتغيبين وأولياء الأمور</p>
            </div>
          </div>
        </Card>

        {/* Modals */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AttendanceDetailsModal 
            record={selectedRecord} 
            onClose={() => setIsViewModalOpen(false)} 
          />
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <EditAttendanceModal 
            record={editingRecord}
            onSave={handleEditAttendance}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

// Mark Attendance Modal Component
const MarkAttendanceModal: React.FC<{
  students: Student[];
  courses: CourseAttendance[];
  date: string;
  onSave: (record: Partial<AttendanceRecord>) => void;
  onClose: () => void;
}> = ({ students, courses, date, onSave, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    studentId: '',
    courseId: '',
    status: 'present' as AttendanceRecord['status'],
    timeIn: new Date().toTimeString().slice(0, 5),
    timeOut: '',
    notes: ''
  });

  const selectedStudent = students.find(s => s.id === formData.studentId);
  const availableCourses = selectedStudent 
    ? courses.filter(c => selectedStudent.courses.includes(c.courseName))
    : courses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الطالب والكورس",
        variant: "destructive"
      });
      return;
    }

    const student = students.find(s => s.id === formData.studentId);
    const course = courses.find(c => c.courseId === formData.courseId);
    
    if (student && course) {
      onSave({
        studentId: student.id,
        studentName: student.name,
        studentEmail: student.email,
        course: course.courseName,
        courseId: course.courseId,
        ...formData
      });
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>تسجيل الحضور</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">الطالب *</label>
          <select
            required
            className="w-full p-3 border rounded-md bg-white"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value, courseId: '' })}
          >
            <option value="">اختر الطالب</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الكورس *</label>
          <select
            required
            className="w-full p-3 border rounded-md bg-white"
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            disabled={!formData.studentId}
          >
            <option value="">اختر الكورس</option>
            {availableCourses.map(course => (
              <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">حالة الحضور</label>
          <select
            className="w-full p-3 border rounded-md bg-white"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as AttendanceRecord['status'] })}
          >
            <option value="present">حاضر</option>
            <option value="absent">غائب</option>
            <option value="late">متأخر</option>
            <option value="excused">غياب بعذر</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">وقت الوصول</label>
            <input
              type="time"
              className="w-full p-3 border rounded-md"
              value={formData.timeIn}
              onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">وقت الانصراف</label>
            <input
              type="time"
              className="w-full p-3 border rounded-md"
              value={formData.timeOut}
              onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">ملاحظات</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="أضف ملاحظات إضافية"
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            تسجيل الحضور
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Attendance Details Modal Component
const AttendanceDetailsModal: React.FC<{
  record: AttendanceRecord | null;
  onClose: () => void;
}> = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>تفاصيل سجل الحضور</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {record.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{record.studentName}</h3>
            <p className="text-sm text-muted-foreground">{record.studentEmail}</p>
            <p className="text-sm text-muted-foreground">{record.course}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">التاريخ</label>
            <p className="font-medium">{record.date}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">الحالة</label>
            <div className="mt-1">
              <Badge className={
                record.status === 'present' ? 'bg-green-100 text-green-700' :
                record.status === 'absent' ? 'bg-red-100 text-red-700' :
                record.status === 'late' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }>
                {record.status === 'present' ? 'حاضر' :
                 record.status === 'absent' ? 'غائب' :
                 record.status === 'late' ? 'متأخر' : 'غياب بعذر'}
              </Badge>
            </div>
          </div>
        </div>

        {(record.timeIn || record.timeOut) && (
          <div className="grid grid-cols-2 gap-4">
            {record.timeIn && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">وقت الوصول</label>
                <p className="font-medium">{record.timeIn}</p>
              </div>
            )}
            {record.timeOut && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">وقت الانصراف</label>
                <p className="font-medium">{record.timeOut}</p>
              </div>
            )}
          </div>
        )}

        {record.notes && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">الملاحظات</label>
            <p className="mt-1 p-3 bg-muted/50 rounded-md text-sm">{record.notes}</p>
          </div>
        )}

        {record.lastModified && (
          <div className="text-xs text-muted-foreground border-t pt-4">
            <p>آخر تعديل: {record.lastModified}</p>
            {record.modifiedBy && <p>بواسطة: {record.modifiedBy}</p>}
          </div>
        )}
      </div>
    </DialogContent>
  );
};

// Edit Attendance Modal Component
const EditAttendanceModal: React.FC<{
  record: AttendanceRecord | null;
  onSave: (record: AttendanceRecord) => void;
  onClose: () => void;
}> = ({ record, onSave, onClose }) => {
  const [formData, setFormData] = React.useState<AttendanceRecord | null>(record);

  React.useEffect(() => {
    setFormData(record);
  }, [record]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>تعديل سجل الحضور</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">الطالب</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md bg-muted"
            value={formData.studentName}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الكورس</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md bg-muted"
            value={formData.course}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">حالة الحضور</label>
          <select
            className="w-full p-3 border rounded-md bg-white"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as AttendanceRecord['status'] })}
          >
            <option value="present">حاضر</option>
            <option value="absent">غائب</option>
            <option value="late">متأخر</option>
            <option value="excused">غياب بعذر</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">وقت الوصول</label>
            <input
              type="time"
              className="w-full p-3 border rounded-md"
              value={formData.timeIn || ''}
              onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">وقت الانصراف</label>
            <input
              type="time"
              className="w-full p-3 border rounded-md"
              value={formData.timeOut || ''}
              onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">ملاحظات</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Bulk Attendance Modal Component
const BulkAttendanceModal: React.FC<{
  courses: CourseAttendance[];
  onSave: (courseId: string, status: 'present' | 'absent') => void;
  onClose: () => void;
}> = ({ courses, onSave, onClose }) => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [defaultStatus, setDefaultStatus] = React.useState<'present' | 'absent'>('present');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الكورس",
        variant: "destructive"
      });
      return;
    }
    onSave(selectedCourse, defaultStatus);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>تسجيل حضور جماعي</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">الكورس *</label>
          <select
            required
            className="w-full p-3 border rounded-md bg-white"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">اختر الكورس</option>
            {courses.map(course => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName} ({course.totalStudents} طالب)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الحالة الافتراضية</label>
          <select
            className="w-full p-3 border rounded-md bg-white"
            value={defaultStatus}
            onChange={(e) => setDefaultStatus(e.target.value as 'present' | 'absent')}
          >
            <option value="present">تسجيل الجميع كحاضر</option>
            <option value="absent">تسجيل الجميع كغائب</option>
          </select>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">ملاحظة:</h4>
          <p className="text-sm text-muted-foreground">
            سيتم تسجيل حضور جميع الطلاب المسجلين في الكورس المحدد بالحالة المختارة.
            يمكنك تعديل حالة كل طالب لاحقاً حسب الحاجة.
          </p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Users className="h-4 w-4 ml-2" />
            تسجيل الحضور
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default InstructorAttendance;