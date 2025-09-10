import React from "react";
import { useParams, Link } from "react-router-dom";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Removed scenario imports - using simple mock data for preview
import {
  ArrowRight,
  Clock,
  FileText,
  Award,
  Play,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  question: string;
  options?: string[];
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  course: string;
  questions: QuizQuestion[];
  duration: number;
  attempts: number;
  maxAttempts: number;
  minimumScore: number;
  difficulty: "سهل" | "متوسط" | "صعب";
  type: "تدريبي" | "تقييمي" | "نهائي";
  dueDate: string;
}

// Mock quiz data - in real app this would come from API
const mockQuizzes: { [key: string]: Quiz } = {
  "1": {
    id: "1",
    title: "اختبار: مقدمة في اللوجستيات",
    description:
      "اختبار شامل يغطي المفاهيم الأساسية في اللوجستيات وأهميتها في الاقتصاد الحديث",
    course: "أساسيات اللوجستيات",
    duration: 20,
    attempts: 0,
    maxAttempts: 3,
    minimumScore: 70,
    difficulty: "متوسط",
    type: "تقييمي",
    dueDate: "2024-01-25",
    questions: [
      {
        id: "1",
        type: "multiple_choice",
        question: "ما هو التعريف الأدق للوجستيات؟",
        options: [
          "علم النقل والشحن فقط",
          "إدارة تدفق البضائع والمعلومات من المنشأ إلى الاستهلاك",
          "إدارة المخازن والمستودعات",
          "تسويق المنتجات والخدمات",
        ],
        points: 5,
      },
      {
        id: "2",
        type: "true_false",
        question: "تشمل اللوجستيات فقط النقل والتوزيع.",
        points: 3,
      },
      {
        id: "3",
        type: "multiple_choice",
        question: "أي من العناصر التالية ليس من العناصر الأساسية للوجستيات؟",
        options: [
          "النقل والتوزيع",
          "إدارة المخازن",
          "التسويق الرقمي",
          "إدارة المخزون",
        ],
        points: 4,
      },
      {
        id: "4",
        type: "multiple_choice",
        question: "ما هي الفائدة الرئيسية للوجستيات في الشركات؟",
        options: [
          "زيادة عدد الموظفين",
          "تقليل التكاليف وتحسين الكفاءة",
          "زيادة سعر المنتجات",
          "تعقيد العمليات",
        ],
        points: 4,
      },
      {
        id: "5",
        type: "true_false",
        question: "يمكن للشركات الصغيرة الاستغناء عن تطبيق مبادئ اللوجستيات.",
        points: 4,
      },
    ],
  },
  "2": {
    id: "2",
    title: "مراجعة سلسلة التوريد",
    description: "أسئلة تدريبية حول مفاهيم سلسلة التوريد والشراكات اللوجستية",
    course: "أساسيات اللوجستيات",
    duration: 20,
    attempts: 0,
    maxAttempts: 5,
    minimumScore: 60,
    difficulty: "سهل",
    type: "تدريبي",
    dueDate: "2024-01-30",
    questions: [
      {
        id: "1",
        type: "multiple_choice",
        question: "ما هي سلسلة التوريد؟",
        options: [
          "شبكة الموردين والموزعين",
          "قسم واحد في الشركة",
          "نوع من أنواع النقل",
          "برنامج كمبيوتر",
        ],
        points: 4,
      },
    ],
  },
};

const QuizPreview = () => {
  const { quizId } = useParams();

  // Use mock quiz data for preview (scenarios are for results only)
  const quiz = mockQuizzes[quizId || "1"];

  // Simple attempt display - just show current attempt from quiz data
  const currentAttempt = quiz.attempts + 1;

  if (!quiz) {
    return (
      <LEMSLayout userRole="student">
        <div className="max-w-4xl mx-auto text-center py-12">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">اختبار غير موجود</h2>
          <p className="text-muted-foreground mb-4">
            الاختبار المطلوب غير متاح
          </p>
          <Button asChild>
            <Link to="/quizzes">العودة للاختبارات</Link>
          </Button>
        </div>
      </LEMSLayout>
    );
  }

  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "سهل":
        return "text-success bg-success/10";
      case "متوسط":
        return "text-warning bg-warning/10";
      case "صعب":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "تدريبي":
        return "text-success bg-success/10";
      case "تقييمي":
        return "text-warning bg-warning/10";
      case "نهائي":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <LEMSLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/quizzes" className="hover:text-primary">
            الاختبارات
          </Link>
          <ArrowRight className="h-4 w-4" />
          <span>معاينة الاختبار</span>
        </div>

        {/* Quiz Header */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Eye className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-education-primary mb-2">
                  {quiz.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {quiz.description}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {quiz.course}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Badge className={getDifficultyColor(quiz.difficulty)}>
                {quiz.difficulty}
              </Badge>
              <Badge className={getTypeColor(quiz.type)}>{quiz.type}</Badge>
            </div>
          </div>
        </Card>

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="lems-card text-center p-4">
            <div className="text-primary text-lg mb-2">📝</div>
            <div className="text-2xl font-bold text-primary">
              {currentAttempt}/{quiz.maxAttempts}
            </div>
            <div className="text-sm text-muted-foreground">محاولة</div>
          </Card>

          <Card className="lems-card text-center p-4">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">
              {quiz.minimumScore}%
            </div>
            <div className="text-sm text-muted-foreground">الحد الأدنى</div>
          </Card>

          <Card className="lems-card text-center p-4">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">
              {quiz.duration}
            </div>
            <div className="text-sm text-muted-foreground">دقيقة</div>
          </Card>

          <Card className="lems-card text-center p-4">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">
              {quiz.questions.length}
            </div>
            <div className="text-sm text-muted-foreground">سؤال</div>
          </Card>
        </div>

        {/* Quiz Instructions */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              تعليمات الاختبار
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>اقرأ كل سؤال بعناية قبل الإجابة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  يمكنك التنقل بين الأسئلة باستخدام أزرار التالي والسابق
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>تأكد من الإجابة على جميع الأسئلة قبل التسليم</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  سيتم إرسال الاختبار تلقائياً عند انتهاء الوقت المحدد (
                  {quiz.duration} دقيقة)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  تحتاج للحصول على {quiz.minimumScore}% على الأقل للنجاح
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  لديك {quiz.maxAttempts - quiz.attempts} محاولات متبقية
                </span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Questions Preview */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              معاينة الأسئلة ({quiz.questions.length})
            </h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {question.type === "multiple_choice"
                          ? "اختيار متعدد"
                          : question.type === "true_false"
                          ? "صح/خطأ"
                          : "ملء الفراغ"}{" "}
                        •{question.points} نقاط
                      </div>
                    </div>
                  </div>

                  {question.options && (
                    <div className="mr-9 space-y-1">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className="text-sm text-muted-foreground"
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "true_false" && (
                    <div className="mr-9 space-y-1 text-sm text-muted-foreground">
                      <div>أ. صحيح</div>
                      <div>ب. خطأ</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/student/courses">
                <ArrowRight className="h-4 w-4 ml-2" />
                العودة للكورسات
              </Link>
            </Button>
          </div>

          <Button asChild className="lems-button-primary">
            <Link to={`/quiz/${quiz.id}/take`}>
              <Play className="h-4 w-4 ml-2" />
              بدء الاختبار
            </Link>
          </Button>
        </div>
      </div>
    </LEMSLayout>
  );
};

export default QuizPreview;
