import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Target,
  Award,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';

interface StudentProgress {
  studentId: string;
  studentName: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  averageScore: number;
  totalHours: number;
  completionRate: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'completed';
  trend: 'improving' | 'declining' | 'stable';
}

interface CourseProgress {
  courseId: string;
  courseName: string;
  totalStudents: number;
  completedStudents: number;
  averageProgress: number;
  averageScore: number;
  totalHours: number;
  completionRate: number;
}

const mockStudentProgress: StudentProgress[] = [
  {
    studentId: '1',
    studentName: 'أحمد محمد علي',
    coursesEnrolled: 3,
    coursesCompleted: 2,
    averageScore: 87,
    totalHours: 45,
    completionRate: 78,
    lastActivity: '2024-01-22',
    status: 'active',
    trend: 'improving'
  },
  {
    studentId: '2',
    studentName: 'فاطمة السالم',
    coursesEnrolled: 4,
    coursesCompleted: 3,
    averageScore: 92,
    totalHours: 62,
    completionRate: 85,
    lastActivity: '2024-01-21',
    status: 'active',
    trend: 'stable'
  },
  {
    studentId: '3',
    studentName: 'محمد عبد الله',
    coursesEnrolled: 2,
    coursesCompleted: 1,
    averageScore: 73,
    totalHours: 28,
    completionRate: 65,
    lastActivity: '2024-01-18',
    status: 'inactive',
    trend: 'declining'
  }
];

const mockCourseProgress: CourseProgress[] = [
  {
    courseId: '1',
    courseName: 'أساسيات اللوجستيات',
    totalStudents: 25,
    completedStudents: 18,
    averageProgress: 78,
    averageScore: 85,
    totalHours: 40,
    completionRate: 72
  },
  {
    courseId: '2',
    courseName: 'إكسل للمبتدئين',
    totalStudents: 32,
    completedStudents: 28,
    averageProgress: 92,
    averageScore: 88,
    totalHours: 25,
    completionRate: 87
  },
  {
    courseId: '3',
    courseName: 'التدريب السلوكي المهني',
    totalStudents: 18,
    completedStudents: 15,
    averageProgress: 85,
    averageScore: 82,
    totalHours: 30,
    completionRate: 83
  }
];

const InstructorProgress = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'inactive':
        return <Badge className="bg-orange-100 text-orange-700">غير نشط</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700">مكتمل</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'text-green-600';
    if (progress >= 70) return 'text-blue-600';
    if (progress >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const totalStudents = mockStudentProgress.length;
  const activeStudents = mockStudentProgress.filter(s => s.status === 'active').length;
  const averageCompletion = Math.round(
    mockStudentProgress.reduce((sum, student) => sum + student.completionRate, 0) / totalStudents
  );
  const averageScore = Math.round(
    mockStudentProgress.reduce((sum, student) => sum + student.averageScore, 0) / totalStudents
  );

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">متابعة التقدم</h1>
            <p className="text-muted-foreground">تتبع تقدم الطلاب والكورسات بشكل مفصل</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button>
              <BarChart3 className="h-4 w-4 ml-2" />
              عرض التحليلات
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeStudents}/{totalStudents}</p>
                <p className="text-sm text-muted-foreground">طلاب نشطون</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{averageCompletion}%</p>
                <p className="text-sm text-muted-foreground">متوسط الإتمام</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockStudentProgress.reduce((sum, student) => sum + student.totalHours, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي ساعات الدراسة</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Progress Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">تقدم الكورسات</h3>
          <div className="space-y-4">
            {mockCourseProgress.map((course) => (
              <div key={course.courseId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{course.courseName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.totalStudents} طالب مسجل • {course.totalHours} ساعة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{course.completedStudents}/{course.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">مكتمل</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${getProgressColor(course.averageProgress)}`}>
                      {course.averageProgress}%
                    </p>
                    <p className="text-xs text-muted-foreground">متوسط التقدم</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-600">{course.averageScore}%</p>
                    <p className="text-xs text-muted-foreground">متوسط الدرجات</p>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completionRate}%` }}
                    />
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
            <select className="px-4 py-2 border rounded-md">
              <option>جميع الحالات</option>
              <option>نشط</option>
              <option>غير نشط</option>
              <option>مكتمل</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Student Progress Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockStudentProgress.map((student) => (
            <Card key={student.studentId} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.studentName}</h3>
                      <p className="text-sm text-muted-foreground">آخر نشاط: {student.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(student.status)}
                    {getTrendIcon(student.trend)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{student.coursesCompleted}/{student.coursesEnrolled}</p>
                    <p className="text-xs text-muted-foreground">كورسات مكتملة</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className={`text-2xl font-bold ${getProgressColor(student.averageScore)}`}>
                      {student.averageScore}%
                    </p>
                    <p className="text-xs text-muted-foreground">متوسط الدرجات</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>معدل الإتمام</span>
                    <span className={`font-medium ${getProgressColor(student.completionRate)}`}>
                      {student.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{student.totalHours} ساعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{student.coursesEnrolled} كورس</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    الاتجاه: {student.trend === 'improving' ? 'في تحسن' : 
                             student.trend === 'declining' ? 'في تراجع' : 'مستقر'}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 ml-1" />
                    التفاصيل
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Analytics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">تحليلات التقدم</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">الطلاب المتقدمون</h4>
              <p className="text-2xl font-bold text-green-600">
                {mockStudentProgress.filter(s => s.trend === 'improving').length}
              </p>
              <p className="text-sm text-muted-foreground">في تحسن مستمر</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">معدل الإنجاز</h4>
              <p className="text-2xl font-bold text-blue-600">{averageCompletion}%</p>
              <p className="text-sm text-muted-foreground">متوسط عام</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">الأداء المتميز</h4>
              <p className="text-2xl font-bold text-purple-600">
                {mockStudentProgress.filter(s => s.averageScore >= 85).length}
              </p>
              <p className="text-sm text-muted-foreground">طالب متفوق</p>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorProgress;