import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { ProgressionService } from "@/lib/progressionService";
import { useToast } from "@/hooks/use-toast";
import { useSignOut } from "@/hooks/useSignOut";
import {
  ArrowRight,
  ArrowLeft,
  Download,
  CheckCircle2,
  FileText,
  Clock,
  BookOpen,
  Play,
  Pause,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: "video" | "powerpoint" | "pdf" | "document";
  duration: number;
  completed: boolean;
  videoUrl?: string;
  attachments: string[];
  transcript?: string;
}

// Mock lesson data
const mockLesson: Lesson = {
  id: "1",
  title: "ما هي اللوجستيات؟ - مقدمة شاملة",
  description:
    "في هذا الدرس سنتعرف على تعريف اللوجستيات وأهميتها في الاقتصاد الحديث. سنناقش التطور التاريخي لهذا المجال والدور المحوري الذي تلعبه اللوجستيات في نجاح الشركات والمؤسسات.",
  type: "video",
  duration: 45,
  completed: false,
  videoUrl: "/videos/intro-logistics.mp4",
  attachments: [
    "مقدمة-في-اللوجستيات-عرض-تقديمي.pdf",
    "ملاحظات-الدرس.pdf",
    "مراجع-إضافية.pdf",
  ],
  transcript: `مرحباً بكم في الدرس الأول من كورس أساسيات اللوجستيات.

اللوجستيات هي علم وفن إدارة تدفق البضائع والمعلومات والموارد من نقطة المنشأ إلى نقطة الاستهلاك بهدف تلبية متطلبات العملاء.

تشمل اللوجستيات عدة عناصر أساسية:
1. النقل والتوزيع
2. إدارة المخازن
3. إدارة المخزون
4. خدمة العملاء
5. معالجة الطلبات

في الاقتصاد الحديث، تلعب اللوجستيات دوراً محورياً في:
- تقليل التكاليف
- تحسين الكفاءة
- زيادة رضا العملاء
- تعزيز القدرة التنافسية

سنتناول في الدروس القادمة كل عنصر من هذه العناصر بالتفصيل مع أمثلة عملية من الواقع.`,
};

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useSignOut();
  const [lessonCompleted, setLessonCompleted] = React.useState(false);
  const [showTranscript, setShowTranscript] = React.useState(false);
  const [watchTime, setWatchTime] = React.useState(0);
  const [nextLesson, setNextLesson] = React.useState<string | null>(null);
  const [previousLesson, setPreviousLesson] = React.useState<string | null>(
    null
  );

  // In real app, fetch lesson data based on courseId and lessonId
  const lesson = mockLesson;

  // Mock course structure for navigation
  const mockCourseStructure = {
    sections: [
      {
        id: "1",
        title: "مقدمة في اللوجستيات",
        lessons: [
          { id: "1", title: "ما هي اللوجستيات؟ - مقدمة شاملة" },
          { id: "2", title: "تاريخ تطور اللوجستيات" },
          { id: "3", title: "أهمية اللوجستيات في الاقتصاد الحديث" },
        ],
      },
      {
        id: "2",
        title: "إدارة المخازن",
        lessons: [
          { id: "4", title: "مبادئ إدارة المخازن" },
          { id: "5", title: "أنظمة التخزين الحديثة" },
          { id: "6", title: "إدارة المخزون" },
        ],
      },
    ],
  };

  // Find next and previous lessons
  React.useEffect(() => {
    if (!lessonId) return;

    let foundCurrent = false;
    let prevLessonId: string | null = null;
    let nextLessonId: string | null = null;

    for (const section of mockCourseStructure.sections) {
      for (let i = 0; i < section.lessons.length; i++) {
        const currentLesson = section.lessons[i];

        if (currentLesson.id === lessonId) {
          foundCurrent = true;

          // Set previous lesson
          if (i > 0) {
            prevLessonId = section.lessons[i - 1].id;
          } else {
            // Check previous section's last lesson
            const currentSectionIndex = mockCourseStructure.sections.findIndex(
              (s) => s.id === section.id
            );
            if (currentSectionIndex > 0) {
              const prevSection =
                mockCourseStructure.sections[currentSectionIndex - 1];
              if (prevSection.lessons.length > 0) {
                prevLessonId =
                  prevSection.lessons[prevSection.lessons.length - 1].id;
              }
            }
          }

          // Set next lesson
          if (i < section.lessons.length - 1) {
            nextLessonId = section.lessons[i + 1].id;
          } else {
            // Check next section's first lesson
            const currentSectionIndex = mockCourseStructure.sections.findIndex(
              (s) => s.id === section.id
            );
            if (currentSectionIndex < mockCourseStructure.sections.length - 1) {
              const nextSection =
                mockCourseStructure.sections[currentSectionIndex + 1];
              if (nextSection.lessons.length > 0) {
                nextLessonId = nextSection.lessons[0].id;
              }
            }
          }
          break;
        }
      }
      if (foundCurrent) break;
    }

    setPreviousLesson(prevLessonId);
    setNextLesson(nextLessonId);
  }, [lessonId]);

  // Check if lesson is already completed
  React.useEffect(() => {
    if (courseId && lessonId) {
      const progress = ProgressionService.getCourseProgress(courseId);
      setLessonCompleted(progress.completedLessons.includes(lessonId));
    }
  }, [courseId, lessonId]);

  const handleVideoProgress = (currentTime: number, duration: number) => {
    setWatchTime(currentTime);

    // Mark as completed when 80% watched
    if (currentTime / duration >= 0.8 && !lessonCompleted) {
      handleMarkComplete();
    }
  };

  const handleMarkComplete = () => {
    if (!lessonCompleted && courseId && lessonId) {
      setLessonCompleted(true);

      // Get section ID from lesson ID (assuming lesson IDs map to sections)
      const sectionId = lessonId; // Simplified mapping
      ProgressionService.completeLesson(courseId, sectionId, lessonId);

      toast({
        title: "تم إكمال الدرس!",
        description: "يمكنك الآن الانتقال إلى الدرس التالي",
      });
    }
  };

  const handleDownloadAttachment = (filename: string) => {
    // In real app, trigger file download
    console.log("Downloading:", filename);
  };

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/courses" className="hover:text-primary">
            الكورسات
          </Link>
          <ArrowRight className="h-4 w-4" />
          <Link to={`/courses/${courseId}`} className="hover:text-primary">
            أساسيات اللوجستيات
          </Link>
          <ArrowRight className="h-4 w-4" />
          <span>{lesson.title}</span>
        </div>

        {/* Lesson Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-education-primary">
                {lesson.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl">
                {lesson.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{lesson.duration} دقيقة</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>{lesson.attachments.length} مرفق</span>
                </div>
              </div>
            </div>

            {lessonCompleted && (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">مكتمل</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            {lesson.type === "video" && lesson.videoUrl && (
              <Card className="lems-card overflow-hidden">
                <VideoPlayer
                  videoUrl={lesson.videoUrl}
                  title={lesson.title}
                  onProgress={handleVideoProgress}
                />
              </Card>
            )}

            {/* Lesson Content */}
            <Card className="lems-card">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  محتوى الدرس
                </h3>

                <div className="prose prose-Arabic max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">تقدم المشاهدة</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((watchTime / (lesson.duration * 60)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(watchTime / (lesson.duration * 60)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  {!lessonCompleted && (
                    <Button
                      onClick={handleMarkComplete}
                      className="lems-button-primary"
                    >
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                      تحديد كمكتمل
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setShowTranscript(!showTranscript)}
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    {showTranscript ? "إخفاء النص" : "عرض النص"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Transcript */}
            {showTranscript && lesson.transcript && (
              <Card className="lems-card">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">نص الدرس</h3>
                  <div className="prose prose-Arabic max-w-none">
                    <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                      {lesson.transcript}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Attachments */}
            {lesson.attachments.length > 0 && (
              <Card className="lems-card">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    المرفقات ({lesson.attachments.length})
                  </h4>

                  <div className="space-y-2">
                    {lesson.attachments.map((attachment, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-right h-auto p-3"
                        onClick={() => handleDownloadAttachment(attachment)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <FileText className="h-4 w-4 shrink-0" />
                          <span className="text-xs leading-tight truncate">
                            {attachment}
                          </span>
                          <Download className="h-3 w-3 shrink-0 mr-auto" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation */}
            <Card className="lems-card">
              <div className="space-y-4">
                <h4 className="font-semibold">التنقل</h4>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    disabled={!previousLesson}
                    onClick={() => {
                      if (previousLesson) {
                        navigate(
                          `/student/courses/${courseId}/lessons/${previousLesson}`
                        );
                      }
                    }}
                  >
                    <ArrowRight className="h-4 w-4 ml-2" />
                    الدرس السابق
                  </Button>

                  <Button
                    className="w-full justify-start lems-button-primary"
                    disabled={!lessonCompleted || !nextLesson}
                    onClick={() => {
                      if (nextLesson && lessonCompleted) {
                        navigate(
                          `/student/courses/${courseId}/lessons/${nextLesson}`
                        );
                      }
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 ml-2" />
                    {nextLesson ? "الدرس التالي" : "لا يوجد درس تالي"}
                  </Button>
                </div>

                <div className="pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/student/courses/${courseId}`)}
                  >
                    العودة للكورس
                  </Button>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card className="lems-card">
              <div className="space-y-3">
                <h4 className="font-semibold">التقدم</h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>هذا الدرس</span>
                    <span className={lessonCompleted ? "text-success" : ""}>
                      {lessonCompleted ? "مكتمل" : "قيد التقدم"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {lessonCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      الدرس الأول من القسم الأول
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </LEMSLayout>
  );
};

export default LessonView;
