import React from 'react';
import { CourseCard } from './CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  BookOpen,
  Users,
  Award,
  Clock
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  status: 'available' | 'enrolled' | 'completed' | 'locked';
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  category: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات اللوجستيات',
    description: 'تعلم المبادئ الأساسية لإدارة سلسلة التوريد والنقل والتخزين في صناعة اللوجستيات',
    instructor: 'د. محمد أحمد',
    duration: '6 أسابيع',
    students: 24,
    rating: 4.8,
    progress: 75,
    status: 'enrolled',
    difficulty: 'مبتدئ',
    category: 'لوجستيات'
  },
  {
    id: '2',
    title: 'التدريب السلوكي المهني',
    description: 'تطوير المهارات السلوكية والمهنية المطلوبة في بيئة العمل اللوجستي',
    instructor: 'أ. فاطمة علي',
    duration: '4 أسابيع',
    students: 18,
    rating: 4.6,
    progress: 40,
    status: 'enrolled',
    difficulty: 'مبتدئ',
    category: 'سلوكي'
  },
  {
    id: '3',
    title: 'إكسل للمبتدئين',
    description: 'إتقان أساسيات برنامج الإكسل وتطبيقاته في العمل اللوجستي',
    instructor: 'أ. حسن محمود',
    duration: '3 أسابيع',
    students: 12,
    rating: 4.9,
    progress: 100,
    status: 'completed',
    difficulty: 'مبتدئ',
    category: 'تقني'
  },
  {
    id: '4',
    title: 'إدارة المخازن المتقدمة',
    description: 'تعلم تقنيات إدارة المخازن الحديثة وأنظمة WMS',
    instructor: 'د. أحمد سالم',
    duration: '8 أسابيع',
    students: 32,
    rating: 4.7,
    status: 'available',
    difficulty: 'متقدم',
    category: 'لوجستيات'
  },
  {
    id: '5',
    title: 'الأمان والسلامة المهنية',
    description: 'معايير الأمان والسلامة في بيئة العمل اللوجستي والمستودعات',
    instructor: 'م. عبد الله يوسف',
    duration: '2 أسابيع',
    students: 15,
    rating: 4.5,
    status: 'locked',
    difficulty: 'متوسط',
    category: 'سلوكي'
  },
  {
    id: '6',
    title: 'إكسل متقدم للوجستيات',
    description: 'الدوال المتقدمة والماكرو في الإكسل لتحليل البيانات اللوجستية',
    instructor: 'أ. ليلى حسن',
    duration: '5 أسابيع',
    students: 8,
    rating: 4.8,
    status: 'available',
    difficulty: 'متقدم',
    category: 'تقني'
  }
];

const categories = ['الكل', 'لوجستيات', 'سلوكي', 'تقني'];
const difficulties = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

export const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('الكل');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('الكل');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'الكل' || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const enrolledCount = mockCourses.filter(c => c.status === 'enrolled').length;
  const completedCount = mockCourses.filter(c => c.status === 'completed').length;
  const availableCount = mockCourses.filter(c => c.status === 'available').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-education-primary">المكتبة التعليمية</h1>
        <p className="text-muted-foreground">
          اختر من مجموعة متنوعة من الكورسات المصممة خصيصاً للتدريب اللوجستي والسلوكي
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{enrolledCount}</p>
              <p className="text-sm text-muted-foreground">كورسات مسجلة</p>
            </div>
          </div>
        </div>

        <div className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-sm text-muted-foreground">كورسات مكتملة</p>
            </div>
          </div>
        </div>

        <div className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{availableCount}</p>
              <p className="text-sm text-muted-foreground">كورسات متاحة</p>
            </div>
          </div>
        </div>

        <div className="lems-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockCourses.length}</p>
              <p className="text-sm text-muted-foreground">إجمالي الكورسات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الكورسات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lems-input pr-10"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فلترة متقدمة
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">التصنيف:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">المستوى:</p>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Badge
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onEnroll={() => console.log('Enroll in course:', course.id)}
            onContinue={() => console.log('Continue course:', course.id)}
            onView={() => console.log('View course:', course.id)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">
            لا توجد كورسات مطابقة للبحث
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            جرب تغيير معايير البحث أو الفلترة
          </p>
        </div>
      )}
    </div>
  );
};