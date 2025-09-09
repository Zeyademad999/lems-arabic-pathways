import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ProgressionService } from '@/lib/progressionService';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  RotateCcw,
  Send,
  ArrowLeft,
  Unlock
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  duration: number; // in minutes
  attempts: number;
  maxAttempts: number;
  minimumScore: number;
  sectionTitle: string;
}

// Mock quiz data
const mockQuiz: Quiz = {
  id: '1',
  title: 'اختبار: مقدمة في اللوجستيات',
  description: 'اختبار شامل يغطي المفاهيم الأساسية في اللوجستيات وأهميتها في الاقتصاد الحديث',
  duration: 20,
  attempts: 0,
  maxAttempts: 3,
  minimumScore: 70,
  sectionTitle: 'مقدمة في اللوجستيات',
  questions: [
    {
      id: '1',
      type: 'multiple_choice',
      question: 'ما هو التعريف الأدق للوجستيات؟',
      options: [
        'علم النقل والشحن فقط',
        'إدارة تدفق البضائع والمعلومات من المنشأ إلى الاستهلاك',
        'إدارة المخازن والمستودعات',
        'تسويق المنتجات والخدمات'
      ],
      correctAnswer: 1,
      explanation: 'اللوجستيات هي علم إدارة تدفق البضائع والمعلومات والموارد من نقطة المنشأ إلى نقطة الاستهلاك.',
      points: 5
    },
    {
      id: '2',
      type: 'true_false',
      question: 'تشمل اللوجستيات فقط النقل والتوزيع.',
      correctAnswer: 0,
      explanation: 'اللوجستيات تشمل أيضاً إدارة المخازن، المخزون، خدمة العملاء، ومعالجة الطلبات.',
      points: 3
    },
    {
      id: '3',
      type: 'multiple_choice',
      question: 'أي من العناصر التالية ليس من العناصر الأساسية للوجستيات؟',
      options: [
        'النقل والتوزيع',
        'إدارة المخازن',
        'التسويق الرقمي',
        'إدارة المخزون'
      ],
      correctAnswer: 2,
      explanation: 'التسويق الرقمي ليس جزءاً من العناصر الأساسية للوجستيات.',
      points: 4
    },
    {
      id: '4',
      type: 'multiple_choice',
      question: 'ما هي الفائدة الرئيسية للوجستيات في الشركات؟',
      options: [
        'زيادة عدد الموظفين',
        'تقليل التكاليف وتحسين الكفاءة',
        'زيادة سعر المنتجات',
        'تعقيد العمليات'
      ],
      correctAnswer: 1,
      explanation: 'اللوجستيات تساعد في تقليل التكاليف وتحسين كفاءة العمليات وزيادة رضا العملاء.',
      points: 4
    },
    {
      id: '5',
      type: 'true_false',
      question: 'يمكن للشركات الصغيرة الاستغناء عن تطبيق مبادئ اللوجستيات.',
      correctAnswer: 0,
      explanation: 'حتى الشركات الصغيرة تحتاج لتطبيق مبادئ اللوجستيات لتحسين عملياتها وخفض التكاليف.',
      points: 4
    }
  ]
};

const QuizTaking = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<{ [questionId: string]: any }>({});
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [unlockedNext, setUnlockedNext] = React.useState(false);

  const quiz = mockQuiz;

  React.useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.duration * 60); // Convert minutes to seconds
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    setShowResults(true);

    // Update progression using the service
    if (courseId && quizId) {
      const passed = ProgressionService.completeQuiz(courseId, quizId, finalScore, quiz.minimumScore);
      
      if (passed) {
        setUnlockedNext(true);
        toast({
          title: "مبروك! نجحت في الاختبار",
          description: "تم فتح القسم التالي من الكورس",
        });
      } else {
        toast({
          title: "يمكنك إعادة المحاولة",
          description: `تحتاج ${quiz.minimumScore}% على الأقل للنجاح`,
          variant: "destructive"
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const isPassed = score >= quiz.minimumScore;

  if (!quizStarted) {
    return (
      <LEMSLayout userRole="student">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary">الكورسات</Link>
            <ArrowRight className="h-4 w-4" />
            <Link to={`/courses/${courseId}`} className="hover:text-primary">أساسيات اللوجستيات</Link>
            <ArrowRight className="h-4 w-4" />
            <span>{quiz.title}</span>
          </div>

          {/* Quiz Introduction */}
          <Card className="lems-card">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-education-primary">
                  {quiz.title}
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {quiz.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">سؤال</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.duration}</div>
                  <div className="text-sm text-muted-foreground">دقيقة</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.minimumScore}%</div>
                  <div className="text-sm text-muted-foreground">الحد الأدنى</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.attempts + 1}/{quiz.maxAttempts}</div>
                  <div className="text-sm text-muted-foreground">محاولة</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">تعليمات الاختبار:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• اقرأ كل سؤال بعناية قبل الإجابة</li>
                  <li>• يمكنك التنقل بين الأسئلة باستخدام أزرار التالي والسابق</li>
                  <li>• تأكد من الإجابة على جميع الأسئلة قبل التسليم</li>
                  <li>• سيتم إرسال الاختبار تلقائياً عند انتهاء الوقت</li>
                  <li>• النجاح يتطلب الحصول على {quiz.minimumScore}% على الأقل</li>
                </ul>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={startQuiz}
                  className="lems-button-primary px-8"
                >
                  بدء الاختبار
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </LEMSLayout>
    );
  }

  if (showResults) {
    return (
      <LEMSLayout userRole="student">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Results */}
          <Card className="lems-card">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                  isPassed ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {isPassed ? (
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  ) : (
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-education-primary mb-2">
                    {isPassed ? 'مبروك! نجحت في الاختبار' : 'للأسف، لم تحقق الدرجة المطلوبة'}
                  </h1>
                  <p className="text-muted-foreground">
                    {isPassed 
                      ? 'تم فتح القسم التالي من الكورس'
                      : `تحتاج ${quiz.minimumScore}% على الأقل للنجاح`
                    }
                  </p>
                </div>

                <div className="text-6xl font-bold">
                  <span className={isPassed ? 'text-success' : 'text-destructive'}>
                    {score}%
                  </span>
                </div>

                {/* Unlock notification */}
                {unlockedNext && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-3 justify-center">
                      <Unlock className="h-6 w-6 text-success" />
                      <div>
                        <p className="font-semibold text-success">تم فتح محتوى جديد!</p>
                        <p className="text-sm text-success/80">يمكنك الآن الوصول إلى القسم التالي</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{answeredQuestions}/{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">أسئلة مجابة</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{quiz.attempts + 1}/{quiz.maxAttempts}</div>
                  <div className="text-sm text-muted-foreground">محاولة</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{quiz.minimumScore}%</div>
                  <div className="text-sm text-muted-foreground">مطلوب للنجاح</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button 
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="lems-button-primary"
                >
                  {isPassed ? 'استكشاف المحتوى الجديد' : 'العودة للكورس'}
                </Button>
                
                {!isPassed && quiz.attempts + 1 < quiz.maxAttempts && (
                  <Button 
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    <RotateCcw className="h-4 w-4 ml-2" />
                    إعادة المحاولة
                  </Button>
                )}

                {isPassed && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/quiz/${quizId}/results`)}
                  >
                    عرض النتائج التفصيلية
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </LEMSLayout>
    );
  }

  return (
    <LEMSLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-education-primary">
              {quiz.title}
            </h1>
            <p className="text-muted-foreground">{quiz.sectionTitle}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-destructive">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline">
              {currentQuestion + 1} من {quiz.questions.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>التقدم</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 font-semibold">
                  {currentQuestion + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold leading-relaxed">
                    {currentQuestionData.question}
                  </h2>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {currentQuestionData.points} نقاط
                  </div>
                </div>
              </div>

              {/* Answer Options */}
              <div className="mr-12 space-y-3">
                {currentQuestionData.type === 'multiple_choice' && currentQuestionData.options && (
                  <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => (
                      <label 
                        key={index}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent"
                      >
                        <input
                          type="radio"
                          name={currentQuestionData.id}
                          value={index}
                          checked={answers[currentQuestionData.id] === index}
                          onChange={(e) => handleAnswerChange(currentQuestionData.id, parseInt(e.target.value))}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestionData.type === 'true_false' && (
                  <div className="space-y-3">
                    {['صحيح', 'خطأ'].map((option, index) => (
                      <label 
                        key={index}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent"
                      >
                        <input
                          type="radio"
                          name={currentQuestionData.id}
                          value={index}
                          checked={answers[currentQuestionData.id] === index}
                          onChange={(e) => handleAnswerChange(currentQuestionData.id, parseInt(e.target.value))}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            السابق
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              تم الإجابة على {answeredQuestions} من {quiz.questions.length} أسئلة
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={answeredQuestions < quiz.questions.length}
                className="lems-button-primary"
              >
                <Send className="h-4 w-4 ml-2" />
                إرسال الاختبار
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestionData.id]}
              >
                <ArrowLeft className="h-4 w-4 ml-2" />
                التالي
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="font-semibold">نظرة عامة على الأسئلة</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-primary text-primary-foreground'
                      : answers[quiz.questions[index].id] !== undefined
                      ? 'bg-success/10 text-success border border-success/20'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default QuizTaking;