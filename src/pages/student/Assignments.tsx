import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Upload, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Calendar,
  Download,
  Search
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  submittedDate?: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: number;
  maxGrade: number;
  attachments: string[];
  submissionType: 'file' | 'text' | 'both';
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'تقرير عن أنظمة إدارة المخازن',
    course: 'أساسيات اللوجستيات',
    description: 'اكتب تقريراً مفصلاً عن أنظمة إدارة المخازن الحديثة وفوائدها في تحسين كفاءة العمليات اللوجستية',
    dueDate: '2024-01-20',
    status: 'pending',
    maxGrade: 100,
    attachments: ['requirements.pdf', 'template.docx'],
    submissionType: 'file'
  },
  {
    id: '2',
    title: 'دراسة حالة: تحليل سلسلة التوريد',
    course: 'أساسيات اللوجستيات',
    description: 'حلل سلسلة التوريد لشركة محلية واقترح تحسينات',
    dueDate: '2024-01-15',
    submittedDate: '2024-01-14',
    status: 'graded',
    grade: 85,
    maxGrade: 100,
    attachments: ['case_study.pdf'],
    submissionType: 'file'
  },
  {
    id: '3',
    title: 'تقييم السلوك المهني الذاتي',
    course: 'التدريب السلوكي المهني',
    description: 'قم بتقييم سلوكك المهني وحدد نقاط القوة والضعف',
    dueDate: '2024-01-25',
    status: 'pending',
    maxGrade: 50,
    attachments: ['assessment_form.pdf'],
    submissionType: 'both'
  },
  {
    id: '4',
    title: 'مشروع الإكسل العملي',
    course: 'إكسل للمبتدئين',
    description: 'إنشاء جدول بيانات لإدارة المخزون باستخدام الدوال المتقدمة',
    dueDate: '2024-01-10',
    submittedDate: '2024-01-08',
    status: 'submitted',
    maxGrade: 75,
    attachments: ['excel_template.xlsx'],
    submissionType: 'file'
  }
];

const Assignments = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="lems-badge-pending">معلق</Badge>;
      case 'submitted':
        return <Badge className="lems-badge-pending">مُرسل</Badge>;
      case 'graded':
        return <Badge className="lems-badge-success">مُقيّم</Badge>;
      case 'overdue':
        return <Badge className="lems-badge-locked">متأخر</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'submitted':
        return <Upload className="h-4 w-4 text-primary" />;
      case 'graded':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockAssignments.filter(a => a.status === 'pending').length;
  const submittedCount = mockAssignments.filter(a => a.status === 'submitted').length;
  const gradedCount = mockAssignments.filter(a => a.status === 'graded').length;

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">الواجبات</h1>
          <p className="text-muted-foreground">
            تابع واجباتك وارسل إجاباتك في المواعيد المحددة
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">واجبات معلقة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{submittedCount}</p>
                <p className="text-sm text-muted-foreground">مُرسلة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{gradedCount}</p>
                <p className="text-sm text-muted-foreground">مُقيّمة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAssignments.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الواجبات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الواجبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lems-input pr-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'submitted', 'graded'].map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status === 'all' ? 'الكل' : 
                 status === 'pending' ? 'معلق' :
                 status === 'submitted' ? 'مُرسل' : 'مُقيّم'}
              </Button>
            ))}
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="lems-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(assignment.status)}
                      <h3 className="font-semibold text-education-primary">
                        {assignment.title}
                      </h3>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    <p className="text-sm leading-relaxed">{assignment.description}</p>
                  </div>
                  
                  <div className="text-left space-y-2">
                    {assignment.status === 'graded' && assignment.grade && (
                      <div className="text-center p-3 bg-success/10 rounded-lg">
                        <p className="text-2xl font-bold text-success">
                          {assignment.grade}/{assignment.maxGrade}
                        </p>
                        <p className="text-xs text-success">الدرجة</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>موعد التسليم: {assignment.dueDate}</span>
                    </div>
                    {assignment.submittedDate && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>تم الإرسال: {assignment.submittedDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {assignment.attachments.length > 0 && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-1" />
                        تحميل المرفقات
                      </Button>
                    )}
                    
                    {assignment.status === 'pending' && (
                      <Button size="sm" className="lems-button-primary">
                        <Upload className="h-4 w-4 ml-1" />
                        إرسال الحل
                      </Button>
                    )}
                    
                    {assignment.status === 'graded' && (
                      <Button size="sm" variant="outline">
                        عرض التفاصيل
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              لا توجد واجبات مطابقة للبحث
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

export default Assignments;