import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Star,
  Target,
  FileText,
  Eye
} from 'lucide-react';

interface BehaviorRecord {
  id: string;
  date: string;
  evaluator: string;
  category: 'punctuality' | 'teamwork' | 'communication' | 'professionalism' | 'discipline';
  score: number;
  maxScore: number;
  comments: string;
  course?: string;
  status: 'positive' | 'neutral' | 'needs_improvement';
}

interface CompanyEvaluation {
  id: string;
  company: string;
  evaluationDate: string;
  overallScore: number;
  categories: {
    punctuality: number;
    workQuality: number;
    teamwork: number;
    communication: number;
    professionalism: number;
  };
  supervisor: string;
  comments: string;
}

const mockBehaviorRecords: BehaviorRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    evaluator: 'أ. فاطمة علي',
    category: 'professionalism',
    score: 9,
    maxScore: 10,
    comments: 'أظهر سلوكاً مهنياً ممتازاً في التعامل مع زملائه والمدرب',
    course: 'التدريب السلوكي المهني',
    status: 'positive'
  },
  {
    id: '2',
    date: '2024-01-12',
    evaluator: 'د. محمد أحمد',
    category: 'punctuality',
    score: 10,
    maxScore: 10,
    comments: 'الحضور في الوقت المحدد دائماً ولم يتغيب أي يوم',
    course: 'أساسيات اللوجستيات',
    status: 'positive'
  },
  {
    id: '3',
    date: '2024-01-10',
    evaluator: 'أ. حسن محمود',
    category: 'teamwork',
    score: 8,
    maxScore: 10,
    comments: 'تعاون جيد مع الفريق ولكن يحتاج لتحسين مهارات القيادة',
    course: 'إكسل للمبتدئين',
    status: 'positive'
  },
  {
    id: '4',
    date: '2024-01-08',
    evaluator: 'أ. فاطمة علي',
    category: 'communication',
    score: 6,
    maxScore: 10,
    comments: 'يحتاج لتحسين مهارات التواصل والتعبير عن الأفكار بوضوح',
    course: 'التدريب السلوكي المهني',
    status: 'needs_improvement'
  }
];

const mockCompanyEvaluations: CompanyEvaluation[] = [
  {
    id: '1',
    company: 'شركة الخليج للشحن',
    evaluationDate: '2024-01-10',
    overallScore: 88,
    categories: {
      punctuality: 95,
      workQuality: 85,
      teamwork: 90,
      communication: 80,
      professionalism: 90
    },
    supervisor: 'م. عبد الله السالم',
    comments: 'طالب مجتهد ومنضبط. يظهر حماساً في التعلم ولديه إمكانيات جيدة للنمو المهني.'
  }
];

const Behavior = () => {
  const getCategoryName = (category: string) => {
    const names = {
      punctuality: 'الالتزام بالمواعيد',
      teamwork: 'العمل الجماعي',
      communication: 'التواصل',
      professionalism: 'المهنية',
      discipline: 'الانضباط'
    };
    return names[category as keyof typeof names] || category;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'text-success';
      case 'needs_improvement':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'needs_improvement':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const overallBehaviorScore = Math.round(
    mockBehaviorRecords.reduce((sum, record) => sum + (record.score / record.maxScore * 100), 0) / mockBehaviorRecords.length
  );

  const positiveRecords = mockBehaviorRecords.filter(r => r.status === 'positive').length;
  const improvementNeeded = mockBehaviorRecords.filter(r => r.status === 'needs_improvement').length;

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">التقييم السلوكي</h1>
          <p className="text-muted-foreground">تابع تقييمك السلوكي والمهني</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-2xl font-bold text-blue-600">{overallBehaviorScore}%</p>
            <p className="text-sm text-muted-foreground">التقييم العام</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-green-600">{positiveRecords}</p>
            <p className="text-sm text-muted-foreground">تقييمات إيجابية</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-orange-500">{improvementNeeded}</p>
            <p className="text-sm text-muted-foreground">للتحسين</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold">{mockBehaviorRecords.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي التقييمات</p>
          </Card>
        </div>

        {/* Company Evaluation */}
        {mockCompanyEvaluations.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">تقييم الشركة</h3>
            {mockCompanyEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{evaluation.company}</p>
                    <p className="text-sm text-muted-foreground">{evaluation.evaluationDate} • {evaluation.supervisor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{evaluation.overallScore}%</p>
                    <p className="text-xs text-muted-foreground">التقييم العام</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-center">
                  {Object.entries(evaluation.categories).map(([key, value]) => (
                    <div key={key} className="p-2 bg-muted/50 rounded">
                      <p className="text-sm font-medium">{value}%</p>
                      <p className="text-xs text-muted-foreground">{getCategoryName(key)}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                  {evaluation.comments}
                </p>
              </div>
            ))}
          </Card>
        )}

        {/* Recent Evaluations */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">التقييمات الأخيرة</h3>
          <div className="space-y-3">
            {mockBehaviorRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium">{getCategoryName(record.category)}</p>
                    <p className="text-sm text-muted-foreground">{record.date} • {record.evaluator}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getScoreColor(record.score, record.maxScore)}`}>
                    {record.score}/{record.maxScore}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Improvement Tips */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">نصائح للتحسين</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground p-3 bg-orange-50 rounded">
              💬 <strong>التواصل:</strong> شارك أكثر في النقاشات وطرح الأسئلة
            </p>
            <p className="text-sm text-muted-foreground p-3 bg-blue-50 rounded">
              👥 <strong>القيادة:</strong> اطلب فرص لقيادة المشاريع الجماعية
            </p>
          </div>
          <Button className="mt-4 w-full">طلب جلسة إرشاد</Button>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Behavior;