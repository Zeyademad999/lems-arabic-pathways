import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Plus,
  Eye,
  Edit,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Play
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: number;
  attempts: number;
  totalStudents: number;
  status: 'active' | 'draft' | 'closed';
  type: 'practice' | 'exam' | 'assessment';
  passingScore: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'اختبار أساسيات اللوجستيات',
    course: 'أساسيات اللوجستيات',
    questions: 20,
    duration: 30,
    attempts: 22,
    totalStudents: 25,
    status: 'active',
    type: 'exam',
    passingScore: 70
  },
  {
    id: '2',
    title: 'تقييم سريع - إدارة المخزون',
    course: 'إدارة المخزون',
    questions: 10,
    duration: 15,
    attempts: 15,
    totalStudents: 18,
    status: 'active',
    type: 'practice',
    passingScore: 60
  },
  {
    id: '3',
    title: 'الاختبار النهائي - النقل البحري',
    course: 'النقل والشحن',
    questions: 35,
    duration: 60,
    attempts: 12,
    totalStudents: 15,
    status: 'closed',
    type: 'exam',
    passingScore: 75
  }
];

const InstructorQuizzes = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      case 'closed':
        return <Badge variant="outline">منتهي</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'exam':
        return <Badge className="bg-red-100 text-red-700">امتحان</Badge>;
      case 'practice':
        return <Badge className="bg-blue-100 text-blue-700">تدريب</Badge>;
      case 'assessment':
        return <Badge className="bg-purple-100 text-purple-700">تقييم</Badge>;
      default:
        return null;
    }
  };

  const getCompletionStatus = (attempts: number, total: number) => {
    const percentage = (attempts / total) * 100;
    if (percentage === 100) return { color: 'text-green-600', icon: CheckCircle };
    if (percentage >= 70) return { color: 'text-blue-600', icon: Users };
    return { color: 'text-orange-500', icon: AlertCircle };
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">إدارة الاختبارات</h1>
            <p className="text-muted-foreground">إنشاء ومتابعة اختبارات الطلاب</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء اختبار جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockQuizzes.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الاختبارات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockQuizzes.filter(q => q.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">اختبارات نشطة</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockQuizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}
                </p>
                <p className="text-sm text-muted-foreground">محاولات الحل</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(mockQuizzes.reduce((sum, quiz) => sum + (quiz.attempts / quiz.totalStudents * 100), 0) / mockQuizzes.length)}%
                </p>
                <p className="text-sm text-muted-foreground">متوسط المشاركة</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="البحث في الاختبارات..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockQuizzes.map((quiz) => {
            const completionStatus = getCompletionStatus(quiz.attempts, quiz.totalStudents);
            const StatusIcon = completionStatus.icon;
            
            return (
              <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(quiz.status)}
                      {getTypeBadge(quiz.type)}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{quiz.course}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{quiz.questions} سؤال</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{quiz.duration} دقيقة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${completionStatus.color}`} />
                      <span className={completionStatus.color}>
                        {quiz.attempts}/{quiz.totalStudents} محاولة
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{quiz.passingScore}% للنجاح</span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(quiz.attempts / quiz.totalStudents) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      معدل المشاركة: {Math.round((quiz.attempts / quiz.totalStudents) * 100)}%
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </InstructorLayout>
  );
};

export default InstructorQuizzes;