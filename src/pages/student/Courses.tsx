import React from "react";
import { useNavigate } from "react-router-dom";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { useSignOut } from "@/hooks/useSignOut";
import { getQuizScenario, getQuizStatus } from "@/lib/quizScenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  PlayCircle,
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  Lock,
  Users,
  Target,
  Calendar,
  Download,
  Eye,
  ChevronDown,
  ChevronRight,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: "powerpoint" | "pdf" | "video" | "document";
  duration: number;
  completed: boolean;
  attachments: string[];
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submitted: boolean;
  grade?: number;
  maxGrade: number;
  submissionType: "file" | "text" | "both";
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
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  assignments: Assignment[];
  quizzes: Quiz[];
  progress: number;
  unlocked: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  status: "active" | "completed" | "locked";
  sections: CourseSection[];
  learningOutcomes: string[];
  requirements: string[];
  enrolledDate: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "أساسيات اللوجستيات",
    description: "تعلم المفاهيم الأساسية في إدارة اللوجستيات وسلسلة التوريد",
    instructor: "د. محمد أحمد",
    duration: "6 أسابيع | 40 ساعة",
    progress: 65,
    status: "active",
    enrolledDate: "2024-01-01",
    learningOutcomes: [
      "فهم مبادئ إدارة المخازن",
      "تطبيق أنظمة النقل والتوزيع",
      "إدارة المخزون بكفاءة",
      "تحليل سلسلة التوريد",
    ],
    requirements: [
      "الحد الأدنى للعمر: 18 سنة",
      "معرفة أساسية بالحاسوب",
      "إجادة القراءة والكتابة",
    ],
    sections: [
      {
        id: "1",
        title: "مقدمة في اللوجستيات",
        description: "التعريف بعلم اللوجستيات وأهميته",
        progress: 100,
        unlocked: true,
        lessons: [
          {
            id: "1",
            title: "ما هي اللوجستيات؟",
            type: "powerpoint",
            duration: 45,
            completed: true,
            attachments: ["intro-logistics.pptx", "notes.pdf"],
          },
          {
            id: "2",
            title: "تاريخ وتطور اللوجستيات",
            type: "pdf",
            duration: 30,
            completed: true,
            attachments: ["history.pdf"],
          },
        ],
        assignments: [
          {
            id: "1",
            title: "تقرير عن أهمية اللوجستيات",
            description:
              "اكتب تقريراً مختصراً عن أهمية اللوجستيات في الاقتصاد الحديث",
            dueDate: "2024-01-15",
            submitted: true,
            grade: 85,
            maxGrade: 100,
            submissionType: "file",
          },
        ],
        quizzes: [
          {
            id: "1",
            title: "اختبار المقدمة",
            questions: 10,
            duration: 15,
            attempts: 1,
            maxAttempts: 3,
            bestScore: 90,
            completed: true,
          },
        ],
      },
      {
        id: "2",
        title: "إدارة المخازن",
        description: "أسس ومبادئ إدارة المخازن الحديثة",
        progress: 45,
        unlocked: true,
        lessons: [
          {
            id: "3",
            title: "أنواع المخازن",
            type: "powerpoint",
            duration: 50,
            completed: true,
            attachments: ["warehouse-types.pptx"],
          },
          {
            id: "4",
            title: "تخطيط المخازن",
            type: "video",
            duration: 60,
            completed: false,
            attachments: ["planning-video.mp4", "worksheet.pdf"],
          },
        ],
        assignments: [
          {
            id: "2",
            title: "تصميم مخزن",
            description: "صمم مخطط لمخزن صغير مع تحديد المناطق المختلفة",
            dueDate: "2024-01-25",
            submitted: false,
            maxGrade: 100,
            submissionType: "both",
          },
        ],
        quizzes: [
          {
            id: "2",
            title: "اختبار إدارة المخازن",
            questions: 15,
            duration: 20,
            attempts: 0,
            maxAttempts: 3,
            completed: false,
          },
        ],
      },
      {
        id: "3",
        title: "النقل والتوزيع",
        description: "أنظمة النقل ووسائل التوزيع",
        progress: 0,
        unlocked: false,
        lessons: [
          {
            id: "5",
            title: "وسائل النقل",
            type: "powerpoint",
            duration: 40,
            completed: false,
            attachments: [],
          },
        ],
        assignments: [],
        quizzes: [],
      },
    ],
  },
  {
    id: "2",
    title: "التدريب السلوكي المهني",
    description: "تطوير المهارات السلوكية والمهنية في بيئة العمل",
    instructor: "أ. فاطمة علي",
    duration: "4 أسابيع | 25 ساعة",
    progress: 80,
    status: "active",
    enrolledDate: "2024-01-08",
    learningOutcomes: [
      "آداب التعامل في العمل",
      "مهارات التواصل الفعال",
      "العمل الجماعي",
      "الانضباط المهني",
    ],
    requirements: ["لا توجد متطلبات خاصة"],
    sections: [
      {
        id: "4",
        title: "آداب العمل",
        description: "تعلم الآداب الأساسية في بيئة العمل",
        progress: 100,
        unlocked: true,
        lessons: [
          {
            id: "6",
            title: "الحضور والالتزام",
            type: "powerpoint",
            duration: 35,
            completed: true,
            attachments: ["attendance.pptx"],
          },
        ],
        assignments: [],
        quizzes: [
          {
            id: "3",
            title: "اختبار آداب العمل",
            questions: 12,
            duration: 15,
            attempts: 1,
            maxAttempts: 2,
            bestScore: 95,
            completed: true,
          },
        ],
      },
    ],
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const { signOut } = useSignOut();
  const [expandedCourse, setExpandedCourse] = React.useState<string | null>(
    null
  );
  const [expandedSection, setExpandedSection] = React.useState<string | null>(
    null
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="lems-badge-success">نشط</Badge>;
      case "completed":
        return <Badge className="lems-badge-success">مكتمل</Badge>;
      case "locked":
        return <Badge className="lems-badge-locked">مقفل</Badge>;
      default:
        return null;
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "powerpoint":
        return <FileText className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">كورساتي</h1>
          <p className="text-muted-foreground">
            تصفح الكورسات المسجل بها وتابع تقدمك التعليمي
          </p>
        </div>

        {/* Courses Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockCourses.length}</p>
                <p className="text-sm text-muted-foreground">كورسات مسجلة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(
                    mockCourses.reduce(
                      (sum, course) => sum + course.progress,
                      0
                    ) / mockCourses.length
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground">متوسط التقدم</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockCourses.filter((c) => c.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">كورسات نشطة</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {mockCourses.map((course) => (
            <Card key={course.id} className="lems-card">
              <div className="space-y-4">
                {/* Course Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-education-primary">
                        {course.title}
                      </h3>
                      {getStatusBadge(course.status)}
                    </div>

                    <p className="text-muted-foreground">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>بدأت في {course.enrolledDate}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم العام</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="lems-button-primary"
                      onClick={() => navigate(`/student/courses/${course.id}`)}
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      دخول الكورس
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setExpandedCourse(
                          expandedCourse === course.id ? null : course.id
                        )
                      }
                      className="flex items-center gap-2"
                    >
                      {expandedCourse === course.id ? (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          إخفاء التفاصيل
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-4 w-4" />
                          عرض التفاصيل
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Course Content */}
                {expandedCourse === course.id && (
                  <div className="space-y-6 pt-4 border-t border-border">
                    {/* Learning Outcomes & Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">مخرجات التعلم</h4>
                        <ul className="space-y-2">
                          {course.learningOutcomes.map((outcome, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">المتطلبات</h4>
                        <ul className="space-y-2">
                          {course.requirements.map((requirement, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Course Sections */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">أقسام الكورس</h4>

                      {course.sections.map((section) => (
                        <Card
                          key={section.id}
                          className={`border ${
                            section.unlocked
                              ? "border-border"
                              : "border-muted bg-muted/20"
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {section.unlocked ? (
                                  <CheckCircle2 className="h-5 w-5 text-success" />
                                ) : (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                )}
                                <div>
                                  <h5 className="font-semibold">
                                    {section.title}
                                  </h5>
                                  <p className="text-sm text-muted-foreground">
                                    {section.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-sm font-medium">
                                    {section.progress}%
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    مكتمل
                                  </p>
                                </div>

                                {section.unlocked && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      setExpandedSection(
                                        expandedSection === section.id
                                          ? null
                                          : section.id
                                      )
                                    }
                                  >
                                    {expandedSection === section.id ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Section Content */}
                            {expandedSection === section.id &&
                              section.unlocked && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                  {/* Lessons */}
                                  {section.lessons.length > 0 && (
                                    <div>
                                      <h6 className="font-medium mb-3 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        الدروس ({section.lessons.length})
                                      </h6>
                                      <div className="space-y-2">
                                        {section.lessons.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                                          >
                                            <div className="flex items-center gap-3">
                                              {lesson.completed ? (
                                                <CheckCircle2 className="h-4 w-4 text-success" />
                                              ) : (
                                                getLessonIcon(lesson.type)
                                              )}
                                              <div>
                                                <p className="font-medium text-sm">
                                                  {lesson.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                  {lesson.duration} دقيقة
                                                </p>
                                              </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                              {lesson.attachments.length >
                                                0 && (
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                >
                                                  <Download className="h-3 w-3 ml-1" />
                                                  المرفقات
                                                </Button>
                                              )}
                                              <Button
                                                size="sm"
                                                className="lems-button-primary"
                                              >
                                                <Eye className="h-3 w-3 ml-1" />
                                                {lesson.completed
                                                  ? "مراجعة"
                                                  : "بدء"}
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Assignments */}
                                  {section.assignments.length > 0 && (
                                    <div>
                                      <h6 className="font-medium mb-3 flex items-center gap-2">
                                        <Upload className="h-4 w-4" />
                                        الواجبات ({section.assignments.length})
                                      </h6>
                                      <div className="space-y-2">
                                        {section.assignments.map(
                                          (assignment) => (
                                            <div
                                              key={assignment.id}
                                              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                                            >
                                              <div className="flex items-center gap-3">
                                                {assignment.submitted ? (
                                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                                ) : (
                                                  <Upload className="h-4 w-4 text-warning" />
                                                )}
                                                <div>
                                                  <p className="font-medium text-sm">
                                                    {assignment.title}
                                                  </p>
                                                  <p className="text-xs text-muted-foreground">
                                                    موعد التسليم:{" "}
                                                    {assignment.dueDate}
                                                  </p>
                                                  {assignment.grade && (
                                                    <p className="text-xs text-success">
                                                      الدرجة: {assignment.grade}
                                                      /{assignment.maxGrade}
                                                    </p>
                                                  )}
                                                </div>
                                              </div>

                                              <Button
                                                size="sm"
                                                className="lems-button-primary"
                                              >
                                                {assignment.submitted
                                                  ? "عرض التفاصيل"
                                                  : "إرسال الحل"}
                                              </Button>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Quizzes */}
                                  {section.quizzes.length > 0 && (
                                    <div>
                                      <h6 className="font-medium mb-3 flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        الاختبارات ({section.quizzes.length})
                                      </h6>
                                      <div className="space-y-2">
                                        {section.quizzes.map((quiz) => {
                                          // Get quiz scenario data
                                          const quizScenario = getQuizScenario(
                                            quiz.id
                                          );
                                          const quizStatus = getQuizStatus(
                                            quiz.id
                                          );
                                          const latestAttempt =
                                            quizScenario?.attempts[
                                              quizScenario.attempts.length - 1
                                            ];

                                          const getQuizStatusIcon = () => {
                                            if (quizStatus === "passed") {
                                              return (
                                                <CheckCircle2 className="h-4 w-4 text-success" />
                                              );
                                            } else if (
                                              quizStatus ===
                                              "max-attempts-reached"
                                            ) {
                                              return (
                                                <XCircle className="h-4 w-4 text-red-500" />
                                              );
                                            } else if (
                                              quizStatus === "failed"
                                            ) {
                                              return (
                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                              );
                                            } else {
                                              return (
                                                <FileText className="h-4 w-4 text-primary" />
                                              );
                                            }
                                          };

                                          const getQuizStatusText = () => {
                                            if (quizStatus === "passed") {
                                              return "نجح";
                                            } else if (
                                              quizStatus ===
                                              "max-attempts-reached"
                                            ) {
                                              return "انتهت المحاولات";
                                            } else if (
                                              quizStatus === "failed"
                                            ) {
                                              return "فشل";
                                            } else {
                                              return "لم يبدأ";
                                            }
                                          };

                                          const getQuizButtonText = () => {
                                            if (quizStatus === "passed") {
                                              return "عرض النتائج";
                                            } else if (
                                              quizStatus ===
                                              "max-attempts-reached"
                                            ) {
                                              return "عرض النتائج";
                                            } else if (
                                              quizStatus === "failed"
                                            ) {
                                              return "إعادة المحاولة";
                                            } else {
                                              return "بدء الاختبار";
                                            }
                                          };

                                          return (
                                            <div
                                              key={quiz.id}
                                              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                                            >
                                              <div className="flex items-center gap-3">
                                                {getQuizStatusIcon()}
                                                <div>
                                                  <p className="font-medium text-sm">
                                                    {quiz.title}
                                                  </p>
                                                  <p className="text-xs text-muted-foreground">
                                                    {quiz.questions} سؤال •{" "}
                                                    {quiz.duration} دقيقة
                                                  </p>
                                                  {latestAttempt && (
                                                    <div className="flex items-center gap-2 mt-1">
                                                      <p className="text-xs text-muted-foreground">
                                                        آخر محاولة:{" "}
                                                        {latestAttempt.score}%
                                                      </p>
                                                      <Badge
                                                        variant={
                                                          latestAttempt.passed
                                                            ? "default"
                                                            : "destructive"
                                                        }
                                                        className="text-xs"
                                                      >
                                                        {getQuizStatusText()}
                                                      </Badge>
                                                    </div>
                                                  )}
                                                  {quizScenario &&
                                                    quizScenario.attempts
                                                      .length > 0 && (
                                                      <p className="text-xs text-muted-foreground">
                                                        {
                                                          quizScenario.attempts
                                                            .length
                                                        }{" "}
                                                        من{" "}
                                                        {
                                                          quizScenario.maxAttempts
                                                        }{" "}
                                                        محاولات
                                                      </p>
                                                    )}
                                                </div>
                                              </div>

                                              <Button
                                                size="sm"
                                                className="lems-button-primary"
                                                onClick={() => {
                                                  if (
                                                    quizStatus === "passed" ||
                                                    quizStatus ===
                                                      "max-attempts-reached"
                                                  ) {
                                                    navigate(
                                                      `/quiz/${quiz.id}/results`
                                                    );
                                                  } else {
                                                    navigate(
                                                      `/quiz/${quiz.id}/take`
                                                    );
                                                  }
                                                }}
                                              >
                                                {getQuizButtonText()}
                                              </Button>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LEMSLayout>
  );
};

export default Courses;
