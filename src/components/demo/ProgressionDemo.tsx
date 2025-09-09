import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProgressionService } from '@/lib/progressionService';
import { useToast } from '@/hooks/use-toast';
import { 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  Award, 
  Unlock,
  RotateCcw,
  Eye
} from 'lucide-react';

export const ProgressionDemo = () => {
  const { toast } = useToast();
  const [courseProgress, setCourseProgress] = React.useState(null);
  const courseId = '1';

  React.useEffect(() => {
    // Load initial progress
    const progress = ProgressionService.getCourseProgress(courseId);
    setCourseProgress(progress);

    // Listen for progress updates
    const handleProgressUpdate = (event: any) => {
      if (event.detail.courseId === courseId) {
        setCourseProgress(event.detail.progress);
      }
    };

    window.addEventListener('courseProgressUpdate', handleProgressUpdate);
    return () => window.removeEventListener('courseProgressUpdate', handleProgressUpdate);
  }, []);

  const simulateQuizCompletion = (quizId: string, score: number, minimumScore: number) => {
    const passed = ProgressionService.completeQuiz(courseId, quizId, score, minimumScore);
    
    toast({
      title: passed ? "مبروك! نجحت في الاختبار" : "لم تحقق الدرجة المطلوبة",
      description: passed 
        ? "تم فتح القسم التالي من الكورس"
        : `تحتاج ${minimumScore}% على الأقل للنجاح`,
      variant: passed ? "default" : "destructive"
    });
  };

  const simulateLessonCompletion = (sectionId: string, lessonId: string) => {
    ProgressionService.completeLesson(courseId, sectionId, lessonId);
    
    toast({
      title: "تم إكمال الدرس!",
      description: "يمكنك الآن الانتقال إلى الدرس التالي",
    });
  };

  const resetProgress = () => {
    localStorage.removeItem('lems_course_progress');
    const progress = ProgressionService.getCourseProgress(courseId);
    setCourseProgress(progress);
    
    toast({
      title: "تم إعادة تعيين التقدم",
      description: "بدأت من الصفر مرة أخرى",
    });
  };

  if (!courseProgress) return <div>جاري التحميل...</div>;

  const sections = [
    { id: '1', title: 'مقدمة في اللوجستيات', quizId: '1' },
    { id: '2', title: 'إدارة المخازن الحديثة', quizId: '2' },
    { id: '3', title: 'النقل والتوزيع', quizId: '3' },
  ];

  return (
    <Card className="lems-card max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">تجربة نظام التقدم التفاعلي</h2>
          <p className="text-muted-foreground">
            اختبر كيف يعمل نظام فتح المحتوى عند إكمال الاختبارات
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">التقدم الإجمالي</p>
              <p className="text-2xl font-bold">{courseProgress.overallProgress}%</p>
            </div>
            <Progress value={courseProgress.overallProgress} className="flex-1 mx-4" />
            <Button variant="outline" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 ml-2" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const sectionProgress = courseProgress.sections.find(s => s.sectionId === section.id);
            const quizResult = courseProgress.quizResults[section.quizId];
            
            return (
              <Card key={section.id} className={`p-4 ${
                sectionProgress?.unlocked ? 'border-primary/20 bg-primary/5' : 'border-muted bg-muted/20'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        sectionProgress?.completed 
                          ? 'bg-success text-success-foreground'
                          : sectionProgress?.unlocked 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {sectionProgress?.completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : sectionProgress?.unlocked ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {sectionProgress?.unlocked 
                            ? `التقدم: ${sectionProgress.progress}%`
                            : 'مقفل - يجب إكمال القسم السابق'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {quizResult?.passed && (
                        <Badge className="bg-success text-success-foreground">
                          نجح ({quizResult.bestScore}%)
                        </Badge>
                      )}
                      {quizResult && !quizResult.passed && (
                        <Badge variant="destructive">
                          لم ينجح ({quizResult.bestScore}%)
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Lesson Simulation */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">إكمال الدروس</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        disabled={!sectionProgress?.unlocked}
                        onClick={() => simulateLessonCompletion(section.id, `lesson-${section.id}-1`)}
                      >
                        <PlayCircle className="h-4 w-4 ml-2" />
                        محاكاة إكمال درس
                      </Button>
                    </div>

                    {/* Quiz Simulation */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">اختبار القسم</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          disabled={!sectionProgress?.unlocked}
                          onClick={() => simulateQuizCompletion(section.quizId, 85, 70)}
                        >
                          <CheckCircle2 className="h-4 w-4 ml-2" />
                          نجاح (85%)
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          disabled={!sectionProgress?.unlocked}
                          onClick={() => simulateQuizCompletion(section.quizId, 60, 70)}
                        >
                          فشل (60%)
                        </Button>
                      </div>
                    </div>
                  </div>

                  {sectionProgress?.unlocked && !sectionProgress?.completed && (
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 text-primary">
                        <Unlock className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          هذا القسم مفتوح الآن! يمكنك الوصول إلى جميع دروسه واختباراته.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            💡 لاختبار التقدم الحقيقي، انتقل إلى صفحة الكورس وقم بالاختبارات الفعلية
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" asChild>
              <a href="/courses/1">
                <Eye className="h-4 w-4 ml-2" />
                عرض الكورس
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};