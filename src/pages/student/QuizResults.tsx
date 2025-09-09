import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  Trophy,
  RotateCcw,
  Target,
  Clock,
  FileText,
  Eye
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

interface QuizAttempt {
  attemptNumber: number;
  score: number;
  answers: { [questionId: string]: any };
  completedAt: string;
  timeSpent: number; // in seconds
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  course: string;
  questions: QuizQuestion[];
  duration: number;
  maxAttempts: number;
  minimumScore: number;
  attempts: QuizAttempt[];
}

// Mock quiz results data
const mockQuizResults: { [key: string]: Quiz } = {
  '1': {
    id: '1',
    title: 'اختبار أساسيات إدارة المخازن',
    description: 'اختبار شامل حول مفاهيم إدارة المخازن والتخزين',
    course: 'أساسيات اللوجستيات',
    duration: 30,
    maxAttempts: 3,
    minimumScore: 70,
    questions: [
      {
        id: '1',
        type: 'multiple_choice',
        question: 'ما هي الوظيفة الأساسية لإدارة المخازن؟',
        options: [
          'تخزين البضائع فقط',
          'تنظيم وتخزين ومتابعة البضائع',
          'بيع البضائع',
          'نقل البضائع'
        ],
        correctAnswer: 1,
        explanation: 'إدارة المخازن تشمل تنظيم وتخزين ومتابعة البضائع بشكل فعال.',
        points: 5
      },
      {
        id: '2',
        type: 'true_false',
        question: 'يجب تخزين جميع أنواع البضائع في نفس المنطقة.',
        correctAnswer: 0,
        explanation: 'لا، يجب تصنيف البضائع حسب نوعها ومتطلبات التخزين.',
        points: 3
      },
      {
        id: '3',
        type: 'multiple_choice',
        question: 'ما هو نظام FIFO في إدارة المخازن؟',
        options: [
          'أول داخل، أول خارج',
          'آخر داخل، أول خارج',
          'الأغلى أولاً',
          'الأرخص أولاً'
        ],
        correctAnswer: 0,
        explanation: 'FIFO يعني First In First Out - أول داخل، أول خارج.',
        points: 4
      }
    ],
    attempts: [
      {
        attemptNumber: 1,
        score: 75,
        answers: {
          '1': 1,
          '2': 1, // Wrong answer
          '3': 0
        },
        completedAt: '2024-01-15T14:30:00',
        timeSpent: 1200 // 20 minutes
      },
      {
        attemptNumber: 2,
        score: 92,
        answers: {
          '1': 1,
          '2': 0,
          '3': 0
        },
        completedAt: '2024-01-16T10:15:00',
        timeSpent: 900 // 15 minutes
      }
    ]
  }
};

const QuizResults = () => {
  const { quizId } = useParams();
  const quiz = mockQuizResults[quizId || '1'];
  
  if (!quiz) {
    return (
      <LEMSLayout userRole="student">
        <div className="max-w-4xl mx-auto text-center py-12">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">نتائج غير موجودة</h2>
          <p className="text-muted-foreground mb-4">لم يتم العثور على نتائج لهذا الاختبار</p>
          <Button asChild>
            <Link to="/quizzes">العودة للاختبارات</Link>
          </Button>
        </div>
      </LEMSLayout>
    );
  }

  const latestAttempt = quiz.attempts[quiz.attempts.length - 1];
  const bestAttempt = quiz.attempts.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  const isPassed = bestAttempt.score >= quiz.minimumScore;
  const canRetake = quiz.attempts.length < quiz.maxAttempts;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} دقيقة و ${secs} ثانية`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <LEMSLayout userRole="student">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/quizzes" className="hover:text-primary">الاختبارات</Link>
          <ArrowRight className="h-4 w-4" />
          <span>نتائج الاختبار</span>
        </div>

        {/* Results Header */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                isPassed ? 'bg-success/10' : 'bg-destructive/10'
              }`}>
                {isPassed ? (
                  <Trophy className="h-10 w-10 text-success" />
                ) : (
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-education-primary mb-2">
                  {isPassed ? 'مبروك! نجحت في الاختبار' : 'للأسف، لم تحقق الدرجة المطلوبة'}
                </h1>
                <h2 className="text-xl text-muted-foreground mb-2">{quiz.title}</h2>
                <p className="text-sm text-muted-foreground">{quiz.course}</p>
              </div>

              <div className="text-6xl font-bold">
                <span className={isPassed ? 'text-success' : 'text-destructive'}>
                  {bestAttempt.score}%
                </span>
              </div>
              
              <Badge variant={isPassed ? "default" : "destructive"} className="text-sm px-4 py-2">
                {isPassed ? `تجاوزت الحد الأدنى ${quiz.minimumScore}%` : `تحتاج ${quiz.minimumScore}% للنجاح`}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card text-center p-4">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{bestAttempt.score}%</div>
            <div className="text-sm text-muted-foreground">أفضل درجة</div>
          </Card>
          
          <Card className="lems-card text-center p-4">
            <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{quiz.attempts.length}/{quiz.maxAttempts}</div>
            <div className="text-sm text-muted-foreground">المحاولات</div>
          </Card>
          
          <Card className="lems-card text-center p-4">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.floor(latestAttempt.timeSpent / 60)}</div>
            <div className="text-sm text-muted-foreground">دقيقة (آخر محاولة)</div>
          </Card>
          
          <Card className="lems-card text-center p-4">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{quiz.questions.length}</div>
            <div className="text-sm text-muted-foreground">سؤال</div>
          </Card>
        </div>

        {/* Attempts History */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">تاريخ المحاولات</h3>
            <div className="space-y-3">
              {quiz.attempts.map((attempt, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  attempt === bestAttempt ? 'border-success bg-success/5' : 'border-border'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        attempt === bestAttempt ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {attempt.attemptNumber}
                      </div>
                      <div>
                        <div className="font-semibold">المحاولة {attempt.attemptNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(attempt.completedAt)}
                        </div>
                      </div>
                      {attempt === bestAttempt && (
                        <Badge className="bg-success text-white">أفضل محاولة</Badge>
                      )}
                    </div>
                    
                    <div className="text-left">
                      <div className={`text-2xl font-bold ${
                        attempt.score >= quiz.minimumScore ? 'text-success' : 'text-destructive'
                      }`}>
                        {attempt.score}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(attempt.timeSpent)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Progress 
                      value={attempt.score} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Detailed Review (Latest Attempt) */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              مراجعة الإجابات - المحاولة {latestAttempt.attemptNumber}
            </h3>
            
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = latestAttempt.answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={`border rounded-lg p-4 ${
                    isCorrect ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCorrect ? 'bg-success text-white' : 'bg-destructive text-white'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">
                              السؤال {index + 1}: {question.question}
                            </h4>
                            <div className="text-sm">
                              <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                                {isCorrect ? question.points : 0}/{question.points} نقاط
                              </span>
                            </div>
                          </div>
                          
                          {question.type === 'multiple_choice' && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optIndex) => {
                                const isUserAnswer = userAnswer === optIndex;
                                const isCorrectAnswer = question.correctAnswer === optIndex;
                                
                                return (
                                  <div key={optIndex} className={`p-2 rounded text-sm ${
                                    isCorrectAnswer ? 'bg-success/10 border border-success/20' :
                                    isUserAnswer ? 'bg-destructive/10 border border-destructive/20' :
                                    'bg-muted/20'
                                  }`}>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">
                                        {String.fromCharCode(65 + optIndex)}.
                                      </span>
                                      <span>{option}</span>
                                      {isCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
                                      {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-destructive ml-auto" />}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          
                          {question.type === 'true_false' && (
                            <div className="space-y-2">
                              {['صحيح', 'خطأ'].map((option, optIndex) => {
                                const isUserAnswer = userAnswer === optIndex;
                                const isCorrectAnswer = question.correctAnswer === optIndex;
                                
                                return (
                                  <div key={optIndex} className={`p-2 rounded text-sm ${
                                    isCorrectAnswer ? 'bg-success/10 border border-success/20' :
                                    isUserAnswer ? 'bg-destructive/10 border border-destructive/20' :
                                    'bg-muted/20'
                                  }`}>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">
                                        {optIndex === 0 ? 'أ' : 'ب'}.
                                      </span>
                                      <span>{option}</span>
                                      {isCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
                                      {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-destructive ml-auto" />}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          
                          {question.explanation && (
                            <div className="mt-3 p-3 bg-muted/30 rounded border-r-4 border-primary">
                              <div className="flex items-center gap-2 text-sm">
                                <Eye className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-primary">التفسير:</span>
                              </div>
                              <p className="text-sm mt-1">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link to="/quizzes">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للاختبارات
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/quiz/${quiz.id}/preview`}>
                <Eye className="h-4 w-4 ml-2" />
                معاينة الاختبار
              </Link>
            </Button>
            
            {canRetake && !isPassed && (
              <Button asChild className="lems-button-primary">
                <Link to={`/quiz/${quiz.id}/take`}>
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة المحاولة
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </LEMSLayout>
  );
};

export default QuizResults;