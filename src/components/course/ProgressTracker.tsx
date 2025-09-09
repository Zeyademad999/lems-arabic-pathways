import React from 'react';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Award, 
  Clock, 
  Target,
  TrendingUp 
} from 'lucide-react';

interface ProgressTrackerProps {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  completedQuizzes: number;
  totalQuizzes: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  overallProgress,
  completedLessons,
  totalLessons,
  completedQuizzes,
  totalQuizzes
}) => {
  const lessonsProgress = (completedLessons / totalLessons) * 100;
  const quizzesProgress = (completedQuizzes / totalQuizzes) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">تقدمك في الكورس</h3>
      </div>

      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">التقدم الإجمالي</span>
          <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lessons Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium">الدروس</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>مكتملة</span>
              <span className="font-medium">{completedLessons}/{totalLessons}</span>
            </div>
            <Progress value={lessonsProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(lessonsProgress)}% من الدروس مكتملة
            </p>
          </div>
        </div>

        {/* Quizzes Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            <span className="font-medium">الاختبارات</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>مجتازة</span>
              <span className="font-medium">{completedQuizzes}/{totalQuizzes}</span>
            </div>
            <Progress value={quizzesProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(quizzesProgress)}% من الاختبارات مجتازة
            </p>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-success" />
            <span className="font-medium">الوقت المتبقي</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">
                {Math.round(((totalLessons - completedLessons) * 45) / 60)} ساعة تقريباً
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              تقدير بناءً على متوسط مدة الدروس
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-primary" />
          <span className="font-medium">الخطوات التالية</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-primary/5 rounded-lg">
            <p className="font-medium text-primary mb-1">استمر في التعلم</p>
            <p className="text-muted-foreground">
              أكمل الدروس المتبقية لفتح الاختبارات
            </p>
          </div>
          
          <div className="p-3 bg-warning/5 rounded-lg">
            <p className="font-medium text-warning mb-1">اجتز الاختبارات</p>
            <p className="text-muted-foreground">
              احصل على الدرجة المطلوبة لفتح الأقسام التالية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};