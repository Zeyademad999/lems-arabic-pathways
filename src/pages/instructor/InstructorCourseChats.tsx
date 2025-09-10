import React from "react";
import { useNavigate } from "react-router-dom";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  BookOpen,
  Clock,
  Crown,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  Plus,
} from "lucide-react";

interface CourseChat {
  id: string;
  title: string;
  description: string;
  enrolledStudents: number;
  activeMembers: number;
  lastMessage: {
    sender: string;
    message: string;
    timestamp: string;
  };
  unreadCount: number;
  pendingQuestions: number;
  isOnline: boolean;
  completionRate: number;
}

const InstructorCourseChats = () => {
  const navigate = useNavigate();

  // Mock data for instructor course chats
  const courseChats: CourseChat[] = [
    {
      id: "1",
      title: "أساسيات اللوجستيات",
      description: "مجموعة مناقشة كورس أساسيات اللوجستيات وسلسلة التوريد",
      enrolledStudents: 24,
      activeMembers: 18,
      lastMessage: {
        sender: "أحمد محمد",
        message: "هل يمكننا مناقشة بعض الأمثلة العملية في اللوجستيات؟",
        timestamp: "منذ 5 دقائق",
      },
      unreadCount: 7,
      pendingQuestions: 3,
      isOnline: true,
      completionRate: 78,
    },
    {
      id: "2",
      title: "التدريب السلوكي المهني",
      description: "مجموعة مناقشة كورس التدريب السلوكي والمهني",
      enrolledStudents: 18,
      activeMembers: 12,
      lastMessage: {
        sender: "فاطمة علي",
        message: "شكراً على الدرس الممتاز اليوم!",
        timestamp: "منذ ساعة",
      },
      unreadCount: 2,
      pendingQuestions: 1,
      isOnline: true,
      completionRate: 65,
    },
    {
      id: "3",
      title: "إكسل للمبتدئين",
      description: "مجموعة مناقشة كورس تعلم إكسل من الصفر",
      enrolledStudents: 15,
      activeMembers: 8,
      lastMessage: {
        sender: "محمد حسن",
        message: "هل يمكنك توضيح كيفية استخدام الدوال المتقدمة؟",
        timestamp: "منذ 3 ساعات",
      },
      unreadCount: 0,
      pendingQuestions: 0,
      isOnline: false,
      completionRate: 90,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const handleChatClick = (courseId: string) => {
    navigate(`/instructor/courses/${courseId}/chat`);
  };

  const totalUnread = courseChats.reduce(
    (sum, chat) => sum + chat.unreadCount,
    0
  );
  const totalPending = courseChats.reduce(
    (sum, chat) => sum + chat.pendingQuestions,
    0
  );
  const totalActive = courseChats.reduce(
    (sum, chat) => sum + chat.activeMembers,
    0
  );

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>إدارة مجموعات الكورسات</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-education-primary flex items-center gap-2">
                <Crown className="h-6 w-6 text-warning" />
                مجموعات الكورسات
              </h1>
              <p className="text-muted-foreground">
                إدارة وتفاعل مع مجموعات النقاش في كورساتك
              </p>
            </div>

            <div className="flex items-center gap-3">
              {totalPending > 0 && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="h-3 w-3" />
                  {totalPending} سؤال معلق
                </Badge>
              )}
              {totalUnread > 0 && (
                <Badge variant="warning" className="flex items-center gap-2">
                  <MessageCircle className="h-3 w-3" />
                  {totalUnread} رسالة غير مقروءة
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                {totalActive} عضو نشط
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courseChats.length}</p>
                <p className="text-sm text-muted-foreground">مجموعات نشطة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPending}</p>
                <p className="text-sm text-muted-foreground">أسئلة معلقة</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActive}</p>
                <p className="text-sm text-muted-foreground">أعضاء نشطين</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(
                    courseChats.reduce(
                      (sum, chat) => sum + chat.completionRate,
                      0
                    ) / courseChats.length
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground">معدل التفاعل</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Instructor Actions */}
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
                  إدارة المجموعات ومراقبة التفاعل
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مجموعة جديدة
              </Button>
              <Button className="lems-button-primary" size="sm">
                <MessageCircle className="h-4 w-4 ml-2" />
                إرسال إعلان عام
              </Button>
            </div>
          </div>
        </Card>

        {/* Course Chats List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">مجموعاتك النشطة</h2>

          <div className="space-y-3">
            {courseChats.map((chat) => (
              <Card
                key={chat.id}
                className="lems-card cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Course Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-education-primary">
                          {chat.title}
                        </h3>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                        {chat.pendingQuestions > 0 && (
                          <Badge variant="warning" className="text-xs">
                            {chat.pendingQuestions} سؤال
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{chat.lastMessage.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {chat.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {chat.activeMembers} من {chat.enrolledStudents} متصل
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{chat.completionRate}% معدل التفاعل</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        آخر رسالة من {chat.lastMessage.sender}
                      </div>
                    </div>

                    {/* Last Message Preview */}
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm truncate">
                        {chat.lastMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center">
                    <Button className="lems-button-primary">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      إدارة المجموعة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State for No Chats */}
        {courseChats.length === 0 && (
          <Card className="lems-card">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                لا توجد مجموعات نشطة
              </h3>
              <p className="text-muted-foreground mb-4">
                قم بإنشاء كورس جديد لبدء مجموعات النقاش
              </p>
              <Button
                className="lems-button-primary"
                onClick={() => navigate("/instructor/create-course")}
              >
                <Plus className="h-4 w-4 ml-2" />
                إنشاء كورس جديد
              </Button>
            </div>
          </Card>
        )}

        {/* Instructor Guidelines */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="font-semibold text-education-primary flex items-center gap-2">
              <Crown className="h-4 w-4 text-warning" />
              إرشادات إدارة المجموعات
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
    </InstructorLayout>
  );
};

export default InstructorCourseChats;
