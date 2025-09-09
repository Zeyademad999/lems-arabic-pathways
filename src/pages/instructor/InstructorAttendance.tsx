import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  AlertTriangle
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentName: string;
  course: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  notes?: string;
}

interface CourseAttendance {
  courseId: string;
  courseName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentName: 'أحمد محمد علي',
    course: 'أساسيات اللوجستيات',
    date: '2024-01-22',
    status: 'present',
    timeIn: '09:00',
  },
  {
    id: '2',
    studentName: 'فاطمة السالم',
    course: 'أساسيات اللوجستيات',
    date: '2024-01-22',
    status: 'late',
    timeIn: '09:15',
    notes: 'تأخر بسبب ظروف المرور'
  },
  {
    id: '3',
    studentName: 'محمد عبد الله',
    course: 'إكسل للمبتدئين',
    date: '2024-01-22',
    status: 'absent',
    notes: 'غياب بعذر طبي'
  }
];

const mockCourseAttendance: CourseAttendance[] = [
  {
    courseId: '1',
    courseName: 'أساسيات اللوجستيات',
    totalStudents: 25,
    presentCount: 22,
    absentCount: 2,
    lateCount: 1,
    attendanceRate: 88
  },
  {
    courseId: '2',
    courseName: 'التدريب السلوكي المهني',
    totalStudents: 18,
    presentCount: 16,
    absentCount: 1,
    lateCount: 1,
    attendanceRate: 89
  }
];

const InstructorAttendance = () => {
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

  const totalPresent = mockCourseAttendance.reduce((sum, course) => sum + course.presentCount, 0);
  const totalAbsent = mockCourseAttendance.reduce((sum, course) => sum + course.absentCount, 0);
  const totalLate = mockCourseAttendance.reduce((sum, course) => sum + course.lateCount, 0);
  const totalStudents = mockCourseAttendance.reduce((sum, course) => sum + course.totalStudents, 0);
  const overallRate = Math.round((totalPresent / totalStudents) * 100);

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
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button>
              <UserCheck className="h-4 w-4 ml-2" />
              تسجيل الحضور
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalPresent}</p>
                <p className="text-sm text-muted-foreground">حاضر اليوم</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserX className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{totalAbsent}</p>
                <p className="text-sm text-muted-foreground">غائب اليوم</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalLate}</p>
                <p className="text-sm text-muted-foreground">متأخر اليوم</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className={`text-2xl font-bold ${getAttendanceRateColor(overallRate)}`}>
                  {overallRate}%
                </p>
                <p className="text-sm text-muted-foreground">معدل الحضور العام</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Attendance Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">نظرة عامة على حضور الكورسات</h3>
          <div className="space-y-4">
            {mockCourseAttendance.map((course) => (
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
                    <p className={`text-sm font-medium ${getAttendanceRateColor(course.attendanceRate)}`}>
                      {course.attendanceRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">معدل الحضور</p>
                  </div>
                  <Button variant="outline" size="sm">
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
              />
            </div>
            <select className="px-4 py-2 border rounded-md">
              <option>جميع الكورسات</option>
              <option>أساسيات اللوجستيات</option>
              <option>إكسل للمبتدئين</option>
              <option>التدريب السلوكي</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border rounded-md"
              defaultValue="2024-01-22"
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Attendance Records */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">سجل الحضور اليومي</h3>
            <Badge variant="outline">22 يناير 2024</Badge>
          </div>
          
          <div className="space-y-3">
            {mockAttendanceRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {record.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium">{record.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{record.course}</p>
                    {record.notes && (
                      <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {record.timeIn && (
                    <div className="text-center">
                      <p className="text-sm font-medium">{record.timeIn}</p>
                      <p className="text-xs text-muted-foreground">وقت الوصول</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(record.status)}
                    {record.status === 'absent' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تسجيل حضور جماعي</h4>
              <p className="text-sm text-muted-foreground">تسجيل حضور جميع طلاب الكورس بنقرة واحدة</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تقرير الغياب</h4>
              <p className="text-sm text-muted-foreground">إنشاء تقرير مفصل عن حالات الغياب</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">إشعارات الغياب</h4>
              <p className="text-sm text-muted-foreground">إرسال تنبيهات للطلاب المتغيبين</p>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorAttendance;