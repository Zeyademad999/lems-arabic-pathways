import React, { useState, useMemo } from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen,
  Users,
  Clock,
  BarChart3,
  Edit,
  Eye,
  Plus,
  Search,
  Filter,
  Trash2,
  Star,
  Archive,
  Play,
  Settings,
  Upload,
  Video,
  FileText,
  ChevronUp,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  studentsCount: number;
  completionRate: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  createdDate: string;
  sections: CourseSection[];
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoFile?: File;
  duration: number;
  order: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    description: 'كورس شامل في أساسيات إدارة اللوجستيات والنقل',
    level: 'beginner',
    duration: 40,
    studentsCount: 25,
    completionRate: 78,
    rating: 4.5,
    status: 'active',
    createdDate: '2024-01-15',
    sections: [
      {
        id: '1',
        title: 'مقدمة في اللوجستيات',
        description: 'مفاهيم أساسية في اللوجستيات',
        order: 1,
        lessons: [
          {
            id: '1',
            title: 'ما هي اللوجستيات؟',
            description: 'تعريف شامل للوجستيات',
            duration: 15,
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    description: 'تطوير السلوكيات المهنية في بيئة العمل',
    level: 'intermediate',
    duration: 30,
    studentsCount: 18,
    completionRate: 85,
    rating: 4.7,
    status: 'active',
    createdDate: '2024-01-10',
    sections: []
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    description: 'تعلم استخدام برنامج الإكسل من البداية',
    level: 'beginner',
    duration: 25,
    studentsCount: 32,
    completionRate: 92,
    rating: 4.8,
    status: 'active',
    createdDate: '2024-01-05',
    sections: []
  }
];

const InstructorCourses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    level: 'beginner' as Course['level'],
    duration: 0,
    status: 'draft' as Course['status'],
    sections: [] as CourseSection[]
  });
  const [currentSection, setCurrentSection] = useState<CourseSection>({
    id: '',
    title: '',
    description: '',
    order: 0,
    lessons: [],
    quiz: undefined
  });
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    id: '',
    title: '',
    description: '',
    duration: 0,
    order: 0
  });
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>({
    id: '',
    title: '',
    description: '',
    questions: [],
    passingScore: 70
  });
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: '',
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1
  });
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [isAddingLessonOpen, setIsAddingLessonOpen] = useState(false);
  const [isAddingQuizOpen, setIsAddingQuizOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(-1);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
      
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [courses, searchQuery, selectedLevel, selectedStatus]);

  // Handle create course
  const handleCreateCourse = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.duration) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      title: courseForm.title,
      description: courseForm.description,
      level: courseForm.level,
      duration: courseForm.duration,
      status: courseForm.status,
      sections: courseForm.sections,
      studentsCount: 0,
      completionRate: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setCourses(prev => [...prev, newCourse]);
    setCourseForm({
      title: '',
      description: '',
      level: 'beginner',
      duration: 0,
      status: 'draft',
      sections: []
    });
    setIsCreateModalOpen(false);

    toast({
      title: "تم إنشاء الكورس",
      description: `تم إنشاء كورس "${courseForm.title}" بنجاح`
    });
  };

  // Handle add section
  const handleAddSection = () => {
    if (!currentSection.title || !currentSection.description) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء عنوان ووصف القسم",
        variant: "destructive"
      });
      return;
    }

    const newSection: CourseSection = {
      ...currentSection,
      id: Date.now().toString(),
      order: courseForm.sections.length + 1
    };

    setCourseForm(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));

    setCurrentSection({
      id: '',
      title: '',
      description: '',
      order: 0,
      lessons: [],
      quiz: undefined
    });
    setIsAddingSectionOpen(false);

    toast({
      title: "تم إضافة القسم",
      description: `تم إضافة قسم "${newSection.title}" بنجاح`
    });
  };

  // Handle add lesson to section
  const handleAddLesson = () => {
    if (!currentLesson.title || selectedSectionIndex === -1) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء بيانات الدرس واختيار القسم",
        variant: "destructive"
      });
      return;
    }

    const newLesson: Lesson = {
      ...currentLesson,
      id: Date.now().toString(),
      order: courseForm.sections[selectedSectionIndex]?.lessons.length + 1 || 1
    };

    setCourseForm(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === selectedSectionIndex 
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      )
    }));

    setCurrentLesson({
      id: '',
      title: '',
      description: '',
      duration: 0,
      order: 0
    });
    setIsAddingLessonOpen(false);

    toast({
      title: "تم إضافة الدرس",
      description: `تم إضافة درس "${newLesson.title}" بنجاح`
    });
  };

  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setCurrentLesson(prev => ({ 
          ...prev, 
          videoFile: file,
          videoUrl: URL.createObjectURL(file)
        }));
        toast({
          title: "تم رفع الفيديو",
          description: `تم رفع فيديو "${file.name}" بنجاح`
        });
      } else {
        toast({
          title: "خطأ في نوع الملف",
          description: "يرجى اختيار ملف فيديو صالح",
          variant: "destructive"
        });
      }
    }
  };

  // Handle add quiz
  const handleAddQuiz = () => {
    if (!currentQuiz.title || currentQuiz.questions.length === 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء بيانات الاختبار وإضافة أسئلة",
        variant: "destructive"
      });
      return;
    }

    setCourseForm(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === selectedSectionIndex 
          ? { ...section, quiz: { ...currentQuiz, id: Date.now().toString() } }
          : section
      )
    }));

    setCurrentQuiz({
      id: '',
      title: '',
      description: '',
      questions: [],
      passingScore: 70
    });
    setIsAddingQuizOpen(false);

    toast({
      title: "تم إضافة الاختبار",
      description: `تم إضافة اختبار "${currentQuiz.title}" بنجاح`
    });
  };

  // Handle add question to quiz
  const handleAddQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.correctAnswer) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء السؤال والإجابة الصحيحة",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: QuizQuestion = {
      ...currentQuestion,
      id: Date.now().toString()
    };

    setCurrentQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setCurrentQuestion({
      id: '',
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1
    });

    toast({
      title: "تم إضافة السؤال",
      description: "تم إضافة السؤال للاختبار بنجاح"
    });
  };

  // Remove section
  const removeSection = (index: number) => {
    setCourseForm(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  // Remove lesson
  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    setCourseForm(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) => 
        sIndex === sectionIndex 
          ? { ...section, lessons: section.lessons.filter((_, lIndex) => lIndex !== lessonIndex) }
          : section
      )
    }));
  };

  // Handle edit course
  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      status: course.status,
      sections: course.sections || []
    });
    setIsEditModalOpen(true);
  };

  // Handle update course
  const handleUpdateCourse = () => {
    if (!selectedCourse || !courseForm.title || !courseForm.description || !courseForm.duration) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setCourses(prev => prev.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, ...courseForm }
        : course
    ));

    setIsEditModalOpen(false);
    setSelectedCourse(null);

    toast({
      title: "تم تحديث الكورس",
      description: `تم تحديث كورس "${courseForm.title}" بنجاح`
    });
  };

  // Handle delete course
  const handleDeleteCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setCourses(prev => prev.filter(c => c.id !== courseId));
    
    toast({
      title: "تم حذف الكورس",
      description: `تم حذف كورس "${course?.title}" بنجاح`
    });
  };

  // Handle archive course
  const handleArchiveCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: 'archived' as const }
        : course
    ));

    const course = courses.find(c => c.id === courseId);
    toast({
      title: "تم أرشفة الكورس",
      description: `تم أرشفة كورس "${course?.title}" بنجاح`
    });
  };

  // Handle activate course
  const handleActivateCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: 'active' as const }
        : course
    ));

    const course = courses.find(c => c.id === courseId);
    toast({
      title: "تم تفعيل الكورس",
      description: `تم تفعيل كورس "${course?.title}" بنجاح`
    });
  };

  // Handle view course details
  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-700">مبتدئ</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-100 text-blue-700">متوسط</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-100 text-purple-700">متقدم</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      case 'archived':
        return <Badge variant="outline">مؤرشف</Badge>;
      default:
        return null;
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">إدارة الكورسات</h1>
            <p className="text-muted-foreground">إدارة ومتابعة الكورسات التدريبية</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء كورس جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredCourses.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الكورسات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCourses.reduce((sum, course) => sum + course.studentsCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCourses.length > 0 ? Math.round(filteredCourses.reduce((sum, course) => sum + course.completionRate, 0) / filteredCourses.length) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">متوسط الإتمام</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredCourses.reduce((sum, course) => sum + course.duration, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الساعات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="البحث في الكورسات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10"
              />
            </div>
            
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="beginner">مبتدئ</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="archived">مؤرشف</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    {getLevelBadge(course.level)}
                    {getStatusBadge(course.status)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.studentsCount} طالب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration} ساعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className={getCompletionColor(course.completionRate)}>
                      {course.completionRate}% إتمام
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{course.rating || 'جديد'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    تم الإنشاء: {course.createdDate}
                  </span>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewCourse(course)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditCourse(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {course.status === 'draft' || course.status === 'archived' ? (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleActivateCourse(course.id)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleArchiveCourse(course.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف كورس "{course.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteCourse(course.id)}>
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Course Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء كورس جديد</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
                <TabsTrigger value="content">المحتوى والأقسام</TabsTrigger>
                <TabsTrigger value="review">مراجعة وحفظ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label htmlFor="title">عنوان الكورس *</Label>
                  <Input
                    id="title"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان الكورس"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">وصف الكورس *</Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="أدخل وصف مفصل للكورس"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level">المستوى</Label>
                    <Select 
                      value={courseForm.level} 
                      onValueChange={(value: Course['level']) => setCourseForm(prev => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">مبتدئ</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="advanced">متقدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">المدة (بالساعات) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">حالة الكورس</Label>
                  <Select 
                    value={courseForm.status} 
                    onValueChange={(value: Course['status']) => setCourseForm(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">أقسام الكورس</h3>
                    <Button onClick={() => setIsAddingSectionOpen(true)}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة قسم
                    </Button>
                  </div>
                  
                  {courseForm.sections.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      لم يتم إضافة أقسام بعد. ابدأ بإضافة القسم الأول.
                    </p>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {courseForm.sections.map((section, sectionIndex) => (
                        <AccordionItem key={section.id || sectionIndex} value={`section-${sectionIndex}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5" />
                              <div className="text-left">
                                <p className="font-medium">{section.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {section.lessons.length} درس • {section.quiz ? 'يحتوي على اختبار' : 'بدون اختبار'}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <p className="text-sm text-muted-foreground">{section.description}</p>
                              
                              {/* Lessons */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">الدروس</h4>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedSectionIndex(sectionIndex);
                                      setIsAddingLessonOpen(true);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 ml-1" />
                                    إضافة درس
                                  </Button>
                                </div>
                                
                                {section.lessons.map((lesson, lessonIndex) => (
                                  <div key={lesson.id || lessonIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-2">
                                    <div className="flex items-center gap-3">
                                      <Video className="h-4 w-4 text-blue-600" />
                                      <div>
                                        <p className="font-medium text-sm">{lesson.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {lesson.duration} دقيقة • {lesson.videoUrl ? 'يحتوي على فيديو' : 'بدون فيديو'}
                                        </p>
                                      </div>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Quiz */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">الاختبار</h4>
                                  {!section.quiz && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedSectionIndex(sectionIndex);
                                        setIsAddingQuizOpen(true);
                                      }}
                                    >
                                      <HelpCircle className="h-4 w-4 ml-1" />
                                      إضافة اختبار
                                    </Button>
                                  )}
                                </div>
                                
                                {section.quiz ? (
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <HelpCircle className="h-4 w-4 text-green-600" />
                                        <div>
                                          <p className="font-medium text-sm">{section.quiz.title}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {section.quiz.questions.length} سؤال • النجاح: {section.quiz.passingScore}%
                                          </p>
                                        </div>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        onClick={() => {
                                          setCourseForm(prev => ({
                                            ...prev,
                                            sections: prev.sections.map((s, i) => 
                                              i === sectionIndex ? { ...s, quiz: undefined } : s
                                            )
                                          }));
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">لا يوجد اختبار لهذا القسم</p>
                                )}
                              </div>
                              
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => removeSection(sectionIndex)}
                              >
                                <Trash2 className="h-4 w-4 ml-1" />
                                حذف القسم
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="review" className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">مراجعة الكورس</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium">العنوان:</Label>
                      <p className="text-muted-foreground">{courseForm.title || 'غير محدد'}</p>
                    </div>
                    
                    <div>
                      <Label className="font-medium">الوصف:</Label>
                      <p className="text-muted-foreground">{courseForm.description || 'غير محدد'}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="font-medium">المستوى:</Label>
                        <p className="text-muted-foreground">
                          {courseForm.level === 'beginner' ? 'مبتدئ' : 
                           courseForm.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                        </p>
                      </div>
                      <div>
                        <Label className="font-medium">المدة:</Label>
                        <p className="text-muted-foreground">{courseForm.duration} ساعة</p>
                      </div>
                      <div>
                        <Label className="font-medium">عدد الأقسام:</Label>
                        <p className="text-muted-foreground">{courseForm.sections.length} قسم</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-medium">إجمالي الدروس:</Label>
                      <p className="text-muted-foreground">
                        {courseForm.sections.reduce((total, section) => total + section.lessons.length, 0)} درس
                      </p>
                    </div>
                    
                    <div>
                      <Label className="font-medium">الاختبارات:</Label>
                      <p className="text-muted-foreground">
                        {courseForm.sections.filter(section => section.quiz).length} اختبار
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateCourse}>
                    إنشاء الكورس
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Add Section Modal */}
        <Dialog open={isAddingSectionOpen} onOpenChange={setIsAddingSectionOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة قسم جديد</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="section-title">عنوان القسم *</Label>
                <Input
                  id="section-title"
                  value={currentSection.title}
                  onChange={(e) => setCurrentSection(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان القسم"
                />
              </div>
              
              <div>
                <Label htmlFor="section-description">وصف القسم *</Label>
                <Textarea
                  id="section-description"
                  value={currentSection.description}
                  onChange={(e) => setCurrentSection(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف القسم"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingSectionOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddSection}>
                  إضافة القسم
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Lesson Modal */}
        <Dialog open={isAddingLessonOpen} onOpenChange={setIsAddingLessonOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة درس جديد</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="lesson-title">عنوان الدرس *</Label>
                <Input
                  id="lesson-title"
                  value={currentLesson.title}
                  onChange={(e) => setCurrentLesson(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان الدرس"
                />
              </div>
              
              <div>
                <Label htmlFor="lesson-description">وصف الدرس</Label>
                <Textarea
                  id="lesson-description"
                  value={currentLesson.description}
                  onChange={(e) => setCurrentLesson(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف الدرس"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="lesson-duration">مدة الدرس (دقيقة)</Label>
                <Input
                  id="lesson-duration"
                  type="number"
                  value={currentLesson.duration}
                  onChange={(e) => setCurrentLesson(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  min="1"
                />
              </div>
              
              <div>
                <Label htmlFor="lesson-video">رفع فيديو الدرس</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    id="lesson-video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <Label htmlFor="lesson-video" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      اضغط لرفع فيديو الدرس
                    </p>
                    {currentLesson.videoFile && (
                      <p className="text-xs text-green-600 mt-2">
                        تم رفع: {currentLesson.videoFile.name}
                      </p>
                    )}
                  </Label>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingLessonOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddLesson}>
                  إضافة الدرس
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Quiz Modal */}
        <Dialog open={isAddingQuizOpen} onOpenChange={setIsAddingQuizOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة اختبار للقسم</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quiz-title">عنوان الاختبار *</Label>
                  <Input
                    id="quiz-title"
                    value={currentQuiz.title}
                    onChange={(e) => setCurrentQuiz(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان الاختبار"
                  />
                </div>
                
                <div>
                  <Label htmlFor="quiz-passing-score">درجة النجاح (%)</Label>
                  <Input
                    id="quiz-passing-score"
                    type="number"
                    value={currentQuiz.passingScore}
                    onChange={(e) => setCurrentQuiz(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 70 }))}
                    placeholder="70"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="quiz-description">وصف الاختبار</Label>
                <Textarea
                  id="quiz-description"
                  value={currentQuiz.description}
                  onChange={(e) => setCurrentQuiz(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف الاختبار"
                  rows={2}
                />
              </div>
              
              {/* Questions */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">الأسئلة ({currentQuiz.questions.length})</h4>
                </div>
                
                {/* Add Question Form */}
                <div className="space-y-3 bg-muted/30 p-4 rounded-lg mb-4">
                  <div>
                    <Label htmlFor="question-text">نص السؤال *</Label>
                    <Textarea
                      id="question-text"
                      value={currentQuestion.question}
                      onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="أدخل نص السؤال"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="question-type">نوع السؤال</Label>
                      <Select 
                        value={currentQuestion.type} 
                        onValueChange={(value: QuizQuestion['type']) => setCurrentQuestion(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">اختيار متعدد</SelectItem>
                          <SelectItem value="true-false">صح/خطأ</SelectItem>
                          <SelectItem value="short-answer">إجابة قصيرة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="question-points">النقاط</Label>
                      <Input
                        id="question-points"
                        type="number"
                        value={currentQuestion.points}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                        min="1"
                      />
                    </div>
                  </div>
                  
                  {currentQuestion.type === 'multiple-choice' && (
                    <div className="space-y-2">
                      <Label>الخيارات</Label>
                      {currentQuestion.options?.map((option, index) => (
                        <Input
                          key={index}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(currentQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          placeholder={`الخيار ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="correct-answer">الإجابة الصحيحة *</Label>
                    {currentQuestion.type === 'multiple-choice' ? (
                      <Select 
                        value={currentQuestion.correctAnswer} 
                        onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الإجابة الصحيحة" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentQuestion.options?.filter(option => option.trim() !== '').map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : currentQuestion.type === 'true-false' ? (
                      <Select 
                        value={currentQuestion.correctAnswer} 
                        onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الإجابة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">صح</SelectItem>
                          <SelectItem value="false">خطأ</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={currentQuestion.correctAnswer}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                        placeholder="أدخل الإجابة الصحيحة"
                      />
                    )}
                  </div>
                  
                  <Button onClick={handleAddQuestion} className="w-full">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة السؤال
                  </Button>
                </div>
                
                {/* Questions List */}
                {currentQuiz.questions.map((question, index) => (
                  <div key={question.id || index} className="border rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{question.question}</p>
                        <p className="text-xs text-muted-foreground">
                          {question.type === 'multiple-choice' ? 'اختيار متعدد' : 
                           question.type === 'true-false' ? 'صح/خطأ' : 'إجابة قصيرة'} • 
                          {question.points} نقطة
                        </p>
                        <p className="text-xs text-green-600">الإجابة: {question.correctAnswer}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          setCurrentQuiz(prev => ({
                            ...prev,
                            questions: prev.questions.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingQuizOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddQuiz}>
                  إضافة الاختبار
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Course Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>تعديل الكورس</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">عنوان الكورس *</Label>
                <Input
                  id="edit-title"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان الكورس"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">وصف الكورس *</Label>
                <Textarea
                  id="edit-description"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف مفصل للكورس"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-level">المستوى</Label>
                  <Select 
                    value={courseForm.level} 
                    onValueChange={(value: Course['level']) => setCourseForm(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدئ</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-duration">المدة (بالساعات) *</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-status">حالة الكورس</Label>
                <Select 
                  value={courseForm.status} 
                  onValueChange={(value: Course['status']) => setCourseForm(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="archived">مؤرشف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleUpdateCourse}>
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Course Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الكورس</DialogTitle>
            </DialogHeader>
            
            {selectedCourse && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getLevelBadge(selectedCourse.level)}
                      {getStatusBadge(selectedCourse.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">وصف الكورس</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedCourse.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{selectedCourse.studentsCount}</p>
                    <p className="text-sm text-muted-foreground">طالب مسجل</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold">{selectedCourse.duration}</p>
                    <p className="text-sm text-muted-foreground">ساعة</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className={`text-2xl font-bold ${getCompletionColor(selectedCourse.completionRate)}`}>
                      {selectedCourse.completionRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">معدل الإتمام</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500 fill-current" />
                    <p className="text-2xl font-bold">{selectedCourse.rating || 'جديد'}</p>
                    <p className="text-sm text-muted-foreground">التقييم</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-sm font-medium">تاريخ الإنشاء</Label>
                    <p className="text-muted-foreground">{selectedCourse.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">المستوى</Label>
                    <p className="text-muted-foreground">
                      {selectedCourse.level === 'beginner' ? 'مبتدئ' : 
                       selectedCourse.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditCourse(selectedCourse);
                  }}>
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل الكورس
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

export default InstructorCourses;