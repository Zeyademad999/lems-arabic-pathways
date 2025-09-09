import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Play, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Target,
  Trophy,
  RotateCcw,
  Search,
  Calendar
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  course: string;
  description: string;
  questions: number;
  duration: number; // in minutes
  attempts: number;
  maxAttempts: number;
  bestScore?: number;
  lastAttempt?: string;
  status: 'available' | 'completed' | 'in_progress' | 'locked';
  dueDate: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  type: 'تدريبي' | 'تقييمي' | 'نهائي';
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'اختبار أساسيات إدارة المخازن',
    course: 'أساسيات اللوجستيات',
    description: 'اختبار شامل حول مفاهيم إدارة المخازن والتخزين',
    questions: 20,
    duration: 30,
    attempts: 2,
    maxAttempts: 3,
    bestScore: 85,
    lastAttempt: '2024-01-10',
    status: 'completed',
    dueDate: '2024-01-25',
    difficulty: 'متوسط',
    type: 'تقييمي'
  },
  {
    id: '2',
    title: 'مراجعة سلسلة التوريد',
    course: 'أساسيات اللوجستيات',
    description: 'أسئلة تدريبية حول مفاهيم سلسلة التوريد',
    questions: 15,
    duration: 20,
    attempts: 0,
    maxAttempts: 5,
    status: 'available',
    dueDate: '2024-01-30',
    difficulty: 'سهل',
    type: 'تدريبي'
  },
  {
    id: '3',
    title: 'تقييم السلوك المهني',
    course: 'التدريب السلوكي المهني',
    description: 'اختبار حول آداب وسلوكيات العمل المهني',
    questions: 25,
    duration: 45,
    attempts: 1,
    maxAttempts: 2,
    bestScore: 92,
    lastAttempt: '2024-01-12',
    status: 'completed',
    dueDate: '2024-01-28',
    difficulty: 'متوسط',
    type: 'تقييمي'
  },
  {
    id: '4',
    title: 'الاختبار النهائي - إكسل متقدم',
    course: 'إكسل للمبتدئين',
    description: 'الاختبار النهائي الشامل لكورس الإكسل',
    questions: 30,
    duration: 60,
    attempts: 0,
    maxAttempts: 1,
    status: 'locked',
    dueDate: '2024-02-05',
    difficulty: 'صعب',
    type: 'نهائي'
  },
  {
    id: '5',
    title: 'تدريب على الدوال الأساسية',
    course: 'إكسل للمبتدئين',
    description: 'أسئلة تدريبية حول الدوال الأساسية في الإكسل',
    questions: 10,
    duration: 15,
    attempts: 0,
    maxAttempts: 10,
    status: 'available',
    dueDate: '2024-01-22',
    difficulty: 'سهل',
    type: 'تدريبي'
  }
];

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="lems-badge-success">متاح</Badge>;
      case 'completed':
        return <Badge className="lems-badge-success">مكتمل</Badge>;
      case 'in_progress':
        return <Badge className="lems-badge-pending">قيد التقدم</Badge>;
      case 'locked':
        return <Badge className="lems-badge-locked">مقفل</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Play className="h-4 w-4 text-success" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'locked':
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'تدريبي':
        return 'text-success';
      case 'تقييمي':
        return 'text-warning';
      case 'نهائي':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل':
        return 'text-success';
      case 'متوسط':
        return 'text-warning';
      case 'صعب':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const availableCount = mockQuizzes.filter(q => q.status === 'available').length;
  const completedCount = mockQuizzes.filter(q => q.status === 'completed').length;
  const totalScore = mockQuizzes.filter(q => q.bestScore).reduce((sum, q) => sum + (q.bestScore || 0), 0);
  const avgScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0;

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">الاختبارات</h1>
          <p className="text-muted-foreground">
            اختبر معلوماتك وقيس تقدمك في المواد الدراسية
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{availableCount}</p>
                <p className="text-sm text-muted-foreground">اختبارات متاحة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-muted-foreground">اختبارات مكتملة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgScore}%</p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockQuizzes.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الاختبارات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الاختبارات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lems-input pr-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'available', 'completed', 'locked'].map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status === 'all' ? 'الكل' : 
                 status === 'available' ? 'متاح' :
                 status === 'completed' ? 'مكتمل' : 'مقفل'}
              </Button>
            ))}
          </div>
        </div>

        {/* Upcoming Quizzes Alert */}
        {mockQuizzes.filter(q => q.status === 'available' && new Date(q.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length > 0 && (
          <Card className="lems-card bg-warning/5 border-warning/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-warning">تنبيه: اختبارات قادمة خلال أسبوع</h3>
                <div className="space-y-1">
                  {mockQuizzes
                    .filter(q => q.status === 'available' && new Date(q.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                    .map(quiz => (
                      <p key={quiz.id} className="text-sm text-muted-foreground">
                        • {quiz.title} - موعد الانتهاء: {quiz.dueDate}
                      </p>
                    ))
                  }
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quizzes List */}
        <div className="space-y-4">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="lems-card hover:shadow-lg transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(quiz.status)}
                      <h3 className="font-semibold text-education-primary text-lg">
                        {quiz.title}
                      </h3>
                      {getStatusBadge(quiz.status)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground font-medium">{quiz.course}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{quiz.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className={getTypeColor(quiz.type)}>
                        {quiz.type}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      {new Date(quiz.dueDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && quiz.status === 'available' && (
                        <Badge variant="destructive" className="text-xs">
                          ⏰ عاجل
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-left space-y-2">
                    {quiz.bestScore && (
                      <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                        <p className="text-2xl font-bold text-success">
                          {quiz.bestScore}%
                        </p>
                        <p className="text-xs text-success">أفضل درجة</p>
                        {quiz.bestScore >= 90 && (
                          <Trophy className="h-4 w-4 text-warning mx-auto mt-1" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{quiz.questions} سؤال</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{quiz.duration} دقيقة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                    <span>{quiz.attempts}/{quiz.maxAttempts} محاولات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{quiz.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="text-sm space-y-1">
                    {quiz.lastAttempt && (
                      <p className="text-muted-foreground">آخر محاولة: {quiz.lastAttempt}</p>
                    )}
                    {quiz.attempts >= quiz.maxAttempts && quiz.status !== 'completed' && (
                      <p className="text-destructive text-xs">تم استنفاد جميع المحاولات</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {quiz.status === 'available' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.location.href = `/quiz/${quiz.id}/preview`}
                        >
                          معاينة
                        </Button>
                        <Button 
                          size="sm" 
                          className="lems-button-primary"
                          onClick={() => window.location.href = `/quiz/${quiz.id}/take`}
                        >
                          <Play className="h-4 w-4 ml-1" />
                          بدء الاختبار
                        </Button>
                      </>
                    )}
                    
                    {quiz.status === 'completed' && quiz.attempts < quiz.maxAttempts && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.location.href = `/quiz/${quiz.id}/retake`}
                      >
                        <RotateCcw className="h-4 w-4 ml-1" />
                        إعادة المحاولة
                      </Button>
                    )}
                    
                    {quiz.status === 'completed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.location.href = `/quiz/${quiz.id}/results`}
                      >
                        <Target className="h-4 w-4 ml-1" />
                        عرض النتائج
                      </Button>
                    )}
                    
                    {quiz.status === 'locked' && (
                      <Button size="sm" disabled variant="outline">
                        <AlertCircle className="h-4 w-4 ml-1" />
                        غير متاح
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              لا توجد اختبارات مطابقة للبحث
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              جرب تغيير معايير البحث أو الفلترة
            </p>
          </div>
        )}
      </div>
    </LEMSLayout>
  );
};

export default Quizzes;