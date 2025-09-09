import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target, 
  Calendar,
  FileText,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  status: 'active' | 'completed' | 'locked';
  nextLesson: string;
  dueAssignments: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    status: 'active',
    nextLesson: 'إدارة المخازن',
    dueAssignments: 2
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    progress: 40,
    totalLessons: 8,
    completedLessons: 3,
    status: 'active',
    nextLesson: 'آداب التعامل مع الزملاء',
    dueAssignments: 1
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    progress: 100,
    totalLessons: 6,
    completedLessons: 6,
    status: 'completed',
    nextLesson: '',
    dueAssignments: 0
  }
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'تقرير عن أنظمة المخازن',
    course: 'أساسيات اللوجستيات',
    dueDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: '2',
    title: 'مراجعة سلوكيات العمل',
    course: 'التدريب السلوكي المهني',
    dueDate: '2024-01-18',
    status: 'pending'
  }
];

export const StudentDashboard: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="lems-badge-pending">نشط</Badge>;
      case 'completed':
        return <Badge className="lems-badge-success">مكتمل</Badge>;
      case 'locked':
        return <Badge className="lems-badge-locked">مقفل</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayCircle className="h-4 w-4 text-warning" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'locked':
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-l from-primary/5 to-primary/10 rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold text-education-primary mb-2">
          مرحباً أحمد محمد
        </h1>
        <p className="text-muted-foreground">
          استمر في رحلتك التعليمية. لديك 3 واجبات قادمة هذا الأسبوع.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">كورسات نشطة</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">دروس مكتملة</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">واجبات معلقة</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">الكورسات الحالية</h2>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockCourses.map((course) => (
            <Card key={course.id} className="lems-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-education-primary">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(course.status)}
                      {getStatusBadge(course.status)}
                    </div>
                  </div>
                  <Button size="sm" className="lems-button-primary">
                    متابعة
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="lems-progress-bar">
                    <div 
                      className="lems-progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {course.completedLessons} من {course.totalLessons} دروس مكتملة
                  </p>
                </div>

                {course.nextLesson && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm">
                      <span className="text-muted-foreground">الدرس التالي: </span>
                      <span className="font-medium">{course.nextLesson}</span>
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">الواجبات القادمة</h2>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 ml-2" />
            عرض الكل
          </Button>
        </div>

        <div className="space-y-3">
          {mockAssignments.map((assignment) => (
            <Card key={assignment.id} className="lems-card">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>موعد التسليم: {assignment.dueDate}</span>
                  </div>
                </div>
                <Button size="sm" className="lems-button-primary">
                  بدء العمل
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};