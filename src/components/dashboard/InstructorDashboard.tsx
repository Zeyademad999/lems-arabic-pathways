import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  Plus,
  Eye,
  Edit,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  students: number;
  completionRate: number;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
}

interface Student {
  id: string;
  name: string;
  course: string;
  progress: number;
  attendance: number;
  behaviorScore: number;
  lastActivity: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    students: 24,
    completionRate: 78,
    status: 'active',
    lastUpdated: '2024-01-10'
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    students: 18,
    completionRate: 65,
    status: 'active',
    lastUpdated: '2024-01-08'
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    students: 12,
    completionRate: 90,
    status: 'active',
    lastUpdated: '2024-01-05'
  }
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    course: 'أساسيات اللوجستيات',
    progress: 75,
    attendance: 95,
    behaviorScore: 88,
    lastActivity: '2024-01-10'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    course: 'التدريب السلوكي المهني',
    progress: 60,
    attendance: 85,
    behaviorScore: 92,
    lastActivity: '2024-01-09'
  },
  {
    id: '3',
    name: 'محمد حسن',
    course: 'إكسل للمبتدئين',
    progress: 40,
    attendance: 70,
    behaviorScore: 75,
    lastActivity: '2024-01-08'
  }
];

export const InstructorDashboard: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="lems-badge-success">نشط</Badge>;
      case 'draft':
        return <Badge className="lems-badge-pending">مسودة</Badge>;
      case 'archived':
        return <Badge className="lems-badge-locked">مؤرشف</Badge>;
      default:
        return null;
    }
  };

  const getBehaviorBadge = (score: number) => {
    if (score >= 85) return <Badge className="lems-badge-success">ممتاز</Badge>;
    if (score >= 70) return <Badge className="lems-badge-pending">جيد</Badge>;
    return <Badge className="lems-badge-locked">يحتاج تحسين</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-l from-primary/5 to-primary/10 rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold text-education-primary mb-2">
          مرحباً الأستاذ محمد أحمد
        </h1>
        <p className="text-muted-foreground">
          لديك 54 طالباً نشطاً في 3 كورسات. 5 واجبات تحتاج للمراجعة.
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
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">54</p>
              <p className="text-sm text-muted-foreground">طالب نشط</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">واجبات للمراجعة</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm text-muted-foreground">معدل الإكمال</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="lems-button-primary h-12 justify-start gap-3">
          <Plus className="h-5 w-5" />
          إنشاء كورس جديد
        </Button>
        <Button className="lems-button-secondary h-12 justify-start gap-3">
          <ClipboardList className="h-5 w-5" />
          إنشاء واجب
        </Button>
        <Button className="lems-button-secondary h-12 justify-start gap-3">
          <BarChart3 className="h-5 w-5" />
          عرض التقارير
        </Button>
      </div>

      {/* Courses Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">إدارة الكورسات</h2>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>

        <div className="space-y-3">
          {mockCourses.map((course) => (
            <Card key={course.id} className="lems-card">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-education-primary">
                      {course.title}
                    </h3>
                    {getStatusBadge(course.status)}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} طالب</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{course.completionRate}% معدل الإكمال</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>آخر تحديث: {course.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Student Progress Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">متابعة تقدم الطلاب</h2>
          <Button variant="outline" size="sm">
            <UserCheck className="h-4 w-4 ml-2" />
            عرض الكل
          </Button>
        </div>

        <div className="space-y-3">
          {mockStudents.map((student) => (
            <Card key={student.id} className="lems-card">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{student.name}</h3>
                    {getBehaviorBadge(student.behaviorScore)}
                  </div>
                  <p className="text-sm text-muted-foreground">{student.course}</p>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{student.progress}%</p>
                    <p className="text-muted-foreground">التقدم</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{student.attendance}%</p>
                    <p className="text-muted-foreground">الحضور</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{student.behaviorScore}/100</p>
                    <p className="text-muted-foreground">السلوك</p>
                  </div>
                  <Button size="sm" variant="outline">
                    تفاصيل
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};