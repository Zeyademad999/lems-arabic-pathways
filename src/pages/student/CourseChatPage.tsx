import React from "react";
import { useParams } from "react-router-dom";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
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
} from "lucide-react";

const CourseChatPage = () => {
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
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <LEMSLayout userRole="student">
      {!isFullscreen && (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>الكورسات</span>
              <ArrowRight className="h-4 w-4" />
              <span>{courseData.title}</span>
              <ArrowRight className="h-4 w-4" />
              <span>المجموعة</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-education-primary">
                  مجموعة {courseData.title}
                </h1>
                <p className="text-muted-foreground">
                  منصة التواصل والتفاعل مع زملائك ومعلمك
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {courseData.activeMembers} متصل
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <MessageCircle className="h-3 w-3" />
                  نشط
                </Badge>
              </div>
            </div>
          </div>

          {/* Course Info Card */}
          <Card className="lems-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-education-primary">
                    {courseData.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {courseData.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{courseData.enrolledStudents} طالب</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>آخر نشاط: {courseData.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 ml-2" />
                  جدول الدروس
                </Button>
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 ml-2" />
                  محتوى الكورس
                </Button>
              </div>
            </div>
          </Card>

          {/* Chat Interface */}
          <Card className="lems-card p-0 overflow-hidden">
            <CourseChat
              courseId={courseData.id}
              courseName={courseData.title}
              userRole="student"
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
          </Card>

          {/* Chat Guidelines */}
          <Card className="lems-card">
            <div className="space-y-4">
              <h3 className="font-semibold text-education-primary">
                إرشادات المجموعة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">✅ مسموح</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• طرح الأسئلة الأكاديمية</li>
                    <li>• مشاركة الموارد المفيدة</li>
                    <li>• مناقشة مواضيع الكورس</li>
                    <li>• طلب المساعدة من الزملاء</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">❌ ممنوع</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• المحتوى غير المناسب</li>
                    <li>• الرسائل المكررة</li>
                    <li>• الإعلانات التجارية</li>
                    <li>• المحادثات الشخصية</li>
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
          userRole="student"
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
    </LEMSLayout>
  );
};

export default CourseChatPage;
