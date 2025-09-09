import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Trophy,
  Clock,
  CheckCircle2,
  BarChart3,
  Calendar,
  Award,
  Star
} from 'lucide-react';

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  completedAssignments: number;
  totalAssignments: number;
  averageQuizScore: number;
  timeSpent: number; // in hours
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  expectedCompletion: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  category: 'course' | 'quiz' | 'assignment' | 'behavior';
}

const mockCourseProgress: CourseProgress[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    completedAssignments: 3,
    totalAssignments: 4,
    averageQuizScore: 85,
    timeSpent: 24,
    status: 'active',
    startDate: '2024-01-01',
    expectedCompletion: '2024-02-15'
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    progress: 60,
    completedLessons: 5,
    totalLessons: 8,
    completedAssignments: 2,
    totalAssignments: 3,
    averageQuizScore: 92,
    timeSpent: 18,
    status: 'active',
    startDate: '2024-01-08',
    expectedCompletion: '2024-02-08'
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    progress: 100,
    completedLessons: 6,
    totalLessons: 6,
    completedAssignments: 2,
    totalAssignments: 2,
    averageQuizScore: 95,
    timeSpent: 15,
    status: 'completed',
    startDate: '2023-12-15',
    expectedCompletion: '2024-01-15'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'المتعلم النشط',
    description: 'أكمل 10 دروس متتالية',
    icon: '🏆',
    unlockedDate: '2024-01-15',
    category: 'course'
  },
  {
    id: '2',
    title: 'خبير الاختبارات',
    description: 'حصل على 90% أو أكثر في 5 اختبارات',
    icon: '🎯',
    unlockedDate: '2024-01-12',
    category: 'quiz'
  },
  {
    id: '3',
    title: 'منجز الواجبات',
    description: 'سلم جميع الواجبات في الوقت المحدد',
    icon: '📝',
    unlockedDate: '2024-01-10',
    category: 'assignment'
  },
  {
    id: '4',
    title: 'السلوك المثالي',
    description: 'حافظ على تقييم سلوكي ممتاز لشهر كامل',
    icon: '⭐',
    unlockedDate: '2024-01-08',
    category: 'behavior'
  }
];

const Progress = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="lems-badge-pending">نشط</Badge>;
      case 'completed':
        return <Badge className="lems-badge-success">مكتمل</Badge>;
      case 'paused':
        return <Badge className="lems-badge-locked">متوقف</Badge>;
      default:
        return null;
    }
  };

  const totalProgress = Math.round(
    mockCourseProgress.reduce((sum, course) => sum + course.progress, 0) / mockCourseProgress.length
  );
  
  const totalTimeSpent = mockCourseProgress.reduce((sum, course) => sum + course.timeSpent, 0);
  const totalLessonsCompleted = mockCourseProgress.reduce((sum, course) => sum + course.completedLessons, 0);
  const averageQuizScore = Math.round(
    mockCourseProgress.reduce((sum, course) => sum + course.averageQuizScore, 0) / mockCourseProgress.length
  );

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">تقرير التقدم</h1>
          <p className="text-muted-foreground">
            تابع تقدمك التعليمي وإنجازاتك عبر جميع الكورسات
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalProgress}%</p>
                <p className="text-sm text-muted-foreground">إجمالي التقدم</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLessonsCompleted}</p>
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
                <p className="text-2xl font-bold">{totalTimeSpent}</p>
                <p className="text-sm text-muted-foreground">ساعات التعلم</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{averageQuizScore}%</p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Progress Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">تقدم الكورسات</h2>
          
          <div className="space-y-4">
            {mockCourseProgress.map((course) => (
              <Card key={course.id} className="lems-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-education-primary">
                          {course.title}
                        </h3>
                        {getStatusBadge(course.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم العام</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="lems-progress-bar">
                          <div 
                            className="lems-progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{course.averageQuizScore}%</p>
                      <p className="text-xs text-muted-foreground">متوسط الاختبارات</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>الدروس</span>
                      </div>
                      <p className="text-lg font-semibold">
                        {course.completedLessons}/{course.totalLessons}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>الواجبات</span>
                      </div>
                      <p className="text-lg font-semibold">
                        {course.completedAssignments}/{course.totalAssignments}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>ساعات التعلم</span>
                      </div>
                      <p className="text-lg font-semibold">{course.timeSpent}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>الانتهاء المتوقع</span>
                      </div>
                      <p className="text-sm font-medium">{course.expectedCompletion}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-warning" />
            <h2 className="text-xl font-semibold">الإنجازات</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id} className="lems-card">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-education-primary">
                        {achievement.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category === 'course' ? 'كورس' :
                         achievement.category === 'quiz' ? 'اختبار' :
                         achievement.category === 'assignment' ? 'واجب' : 'سلوك'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      <span>تم الإنجاز في {achievement.unlockedDate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <Card className="lems-card">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">مخطط التقدم الأسبوعي</h3>
            </div>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">مخطط التقدم سيظهر هنا</p>
                <p className="text-sm text-muted-foreground">يتضمن إحصائيات التعلم اليومية والأسبوعية</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Progress;