import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList,
  Plus,
  Eye,
  Edit,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'draft' | 'closed';
  type: 'individual' | 'group';
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'تقرير عن أساسيات اللوجستيات',
    course: 'أساسيات اللوجستيات',
    dueDate: '2024-01-20',
    submissions: 18,
    totalStudents: 25,
    status: 'active',
    type: 'individual'
  },
  {
    id: '2',
    title: 'مشروع جماعي - تحليل سلسلة التوريد',
    course: 'إدارة سلسلة التوريد',
    dueDate: '2024-01-25',
    submissions: 12,
    totalStudents: 20,
    status: 'active',
    type: 'group'
  },
  {
    id: '3',
    title: 'دراسة حالة - النقل البحري',
    course: 'النقل والشحن',
    dueDate: '2024-01-15',
    submissions: 15,
    totalStudents: 15,
    status: 'closed',
    type: 'individual'
  }
];

const InstructorAssignments = () => {
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
    return type === 'group' 
      ? <Badge className="bg-blue-100 text-blue-700">جماعي</Badge>
      : <Badge className="bg-purple-100 text-purple-700">فردي</Badge>;
  };

  const getSubmissionStatus = (submissions: number, total: number) => {
    const percentage = (submissions / total) * 100;
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
            <h1 className="text-2xl font-bold">إدارة الواجبات</h1>
            <p className="text-muted-foreground">إنشاء ومتابعة واجبات الطلاب</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء واجب جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockAssignments.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الواجبات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAssignments.reduce((sum, assignment) => sum + assignment.submissions, 0)}
                </p>
                <p className="text-sm text-muted-foreground">التسليمات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAssignments.filter(a => a.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">واجبات نشطة</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAssignments.filter(a => {
                    const today = new Date();
                    const dueDate = new Date(a.dueDate);
                    return dueDate > today && a.status === 'active';
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">واجبات قادمة</p>
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
                placeholder="البحث في الواجبات..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Assignments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockAssignments.map((assignment) => {
            const submissionStatus = getSubmissionStatus(assignment.submissions, assignment.totalStudents);
            const StatusIcon = submissionStatus.icon;
            
            return (
              <Card key={assignment.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ClipboardList className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(assignment.status)}
                      {getTypeBadge(assignment.type)}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{assignment.course}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">تاريخ التسليم:</span>
                      <span className="font-medium">{assignment.dueDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${submissionStatus.color}`} />
                        <span className="text-sm">التسليمات</span>
                      </div>
                      <span className={`text-sm font-medium ${submissionStatus.color}`}>
                        {assignment.submissions}/{assignment.totalStudents}
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      {assignment.submissions} تسليم من أصل {assignment.totalStudents}
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

export default InstructorAssignments;