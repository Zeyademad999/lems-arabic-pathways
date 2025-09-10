import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Copy,
  ExternalLink,
  Shield,
  FileCheck,
  Percent,
  Calendar,
  User,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlagiarismResult {
  id: string;
  similarity: number;
  source: string;
  url?: string;
  matchedText: string;
  originalText: string;
  confidence: number;
  type: "exact" | "paraphrase" | "similar";
}

interface PlagiarismReport {
  id: string;
  documentName: string;
  overallSimilarity: number;
  totalWords: number;
  checkedWords: number;
  results: PlagiarismResult[];
  timestamp: string;
  status: "completed" | "processing" | "error";
  studentName?: string;
  assignmentName?: string;
}

interface PlagiarismCheckerProps {
  onReportGenerated?: (report: PlagiarismReport) => void;
}

// Mock data for plagiarism results
const mockPlagiarismResults: PlagiarismResult[] = [
  {
    id: "1",
    similarity: 85,
    source: "Wikipedia - Logistics",
    url: "https://en.wikipedia.org/wiki/Logistics",
    matchedText:
      "اللوجستيات هي إدارة تدفق الموارد بين نقطة المنشأ ونقطة الاستهلاك",
    originalText:
      "اللوجستيات هي إدارة تدفق الموارد بين نقطة المنشأ ونقطة الاستهلاك لتلبية متطلبات العملاء أو الشركات",
    confidence: 95,
    type: "exact",
  },
  {
    id: "2",
    similarity: 72,
    source: "Academic Paper - Supply Chain Management",
    url: "https://example.com/paper1",
    matchedText: "إدارة سلسلة التوريد تشمل تخطيط وتنفيذ ومراقبة الأنشطة",
    originalText:
      "إدارة سلسلة التوريد تشمل تخطيط وتنفيذ ومراقبة الأنشطة اللوجستية بكفاءة",
    confidence: 88,
    type: "paraphrase",
  },
  {
    id: "3",
    similarity: 45,
    source: "Textbook - Business Operations",
    url: "https://example.com/textbook",
    matchedText: "العمليات التجارية تتطلب تنسيق بين مختلف الأقسام",
    originalText:
      "العمليات التجارية الناجحة تتطلب تنسيق فعال بين مختلف الأقسام والإدارات",
    confidence: 65,
    type: "similar",
  },
];

const mockPlagiarismReport: PlagiarismReport = {
  id: "report-001",
  documentName: "واجب اللوجستيات - أحمد محمد.pdf",
  overallSimilarity: 67,
  totalWords: 1250,
  checkedWords: 1180,
  results: mockPlagiarismResults,
  timestamp: "2024-01-15T14:30:00",
  status: "completed",
  studentName: "أحمد محمد",
  assignmentName: "واجب اللوجستيات",
};

export const PlagiarismChecker: React.FC<PlagiarismCheckerProps> = ({
  onReportGenerated,
}) => {
  const [text, setText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentReport, setCurrentReport] =
    React.useState<PlagiarismReport | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const handleTextCheck = async () => {
    if (!text.trim()) return;

    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const report: PlagiarismReport = {
      ...mockPlagiarismReport,
      id: `report-${Date.now()}`,
      documentName: "نص مكتوب",
      timestamp: new Date().toISOString(),
      overallSimilarity: Math.floor(Math.random() * 40) + 20, // Random similarity 20-60%
    };

    setCurrentReport(report);
    setIsProcessing(false);
    onReportGenerated?.(report);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileCheck = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const report: PlagiarismReport = {
      ...mockPlagiarismReport,
      id: `report-${Date.now()}`,
      documentName: uploadedFile.name,
      timestamp: new Date().toISOString(),
      overallSimilarity: Math.floor(Math.random() * 50) + 15, // Random similarity 15-65%
    };

    setCurrentReport(report);
    setIsProcessing(false);
    onReportGenerated?.(report);
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 70) return "text-red-600";
    if (similarity >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getSimilarityBadge = (similarity: number) => {
    if (similarity >= 70) return "destructive";
    if (similarity >= 40) return "secondary";
    return "default";
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "exact":
        return "مطابق تماماً";
      case "paraphrase":
        return "إعادة صياغة";
      case "similar":
        return "مشابه";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-education-primary">
              فحص الانتحال
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="max-w-sm bg-black text-white border-black"
                >
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-white">
                      أداة فحص الانتحال
                    </p>
                    <p className="text-white">
                      يمكنك فحص النصوص بطريقتين: إدخال النص مباشرة أو رفع ملف.
                      الأداة ستقارن المحتوى مع قاعدة بيانات ضخمة وتوفر تقرير
                      مفصل عن نسبة التشابه.
                    </p>
                    <p className="font-semibold mt-2 text-white">الميزات:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-white">
                      <li>فحص النصوص المباشرة</li>
                      <li>رفع ملفات PDF, Word, TXT</li>
                      <li>تقرير مفصل مع المصادر</li>
                      <li>نسبة التشابه الدقيقة</li>
                      <li>تحديد النصوص المطابقة</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground">
            تحقق من أصالة النصوص والواجبات المقدمة
          </p>
        </div>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            فحص النص
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            رفع ملف
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Card className="lems-card">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  أدخل النص للفحص
                </label>
                <Textarea
                  placeholder="الصق النص هنا للتحقق من الانتحال..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {text.length} حرف
                </p>
              </div>
              <Button
                onClick={handleTextCheck}
                disabled={!text.trim() || isProcessing}
                className="lems-button-primary w-full"
              >
                {isProcessing ? (
                  <>
                    <Clock className="h-4 w-4 ml-2 animate-spin" />
                    جاري الفحص...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 ml-2" />
                    فحص النص
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <Card className="lems-card">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  رفع ملف للفحص
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    اسحب الملف هنا أو انقر للاختيار
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                  {uploadedFile && (
                    <div className="mt-3 p-2 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={handleFileCheck}
                disabled={!uploadedFile || isProcessing}
                className="lems-button-primary w-full"
              >
                {isProcessing ? (
                  <>
                    <Clock className="h-4 w-4 ml-2 animate-spin" />
                    جاري معالجة الملف...
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4 ml-2" />
                    فحص الملف
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Processing Indicator */}
      {isProcessing && (
        <Card className="lems-card">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <Clock className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold">جاري فحص المحتوى...</h3>
              <p className="text-sm text-muted-foreground">
                يرجى الانتظار بينما نقوم بتحليل النص ومقارنته مع قاعدة البيانات
              </p>
            </div>
            <Progress value={75} className="w-full max-w-md mx-auto" />
          </div>
        </Card>
      )}

      {/* Results */}
      {currentReport && !isProcessing && (
        <div className="space-y-4">
          {/* Summary Card */}
          <Card className="lems-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">نتائج الفحص</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={getSimilarityBadge(
                      currentReport.overallSimilarity
                    )}
                  >
                    {currentReport.overallSimilarity}% تشابه
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-education-primary">
                    {currentReport.overallSimilarity}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    نسبة التشابه الإجمالية
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-education-primary">
                    {currentReport.results.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    مصادر مشابهة
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-education-primary">
                    {currentReport.totalWords}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    إجمالي الكلمات
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>نسبة التشابه</span>
                  <span
                    className={getSimilarityColor(
                      currentReport.overallSimilarity
                    )}
                  >
                    {currentReport.overallSimilarity}%
                  </span>
                </div>
                <Progress
                  value={currentReport.overallSimilarity}
                  className="h-2"
                />
              </div>
            </div>
          </Card>

          {/* Detailed Results */}
          <Card className="lems-card">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">التفاصيل</h3>
              <div className="space-y-3">
                {currentReport.results.map((result) => (
                  <div
                    key={result.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={getSimilarityBadge(result.similarity)}
                          >
                            {result.similarity}%
                          </Badge>
                          <Badge variant="outline">
                            {getTypeLabel(result.type)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ثقة: {result.confidence}%
                          </span>
                        </div>
                        <h4 className="font-medium text-sm mb-1">
                          {result.source}
                        </h4>
                        {result.url && (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            عرض المصدر
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          النص المطابق:
                        </p>
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                          {result.matchedText}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          النص الأصلي:
                        </p>
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                          {result.originalText}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3 ml-1" />
                        نسخ
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Report Info */}
          <Card className="lems-card">
            <div className="space-y-3">
              <h3 className="font-semibold">معلومات التقرير</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">اسم الملف:</span>
                  <span>{currentReport.documentName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">تاريخ الفحص:</span>
                  <span>
                    {new Date(currentReport.timestamp).toLocaleString("ar-SA")}
                  </span>
                </div>
                {currentReport.studentName && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">الطالب:</span>
                    <span>{currentReport.studentName}</span>
                  </div>
                )}
                {currentReport.assignmentName && (
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">الواجب:</span>
                    <span>{currentReport.assignmentName}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
