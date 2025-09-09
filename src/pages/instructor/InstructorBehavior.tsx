import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award,
  TrendingUp,
  TrendingDown,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

interface BehaviorRecord {
  id: string;
  studentName: string;
  course: string;
  category: 'participation' | 'punctuality' | 'cooperation' | 'respect' | 'initiative';
  score: number;
  maxScore: number;
  date: string;
  notes: string;
  trend: 'up' | 'down' | 'stable';
}

interface StudentBehavior {
  studentId: string;
  studentName: string;
  overallScore: number;
  participationScore: number;
  punctualityScore: number;
  cooperationScore: number;
  respectScore: number;
  initiativeScore: number;
  trend: 'improving' | 'declining' | 'stable';
  lastUpdated: string;
}

const mockBehaviorRecords: BehaviorRecord[] = [
  {
    id: '1',
    studentName: 'أحمد محمد علي',
    course: 'أساسيات اللوجستيات',
    category: 'participation',
    score: 9,
    maxScore: 10,
    date: '2024-01-22',
    notes: 'مشارك فعال في المناقشات',
    trend: 'up'
  },
  {
    id: '2',
    studentName: 'فاطمة السالم',
    course: 'إكسل للمبتدئين',
    category: 'cooperation',
    score: 8,
    maxScore: 10,
    date: '2024-01-21',
    notes: 'يتعاون بشكل ممتاز مع الزملاء',
    trend: 'stable'
  },
  {
    id: '3',
    studentName: 'محمد عبد الله',
    course: 'التدريب السلوكي',
    category: 'punctuality',
    score: 6,
    maxScore: 10,
    date: '2024-01-20',
    notes: 'يحتاج لتحسين الالتزام بالمواعيد',
    trend: 'down'
  }
];

const mockStudentBehavior: StudentBehavior[] = [
  {
    studentId: '1',
    studentName: 'أحمد محمد علي',
    overallScore: 87,
    participationScore: 9,
    punctualityScore: 8,
    cooperationScore: 9,
    respectScore: 10,
    initiativeScore: 8,
    trend: 'improving',
    lastUpdated: '2024-01-22'
  },
  {
    studentId: '2',
    studentName: 'فاطمة السالم',
    overallScore: 92,
    participationScore: 10,
    punctualityScore: 9,
    cooperationScore: 9,
    respectScore: 9,
    initiativeScore: 9,
    trend: 'stable',
    lastUpdated: '2024-01-21'
  },
  {
    studentId: '3',
    studentName: 'محمد عبد الله',
    overallScore: 73,
    participationScore: 7,
    punctualityScore: 6,
    cooperationScore: 8,
    respectScore: 8,
    initiativeScore: 7,
    trend: 'declining',
    lastUpdated: '2024-01-20'
  }
];

const InstructorBehavior = () => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'participation': return 'المشاركة';
      case 'punctuality': return 'الالتزام';
      case 'cooperation': return 'التعاون';
      case 'respect': return 'الاحترام';
      case 'initiative': return 'المبادرة';
      default: return category;
    }
  };

  const getScoreBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return <Badge className="bg-green-100 text-green-700">ممتاز</Badge>;
    if (percentage >= 80) return <Badge className="bg-blue-100 text-blue-700">جيد جداً</Badge>;
    if (percentage >= 70) return <Badge className="bg-orange-100 text-orange-700">جيد</Badge>;
    return <Badge className="bg-red-100 text-red-700">يحتاج تحسين</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case 'improving': return 'في تحسن';
      case 'declining': return 'في تراجع';
      default: return 'مستقر';
    }
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  const averageScore = Math.round(
    mockStudentBehavior.reduce((sum, student) => sum + student.overallScore, 0) / 
    mockStudentBehavior.length
  );

  const excellentStudents = mockStudentBehavior.filter(s => s.overallScore >= 90).length;
  const improvingStudents = mockStudentBehavior.filter(s => s.trend === 'improving').length;
  const needsAttention = mockStudentBehavior.filter(s => s.overallScore < 70).length;

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">التقييم السلوكي</h1>
            <p className="text-muted-foreground">متابعة وتقييم السلوك الأكاديمي للطلاب</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إضافة تقييم جديد
          </Button>
        </div>

        {/* Behavior Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">متوسط التقييم العام</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{excellentStudents}</p>
                <p className="text-sm text-muted-foreground">طلاب متميزون</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{improvingStudents}</p>
                <p className="text-sm text-muted-foreground">في تحسن</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{needsAttention}</p>
                <p className="text-sm text-muted-foreground">يحتاج متابعة</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="البحث عن طالب..."
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
              <option>جميع الفئات</option>
              <option>المشاركة</option>
              <option>الالتزام</option>
              <option>التعاون</option>
              <option>الاحترام</option>
              <option>المبادرة</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Student Behavior Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockStudentBehavior.map((student) => (
            <Card key={student.studentId} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.studentName}</h3>
                      <p className="text-sm text-muted-foreground">آخر تحديث: {student.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(student.trend)}
                    <span className="text-sm text-muted-foreground">{getTrendLabel(student.trend)}</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className={`text-3xl font-bold ${getOverallScoreColor(student.overallScore)}`}>
                    {student.overallScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">التقييم العام</p>
                  {getScoreBadge(student.overallScore, 100)}
                </div>

                <div className="grid grid-cols-5 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold">{student.participationScore}</p>
                    <p className="text-xs text-muted-foreground">المشاركة</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{student.punctualityScore}</p>
                    <p className="text-xs text-muted-foreground">الالتزام</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{student.cooperationScore}</p>
                    <p className="text-xs text-muted-foreground">التعاون</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{student.respectScore}</p>
                    <p className="text-xs text-muted-foreground">الاحترام</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{student.initiativeScore}</p>
                    <p className="text-xs text-muted-foreground">المبادرة</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    التطور: {getTrendLabel(student.trend)}
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
          ))}
        </div>

        {/* Recent Behavior Records */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">السجلات الحديثة</h3>
          <div className="space-y-3">
            {mockBehaviorRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {record.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium">{record.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{record.course}</p>
                    <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{getCategoryLabel(record.category)}</p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{record.score}/{record.maxScore}</span>
                    {getTrendIcon(record.trend)}
                  </div>
                  
                  {getScoreBadge(record.score, record.maxScore)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Behavior Categories */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">فئات التقييم السلوكي</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { key: 'participation', label: 'المشاركة', icon: Users, color: 'from-blue-500 to-blue-600' },
              { key: 'punctuality', label: 'الالتزام', icon: CheckCircle, color: 'from-green-500 to-green-600' },
              { key: 'cooperation', label: 'التعاون', icon: Star, color: 'from-purple-500 to-purple-600' },
              { key: 'respect', label: 'الاحترام', icon: Award, color: 'from-orange-500 to-orange-600' },
              { key: 'initiative', label: 'المبادرة', icon: TrendingUp, color: 'from-pink-500 to-pink-600' }
            ].map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.key} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-center mb-2">{category.label}</h4>
                  <p className="text-xs text-muted-foreground text-center">
                    {mockBehaviorRecords.filter(r => r.category === category.key).length} تقييم
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorBehavior;