import React from "react";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
  Edit,
  Save,
  X,
} from "lucide-react";

interface BehaviorRecord {
  id: string;
  studentName: string;
  course: string;
  category:
    | "participation"
    | "punctuality"
    | "cooperation"
    | "respect"
    | "initiative";
  score: number;
  maxScore: number;
  date: string;
  notes: string;
  trend: "up" | "down" | "stable";
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
  trend: "improving" | "declining" | "stable";
  lastUpdated: string;
}

const mockBehaviorRecords: BehaviorRecord[] = [
  {
    id: "1",
    studentName: "أحمد محمد علي",
    course: "أساسيات اللوجستيات",
    category: "participation",
    score: 9,
    maxScore: 10,
    date: "2024-01-22",
    notes: "مشارك فعال في المناقشات",
    trend: "up",
  },
  {
    id: "2",
    studentName: "فاطمة السالم",
    course: "إكسل للمبتدئين",
    category: "cooperation",
    score: 8,
    maxScore: 10,
    date: "2024-01-21",
    notes: "يتعاون بشكل ممتاز مع الزملاء",
    trend: "stable",
  },
  {
    id: "3",
    studentName: "محمد عبد الله",
    course: "التدريب السلوكي",
    category: "punctuality",
    score: 6,
    maxScore: 10,
    date: "2024-01-20",
    notes: "يحتاج لتحسين الالتزام بالمواعيد",
    trend: "down",
  },
];

const mockStudentBehavior: StudentBehavior[] = [
  {
    studentId: "1",
    studentName: "أحمد محمد علي",
    overallScore: 87,
    participationScore: 9,
    punctualityScore: 8,
    cooperationScore: 9,
    respectScore: 10,
    initiativeScore: 8,
    trend: "improving",
    lastUpdated: "2024-01-22",
  },
  {
    studentId: "2",
    studentName: "فاطمة السالم",
    overallScore: 92,
    participationScore: 10,
    punctualityScore: 9,
    cooperationScore: 9,
    respectScore: 9,
    initiativeScore: 9,
    trend: "stable",
    lastUpdated: "2024-01-21",
  },
  {
    studentId: "3",
    studentName: "محمد عبد الله",
    overallScore: 73,
    participationScore: 7,
    punctualityScore: 6,
    cooperationScore: 8,
    respectScore: 8,
    initiativeScore: 7,
    trend: "declining",
    lastUpdated: "2024-01-20",
  },
];

const InstructorBehavior = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentBehavior | null>(null);
  const [newRecord, setNewRecord] = React.useState({
    studentName: "",
    course: "",
    category: "participation" as const,
    score: 10,
    notes: "",
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "participation":
        return "المشاركة";
      case "punctuality":
        return "الالتزام";
      case "cooperation":
        return "التعاون";
      case "respect":
        return "الاحترام";
      case "initiative":
        return "المبادرة";
      default:
        return category;
    }
  };

  const getScoreBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90)
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          ممتاز
        </Badge>
      );
    if (percentage >= 80)
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          جيد جداً
        </Badge>
      );
    if (percentage >= 70)
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          جيد
        </Badge>
      );
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
        يحتاج تحسين
      </Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
      case "improving":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
      case "declining":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case "improving":
        return "في تحسن";
      case "declining":
        return "في تراجع";
      default:
        return "مستقر";
    }
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const filteredStudents = mockStudentBehavior.filter((student) => {
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredRecords = mockBehaviorRecords.filter((record) => {
    const matchesSearch = record.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || record.course === selectedCourse;
    const matchesCategory =
      selectedCategory === "all" || record.category === selectedCategory;
    return matchesSearch && matchesCourse && matchesCategory;
  });

  const handleAddRecord = () => {
    // Here you would normally send the data to your backend
    toast({
      title: "تم إضافة التقييم",
      description: "تم حفظ تقييم الطالب بنجاح",
    });
    setIsAddDialogOpen(false);
    setNewRecord({
      studentName: "",
      course: "",
      category: "participation",
      score: 10,
      notes: "",
    });
  };

  const handleViewStudent = (student: StudentBehavior) => {
    setSelectedStudent(student);
    toast({
      title: "عرض ملف الطالب",
      description: `جاري عرض تفاصيل ${student.studentName}`,
    });
  };

  const handleEditStudent = (student: StudentBehavior) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const averageScore = Math.round(
    mockStudentBehavior.reduce(
      (sum, student) => sum + student.overallScore,
      0
    ) / mockStudentBehavior.length
  );

  const excellentStudents = mockStudentBehavior.filter(
    (s) => s.overallScore >= 90
  ).length;
  const improvingStudents = mockStudentBehavior.filter(
    (s) => s.trend === "improving"
  ).length;
  const needsAttention = mockStudentBehavior.filter(
    (s) => s.overallScore < 70
  ).length;

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">التقييم السلوكي</h1>
            <p className="text-muted-foreground">
              متابعة وتقييم السلوك الأكاديمي للطلاب
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                إضافة تقييم جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة تقييم سلوكي جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">اسم الطالب</Label>
                  <Input
                    id="studentName"
                    value={newRecord.studentName}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        studentName: e.target.value,
                      })
                    }
                    placeholder="أدخل اسم الطالب"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">الكورس</Label>
                  <Select
                    value={newRecord.course}
                    onValueChange={(value) =>
                      setNewRecord({ ...newRecord, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الكورس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="أساسيات اللوجستيات">
                        أساسيات اللوجستيات
                      </SelectItem>
                      <SelectItem value="إكسل للمبتدئين">
                        إكسل للمبتدئين
                      </SelectItem>
                      <SelectItem value="التدريب السلوكي">
                        التدريب السلوكي
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">فئة التقييم</Label>
                  <Select
                    value={newRecord.category}
                    onValueChange={(value: any) =>
                      setNewRecord({ ...newRecord, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participation">المشاركة</SelectItem>
                      <SelectItem value="punctuality">الالتزام</SelectItem>
                      <SelectItem value="cooperation">التعاون</SelectItem>
                      <SelectItem value="respect">الاحترام</SelectItem>
                      <SelectItem value="initiative">المبادرة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">الدرجة (من 10)</Label>
                  <Input
                    id="score"
                    type="number"
                    min="1"
                    max="10"
                    value={newRecord.score}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        score: parseInt(e.target.value) || 10,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    value={newRecord.notes}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, notes: e.target.value })
                    }
                    placeholder="أضف ملاحظاتك هنا..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button onClick={handleAddRecord}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التقييم
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Behavior Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">
                  متوسط التقييم العام
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{excellentStudents}</p>
                <p className="text-sm text-muted-foreground">طلاب متميزون</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{improvingStudents}</p>
                <p className="text-sm text-muted-foreground">في تحسن</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
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
              <Input
                type="text"
                placeholder="البحث عن طالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الكورسات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الكورسات</SelectItem>
                <SelectItem value="أساسيات اللوجستيات">
                  أساسيات اللوجستيات
                </SelectItem>
                <SelectItem value="إكسل للمبتدئين">إكسل للمبتدئين</SelectItem>
                <SelectItem value="التدريب السلوكي">التدريب السلوكي</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الفئات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="participation">المشاركة</SelectItem>
                <SelectItem value="punctuality">الالتزام</SelectItem>
                <SelectItem value="cooperation">التعاون</SelectItem>
                <SelectItem value="respect">الاحترام</SelectItem>
                <SelectItem value="initiative">المبادرة</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCourse("all");
                setSelectedCategory("all");
                toast({
                  title: "تم مسح الفلاتر",
                  description: "تم إعادة تعيين جميع الفلاتر",
                });
              }}
            >
              <X className="h-4 w-4 ml-2" />
              مسح الفلاتر
            </Button>
          </div>
        </Card>

        {/* Student Behavior Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card
              key={student.studentId}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {student.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {student.studentName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        آخر تحديث: {student.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(student.trend)}
                    <span className="text-sm text-muted-foreground">
                      {getTrendLabel(student.trend)}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p
                    className={`text-3xl font-bold ${getOverallScoreColor(
                      student.overallScore
                    )}`}
                  >
                    {student.overallScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">التقييم العام</p>
                  {getScoreBadge(student.overallScore, 100)}
                </div>

                <div className="grid grid-cols-5 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold">
                      {student.participationScore}
                    </p>
                    <p className="text-xs text-muted-foreground">المشاركة</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {student.punctualityScore}
                    </p>
                    <p className="text-xs text-muted-foreground">الالتزام</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {student.cooperationScore}
                    </p>
                    <p className="text-xs text-muted-foreground">التعاون</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {student.respectScore}
                    </p>
                    <p className="text-xs text-muted-foreground">الاحترام</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {student.initiativeScore}
                    </p>
                    <p className="text-xs text-muted-foreground">المبادرة</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    التطور: {getTrendLabel(student.trend)}
                  </span>
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
                      onClick={() => handleEditStudent(student)}
                    >
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
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {record.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium">{record.studentName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {record.course}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {record.notes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {getCategoryLabel(record.category)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {record.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {record.score}/{record.maxScore}
                    </span>
                    {getTrendIcon(record.trend)}
                  </div>

                  {getScoreBadge(record.score, record.maxScore)}
                </div>
              </div>
            ))}
          </div>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>لا توجد سجلات تطابق معايير البحث</p>
            </div>
          )}
        </Card>

        {/* Behavior Categories */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">فئات التقييم السلوكي</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                key: "participation",
                label: "المشاركة",
                icon: Users,
                bgClass: "bg-primary",
              },
              {
                key: "punctuality",
                label: "الالتزام",
                icon: CheckCircle,
                bgClass: "bg-success",
              },
              {
                key: "cooperation",
                label: "التعاون",
                icon: Star,
                bgClass: "bg-accent",
              },
              {
                key: "respect",
                label: "الاحترام",
                icon: Award,
                bgClass: "bg-warning",
              },
              {
                key: "initiative",
                label: "المبادرة",
                icon: TrendingUp,
                bgClass: "bg-secondary",
              },
            ].map((category) => {
              const Icon = category.icon;
              const count = filteredRecords.filter(
                (r) => r.category === category.key
              ).length;
              return (
                <div
                  key={category.key}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedCategory(category.key);
                    toast({
                      title: `فئة ${category.label}`,
                      description: `تم تطبيق فلتر ${category.label}`,
                    });
                  }}
                >
                  <div
                    className={`w-12 h-12 ${category.bgClass} rounded-lg flex items-center justify-center mb-3 mx-auto`}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-medium text-center mb-2">
                    {category.label}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center">
                    {count} تقييم
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
