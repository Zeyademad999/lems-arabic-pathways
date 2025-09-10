import React from "react";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus,
  Eye,
  Edit,
  Save,
  X,
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart,
  FileText,
  MessageSquare,
  Flag,
  BookOpen,
  Activity,
  Zap,
  Heart,
  Brain,
  Shield,
  Download,
  Trophy,
  Medal,
  Crown,
} from "lucide-react";

// Enhanced Interfaces
interface BehaviorRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  category: string;
  categoryLabel: string;
  score: number;
  maxScore: number;
  date: string;
  time: string;
  notes: string;
  trend: "up" | "down" | "stable";
  severity: "low" | "medium" | "high";
  instructor: string;
  followUpRequired: boolean;
  parentNotified: boolean;
}

interface StudentBehavior {
  studentId: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  overallScore: number;
  participationScore: number;
  punctualityScore: number;
  cooperationScore: number;
  respectScore: number;
  initiativeScore: number;
  communicationScore: number;
  leadershipScore: number;
  trend: "improving" | "declining" | "stable";
  lastUpdated: string;
  totalRecords: number;
  positiveRecords: number;
  negativeRecords: number;
  warnings: number;
  riskLevel: "low" | "medium" | "high";
  attendanceRate: number;
  engagementLevel: "high" | "medium" | "low";
  achievements: Achievement[];
  goals: BehaviorGoal[];
  interventions: Intervention[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  points: number;
}

interface BehaviorGoal {
  id: string;
  title: string;
  description: string;
  targetScore: number;
  currentScore: number;
  deadline: string;
  status: "active" | "completed" | "overdue";
  progress: number;
}

interface Intervention {
  id: string;
  type: "meeting" | "warning" | "support" | "referral";
  title: string;
  description: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
  outcome?: string;
  nextSteps?: string;
}

// Comprehensive Mock Data
const mockBehaviorRecords: BehaviorRecord[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "أحمد محمد علي",
    course: "أساسيات اللوجستيات",
    category: "participation",
    categoryLabel: "المشاركة",
    score: 9,
    maxScore: 10,
    date: "2024-01-22",
    time: "10:30",
    notes:
      "مشارك فعال في المناقشات، طرح أسئلة ذكية وأسهم في حل المشاكل الجماعية",
    trend: "up",
    severity: "low",
    instructor: "د. سارة أحمد",
    followUpRequired: false,
    parentNotified: false,
  },
  {
    id: "2",
    studentId: "2",
    studentName: "فاطمة السالم",
    course: "إكسل للمبتدئين",
    category: "cooperation",
    categoryLabel: "التعاون",
    score: 8,
    maxScore: 10,
    date: "2024-01-21",
    time: "14:15",
    notes: "يتعاون بشكل ممتاز مع الزملاء، ساعدت 3 طلاب في فهم الدروس",
    trend: "stable",
    severity: "low",
    instructor: "أ. محمد حسن",
    followUpRequired: false,
    parentNotified: false,
  },
  {
    id: "3",
    studentId: "3",
    studentName: "محمد عبد الله",
    course: "التدريب السلوكي",
    category: "punctuality",
    categoryLabel: "الالتزام",
    score: 6,
    maxScore: 10,
    date: "2024-01-20",
    time: "09:45",
    notes: "يحتاج لتحسين الالتزام بالمواعيد، تأخر 15 دقيقة عن بداية المحاضرة",
    trend: "down",
    severity: "medium",
    instructor: "د. علي محمود",
    followUpRequired: true,
    parentNotified: true,
  },
  {
    id: "4",
    studentId: "4",
    studentName: "نورا أحمد",
    course: "أساسيات اللوجستيات",
    category: "initiative",
    categoryLabel: "المبادرة",
    score: 10,
    maxScore: 10,
    date: "2024-01-19",
    time: "11:20",
    notes: "أظهرت مبادرة ممتازة في تنظيم فعالية خيرية للفصل",
    trend: "up",
    severity: "low",
    instructor: "د. سارة أحمد",
    followUpRequired: false,
    parentNotified: true,
  },
  {
    id: "5",
    studentId: "5",
    studentName: "خالد السعد",
    course: "إكسل للمبتدئين",
    category: "respect",
    categoryLabel: "الاحترام",
    score: 4,
    maxScore: 10,
    date: "2024-01-18",
    time: "16:00",
    notes: "تصرف غير لائق مع زميلته، يحتاج لمتابعة عاجلة",
    trend: "down",
    severity: "high",
    instructor: "أ. محمد حسن",
    followUpRequired: true,
    parentNotified: true,
  },
];

const mockStudentBehavior: StudentBehavior[] = [
  {
    studentId: "1",
    studentName: "أحمد محمد علي",
    email: "ahmed.mohamed@email.com",
    phone: "+966501234567",
    course: "أساسيات اللوجستيات",
    overallScore: 87,
    participationScore: 9,
    punctualityScore: 8,
    cooperationScore: 9,
    respectScore: 10,
    initiativeScore: 8,
    communicationScore: 8,
    leadershipScore: 7,
    trend: "improving",
    lastUpdated: "2024-01-22",
    totalRecords: 12,
    positiveRecords: 10,
    negativeRecords: 2,
    warnings: 0,
    riskLevel: "low",
    attendanceRate: 95,
    engagementLevel: "high",
    achievements: [
      {
        id: "1",
        title: "مشارك نشط",
        description: "أكثر من 10 مشاركات إيجابية في الشهر",
        date: "2024-01-20",
        category: "participation",
        points: 50,
      },
    ],
    goals: [
      {
        id: "1",
        title: "تحسين مهارات القيادة",
        description: "زيادة درجة القيادة إلى 8",
        targetScore: 8,
        currentScore: 7,
        deadline: "2024-02-15",
        status: "active",
        progress: 70,
      },
    ],
    interventions: [],
  },
  {
    studentId: "2",
    studentName: "فاطمة السالم",
    email: "fatima.salem@email.com",
    phone: "+966501234568",
    course: "إكسل للمبتدئين",
    overallScore: 92,
    participationScore: 10,
    punctualityScore: 9,
    cooperationScore: 9,
    respectScore: 9,
    initiativeScore: 9,
    communicationScore: 9,
    leadershipScore: 8,
    trend: "stable",
    lastUpdated: "2024-01-21",
    totalRecords: 8,
    positiveRecords: 8,
    negativeRecords: 0,
    warnings: 0,
    riskLevel: "low",
    attendanceRate: 100,
    engagementLevel: "high",
    achievements: [
      {
        id: "2",
        title: "طالبة مثالية",
        description: "درجة سلوكية ممتازة لشهرين متتاليين",
        date: "2024-01-15",
        category: "overall",
        points: 100,
      },
    ],
    goals: [],
    interventions: [],
  },
  {
    studentId: "3",
    studentName: "محمد عبد الله",
    email: "mohamed.abdullah@email.com",
    phone: "+966501234569",
    course: "التدريب السلوكي",
    overallScore: 73,
    participationScore: 7,
    punctualityScore: 6,
    cooperationScore: 8,
    respectScore: 8,
    initiativeScore: 7,
    communicationScore: 7,
    leadershipScore: 6,
    trend: "declining",
    lastUpdated: "2024-01-20",
    totalRecords: 15,
    positiveRecords: 8,
    negativeRecords: 7,
    warnings: 2,
    riskLevel: "medium",
    attendanceRate: 78,
    engagementLevel: "medium",
    achievements: [],
    goals: [
      {
        id: "2",
        title: "تحسين الالتزام",
        description: "زيادة درجة الالتزام إلى 8",
        targetScore: 8,
        currentScore: 6,
        deadline: "2024-02-01",
        status: "active",
        progress: 30,
      },
    ],
    interventions: [
      {
        id: "1",
        type: "meeting",
        title: "اجتماع مع الطالب",
        description: "مناقشة مشاكل الالتزام والحضور",
        date: "2024-01-25",
        status: "scheduled",
        nextSteps: "متابعة الحضور والالتزام",
      },
    ],
  },
  {
    studentId: "4",
    studentName: "نورا أحمد",
    email: "nora.ahmed@email.com",
    phone: "+966501234570",
    course: "أساسيات اللوجستيات",
    overallScore: 89,
    participationScore: 9,
    punctualityScore: 9,
    cooperationScore: 9,
    respectScore: 9,
    initiativeScore: 10,
    communicationScore: 8,
    leadershipScore: 9,
    trend: "improving",
    lastUpdated: "2024-01-19",
    totalRecords: 6,
    positiveRecords: 6,
    negativeRecords: 0,
    warnings: 0,
    riskLevel: "low",
    attendanceRate: 98,
    engagementLevel: "high",
    achievements: [
      {
        id: "3",
        title: "قائدة نشطة",
        description: "تنظيم فعالية خيرية ناجحة",
        date: "2024-01-19",
        category: "leadership",
        points: 75,
      },
    ],
    goals: [],
    interventions: [],
  },
  {
    studentId: "5",
    studentName: "خالد السعد",
    email: "khalid.alsad@email.com",
    phone: "+966501234571",
    course: "إكسل للمبتدئين",
    overallScore: 65,
    participationScore: 6,
    punctualityScore: 7,
    cooperationScore: 5,
    respectScore: 4,
    initiativeScore: 6,
    communicationScore: 6,
    leadershipScore: 5,
    trend: "declining",
    lastUpdated: "2024-01-18",
    totalRecords: 10,
    positiveRecords: 4,
    negativeRecords: 6,
    warnings: 3,
    riskLevel: "high",
    attendanceRate: 85,
    engagementLevel: "low",
    achievements: [],
    goals: [
      {
        id: "3",
        title: "تحسين الاحترام",
        description: "زيادة درجة الاحترام إلى 7",
        targetScore: 7,
        currentScore: 4,
        deadline: "2024-02-10",
        status: "active",
        progress: 20,
      },
    ],
    interventions: [
      {
        id: "2",
        type: "warning",
        title: "تحذير رسمي",
        description: "تحذير بسبب التصرف غير اللائق",
        date: "2024-01-18",
        status: "completed",
        outcome: "تم إعطاء التحذير ووضع خطة تحسين",
        nextSteps: "متابعة السلوك وإعادة التقييم",
      },
    ],
  },
];

const InstructorBehavior = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = React.useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isStudentDetailOpen, setIsStudentDetailOpen] = React.useState(false);
  const [isInterventionDialogOpen, setIsInterventionDialogOpen] =
    React.useState(false);
  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentBehavior | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [newRecord, setNewRecord] = React.useState({
    studentId: "",
    studentName: "",
    course: "",
    category: "participation",
    score: 10,
    notes: "",
    severity: "low" as const,
    followUpRequired: false,
  });
  const [newIntervention, setNewIntervention] = React.useState({
    type: "meeting" as const,
    title: "",
    description: "",
    date: "",
    nextSteps: "",
  });

  // Helper Functions
  const getScoreBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90)
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          ممتاز
        </Badge>
      );
    if (percentage >= 80)
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          جيد جداً
        </Badge>
      );
    if (percentage >= 70)
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          جيد
        </Badge>
      );
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        يحتاج تحسين
      </Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
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
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRiskLevelLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "منخفض";
      case "medium":
        return "متوسط";
      case "high":
        return "عالي";
      default:
        return "غير محدد";
    }
  };

  const getEngagementLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getEngagementLevelLabel = (level: string) => {
    switch (level) {
      case "high":
        return "عالي";
      case "medium":
        return "متوسط";
      case "low":
        return "منخفض";
      default:
        return "غير محدد";
    }
  };

  // Filter Functions
  const filteredStudents = mockStudentBehavior.filter((student) => {
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;
    const matchesRisk =
      selectedRiskLevel === "all" || student.riskLevel === selectedRiskLevel;
    return matchesSearch && matchesCourse && matchesRisk;
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

  // Event Handlers
  const handleAddRecord = () => {
    toast({
      title: "تم إضافة التقييم",
      description: "تم حفظ تقييم الطالب بنجاح",
    });
    setIsAddDialogOpen(false);
    setNewRecord({
      studentId: "",
      studentName: "",
      course: "",
      category: "participation",
      score: 10,
      notes: "",
      severity: "low",
      followUpRequired: false,
    });
  };

  const handleViewStudent = (student: StudentBehavior) => {
    setSelectedStudent(student);
    setIsStudentDetailOpen(true);
  };

  const handleAddIntervention = (student: StudentBehavior) => {
    setSelectedStudent(student);
    setIsInterventionDialogOpen(true);
  };

  const handleSaveIntervention = () => {
    toast({
      title: "تم إضافة التدخل",
      description: "تم حفظ التدخل السلوكي بنجاح",
    });
    setIsInterventionDialogOpen(false);
    setNewIntervention({
      type: "meeting",
      title: "",
      description: "",
      date: "",
      nextSteps: "",
    });
  };

  const handleExportData = () => {
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير تقرير السلوك بنجاح",
    });
  };

  // Statistics
  const totalStudents = mockStudentBehavior.length;
  const averageScore = Math.round(
    mockStudentBehavior.reduce(
      (sum, student) => sum + student.overallScore,
      0
    ) / totalStudents
  );
  const excellentStudents = mockStudentBehavior.filter(
    (s) => s.overallScore >= 90
  ).length;
  const improvingStudents = mockStudentBehavior.filter(
    (s) => s.trend === "improving"
  ).length;
  const decliningStudents = mockStudentBehavior.filter(
    (s) => s.trend === "declining"
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
            <h1 className="text-3xl font-bold text-education-primary">
              نظام إدارة السلوك المتقدم
            </h1>
            <p className="text-muted-foreground mt-2">
              متابعة وتقييم شامل للسلوك الأكاديمي والاجتماعي للطلاب مع أدوات
              التحليل والتدخل
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="lems-button-primary">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة تقييم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    إضافة تقييم سلوكي جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">اسم الطالب</Label>
                      <Select
                        value={newRecord.studentId}
                        onValueChange={(value) => {
                          const student = mockStudentBehavior.find(
                            (s) => s.studentId === value
                          );
                          setNewRecord({
                            ...newRecord,
                            studentId: value,
                            studentName: student?.studentName || "",
                            course: student?.course || "",
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الطالب" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStudentBehavior.map((student) => (
                            <SelectItem
                              key={student.studentId}
                              value={student.studentId}
                            >
                              {student.studentName} - {student.course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">فئة التقييم</Label>
                      <Select
                        value={newRecord.category}
                        onValueChange={(value) =>
                          setNewRecord({ ...newRecord, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participation">
                            المشاركة
                          </SelectItem>
                          <SelectItem value="punctuality">الالتزام</SelectItem>
                          <SelectItem value="cooperation">التعاون</SelectItem>
                          <SelectItem value="respect">الاحترام</SelectItem>
                          <SelectItem value="initiative">المبادرة</SelectItem>
                          <SelectItem value="communication">التواصل</SelectItem>
                          <SelectItem value="leadership">القيادة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="severity">مستوى الخطورة</Label>
                      <Select
                        value={newRecord.severity}
                        onValueChange={(value: any) =>
                          setNewRecord({ ...newRecord, severity: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفض</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="high">عالي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات مفصلة</Label>
                    <Textarea
                      id="notes"
                      value={newRecord.notes}
                      onChange={(e) =>
                        setNewRecord({ ...newRecord, notes: e.target.value })
                      }
                      placeholder="أضف ملاحظاتك التفصيلية هنا..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="followUp"
                        checked={newRecord.followUpRequired}
                        onChange={(e) =>
                          setNewRecord({
                            ...newRecord,
                            followUpRequired: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <Label htmlFor="followUp">يتطلب متابعة</Label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      إلغاء
                    </Button>
                    <Button
                      onClick={handleAddRecord}
                      className="lems-button-primary"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      حفظ التقييم
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {averageScore}%
                </p>
                <p className="text-sm text-muted-foreground">
                  متوسط التقييم العام
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +3% من الشهر الماضي
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">
                  {excellentStudents}
                </p>
                <p className="text-sm text-muted-foreground">طلاب متميزون</p>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round((excellentStudents / totalStudents) * 100)}% من
                  إجمالي الطلاب
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">
                  {improvingStudents}
                </p>
                <p className="text-sm text-muted-foreground">في تحسن</p>
                <p className="text-xs text-green-600 mt-1">تحسن ملحوظ</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-red-600">
                  {needsAttention}
                </p>
                <p className="text-sm text-muted-foreground">يحتاج متابعة</p>
                <p className="text-xs text-red-600 mt-1">يتطلب تدخل عاجل</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="البحث عن طالب أو تقييم..."
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
                <SelectItem value="communication">التواصل</SelectItem>
                <SelectItem value="leadership">القيادة</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedRiskLevel}
              onValueChange={setSelectedRiskLevel}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع المستويات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="low">منخفض</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCourse("all");
                setSelectedCategory("all");
                setSelectedRiskLevel("all");
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

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              الطلاب
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              السجلات
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger
              value="interventions"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              التدخلات
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">إحصائيات سريعة</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      إجمالي الطلاب
                    </span>
                    <span className="font-semibold">{totalStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      متوسط التقييم
                    </span>
                    <span className="font-semibold text-blue-600">
                      {averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      طلاب متميزون
                    </span>
                    <span className="font-semibold text-green-600">
                      {excellentStudents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      يحتاج متابعة
                    </span>
                    <span className="font-semibold text-red-600">
                      {needsAttention}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Risk Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  توزيع مستوى المخاطر
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">منخفض</span>
                    </div>
                    <span className="font-semibold">
                      {
                        mockStudentBehavior.filter((s) => s.riskLevel === "low")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">متوسط</span>
                    </div>
                    <span className="font-semibold">
                      {
                        mockStudentBehavior.filter(
                          (s) => s.riskLevel === "medium"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">عالي</span>
                    </div>
                    <span className="font-semibold">
                      {
                        mockStudentBehavior.filter(
                          (s) => s.riskLevel === "high"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">النشاط الأخير</h3>
              <div className="space-y-3">
                {mockBehaviorRecords.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {record.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {record.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.categoryLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {record.score}/10
                      </span>
                      {getTrendIcon(record.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
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
                            {student.course}
                          </p>
                          <p className="text-xs text-muted-foreground">
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
                      <p className="text-sm text-muted-foreground">
                        التقييم العام
                      </p>
                      {getScoreBadge(student.overallScore, 100)}
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-lg font-semibold">
                          {student.participationScore}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          المشاركة
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">
                          {student.punctualityScore}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          الالتزام
                        </p>
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
                        <p className="text-xs text-muted-foreground">
                          الاحترام
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        <Badge className={getRiskLevelColor(student.riskLevel)}>
                          {getRiskLevelLabel(student.riskLevel)}
                        </Badge>
                        <Badge
                          className={getEngagementLevelColor(
                            student.engagementLevel
                          )}
                        >
                          {getEngagementLevelLabel(student.engagementLevel)}
                        </Badge>
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
                          onClick={() => handleAddIntervention(student)}
                        >
                          <Target className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">سجلات السلوك</h3>
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
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {record.instructor}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {record.date} - {record.time}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {record.categoryLabel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.severity}
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">متوسطات الفئات</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">المشاركة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="w-20" />
                      <span className="text-sm font-semibold">8.2</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">الالتزام</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20" />
                      <span className="text-sm font-semibold">7.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">التعاون</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={80} className="w-20" />
                      <span className="text-sm font-semibold">8.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">الاحترام</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={80} className="w-20" />
                      <span className="text-sm font-semibold">8.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">المبادرة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={80} className="w-20" />
                      <span className="text-sm font-semibold">8.0</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  الاتجاهات الشهرية
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ديسمبر 2023</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20" />
                      <span className="text-sm font-semibold">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">يناير 2024</span>
                    <div className="flex items-center gap-2">
                      <Progress value={81} className="w-20" />
                      <span className="text-sm font-semibold">81%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">التدخلات السلوكية</h3>
              <div className="space-y-4">
                {mockStudentBehavior
                  .filter((s) => s.interventions.length > 0)
                  .map((student) => (
                    <div
                      key={student.studentId}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{student.studentName}</h4>
                        <Badge className={getRiskLevelColor(student.riskLevel)}>
                          {getRiskLevelLabel(student.riskLevel)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {student.interventions.map((intervention) => (
                          <div
                            key={intervention.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {intervention.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {intervention.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {intervention.date}
                              </p>
                            </div>
                            <Badge
                              variant={
                                intervention.status === "completed"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {intervention.status === "completed"
                                ? "مكتمل"
                                : "مجدول"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                {mockStudentBehavior.filter((s) => s.interventions.length === 0)
                  .length > 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد تدخلات حالية</p>
                    <p className="text-sm">
                      يمكنك إضافة تدخلات جديدة من خلال النقر على أيقونة الهدف
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Student Detail Modal */}
        <Dialog
          open={isStudentDetailOpen}
          onOpenChange={setIsStudentDetailOpen}
        >
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                تفاصيل الطالب
              </DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                        {selectedStudent.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {selectedStudent.studentName}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedStudent.course}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedStudent.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          التقييم العام
                        </p>
                        <p
                          className={`text-2xl font-bold ${getOverallScoreColor(
                            selectedStudent.overallScore
                          )}`}
                        >
                          {selectedStudent.overallScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          معدل الحضور
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedStudent.attendanceRate}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Badge
                        className={getRiskLevelColor(selectedStudent.riskLevel)}
                      >
                        {getRiskLevelLabel(selectedStudent.riskLevel)}
                      </Badge>
                      <Badge
                        className={getEngagementLevelColor(
                          selectedStudent.engagementLevel
                        )}
                      >
                        {getEngagementLevelLabel(
                          selectedStudent.engagementLevel
                        )}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">المشاركة</span>
                        <span className="text-sm font-semibold">
                          {selectedStudent.participationScore}/10
                        </span>
                      </div>
                      <Progress
                        value={selectedStudent.participationScore * 10}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">الالتزام</span>
                        <span className="text-sm font-semibold">
                          {selectedStudent.punctualityScore}/10
                        </span>
                      </div>
                      <Progress value={selectedStudent.punctualityScore * 10} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">التعاون</span>
                        <span className="text-sm font-semibold">
                          {selectedStudent.cooperationScore}/10
                        </span>
                      </div>
                      <Progress value={selectedStudent.cooperationScore * 10} />
                    </div>
                  </div>
                </div>

                {selectedStudent.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">الإنجازات</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedStudent.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium text-sm">
                              {achievement.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {achievement.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStudent.goals.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">الأهداف</h4>
                    <div className="space-y-3">
                      {selectedStudent.goals.map((goal) => (
                        <div key={goal.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">
                              {goal.title}
                            </span>
                            <Badge
                              variant={
                                goal.status === "completed"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {goal.status === "completed" ? "مكتمل" : "نشط"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {goal.description}
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>
                                {goal.currentScore}/{goal.targetScore}
                              </span>
                              <span>{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Intervention Modal */}
        <Dialog
          open={isInterventionDialogOpen}
          onOpenChange={setIsInterventionDialogOpen}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة تدخل سلوكي</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="interventionType">نوع التدخل</Label>
                <Select
                  value={newIntervention.type}
                  onValueChange={(value: any) =>
                    setNewIntervention({ ...newIntervention, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">اجتماع</SelectItem>
                    <SelectItem value="warning">تحذير</SelectItem>
                    <SelectItem value="support">دعم</SelectItem>
                    <SelectItem value="referral">إحالة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interventionTitle">عنوان التدخل</Label>
                <Input
                  id="interventionTitle"
                  value={newIntervention.title}
                  onChange={(e) =>
                    setNewIntervention({
                      ...newIntervention,
                      title: e.target.value,
                    })
                  }
                  placeholder="أدخل عنوان التدخل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interventionDescription">الوصف</Label>
                <Textarea
                  id="interventionDescription"
                  value={newIntervention.description}
                  onChange={(e) =>
                    setNewIntervention({
                      ...newIntervention,
                      description: e.target.value,
                    })
                  }
                  placeholder="أدخل وصف التدخل"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interventionDate">التاريخ</Label>
                <Input
                  id="interventionDate"
                  type="date"
                  value={newIntervention.date}
                  onChange={(e) =>
                    setNewIntervention({
                      ...newIntervention,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextSteps">الخطوات التالية</Label>
                <Textarea
                  id="nextSteps"
                  value={newIntervention.nextSteps}
                  onChange={(e) =>
                    setNewIntervention({
                      ...newIntervention,
                      nextSteps: e.target.value,
                    })
                  }
                  placeholder="أدخل الخطوات التالية"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsInterventionDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleSaveIntervention}
                  className="lems-button-primary"
                >
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التدخل
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
};

export default InstructorBehavior;
