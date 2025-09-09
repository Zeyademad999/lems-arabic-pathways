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
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">التقييم السلوكي</h1>
          <p className="text-muted-foreground">
            تابع تقييمك السلوكي والمهني من المدربين والشركات المتعاونة
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallBehaviorScore}%</p>
                <p className="text-sm text-muted-foreground">التقييم العام</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{positiveRecords}</p>
                <p className="text-sm text-muted-foreground">تقييمات إيجابية</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{improvementNeeded}</p>
                <p className="text-sm text-muted-foreground">نقاط للتحسين</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockBehaviorRecords.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي التقييمات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Company Evaluations */}
        {mockCompanyEvaluations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">تقييمات الشركات</h2>
            
            {mockCompanyEvaluations.map((evaluation) => (
              <Card key={evaluation.id} className="lems-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-education-primary">
                        {evaluation.company}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{evaluation.evaluationDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>المشرف: {evaluation.supervisor}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{evaluation.overallScore}%</p>
                      <p className="text-xs text-muted-foreground">التقييم العام</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(evaluation.categories).map(([key, value]) => (
                      <div key={key} className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {getCategoryName(key)}
                        </p>
                        <p className={`text-lg font-semibold ${getScoreColor(value, 100)}`}>
                          {value}%
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-sm leading-relaxed">{evaluation.comments}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Behavior Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">سجل التقييمات السلوكية</h2>
          
          <div className="space-y-3">
            {mockBehaviorRecords.map((record) => (
              <Card key={record.id} className="lems-card">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <h3 className="font-semibold text-education-primary">
                          {getCategoryName(record.category)}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {record.course}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>المقيم: {record.evaluator}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed">{record.comments}</p>
                    </div>
                    
                    <div className="text-center p-3 bg-muted/20 rounded-lg min-w-16">
                      <p className={`text-xl font-bold ${getScoreColor(record.score, record.maxScore)}`}>
                        {record.score}/{record.maxScore}
                      </p>
                      <p className="text-xs text-muted-foreground">الدرجة</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvement Recommendations */}
        <Card className="lems-card">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">توصيات للتحسين</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <h4 className="font-medium text-warning mb-2">مهارات التواصل</h4>
                <p className="text-sm text-muted-foreground">
                  يُنصح بالمشاركة أكثر في النقاشات الجماعية وطرح الأسئلة لتحسين مهارات التواصل
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">القيادة</h4>
                <p className="text-sm text-muted-foreground">
                  اطلب المزيد من الفرص لقيادة المشاريع الجماعية لتطوير مهارات القيادة
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <Button className="lems-button-primary">
                <MessageSquare className="h-4 w-4 ml-2" />
                طلب جلسة إرشاد
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Behavior;