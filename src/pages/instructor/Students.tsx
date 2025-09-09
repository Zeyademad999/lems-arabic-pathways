import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Award,
  BookOpen
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  attendanceRate: number;
  overallGrade: number;
  behaviorScore: number;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'أحمد محمد علي',
    email: 'ahmed.mohammed@email.com',
    enrolledCourses: 3,
    attendanceRate: 95,
    overallGrade: 88,
    behaviorScore: 92,
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20'
  },
  {
    id: '2',
    name: 'فاطمة السالم',
    email: 'fatima.salem@email.com',
    enrolledCourses: 2,
    attendanceRate: 87,
    overallGrade: 93,
    behaviorScore: 96,
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-01-19'
  },
  {
    id: '3',
    name: 'محمد عبد الله',
    email: 'mohammed.abdullah@email.com',
    enrolledCourses: 4,
    attendanceRate: 78,
    overallGrade: 72,
    behaviorScore: 85,
    status: 'active',
    joinDate: '2024-01-08',
    lastActive: '2024-01-18'
  }
];

const Students = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غير نشط</Badge>;
      case 'suspended':
        return <Badge variant="destructive">موقوف</Badge>;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">إدارة الطلاب</h1>
            <p className="text-muted-foreground">متابعة وإدارة بيانات الطلاب</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 ml-2" />
            إضافة طالب جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockStudents.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">متوسط الحضور</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">84%</p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-sm text-muted-foreground">متوسط السلوك</p>
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
                placeholder="البحث عن الطلاب..."
                className="w-full pl-4 pr-10 py-2 border rounded-md"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Students List */}
        <div className="space-y-4">
          {mockStudents.map((student) => (
            <Card key={student.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(student.status)}
                      <span className="text-xs text-muted-foreground">
                        انضم: {student.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الكورسات</p>
                    <p className="font-semibold">{student.enrolledCourses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الحضور</p>
                    <p className={`font-semibold ${getScoreColor(student.attendanceRate)}`}>
                      {student.attendanceRate}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الدرجات</p>
                    <p className={`font-semibold ${getScoreColor(student.overallGrade)}`}>
                      {student.overallGrade}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">السلوك</p>
                    <p className={`font-semibold ${getScoreColor(student.behaviorScore)}`}>
                      {student.behaviorScore}%
                    </p>
                  </div>
                  
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
          ))}
        </div>
      </div>
    </InstructorLayout>
  );
};

export default Students;