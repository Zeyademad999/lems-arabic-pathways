import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  AlertTriangle,
  Trophy,
  Target,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  QuizScenario,
  QuizAttempt,
  getQuizScenario,
  canRetakeQuiz,
  getQuizStatus,
} from "@/lib/quizScenarios";

interface QuizResultsProps {
  quizId: string;
  onRetake?: () => void;
  onContinue?: () => void;
  onBack?: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  quizId,
  onRetake,
  onContinue,
  onBack,
}) => {
  const quiz = getQuizScenario(quizId);
  const currentAttempt = quiz?.attempts[quiz.attempts.length - 1];
  const quizStatus = getQuizStatus(quizId);
  const canRetake = canRetakeQuiz(quizId);

  if (!quiz || !currentAttempt) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-3xl font-bold text-destructive mb-4">
          خطأ: الاختبار غير موجود
        </h1>
        <p className="text-muted-foreground text-lg text-center">
          الرجاء التأكد من رابط الاختبار أو العودة إلى صفحة الاختبارات.
        </p>
        {onBack && (
          <Button onClick={onBack} className="mt-6">
            العودة للاختبارات
          </Button>
        )}
      </div>
    );
  }

  const isPassed = currentAttempt.passed;
  const score = currentAttempt.score;
  const attemptNumber = currentAttempt.attemptNumber;
  const totalAttempts = quiz.attempts.length;

  const getStatusIcon = () => {
    if (isPassed) {
      return <CheckCircle2 className="h-16 w-16 text-green-500" />;
    } else if (quizStatus === "max-attempts-reached") {
      return <XCircle className="h-16 w-16 text-red-500" />;
    } else {
      return <AlertTriangle className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getStatusMessage = () => {
    if (isPassed) {
      return {
        title: "مبروك! نجحت في الاختبار",
        subtitle: "تم فتح القسم التالي من الكورس",
        color: "text-green-600",
      };
    } else if (quizStatus === "max-attempts-reached") {
      return {
        title: "للأسف، انتهت محاولاتك",
        subtitle: `لقد استنفدت جميع المحاولات المتاحة (${quiz.maxAttempts})`,
        color: "text-red-600",
      };
    } else {
      return {
        title: "للأسف، لم تحقق الدرجة المطلوبة",
        subtitle: `تحتاج ${quiz.minimumScore}% على الأقل للنجاح`,
        color: "text-yellow-600",
      };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">{getStatusIcon()}</div>

        <div>
          <h1 className={`text-3xl font-bold mb-2 ${statusMessage.color}`}>
            {statusMessage.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {statusMessage.subtitle}
          </p>
        </div>
      </div>

      {/* Score Display */}
      <Card className="lems-card">
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold">
            <span className={isPassed ? "text-green-600" : "text-red-600"}>
              {score}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>الدرجة المطلوبة</span>
              <span>{quiz.minimumScore}%</span>
            </div>
            <Progress value={score} className="h-3" max={100} />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>محاولة رقم {attemptNumber}</span>
              <span>
                {totalAttempts} من {quiz.maxAttempts} محاولات
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Attempt History */}
      {quiz.attempts.length > 1 && (
        <Card className="lems-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            تاريخ المحاولات
          </h3>
          <div className="space-y-3">
            {quiz.attempts.map((attempt, index) => (
              <div
                key={attempt.attemptNumber}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  attempt.passed
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      attempt.passed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {attempt.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      محاولة رقم {attempt.attemptNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(attempt.timestamp).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      attempt.passed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {attempt.score}%
                  </p>
                  <Badge
                    variant={attempt.passed ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {attempt.passed ? "نجح" : "فشل"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الأسئلة</p>
              <p className="text-2xl font-bold">{quiz.questions.length}</p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">أفضل درجة</p>
              <p className="text-2xl font-bold">
                {Math.max(...quiz.attempts.map((a) => a.score))}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                المحاولات المستخدمة
              </p>
              <p className="text-2xl font-bold">
                {totalAttempts}/{quiz.maxAttempts}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للكورس
          </Button>
        )}

        {!isPassed && canRetake && onRetake && (
          <Button
            onClick={onRetake}
            className="lems-button-primary flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
        )}

        {isPassed && onContinue && (
          <Button
            onClick={onContinue}
            className="lems-button-primary flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            استكشاف المحتوى الجديد
          </Button>
        )}

        {!isPassed && !canRetake && (
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              انتهت جميع المحاولات المتاحة
            </p>
            <p className="text-sm text-muted-foreground">
              يرجى التواصل مع المحاضر للحصول على مساعدة إضافية
            </p>
          </div>
        )}
      </div>

      {/* Study Tips for Failed Attempts */}
      {!isPassed && (
        <Card className="lems-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            نصائح للتحسين
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• راجع المواد الدراسية بعناية قبل المحاولة التالية</p>
            <p>• ركز على النقاط التي أخطأت فيها في المحاولات السابقة</p>
            <p>• استخدم التلميحات والمراجع المتاحة</p>
            <p>• خذ وقتك في قراءة الأسئلة وفهمها جيداً</p>
            {quizStatus === "max-attempts-reached" && (
              <p className="text-red-600 font-medium">
                • يرجى التواصل مع المحاضر للحصول على دعم إضافي
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
