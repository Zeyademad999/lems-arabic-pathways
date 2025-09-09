import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  Users,
  Clock,
  BarChart3,
  Edit,
  Eye,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  studentsCount: number;
  completionRate: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  createdDate: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    description: 'كورس شامل في أساسيات إدارة اللوجستيات والنقل',
    level: 'beginner',
    duration: 40,
    studentsCount: 25,
    completionRate: 78,
    rating: 4.5,
    status: 'active',
    createdDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    description: 'تطوير السلوكيات المهنية في بيئة العمل',
    level: 'intermediate',
    duration: 30,
    studentsCount: 18,
    completionRate: 85,
    rating: 4.7,
    status: 'active',
    createdDate: '2024-01-10'
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    description: 'تعلم استخدام برنامج الإكسل من البداية',
    level: 'beginner',
    duration: 25,
    studentsCount: 32,
    completionRate: 92,
    rating: 4.8,
    status: 'active',
    createdDate: '2024-01-05'
  }
];

const InstructorCourses = () => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-700">مبتدئ</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-100 text-blue-700">متوسط</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-100 text-purple-700">متقدم</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      case 'archived':
        return <Badge variant="outline">مؤرشف</Badge>;
      default:
        return null;
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <LEMSLayout userRole="instructor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">إدارة الكورسات</h1>
            <p className="text-muted-foreground">إدارة ومتابعة الكورسات التدريبية</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء كورس جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockCourses.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الكورسات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockCourses.reduce((sum, course) => sum + course.studentsCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(mockCourses.reduce((sum, course) => sum + course.completionRate, 0) / mockCourses.length)}%
                </p>
                <p className="text-sm text-muted-foreground">متوسط الإتمام</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockCourses.reduce((sum, course) => sum + course.duration, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الساعات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="البحث في الكورسات..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    {getLevelBadge(course.level)}
                    {getStatusBadge(course.status)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.studentsCount} طالب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration} ساعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className={getCompletionColor(course.completionRate)}>
                      {course.completionRate}% إتمام
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    تم الإنشاء: {course.createdDate}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LEMSLayout>
  );
};

export default InstructorCourses;