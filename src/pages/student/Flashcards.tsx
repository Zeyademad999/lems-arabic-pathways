import React from "react";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { useSignOut } from "@/hooks/useSignOut";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FlashcardStudySession } from "@/components/flashcards/FlashcardStudySession";
import { CourseFlashcards, getAllCourses } from "@/lib/flashcardData";
import {
  BookOpen,
  Play,
  Clock,
  Target,
  Trophy,
  Star,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Brain,
  Zap,
  RotateCcw,
} from "lucide-react";

const Flashcards = () => {
  const { signOut } = useSignOut();
  const [selectedCourse, setSelectedCourse] =
    React.useState<CourseFlashcards | null>(null);
  const [studySession, setStudySession] = React.useState<any>(null);
  const [courses] = React.useState<CourseFlashcards[]>(getAllCourses());

  const handleStartStudy = (course: CourseFlashcards) => {
    setSelectedCourse(course);
  };

  const handleSessionComplete = (session: any) => {
    setStudySession(session);
    setSelectedCourse(null);
  };

  const handleExitSession = () => {
    setSelectedCourse(null);
    setStudySession(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    if (progress >= 40) return "text-orange-600";
    return "text-red-600";
  };

  if (selectedCourse) {
    return (
      <LEMSLayout userRole="student" onSignOut={signOut}>
        <FlashcardStudySession
          courseData={selectedCourse}
          onComplete={handleSessionComplete}
          onExit={handleExitSession}
        />
      </LEMSLayout>
    );
  }

  if (studySession) {
    return (
      <LEMSLayout userRole="student" onSignOut={signOut}>
        <div className="space-y-6">
          {/* Session Complete Header */}
          <Card className="lems-card">
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto">
                <Trophy className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-education-primary">
                  مبروك! لقد أكملت الجلسة
                </h1>
                <p className="text-muted-foreground">
                  لقد أنهيت دراسة {studySession.courseName}
                </p>
              </div>
            </div>
          </Card>

          {/* Session Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    البطاقات المتقنة
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {studySession.masteredCards.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    البطاقات المدروسة
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {studySession.studiedCards.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">أطول سلسلة</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {studySession.streak}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={handleExitSession} className="lems-button-primary">
              <BookOpen className="h-4 w-4 ml-2" />
              العودة للكورسات
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const course = courses.find(
                  (c) => c.courseId === studySession.courseId
                );
                if (course) {
                  setSelectedCourse(course);
                  setStudySession(null);
                }
              }}
            >
              <RotateCcw className="h-4 w-4 ml-2" />
              دراسة مرة أخرى
            </Button>
          </div>
        </div>
      </LEMSLayout>
    );
  }

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-education-primary">
                البطاقات التعليمية
              </h1>
              <p className="text-muted-foreground">
                تعلم ومرر المفاهيم الأساسية بطريقة تفاعلية وممتعة
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الكورسات</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي البطاقات</p>
                <p className="text-2xl font-bold">
                  {courses.reduce((sum, course) => sum + course.totalCards, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  البطاقات المتقنة
                </p>
                <p className="text-2xl font-bold">
                  {courses.reduce(
                    (sum, course) => sum + (course.progress?.mastered || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">أطول سلسلة</p>
                <p className="text-2xl font-bold">
                  {Math.max(
                    ...courses.map((course) => course.progress?.streak || 0)
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">اختر كورس للدراسة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const progress = course.progress
                ? Math.round(
                    (course.progress.studied / course.totalCards) * 100
                  )
                : 0;
              const masteryRate = course.progress
                ? Math.round(
                    (course.progress.mastered / course.progress.studied) * 100
                  )
                : 0;

              return (
                <Card
                  key={course.courseId}
                  className="lems-card hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    {/* Course Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-education-primary">
                              {course.courseName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {course.totalCards} بطاقة تعليمية
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {course.categories.length} فئة
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.courseDescription}
                      </p>
                    </div>

                    {/* Progress */}
                    {course.progress && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>التقدم</span>
                          <span className={getProgressColor(progress)}>
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-muted-foreground">مدروس:</span>
                        <span className="font-medium">
                          {course.progress?.studied || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">متقن:</span>
                        <span className="font-medium">
                          {course.progress?.mastered || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span className="text-muted-foreground">
                          معدل الإتقان:
                        </span>
                        <span className="font-medium">{masteryRate}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-orange-500" />
                        <span className="text-muted-foreground">السلسلة:</span>
                        <span className="font-medium">
                          {course.progress?.streak || 0}
                        </span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">الفئات:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.categories
                          .slice(0, 3)
                          .map((category, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                        {course.categories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.categories.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Last Studied */}
                    {course.lastStudied && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        آخر دراسة:{" "}
                        {(() => {
                          const date = new Date(course.lastStudied);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          return `${day}/${month}/${year}`;
                        })()}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => handleStartStudy(course)}
                      className="w-full lems-button-primary"
                    >
                      <Play className="h-4 w-4 ml-2" />
                      بدء الدراسة
                      <ArrowRight className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              نصائح للدراسة الفعالة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-education-primary">
                  استراتيجيات التعلم
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ادرس بانتظام لمدة 15-20 دقيقة يومياً</li>
                  <li>• راجع البطاقات الصعبة أكثر من السهلة</li>
                  <li>• استخدم التلميحات عند الحاجة</li>
                  <li>• قيم صعوبة كل سؤال بصدق</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-education-primary">
                  نصائح للتركيز
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• اختر مكان هادئ للدراسة</li>
                  <li>• تجنب التشتت والهواتف</li>
                  <li>• خذ استراحات قصيرة بين الجلسات</li>
                  <li>• راجع ما تعلمته قبل النوم</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Flashcards;
