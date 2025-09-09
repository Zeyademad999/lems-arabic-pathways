import React, { useState, useMemo } from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Star
} from 'lucide-react';

interface GradingItem {
  id: string;
  studentName: string;
  course: string;
  assignment: string;
  type: 'assignment' | 'quiz' | 'exam';
  submittedAt: string;
  status: 'pending' | 'graded' | 'late';
  score?: number;
  maxScore: number;
  priority: 'high' | 'medium' | 'low';
}

const mockGradingItems: GradingItem[] = [
  {
    id: '1',
    studentName: 'أحمد محمد علي',
    course: 'أساسيات اللوجستيات',
    assignment: 'تقرير عن سلسلة التوريد',
    type: 'assignment',
    submittedAt: '2024-01-20 14:30',
    status: 'pending',
    maxScore: 100,
    priority: 'high'
  },
  {
    id: '2',
    studentName: 'فاطمة السالم',
    course: 'إكسل للمبتدئين',
    assignment: 'اختبار الوحدة الثالثة',
    type: 'quiz',
    submittedAt: '2024-01-19 16:45',
    status: 'graded',
    score: 85,
    maxScore: 100,
    priority: 'medium'
  },
  {
    id: '3',
    studentName: 'محمد عبد الله',
    course: 'التدريب السلوكي',
    assignment: 'مشروع التطوير الشخصي',
    type: 'assignment',
    submittedAt: '2024-01-18 23:59',
    status: 'late',
    maxScore: 100,
    priority: 'high'
  }
];

const InstructorGrading = () => {
  const { toast } = useToast();
  const [gradingItems, setGradingItems] = useState<GradingItem[]>(mockGradingItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GradingItem | null>(null);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [gradingScore, setGradingScore] = useState('');
  const [gradingFeedback, setGradingFeedback] = useState('');

  // Filter grading items
  const filteredItems = useMemo(() => {
    return gradingItems.filter(item => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.assignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCourse = selectedCourse === 'all' || item.course === selectedCourse;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [gradingItems, searchQuery, selectedCourse, selectedStatus]);

  // Get unique courses
  const courses = useMemo(() => {
    return [...new Set(gradingItems.map(item => item.course))];
  }, [gradingItems]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700">في الانتظار</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-700">مصحح</Badge>;
      case 'late':
        return <Badge className="bg-red-100 text-red-700">متأخر</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Badge className="bg-blue-100 text-blue-700">واجب</Badge>;
      case 'quiz':
        return <Badge className="bg-purple-100 text-purple-700">اختبار قصير</Badge>;
      case 'exam':
        return <Badge className="bg-red-100 text-red-700">امتحان</Badge>;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  // Handle grading
  const handleGradeSubmission = () => {
    if (!selectedItem || !gradingScore) return;

    const score = parseFloat(gradingScore);
    if (isNaN(score) || score < 0 || score > selectedItem.maxScore) {
      toast({
        title: "خطأ في الدرجة",
        description: `يجب أن تكون الدرجة بين 0 و ${selectedItem.maxScore}`,
        variant: "destructive"
      });
      return;
    }

    setGradingItems(prev => prev.map(item =>
      item.id === selectedItem.id
        ? { ...item, score, status: 'graded' as const }
        : item
    ));

    toast({
      title: "تم التصحيح بنجاح",
      description: `تم تصحيح ${selectedItem.assignment} للطالب ${selectedItem.studentName}`
    });

    setIsGradingModalOpen(false);
    setGradingScore('');
    setGradingFeedback('');
    setSelectedItem(null);
  };

  // Export grades
  const handleExportGrades = () => {
    toast({
      title: "تم تصدير الدرجات",
      description: "تم تصدير جميع الدرجات بصيغة Excel"
    });
  };

  // Quick grading functions
  const handleQuickGrading = (type: string) => {
    toast({
      title: "التصحيح السريع",
      description: `تم تفعيل وضع ${type}`
    });
  };

  const pendingCount = filteredItems.filter(item => item.status === 'pending').length;
  const gradedCount = filteredItems.filter(item => item.status === 'graded').length;
  const lateCount = filteredItems.filter(item => item.status === 'late').length;
  const averageScore = useMemo(() => {
    const gradedItems = gradingItems.filter(item => item.score !== undefined);
    if (gradedItems.length === 0) return 0;
    const total = gradedItems.reduce((sum, item) => sum + (item.score! / item.maxScore) * 100, 0);
    return Math.round(total / gradedItems.length);
  }, [gradingItems]);

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">التصحيح والدرجات</h1>
            <p className="text-muted-foreground">تصحيح الواجبات والاختبارات وإدارة الدرجات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportGrades}>
              <Download className="h-4 w-4 ml-2" />
              تصدير الدرجات
            </Button>
            <Button onClick={() => handleQuickGrading('التصحيح السريع')}>
              <UserCheck className="h-4 w-4 ml-2" />
              تصحيح سريع
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">في انتظار التصحيح</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{gradedCount}</p>
                <p className="text-sm text-muted-foreground">مصحح</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{lateCount}</p>
                <p className="text-sm text-muted-foreground">تسليم متأخر</p>
              </div>
            </div>
          </Card>
          
           <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
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
                placeholder="البحث في المهام..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10"
              />
            </div>
            
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="اختر الكورس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الكورسات</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="graded">مصحح</SelectItem>
                <SelectItem value="late">متأخر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Grading Queue */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">قائمة التصحيح</h3>
          
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {item.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{item.studentName}</h4>
                      {getPriorityIcon(item.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.course}</p>
                    <p className="text-sm font-medium">{item.assignment}</p>
                    <p className="text-xs text-muted-foreground">تم التسليم: {item.submittedAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">النوع</p>
                    {getTypeBadge(item.type)}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">الحالة</p>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">الدرجة</p>
                    {item.score !== undefined ? (
                      <p className={`font-semibold ${getScoreColor(item.score, item.maxScore)}`}>
                        {item.score}/{item.maxScore}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">--/{item.maxScore}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {item.status === 'pending' ? (
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsGradingModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 ml-1" />
                        تصحيح
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setGradingScore(item.score?.toString() || '');
                          setIsGradingModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Grading Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">التصحيح السريع</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleQuickGrading('تصحيح بالدرجات')}
            >
              <h4 className="font-medium mb-2">تصحيح بالدرجات</h4>
              <p className="text-sm text-muted-foreground">إدخال الدرجات مباشرة للمهام المتعددة</p>
            </div>
            
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleQuickGrading('تصحيح بالنموذج')}
            >
              <h4 className="font-medium mb-2">تصحيح بالنموذج</h4>
              <p className="text-sm text-muted-foreground">استخدام نموذج تصحيح موحد</p>
            </div>
            
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleQuickGrading('مراجعة جماعية')}
            >
              <h4 className="font-medium mb-2">مراجعة جماعية</h4>
              <p className="text-sm text-muted-foreground">مراجعة وتعديل درجات متعددة</p>
            </div>
          </div>
        </Card>

        {/* Grading Modal */}
        <Dialog open={isGradingModalOpen} onOpenChange={setIsGradingModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>تصحيح المهمة</DialogTitle>
            </DialogHeader>
            
            {selectedItem && (
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">الطالب:</Label>
                  <p className="text-sm">{selectedItem.studentName}</p>
                </div>
                
                <div>
                  <Label className="font-medium">المهمة:</Label>
                  <p className="text-sm">{selectedItem.assignment}</p>
                </div>
                
                <div>
                  <Label htmlFor="score">الدرجة (من {selectedItem.maxScore})</Label>
                  <Input
                    id="score"
                    type="number"
                    value={gradingScore}
                    onChange={(e) => setGradingScore(e.target.value)}
                    min="0"
                    max={selectedItem.maxScore}
                    placeholder="أدخل الدرجة"
                  />
                </div>
                
                <div>
                  <Label htmlFor="feedback">التعليقات (اختياري)</Label>
                  <Textarea
                    id="feedback"
                    value={gradingFeedback}
                    onChange={(e) => setGradingFeedback(e.target.value)}
                    placeholder="أضف تعليقاتك هنا..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsGradingModalOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleGradeSubmission}>
                    حفظ الدرجة
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>تفاصيل المهمة</DialogTitle>
            </DialogHeader>
            
            {selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">الطالب:</Label>
                    <p className="text-sm">{selectedItem.studentName}</p>
                  </div>
                  
                  <div>
                    <Label className="font-medium">الكورس:</Label>
                    <p className="text-sm">{selectedItem.course}</p>
                  </div>
                  
                  <div>
                    <Label className="font-medium">المهمة:</Label>
                    <p className="text-sm">{selectedItem.assignment}</p>
                  </div>
                  
                  <div>
                    <Label className="font-medium">النوع:</Label>
                    {getTypeBadge(selectedItem.type)}
                  </div>
                  
                  <div>
                    <Label className="font-medium">تاريخ التسليم:</Label>
                    <p className="text-sm">{selectedItem.submittedAt}</p>
                  </div>
                  
                  <div>
                    <Label className="font-medium">الحالة:</Label>
                    {getStatusBadge(selectedItem.status)}
                  </div>
                  
                  <div>
                    <Label className="font-medium">الدرجة:</Label>
                    {selectedItem.score !== undefined ? (
                      <p className={`font-semibold ${getScoreColor(selectedItem.score, selectedItem.maxScore)}`}>
                        {selectedItem.score}/{selectedItem.maxScore}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">لم يتم التصحيح</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="font-medium">الأولوية:</Label>
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(selectedItem.priority)}
                      <span className="text-sm capitalize">{selectedItem.priority}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    إغلاق
                  </Button>
                  {selectedItem.status === 'pending' && (
                    <Button onClick={() => {
                      setIsViewModalOpen(false);
                      setIsGradingModalOpen(true);
                    }}>
                      تصحيح الآن
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

export default InstructorGrading;