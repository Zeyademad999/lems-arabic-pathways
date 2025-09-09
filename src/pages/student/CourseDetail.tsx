import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseNavigation } from '@/components/course/CourseNavigation';
import { 
  ArrowRight,
  CheckCircle2
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
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          {/* Course Header */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/courses" className="hover:text-primary">الكورسات</Link>
              <ArrowRight className="h-4 w-4" />
              <span>{course.title}</span>
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                  {course.description}
                </p>
                <div className="text-muted-foreground">
                  بواسطة {course.instructor}
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

            {/* Simple Progress */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">تقدمك في الكورس</span>
                <span className="text-2xl font-bold">{course.overallProgress}%</span>
              </div>
              <Progress value={course.overallProgress} className="h-2" />
            </div>
          </div>

          {/* Current Section Content */}
          {currentSection && (
            <div className="space-y-12 mt-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  {currentSection.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {currentSection.description}
                </p>
              </div>

              {/* Section Lessons */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium">
                  الدروس
                </h3>

                <div className="space-y-4">
                  {currentSection.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-6 bg-background border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-lg mb-2">
                            {lesson.title}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {lesson.duration} دقيقة
                          </div>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        variant={lesson.completed ? "outline" : "default"}
                        onClick={() => handleStartLesson(lesson.id)}
                        disabled={!currentSection.unlocked}
                      >
                        {lesson.completed ? 'مراجعة' : 'بدء الدرس'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Quiz */}
              {currentSection.quiz && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium">
                    اختبار القسم
                  </h3>

                  <div className="p-8 bg-background border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <h4 className="font-medium text-xl">
                          {currentSection.quiz.title}
                        </h4>
                        <div className="text-muted-foreground space-y-1">
                          <div>{currentSection.quiz.questions} سؤال • {currentSection.quiz.duration} دقيقة</div>
                          <div>الحد الأدنى للنجاح: {currentSection.quiz.minimumScore}%</div>
                        </div>
                        
                        {currentSection.quiz.bestScore && (
                          <div className="pt-2">
                            <span className="text-sm text-muted-foreground ml-2">أفضل نتيجة:</span>
                            <span className={`text-lg font-bold ${
                              currentSection.quiz.bestScore >= currentSection.quiz.minimumScore 
                                ? 'text-success' 
                                : 'text-destructive'
                            }`}>
                              {currentSection.quiz.bestScore}%
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        size="lg"
                        onClick={() => handleStartQuiz(currentSection.quiz!.id)}
                        disabled={!currentSection.unlocked || currentSection.quiz.attempts >= currentSection.quiz.maxAttempts}
                      >
                        {currentSection.quiz.attempts > 0 ? 'إعادة المحاولة' : 'بدء الاختبار'}
                      </Button>
                    </div>

                    {!currentSection.quiz.passed && currentSection.quiz.attempts > 0 && (
                      <div className="mt-6 p-4 bg-warning/10 rounded-md border-l-4 border-l-warning">
                        <p className="text-sm">
                          يجب الحصول على {currentSection.quiz.minimumScore}% على الأقل للانتقال إلى القسم التالي.
                        </p>
                      </div>
                    )}
                  </div>
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