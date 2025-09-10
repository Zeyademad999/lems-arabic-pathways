import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  User,
  Calendar,
} from "lucide-react";

interface AssignmentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  assignmentName: string;
  fileName: string;
  submittedAt: string;
  plagiarismCheck?: {
    similarity: number;
    status: "completed" | "processing" | "pending";
    reportId?: string;
    riskLevel: "high" | "medium" | "low";
  };
}

interface AssignmentPlagiarismCheckProps {
  assignmentId: string;
  submissions: AssignmentSubmission[];
  onCheckSubmission: (submissionId: string) => void;
  onViewReport: (reportId: string) => void;
}

// Mock data for assignment submissions
const mockSubmissions: AssignmentSubmission[] = [
  {
    id: "1",
    studentName: "أحمد محمد",
    studentId: "2024001",
    assignmentName: "واجب اللوجستيات",
    fileName: "واجب_اللوجستيات_أحمد_محمد.pdf",
    submittedAt: "2024-01-15T14:30:00",
    plagiarismCheck: {
      similarity: 85,
      status: "completed",
      reportId: "report-001",
      riskLevel: "high",
    },
  },
  {
    id: "2",
    studentName: "فاطمة علي",
    studentId: "2024002",
    assignmentName: "واجب اللوجستيات",
    fileName: "واجب_اللوجستيات_فاطمة_علي.docx",
    submittedAt: "2024-01-15T12:15:00",
    plagiarismCheck: {
      similarity: 45,
      status: "completed",
      reportId: "report-002",
      riskLevel: "medium",
    },
  },
  {
    id: "3",
    studentName: "محمد حسن",
    studentId: "2024003",
    assignmentName: "واجب اللوجستيات",
    fileName: "واجب_اللوجستيات_محمد_حسن.pdf",
    submittedAt: "2024-01-15T10:45:00",
    plagiarismCheck: {
      similarity: 15,
      status: "completed",
      reportId: "report-003",
      riskLevel: "low",
    },
  },
  {
    id: "4",
    studentName: "سارة أحمد",
    studentId: "2024004",
    assignmentName: "واجب اللوجستيات",
    fileName: "واجب_اللوجستيات_سارة_أحمد.pdf",
    submittedAt: "2024-01-15T09:20:00",
    plagiarismCheck: {
      similarity: 0,
      status: "processing",
      riskLevel: "low",
    },
  },
  {
    id: "5",
    studentName: "علي محمود",
    studentId: "2024005",
    assignmentName: "واجب اللوجستيات",
    fileName: "واجب_اللوجستيات_علي_محمود.docx",
    submittedAt: "2024-01-15T08:10:00",
    plagiarismCheck: {
      similarity: 0,
      status: "pending",
      riskLevel: "low",
    },
  },
];

export const AssignmentPlagiarismCheck: React.FC<
  AssignmentPlagiarismCheckProps
> = ({
  assignmentId,
  submissions = mockSubmissions,
  onCheckSubmission,
  onViewReport,
}) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "outline";
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "خطر عالي";
      case "medium":
        return "خطر متوسط";
      case "low":
        return "خطر منخفض";
      default:
        return riskLevel;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600 animate-spin" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "processing":
        return "جاري الفحص";
      case "pending":
        return "في الانتظار";
      default:
        return status;
    }
  };

  const completedChecks = submissions.filter(
    (s) => s.plagiarismCheck?.status === "completed"
  ).length;
  const highRiskSubmissions = submissions.filter(
    (s) => s.plagiarismCheck?.riskLevel === "high"
  ).length;
  const averageSimilarity =
    submissions
      .filter((s) => s.plagiarismCheck?.status === "completed")
      .reduce((acc, s) => acc + (s.plagiarismCheck?.similarity || 0), 0) /
      completedChecks || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-education-primary">
            فحص الانتحال للواجبات
          </h2>
          <p className="text-muted-foreground">
            مراجعة أصالة الواجبات المقدمة من الطلاب
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الفحوصات المكتملة</p>
              <p className="text-2xl font-bold">
                {completedChecks}/{submissions.length}
              </p>
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
                {highRiskSubmissions}
              </p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">متوسط التشابه</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(averageSimilarity)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Submissions List */}
      <Card className="lems-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">الواجبات المقدمة</h3>
            <Button variant="outline" size="sm">
              فحص الكل
            </Button>
          </div>

          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{submission.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.studentId} • {submission.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(submission.submittedAt).toLocaleString(
                          "ar-SA"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {submission.plagiarismCheck ? (
                      <>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(submission.plagiarismCheck.status)}
                            <span className="text-sm font-medium">
                              {getStatusLabel(
                                submission.plagiarismCheck.status
                              )}
                            </span>
                          </div>
                          {submission.plagiarismCheck.status ===
                            "completed" && (
                            <>
                              <p className="text-sm font-medium">
                                {submission.plagiarismCheck.similarity}%
                              </p>
                              <Badge
                                variant={getRiskBadge(
                                  submission.plagiarismCheck.riskLevel
                                )}
                              >
                                {getRiskLabel(
                                  submission.plagiarismCheck.riskLevel
                                )}
                              </Badge>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {submission.plagiarismCheck.status ===
                            "completed" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  onViewReport(
                                    submission.plagiarismCheck!.reportId!
                                  )
                                }
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض التقرير
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 ml-1" />
                                تحميل
                              </Button>
                            </>
                          )}
                          {submission.plagiarismCheck.status === "pending" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => onCheckSubmission(submission.id)}
                            >
                              <Shield className="h-4 w-4 ml-1" />
                              فحص الانتحال
                            </Button>
                          )}
                        </div>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onCheckSubmission(submission.id)}
                      >
                        <Shield className="h-4 w-4 ml-1" />
                        فحص الانتحال
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Processing */}
                {submission.plagiarismCheck?.status === "processing" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>جاري فحص الانتحال...</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                )}

                {/* Similarity Bar for Completed */}
                {submission.plagiarismCheck?.status === "completed" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>نسبة التشابه</span>
                      <span
                        className={getRiskColor(
                          submission.plagiarismCheck.riskLevel
                        )}
                      >
                        {submission.plagiarismCheck.similarity}%
                      </span>
                    </div>
                    <Progress
                      value={submission.plagiarismCheck.similarity}
                      className="h-2"
                    />
                  </div>
                )}
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
                    خطر عالي (70%+): مراجعة فورية مطلوبة
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">
                    خطر متوسط (40-69%): مراجعة إضافية
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">خطر منخفض (أقل من 40%): مقبول</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-education-primary">
                إجراءات المتابعة
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• مراجعة التقارير عالية المخاطر فوراً</li>
                <li>• مناقشة النتائج مع الطلاب عند الحاجة</li>
                <li>• توثيق جميع الإجراءات المتخذة</li>
                <li>• استخدام النتائج كدليل وليس حكم نهائي</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
