import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
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
  Play,
  Save,
  X,
  Trash2,
  Copy,
  Download,
  Upload,
  Settings,
  HelpCircle,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  description?: string;
  course: string;
  questions: Question[];
  duration: number;
  attempts: number;
  totalStudents: number;
  status: 'active' | 'draft' | 'closed';
  type: 'practice' | 'exam' | 'assessment';
  passingScore: number;
  createdDate: string;
  dueDate?: string;
  allowMultipleAttempts: boolean;
  shuffleQuestions: boolean;
  showResults: boolean;
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'اختبار أساسيات اللوجستيات',
    description: 'اختبار شامل يغطي المفاهيم الأساسية في إدارة اللوجستيات',
    course: 'أساسيات اللوجستيات',
    questions: [
      {
        id: 'q1',
        question: 'ما هو تعريف اللوجستيات؟',
        type: 'multiple-choice',
        options: ['إدارة النقل فقط', 'إدارة التخزين فقط', 'إدارة سلسلة التوريد الكاملة', 'إدارة المبيعات'],
        correctAnswer: 'إدارة سلسلة التوريد الكاملة',
        points: 5,
        explanation: 'اللوجستيات تشمل إدارة سلسلة التوريد بأكملها من المورد إلى العميل النهائي'
      },
      {
        id: 'q2',
        question: 'النقل الجوي أسرع من النقل البحري',
        type: 'true-false',
        correctAnswer: 'صحيح',
        points: 3,
        explanation: 'النقل الجوي أسرع لكنه أكثر تكلفة من النقل البحري'
      }
    ],
    duration: 30,
    attempts: 22,
    totalStudents: 25,
    status: 'active',
    type: 'exam',
    passingScore: 70,
    createdDate: '2024-01-15',
    dueDate: '2024-01-30',
    allowMultipleAttempts: false,
    shuffleQuestions: true,
    showResults: true
  },
  {
    id: '2',
    title: 'تقييم سريع - إدارة المخزون',
    description: 'تقييم سريع لقياس فهم مبادئ إدارة المخزون',
    course: 'إدارة المخزون',
    questions: [
      {
        id: 'q3',
        question: 'اذكر ثلاثة أنواع من المخزون',
        type: 'short-answer',
        correctAnswer: 'مخزون المواد الخام، مخزون تحت التشغيل، مخزون البضائع التامة',
        points: 10
      }
    ],
    duration: 15,
    attempts: 15,
    totalStudents: 18,
    status: 'active',
    type: 'practice',
    passingScore: 60,
    createdDate: '2024-01-10',
    allowMultipleAttempts: true,
    shuffleQuestions: false,
    showResults: true
  },
  {
    id: '3',
    title: 'الاختبار النهائي - النقل البحري',
    description: 'الاختبار النهائي لمقرر النقل والشحن البحري',
    course: 'النقل والشحن',
    questions: [],
    duration: 60,
    attempts: 12,
    totalStudents: 15,
    status: 'closed',
    type: 'exam',
    passingScore: 75,
    createdDate: '2024-01-05',
    dueDate: '2024-01-20',
    allowMultipleAttempts: false,
    shuffleQuestions: true,
    showResults: false
  }
];

const InstructorQuizzes = () => {
  const [quizzes, setQuizzes] = React.useState<Quiz[]>(mockQuizzes);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | null>(null);
  const [editingQuiz, setEditingQuiz] = React.useState<Quiz | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  // Filter quizzes based on search and filters
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    const matchesType = typeFilter === 'all' || quiz.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateQuiz = (newQuizData: Partial<Quiz>) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: newQuizData.title || '',
      description: newQuizData.description || '',
      course: newQuizData.course || '',
      questions: [],
      duration: newQuizData.duration || 30,
      attempts: 0,
      totalStudents: 0,
      status: 'draft',
      type: newQuizData.type || 'practice',
      passingScore: newQuizData.passingScore || 60,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newQuizData.dueDate,
      allowMultipleAttempts: newQuizData.allowMultipleAttempts || false,
      shuffleQuestions: newQuizData.shuffleQuestions || false,
      showResults: newQuizData.showResults || true
    };
    
    setQuizzes([...quizzes, newQuiz]);
    setIsCreateModalOpen(false);
    toast({
      title: "تم إنشاء الاختبار بنجاح",
      description: "يمكنك الآن إضافة الأسئلة وتفعيل الاختبار"
    });
  };

  const handleEditQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    ));
    setIsEditModalOpen(false);
    setEditingQuiz(null);
    toast({
      title: "تم تحديث الاختبار بنجاح",
      description: "تم حفظ التغييرات"
    });
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    toast({
      title: "تم حذف الاختبار",
      description: "تم حذف الاختبار بنجاح"
    });
  };

  const handleDuplicateQuiz = (quiz: Quiz) => {
    const duplicatedQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      title: `${quiz.title} - نسخة`,
      status: 'draft',
      attempts: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setQuizzes([...quizzes, duplicatedQuiz]);
    toast({
      title: "تم نسخ الاختبار",
      description: "تم إنشاء نسخة من الاختبار بنجاح"
    });
  };

  const handleViewQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setIsEditModalOpen(true);
  };
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
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير النتائج
            </Button>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء اختبار جديد
                </Button>
              </DialogTrigger>
              <CreateQuizModal onCreate={handleCreateQuiz} onClose={() => setIsCreateModalOpen(false)} />
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredQuizzes.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الاختبارات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredQuizzes.filter(q => q.status === 'active').length}
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
                  {filteredQuizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}
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
                  {filteredQuizzes.length > 0 ? Math.round(filteredQuizzes.reduce((sum, quiz) => sum + (quiz.totalStudents > 0 ? (quiz.attempts / quiz.totalStudents * 100) : 0), 0) / filteredQuizzes.length) : 0}%
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="draft">مسودة</option>
              <option value="closed">منتهي</option>
            </select>
            <select 
              className="px-4 py-2 border rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">جميع الأنواع</option>
              <option value="exam">امتحان</option>
              <option value="practice">تدريب</option>
              <option value="assessment">تقييم</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة متقدمة
            </Button>
          </div>
        </Card>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuizzes.length === 0 ? (
            <div className="lg:col-span-2">
              <Card className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد اختبارات</h3>
                <p className="text-muted-foreground mb-4">لم يتم العثور على اختبارات تطابق البحث</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء اختبار جديد
                </Button>
              </Card>
            </div>
          ) : (
            filteredQuizzes.map((quiz) => {
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
                      {quiz.description && (
                        <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{quiz.questions.length} سؤال</span>
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
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{quiz.passingScore}% للنجاح</span>
                      </div>
                    </div>

                    {quiz.totalStudents > 0 && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(quiz.attempts / quiz.totalStudents) * 100}%` }}
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-xs text-muted-foreground">
                        <p>تم الإنشاء: {quiz.createdDate}</p>
                        {quiz.dueDate && <p>تاريخ الانتهاء: {quiz.dueDate}</p>}
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewQuiz(quiz)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenEditModal(quiz)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateQuiz(quiz)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا الاختبار؟')) {
                              handleDeleteQuiz(quiz.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Modals */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <QuizDetailsModal quiz={selectedQuiz} onClose={() => setIsViewModalOpen(false)} />
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <EditQuizModal 
            quiz={editingQuiz} 
            onSave={handleEditQuiz} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

// Create Quiz Modal Component
const CreateQuizModal: React.FC<{
  onCreate: (quiz: Partial<Quiz>) => void;
  onClose: () => void;
}> = ({ onCreate, onClose }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    course: '',
    duration: 30,
    type: 'practice' as Quiz['type'],
    passingScore: 60,
    dueDate: '',
    allowMultipleAttempts: false,
    shuffleQuestions: false,
    showResults: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course) {
      toast({
        title: "خطأ",
        description: "يرجى ملء الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    onCreate(formData);
    setFormData({
      title: '',
      description: '',
      course: '',
      duration: 30,
      type: 'practice',
      passingScore: 60,
      dueDate: '',
      allowMultipleAttempts: false,
      shuffleQuestions: false,
      showResults: true
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>إنشاء اختبار جديد</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">عنوان الاختبار *</label>
            <input
              type="text"
              required
              className="w-full p-3 border rounded-md"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="أدخل عنوان الاختبار"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكورس *</label>
            <select
              required
              className="w-full p-3 border rounded-md"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="">اختر الكورس</option>
              <option value="أساسيات اللوجستيات">أساسيات اللوجستيات</option>
              <option value="إكسل للمبتدئين">إكسل للمبتدئين</option>
              <option value="التدريب السلوكي">التدريب السلوكي</option>
              <option value="إدارة المخزون">إدارة المخزون</option>
              <option value="النقل والشحن">النقل والشحن</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">وصف الاختبار</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="أدخل وصف مختصر للاختبار"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">نوع الاختبار</label>
            <select
              className="w-full p-3 border rounded-md"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Quiz['type'] })}
            >
              <option value="practice">تدريب</option>
              <option value="assessment">تقييم</option>
              <option value="exam">امتحان</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">المدة (بالدقائق)</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border rounded-md"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">درجة النجاح (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full p-3 border rounded-md"
              value={formData.passingScore}
              onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تاريخ الانتهاء (اختياري)</label>
          <input
            type="date"
            className="w-full p-3 border rounded-md"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">إعدادات الاختبار</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.allowMultipleAttempts}
                onChange={(e) => setFormData({ ...formData, allowMultipleAttempts: e.target.checked })}
              />
              <span className="text-sm">السماح بمحاولات متعددة</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.shuffleQuestions}
                onChange={(e) => setFormData({ ...formData, shuffleQuestions: e.target.checked })}
              />
              <span className="text-sm">ترتيب الأسئلة عشوائياً</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.showResults}
                onChange={(e) => setFormData({ ...formData, showResults: e.target.checked })}
              />
              <span className="text-sm">إظهار النتائج للطلاب</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            إنشاء الاختبار
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Quiz Details Modal Component
const QuizDetailsModal: React.FC<{
  quiz: Quiz | null;
  onClose: () => void;
}> = ({ quiz, onClose }) => {
  if (!quiz) return null;

  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>تفاصيل الاختبار</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {/* Quiz Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{quiz.title}</h3>
            <div className="space-y-2 text-sm">
              <p><strong>الكورس:</strong> {quiz.course}</p>
              <p><strong>النوع:</strong> {
                quiz.type === 'exam' ? 'امتحان' : 
                quiz.type === 'practice' ? 'تدريب' : 'تقييم'
              }</p>
              <p><strong>المدة:</strong> {quiz.duration} دقيقة</p>
              <p><strong>درجة النجاح:</strong> {quiz.passingScore}%</p>
              <p><strong>عدد الأسئلة:</strong> {quiz.questions.length}</p>
              {quiz.description && <p><strong>الوصف:</strong> {quiz.description}</p>}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">الإحصائيات</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{quiz.attempts}</p>
                <p className="text-xs text-muted-foreground">محاولات الحل</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{quiz.totalStudents}</p>
                <p className="text-xs text-muted-foreground">إجمالي الطلاب</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {quiz.totalStudents > 0 ? Math.round((quiz.attempts / quiz.totalStudents) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">معدل المشاركة</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Badge className={
                  quiz.status === 'active' ? 'bg-green-100 text-green-700' :
                  quiz.status === 'draft' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }>
                  {quiz.status === 'active' ? 'نشط' : 
                   quiz.status === 'draft' ? 'مسودة' : 'منتهي'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">الحالة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div>
          <h4 className="font-semibold mb-3">إعدادات الاختبار</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${quiz.allowMultipleAttempts ? 'text-green-500' : 'text-gray-400'}`} />
              <span>محاولات متعددة</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${quiz.shuffleQuestions ? 'text-green-500' : 'text-gray-400'}`} />
              <span>ترتيب عشوائي</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${quiz.showResults ? 'text-green-500' : 'text-gray-400'}`} />
              <span>إظهار النتائج</span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div>
          <h4 className="font-semibold mb-3">الأسئلة ({quiz.questions.length})</h4>
          {quiz.questions.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">لم يتم إضافة أسئلة بعد</p>
              <Button className="mt-2" size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة سؤال
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.questions.slice(0, 3).map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">السؤال {index + 1}</h5>
                    <Badge variant="outline">
                      {question.type === 'multiple-choice' ? 'اختيار متعدد' :
                       question.type === 'true-false' ? 'صح/خطأ' :
                       question.type === 'short-answer' ? 'إجابة قصيرة' : 'مقال'}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{question.question}</p>
                  {question.options && (
                    <div className="text-xs text-muted-foreground">
                      <p>الخيارات: {question.options.length}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>النقاط: {question.points}</span>
                    {question.explanation && <span>يحتوي على شرح</span>}
                  </div>
                </div>
              ))}
              {quiz.questions.length > 3 && (
                <p className="text-center text-sm text-muted-foreground">
                  و {quiz.questions.length - 3} أسئلة أخرى...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

// Edit Quiz Modal Component
const EditQuizModal: React.FC<{
  quiz: Quiz | null;
  onSave: (quiz: Quiz) => void;
  onClose: () => void;
}> = ({ quiz, onSave, onClose }) => {
  const [formData, setFormData] = React.useState<Quiz | null>(quiz);

  React.useEffect(() => {
    setFormData(quiz);
  }, [quiz]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course) {
      toast({
        title: "خطأ",
        description: "يرجى ملء الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>تعديل الاختبار</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">عنوان الاختبار *</label>
            <input
              type="text"
              required
              className="w-full p-3 border rounded-md"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكورس *</label>
            <select
              required
              className="w-full p-3 border rounded-md"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="أساسيات اللوجستيات">أساسيات اللوجستيات</option>
              <option value="إكسل للمبتدئين">إكسل للمبتدئين</option>
              <option value="التدريب السلوكي">التدريب السلوكي</option>
              <option value="إدارة المخزون">إدارة المخزون</option>
              <option value="النقل والشحن">النقل والشحن</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">وصف الاختبار</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">النوع</label>
            <select
              className="w-full p-3 border rounded-md"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Quiz['type'] })}
            >
              <option value="practice">تدريب</option>
              <option value="assessment">تقييم</option>
              <option value="exam">امتحان</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">المدة</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border rounded-md"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">درجة النجاح</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full p-3 border rounded-md"
              value={formData.passingScore}
              onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الحالة</label>
            <select
              className="w-full p-3 border rounded-md"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Quiz['status'] })}
            >
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="closed">منتهي</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
          <input
            type="date"
            className="w-full p-3 border rounded-md"
            value={formData.dueDate || ''}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.allowMultipleAttempts}
              onChange={(e) => setFormData({ ...formData, allowMultipleAttempts: e.target.checked })}
            />
            <span className="text-sm">السماح بمحاولات متعددة</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.shuffleQuestions}
              onChange={(e) => setFormData({ ...formData, shuffleQuestions: e.target.checked })}
            />
            <span className="text-sm">ترتيب الأسئلة عشوائياً</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.showResults}
              onChange={(e) => setFormData({ ...formData, showResults: e.target.checked })}
            />
            <span className="text-sm">إظهار النتائج للطلاب</span>
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default InstructorQuizzes;