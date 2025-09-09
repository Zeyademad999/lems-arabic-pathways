import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CourseNavigation } from '@/components/course/CourseNavigation';
import { ProgressTracker } from '@/components/course/ProgressTracker';
import { 
  PlayCircle, 
  FileText, 
  Clock, 
  Users, 
  Target,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Star
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'powerpoint' | 'pdf' | 'document';
  duration: number;
  completed: boolean;
  videoUrl?: string;
  attachments: string[];
}

interface Quiz {
  id: string;
  title: string;
  questions: number;
  duration: number;
  attempts: number;
  maxAttempts: number;
  bestScore?: number;
  completed: boolean;
  minimumScore: number;
  passed: boolean;
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz?: Quiz;
  progress: number;
  unlocked: boolean;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  totalLessons: number;
  totalQuizzes: number;
  overallProgress: number;
  status: 'active' | 'completed' | 'locked';
  sections: CourseSection[];
  learningOutcomes: string[];
  requirements: string[];
  enrolledDate: string;
  rating: number;
  studentsCount: number;
}

// Mock course data
const mockCourse: Course = {
  id: '1',
  title: 'أساسيات اللوجستيات',
  description: 'دورة شاملة تغطي جميع جوانب إدارة اللوجستيات وسلسلة التوريد من الأساسيات إلى التطبيقات المتقدمة',
  instructor: 'د. محمد أحمد الخبير',
  duration: '6 أسابيع | 40 ساعة',
  totalLessons: 24,
  totalQuizzes: 6,
  overallProgress: 45,
  status: 'active',
  enrolledDate: '2024-01-01',
  rating: 4.8,
  studentsCount: 1250,
  learningOutcomes: [
    'فهم المفاهيم الأساسية لإدارة اللوجستيات',
    'تطبيق مبادئ إدارة المخازن الحديثة',
    'تحليل وتحسين سلسلة التوريد',
    'استخدام تقنيات النقل والتوزيع',
    'إدارة المخزون بكفاءة عالية',
    'تطبيق معايير الجودة والسلامة'
  ],
  requirements: [
    'الحد الأدنى للعمر: 18 سنة',
    'معرفة أساسية بالحاسوب',
    'إجادة القراءة والكتابة باللغة العربية',
    'الرغبة في تعلم مجال اللوجستيات'
  ],
  sections: [
    {
      id: '1',
      title: 'مقدمة في اللوجستيات',
      description: 'التعريف بعلم اللوجستيات، تاريخه، وأهميته في الاقتصاد الحديث',
      progress: 100,
      unlocked: true,
      completed: true,
      lessons: [
        {
          id: '1',
          title: 'ما هي اللوجستيات؟ - مقدمة شاملة',
          type: 'video',
          duration: 45,
          completed: true,
          videoUrl: '/videos/intro-logistics.mp4',
          attachments: ['slides.pdf', 'notes.pdf']
        },
        {
          id: '2',
          title: 'تاريخ وتطور اللوجستيات عبر العصور',
          type: 'video',
          duration: 35,
          completed: true,
          videoUrl: '/videos/history-logistics.mp4',
          attachments: ['timeline.pdf']
        },
        {
          id: '3',
          title: 'أهمية اللوجستيات في الاقتصاد',
          type: 'video',
          duration: 40,
          completed: true,
          videoUrl: '/videos/importance-logistics.mp4',
          attachments: ['economic-impact.pdf']
        }
      ],
      quiz: {
        id: '1',
        title: 'اختبار: مقدمة في اللوجستيات',
        questions: 15,
        duration: 20,
        attempts: 1,
        maxAttempts: 3,
        bestScore: 85,
        completed: true,
        minimumScore: 70,
        passed: true
      }
    },
    {
      id: '2',
      title: 'إدارة المخازن الحديثة',
      description: 'تعلم أسس ومبادئ إدارة المخازن، التخطيط، والتنظيم',
      progress: 60,
      unlocked: true,
      completed: false,
      lessons: [
        {
          id: '4',
          title: 'أنواع المخازن ووظائفها',
          type: 'video',
          duration: 50,
          completed: true,
          videoUrl: '/videos/warehouse-types.mp4',
          attachments: ['warehouse-guide.pdf']
        },
        {
          id: '5',
          title: 'تخطيط وتصميم المخازن',
          type: 'video',
          duration: 55,
          completed: true,
          videoUrl: '/videos/warehouse-planning.mp4',
          attachments: ['planning-templates.pdf', 'design-examples.pdf']
        },
        {
          id: '6',
          title: 'أنظمة إدارة المخازن (WMS)',
          type: 'video',
          duration: 60,
          completed: false,
          videoUrl: '/videos/wms-systems.mp4',
          attachments: ['wms-comparison.pdf']
        }
      ],
      quiz: {
        id: '2',
        title: 'اختبار: إدارة المخازن',
        questions: 20,
        duration: 25,
        attempts: 0,
        maxAttempts: 3,
        completed: false,
        minimumScore: 75,
        passed: false
      }
    },
    {
      id: '3',
      title: 'النقل والتوزيع',
      description: 'استراتيجيات النقل، وسائل التوزيع، وتحسين الشبكات اللوجستية',
      progress: 0,
      unlocked: false,
      completed: false,
      lessons: [
        {
          id: '7',
          title: 'وسائل النقل واختيار الأنسب',
          type: 'video',
          duration: 45,
          completed: false,
          videoUrl: '/videos/transport-modes.mp4',
          attachments: []
        },
        {
          id: '8',
          title: 'تخطيط شبكات التوزيع',
          type: 'video',
          duration: 50,
          completed: false,
          videoUrl: '/videos/distribution-planning.mp4',
          attachments: []
        }
      ],
      quiz: {
        id: '3',
        title: 'اختبار: النقل والتوزيع',
        questions: 18,
        duration: 22,
        attempts: 0,
        maxAttempts: 3,
        completed: false,
        minimumScore: 75,
        passed: false
      }
    }
  ]
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [selectedSection, setSelectedSection] = React.useState<string>('1');
  const [showSidebar, setShowSidebar] = React.useState(true);

  // In real app, fetch course data based on courseId
  const course = mockCourse;

  const currentSection = course.sections.find(s => s.id === selectedSection);
  const completedLessons = course.sections.flatMap(s => s.lessons).filter(l => l.completed).length;
  const completedQuizzes = course.sections.filter(s => s.quiz?.completed).length;

  const handleStartLesson = (lessonId: string) => {
    // Navigate to lesson view
    window.location.href = `/courses/${courseId}/lessons/${lessonId}`;
  };

  const handleStartQuiz = (quizId: string) => {
    // Navigate to quiz
    window.location.href = `/courses/${courseId}/quizzes/${quizId}`;
  };

  return (
    <LEMSLayout userRole="student">
      <div className="flex min-h-screen">
        {/* Course Navigation Sidebar */}
        {showSidebar && (
          <div className="w-80 border-l border-border bg-card">
            <CourseNavigation 
              course={course}
              selectedSection={selectedSection}
              onSectionSelect={setSelectedSection}
              onLessonSelect={handleStartLesson}
              onQuizSelect={handleStartQuiz}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Course Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-primary">الكورسات</Link>
              <ArrowRight className="h-4 w-4" />
              <span>{course.title}</span>
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-education-primary">{course.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{course.rating} ({course.studentsCount} طالب)</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowSidebar(!showSidebar)}
                className="shrink-0"
              >
                {showSidebar ? 'إخفاء القائمة' : 'إظهار القائمة'}
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="lems-card">
            <ProgressTracker 
              overallProgress={course.overallProgress}
              completedLessons={completedLessons}
              totalLessons={course.totalLessons}
              completedQuizzes={completedQuizzes}
              totalQuizzes={course.totalQuizzes}
            />
          </Card>

          {/* Current Section Content */}
          {currentSection && (
            <div className="space-y-6">
              <Card className="lems-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-education-primary">
                        {currentSection.title}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {currentSection.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {currentSection.completed ? (
                        <Badge className="lems-badge-success">مكتمل</Badge>
                      ) : currentSection.unlocked ? (
                        <Badge className="lems-badge-pending">قيد التقدم</Badge>
                      ) : (
                        <Badge className="lems-badge-locked">مقفل</Badge>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {currentSection.progress}%
                        </div>
                        <div className="text-xs text-muted-foreground">التقدم</div>
                      </div>
                    </div>
                  </div>

                  <Progress value={currentSection.progress} className="h-3" />
                </div>
              </Card>

              {/* Section Lessons */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  الدروس ({currentSection.lessons.length})
                </h3>

                <div className="grid gap-4">
                  {currentSection.lessons.map((lesson, index) => (
                    <Card key={lesson.id} className="lems-card hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            ) : currentSection.unlocked ? (
                              <PlayCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="font-semibold">
                              {index + 1}. {lesson.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <PlayCircle className="h-3 w-3" />
                                <span>{lesson.duration} دقيقة</span>
                              </div>
                              {lesson.attachments.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <FileText className="h-3 w-3" />
                                  <span>{lesson.attachments.length} مرفق</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {lesson.completed && (
                            <Badge variant="outline" className="text-success">
                              مكتمل
                            </Badge>
                          )}
                          
                          <Button
                            size="sm"
                            variant={lesson.completed ? "outline" : "default"}
                            onClick={() => handleStartLesson(lesson.id)}
                            disabled={!currentSection.unlocked}
                            className="lems-button-primary"
                          >
                            {lesson.completed ? 'مراجعة' : 'بدء الدرس'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Section Quiz */}
              {currentSection.quiz && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    اختبار القسم
                  </h3>

                  <Card className={`lems-card ${
                    currentSection.quiz.passed ? 'border-success bg-success/5' : 
                    !currentSection.unlocked ? 'border-muted bg-muted/20' : ''
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-lg">
                            {currentSection.quiz.title}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{currentSection.quiz.questions} سؤال</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{currentSection.quiz.duration} دقيقة</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span>الحد الأدنى: {currentSection.quiz.minimumScore}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>{currentSection.quiz.attempts}/{currentSection.quiz.maxAttempts} محاولات</span>
                            </div>
                          </div>
                          
                          {currentSection.quiz.bestScore && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">أفضل درجة:</span>
                              <span className={`font-semibold ${
                                currentSection.quiz.passed ? 'text-success' : 'text-warning'
                              }`}>
                                {currentSection.quiz.bestScore}%
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="text-center space-y-2">
                          {currentSection.quiz.passed ? (
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                              <CheckCircle2 className="h-8 w-8 text-success" />
                            </div>
                          ) : !currentSection.unlocked ? (
                            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
                              <Lock className="h-8 w-8 text-muted-foreground" />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <Award className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          
                          <Button
                            onClick={() => handleStartQuiz(currentSection.quiz!.id)}
                            disabled={!currentSection.unlocked || currentSection.quiz.attempts >= currentSection.quiz.maxAttempts}
                            className="lems-button-primary"
                          >
                            {currentSection.quiz.completed ? 'إعادة المحاولة' : 'بدء الاختبار'}
                          </Button>
                        </div>
                      </div>

                      {!currentSection.quiz.passed && currentSection.quiz.completed && (
                        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                          <p className="text-sm text-warning">
                            <strong>تنبيه:</strong> يجب الحصول على {currentSection.quiz.minimumScore}% على الأقل لفتح القسم التالي
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </LEMSLayout>
  );
};

export default CourseDetail;