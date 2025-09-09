import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
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
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Save,
  X,
  ChevronDown,
  Download,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  enrolledCourses: number;
  attendanceRate: number;
  overallGrade: number;
  behaviorScore: number;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  courses: string[];
  totalHours: number;
  certificatesEarned: number;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'أحمد محمد علي',
    email: 'ahmed.mohammed@email.com',
    phone: '+966501234567',
    address: 'الرياض، المملكة العربية السعودية',
    enrolledCourses: 3,
    attendanceRate: 95,
    overallGrade: 88,
    behaviorScore: 92,
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    courses: ['أساسيات اللوجستيات', 'إكسل للمبتدئين', 'التدريب السلوكي'],
    totalHours: 45,
    certificatesEarned: 2
  },
  {
    id: '2',
    name: 'فاطمة السالم',
    email: 'fatima.salem@email.com',
    phone: '+966509876543',
    address: 'جدة، المملكة العربية السعودية',
    enrolledCourses: 2,
    attendanceRate: 87,
    overallGrade: 93,
    behaviorScore: 96,
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-01-19',
    courses: ['إكسل للمبتدئين', 'التدريب السلوكي'],
    totalHours: 32,
    certificatesEarned: 1
  },
  {
    id: '3',
    name: 'محمد عبد الله',
    email: 'mohammed.abdullah@email.com',
    phone: '+966555123456',
    address: 'الدمام، المملكة العربية السعودية',
    enrolledCourses: 4,
    attendanceRate: 78,
    overallGrade: 72,
    behaviorScore: 85,
    status: 'active',
    joinDate: '2024-01-08',
    lastActive: '2024-01-18',
    courses: ['أساسيات اللوجستيات', 'إكسل للمبتدئين', 'التدريب السلوكي', 'إدارة المخزون'],
    totalHours: 56,
    certificatesEarned: 1
  },
  {
    id: '4',
    name: 'سارة أحمد',
    email: 'sarah.ahmed@email.com',
    phone: '+966567890123',
    address: 'مكة المكرمة، المملكة العربية السعودية',
    enrolledCourses: 2,
    attendanceRate: 92,
    overallGrade: 89,
    behaviorScore: 94,
    status: 'inactive',
    joinDate: '2024-01-05',
    lastActive: '2024-01-15',
    courses: ['التدريب السلوكي', 'إدارة المخزون'],
    totalHours: 28,
    certificatesEarned: 2
  }
];

const Students = () => {
  const [students, setStudents] = React.useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = (newStudentData: Partial<Student>) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: newStudentData.name || '',
      email: newStudentData.email || '',
      phone: newStudentData.phone || '',
      address: newStudentData.address || '',
      enrolledCourses: 0,
      attendanceRate: 0,
      overallGrade: 0,
      behaviorScore: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      courses: [],
      totalHours: 0,
      certificatesEarned: 0
    };
    
    setStudents([...students, newStudent]);
    setIsAddModalOpen(false);
    toast.success('تم إضافة الطالب بنجاح');
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setIsEditModalOpen(false);
    setEditingStudent(null);
    toast.success('تم تحديث بيانات الطالب بنجاح');
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
    toast.success('تم حذف الطالب بنجاح');
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };
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
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 ml-2" />
                  إضافة طالب جديد
                </Button>
              </DialogTrigger>
              <AddStudentModal onAdd={handleAddStudent} onClose={() => setIsAddModalOpen(false)} />
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredStudents.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(filteredStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / filteredStudents.length)}%
                </p>
                <p className="text-sm text-muted-foreground">متوسط الحضور</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(filteredStudents.reduce((sum, s) => sum + s.overallGrade, 0) / filteredStudents.length)}%
                </p>
                <p className="text-sm text-muted-foreground">متوسط الدرجات</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(filteredStudents.reduce((sum, s) => sum + s.behaviorScore, 0) / filteredStudents.length)}%
                </p>
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
              <option value="inactive">غير نشط</option>
              <option value="suspended">موقوف</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة متقدمة
            </Button>
          </div>
        </Card>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">لم يتم العثور على طلاب يطابقون البحث</p>
            </Card>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id} className="p-4 hover:shadow-md transition-shadow">
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenEditModal(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
                            handleDeleteStudent(student.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Modals */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <StudentDetailsModal student={selectedStudent} onClose={() => setIsViewModalOpen(false)} />
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <EditStudentModal 
            student={editingStudent} 
            onSave={handleEditStudent} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

// Add Student Modal Component
const AddStudentModal: React.FC<{
  onAdd: (student: Partial<Student>) => void;
  onClose: () => void;
}> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }
    onAdd(formData);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>إضافة طالب جديد</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل الاسم الكامل"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
          <input
            type="email"
            required
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
          <input
            type="tel"
            className="w-full p-3 border rounded-md"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="أدخل رقم الهاتف"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="أدخل العنوان"
            rows={2}
          />
        </div>
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            إضافة الطالب
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Student Details Modal Component
const StudentDetailsModal: React.FC<{
  student: Student | null;
  onClose: () => void;
}> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>تفاصيل الطالب</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {/* Student Info */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <div className="flex items-center gap-4 mt-2">
              <Badge className={
                student.status === 'active' ? 'bg-green-100 text-green-700' :
                student.status === 'inactive' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }>
                {student.status === 'active' ? 'نشط' : 
                 student.status === 'inactive' ? 'غير نشط' : 'موقوف'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                عضو منذ {student.joinDate}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{student.email}</span>
            </div>
            {student.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
            )}
            {student.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{student.address}</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">آخر نشاط: {student.lastActive}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">الشهادات المكتسبة: {student.certificatesEarned}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">إجمالي ساعات الدراسة: {student.totalHours}</span>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{student.enrolledCourses}</p>
            <p className="text-xs text-muted-foreground">الكورسات المسجلة</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{student.attendanceRate}%</p>
            <p className="text-xs text-muted-foreground">معدل الحضور</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{student.overallGrade}%</p>
            <p className="text-xs text-muted-foreground">متوسط الدرجات</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{student.behaviorScore}%</p>
            <p className="text-xs text-muted-foreground">التقييم السلوكي</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h4 className="font-semibold mb-3">الكورسات المسجلة</h4>
          <div className="space-y-2">
            {student.courses.map((course, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

// Edit Student Modal Component
const EditStudentModal: React.FC<{
  student: Student | null;
  onSave: (student: Student) => void;
  onClose: () => void;
}> = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = React.useState<Student | null>(student);

  React.useEffect(() => {
    setFormData(student);
  }, [student]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>تعديل بيانات الطالب</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
          <input
            type="email"
            required
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
          <input
            type="tel"
            className="w-full p-3 border rounded-md"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <textarea
            className="w-full p-3 border rounded-md"
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الحالة</label>
          <select
            className="w-full p-3 border rounded-md"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'suspended' })}
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="suspended">موقوف</option>
          </select>
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

export default Students;