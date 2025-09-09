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
  Settings
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
    createdDate: '2024-01-15'
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
    createdDate: '2024-01-10'
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
    createdDate: '2024-01-05'
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
    status: 'draft' as Course['status']
  });

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
      status: 'draft'
    });
    setIsCreateModalOpen(false);

    toast({
      title: "تم إنشاء الكورس",
      description: `تم إنشاء كورس "${courseForm.title}" بنجاح`
    });
  };

  // Handle edit course
  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      status: course.status
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
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء كورس جديد</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
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
              
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateCourse}>
                  إنشاء الكورس
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