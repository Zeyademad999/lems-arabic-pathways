import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Edit
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

  const pendingCount = mockGradingItems.filter(item => item.status === 'pending').length;
  const gradedCount = mockGradingItems.filter(item => item.status === 'graded').length;
  const lateCount = mockGradingItems.filter(item => item.status === 'late').length;

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
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير الدرجات
            </Button>
            <Button>
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
                <p className="text-2xl font-bold">87%</p>
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
              <input
                type="text"
                placeholder="البحث في المهام..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <select className="px-4 py-2 border rounded-md">
              <option>جميع الكورسات</option>
              <option>أساسيات اللوجستيات</option>
              <option>إكسل للمبتدئين</option>
              <option>التدريب السلوكي</option>
            </select>
            <select className="px-4 py-2 border rounded-md">
              <option>جميع الحالات</option>
              <option>في الانتظار</option>
              <option>مصحح</option>
              <option>متأخر</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Grading Queue */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">قائمة التصحيح</h3>
          
          {mockGradingItems.map((item) => (
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
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                    {item.status === 'pending' ? (
                      <Button size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تصحيح
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
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
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تصحيح بالدرجات</h4>
              <p className="text-sm text-muted-foreground">إدخال الدرجات مباشرة للمهام المتعددة</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تصحيح بالنموذج</h4>
              <p className="text-sm text-muted-foreground">استخدام نموذج تصحيح موحد</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">مراجعة جماعية</h4>
              <p className="text-sm text-muted-foreground">مراجعة وتعديل درجات متعددة</p>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorGrading;