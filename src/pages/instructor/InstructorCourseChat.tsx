import React from "react";
import { useParams } from "react-router-dom";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { CourseChat } from "@/components/chat/CourseChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  BookOpen,
  MessageCircle,
  Calendar,
  Clock,
  Settings,
  Crown,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

const InstructorCourseChat = () => {
  const { courseId } = useParams();
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Mock course data
  const courseData = {
    id: courseId || "1",
    title: "أساسيات اللوجستيات",
    description: "تعلم المفاهيم الأساسية في إدارة اللوجستيات وسلسلة التوريد",
    instructor: "د. محمد أحمد",
    enrolledStudents: 24,
    activeMembers: 18,
    lastActivity: "منذ 5 دقائق",
    pendingQuestions: 3,
    unreadMessages: 7,
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <InstructorLayout>
      {!isFullscreen && (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>كورساتي</span>
              <ArrowRight className="h-4 w-4" />
              <span>{courseData.title}</span>
              <ArrowRight className="h-4 w-4" />
              <span>مجموعة الطلاب</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-education-primary flex items-center gap-2">
                  <Crown className="h-6 w-6 text-warning" />
                  مجموعة {courseData.title}
                </h1>
                <p className="text-muted-foreground">
                  إدارة وتفاعل مع طلابك في منصة التواصل
                </p>
              </div>

              <div className="flex items-center gap-3">
                {courseData.pendingQuestions > 0 && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {courseData.pendingQuestions} سؤال معلق
                  </Badge>
                )}
                {courseData.unreadMessages > 0 && (
                  <Badge variant="warning" className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3" />
                    {courseData.unreadMessages} رسالة غير مقروءة
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {courseData.activeMembers} متصل
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructor Controls */}
          <Card className="lems-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Crown className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-education-primary">
                    أدوات المدرب
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    إدارة المجموعة ومراقبة التفاعل
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات المجموعة
                </Button>
                <Button variant="outline" size="sm">
                  <UserCheck className="h-4 w-4 ml-2" />
                  إدارة الأعضاء
                </Button>
                <Button className="lems-button-primary" size="sm">
                  <MessageCircle className="h-4 w-4 ml-2" />
                  إرسال إعلان
                </Button>
              </div>
            </div>
          </Card>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {courseData.enrolledStudents}
                  </p>
                  <p className="text-sm text-muted-foreground">طالب مسجل</p>
                </div>
              </div>
            </Card>

            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {courseData.activeMembers}
                  </p>
                  <p className="text-sm text-muted-foreground">نشط الآن</p>
                </div>
              </div>
            </Card>

            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {courseData.pendingQuestions}
                  </p>
                  <p className="text-sm text-muted-foreground">أسئلة معلقة</p>
                </div>
              </div>
            </Card>

            <Card className="lems-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">معدل التفاعل</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="lems-card p-0 overflow-hidden">
            <CourseChat
              courseId={courseData.id}
              courseName={courseData.title}
              userRole="instructor"
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
          </Card>

          {/* Instructor Guidelines */}
          <Card className="lems-card">
            <div className="space-y-4">
              <h3 className="font-semibold text-education-primary flex items-center gap-2">
                <Crown className="h-4 w-4 text-warning" />
                إرشادات المدرب
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🎯 أفضل الممارسات</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• الرد على الأسئلة خلال 24 ساعة</li>
                    <li>• تشجيع التفاعل بين الطلاب</li>
                    <li>• مشاركة الموارد الإضافية</li>
                    <li>• إرسال تذكيرات مهمة</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">📊 مراقبة المجموعة</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• متابعة الطلاب غير النشطين</li>
                    <li>• تحديد الأسئلة المتكررة</li>
                    <li>• مراقبة جودة المناقشات</li>
                    <li>• تحليل أنماط التفاعل</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Fullscreen Chat */}
      {isFullscreen && (
        <CourseChat
          courseId={courseData.id}
          courseName={courseData.title}
          userRole="instructor"
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
    </InstructorLayout>
  );
};

export default InstructorCourseChat;
