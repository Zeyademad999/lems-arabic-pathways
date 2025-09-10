import React from "react";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { PlagiarismChecker } from "@/components/plagiarism/PlagiarismChecker";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

interface PlagiarismStats {
  totalChecks: number;
  highRiskSubmissions: number;
  averageSimilarity: number;
  recentChecks: number;
}

interface RecentCheck {
  id: string;
  studentName: string;
  assignmentName: string;
  similarity: number;
  timestamp: string;
  status: "high-risk" | "medium-risk" | "low-risk";
}

const mockStats: PlagiarismStats = {
  totalChecks: 156,
  highRiskSubmissions: 12,
  averageSimilarity: 23,
  recentChecks: 8,
};

const mockRecentChecks: RecentCheck[] = [
  {
    id: "1",
    studentName: "أحمد محمد",
    assignmentName: "واجب اللوجستيات",
    similarity: 85,
    timestamp: "2024-01-15T14:30:00",
    status: "high-risk",
  },
  {
    id: "2",
    studentName: "فاطمة علي",
    assignmentName: "بحث إدارة سلسلة التوريد",
    similarity: 45,
    timestamp: "2024-01-15T12:15:00",
    status: "medium-risk",
  },
  {
    id: "3",
    studentName: "محمد حسن",
    assignmentName: "تحليل العمليات",
    similarity: 15,
    timestamp: "2024-01-15T10:45:00",
    status: "low-risk",
  },
  {
    id: "4",
    studentName: "سارة أحمد",
    assignmentName: "واجب اللوجستيات",
    similarity: 72,
    timestamp: "2024-01-15T09:20:00",
    status: "high-risk",
  },
];

const PlagiarismCheckerPage = () => {
  const getRiskColor = (status: string) => {
    switch (status) {
      case "high-risk":
        return "text-red-600";
      case "medium-risk":
        return "text-yellow-600";
      case "low-risk":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskBadge = (status: string) => {
    switch (status) {
      case "high-risk":
        return "destructive";
      case "medium-risk":
        return "secondary";
      case "low-risk":
        return "default";
      default:
        return "outline";
    }
  };

  const getRiskLabel = (status: string) => {
    switch (status) {
      case "high-risk":
        return "خطر عالي";
      case "medium-risk":
        return "خطر متوسط";
      case "low-risk":
        return "خطر منخفض";
      default:
        return status;
    }
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-education-primary">
                فحص الانتحال
              </h1>
              <p className="text-muted-foreground">
                تحقق من أصالة الواجبات والبحوث المقدمة من الطلاب
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الفحوصات</p>
                <p className="text-2xl font-bold">{mockStats.totalChecks}</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">خطر عالي</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockStats.highRiskSubmissions}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">متوسط التشابه</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockStats.averageSimilarity}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">فحوصات اليوم</p>
                <p className="text-2xl font-bold">{mockStats.recentChecks}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Plagiarism Checker */}
        <PlagiarismChecker />

        {/* Recent Checks */}
        <Card className="lems-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                الفحوصات الأخيرة
              </h3>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>

            <div className="space-y-3">
              {mockRecentChecks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{check.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {check.assignmentName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{check.similarity}%</p>
                      <p className="text-xs text-muted-foreground">
                        {(() => {
                          const date = new Date(check.timestamp);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          return `${day}/${month}/${year}`;
                        })()}
                      </p>
                    </div>
                    <Badge variant={getRiskBadge(check.status)}>
                      {getRiskLabel(check.status)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Guidelines */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              إرشادات فحص الانتحال
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-education-primary">
                  مستويات الخطر
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">
                      خطر عالي (70%+): يتطلب مراجعة فورية
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">
                      خطر متوسط (40-69%): مراجعة إضافية مطلوبة
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      خطر منخفض (أقل من 40%): مقبول
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-education-primary">
                  نصائح للاستخدام
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• فحص جميع الواجبات المهمة قبل التقييم</li>
                  <li>• مراجعة النتائج عالية المخاطر بعناية</li>
                  <li>• استخدام التقرير كدليل وليس حكم نهائي</li>
                  <li>• مناقشة النتائج مع الطلاب عند الحاجة</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default PlagiarismCheckerPage;
