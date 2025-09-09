import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  Users,
  BookOpen,
  Award,
  BarChart3,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

const InstructorAnalytics = () => {
  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">التقارير والتحليلات</h1>
          <p className="text-muted-foreground">نظرة شاملة على أداء الطلاب والكورسات</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">الكورسات النشطة</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+2</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">معدل الإتمام</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+5%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.6</p>
                <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+0.2</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">تقدم الطلاب الأسبوعي</h3>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">رسم بياني لتقدم الطلاب</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">معدل الحضور الشهري</h3>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">رسم بياني لمعدل الحضور</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">أفضل الكورسات</h3>
            <div className="space-y-3">
              {[
                { name: 'أساسيات اللوجستيات', score: 92, students: 25 },
                { name: 'إكسل للمبتدئين', score: 89, students: 32 },
                { name: 'التدريب السلوكي', score: 85, students: 18 }
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{course.name}</h4>
                    <p className="text-xs text-muted-foreground">{course.students} طالب</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{course.score}%</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">الطلاب المتميزون</h3>
            <div className="space-y-3">
              {[
                { name: 'فاطمة السالم', score: 96, courses: 3 },
                { name: 'أحمد محمد', score: 94, courses: 4 },
                { name: 'سارة أحمد', score: 91, courses: 2 }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{student.name}</h4>
                    <p className="text-xs text-muted-foreground">{student.courses} كورسات</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">{student.score}%</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">الأنشطة الحديثة</h3>
            <div className="space-y-3">
              {[
                { action: 'تسليم واجب جديد', time: 'منذ ساعة', type: 'assignment' },
                { action: 'إكمال اختبار', time: 'منذ ساعتين', type: 'quiz' },
                { action: 'تسجيل حضور', time: 'منذ 3 ساعات', type: 'attendance' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Activity className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">تقارير مفصلة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تقرير الأداء الشامل</h4>
              <p className="text-sm text-muted-foreground mb-3">تحليل شامل لأداء جميع الطلاب والكورسات</p>
              <Badge variant="outline">PDF</Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تقرير الحضور والغياب</h4>
              <p className="text-sm text-muted-foreground mb-3">تفاصيل حضور الطلاب لكل كورس</p>
              <Badge variant="outline">Excel</Badge>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <h4 className="font-medium mb-2">تقرير التقييمات</h4>
              <p className="text-sm text-muted-foreground mb-3">نتائج الاختبارات والواجبات</p>
              <Badge variant="outline">CSV</Badge>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorAnalytics;