import React from "react";
import { useNavigate } from "react-router-dom";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
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
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

interface CourseChat {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrolledStudents: number;
  activeMembers: number;
  lastMessage: {
    sender: string;
    message: string;
    timestamp: string;
  };
  unreadCount: number;
  isOnline: boolean;
}

const CourseChats = () => {
  const navigate = useNavigate();

  // Mock data for course chats
  const courseChats: CourseChat[] = [
    {
      id: "1",
      title: "أساسيات اللوجستيات",
      description: "مجموعة مناقشة كورس أساسيات اللوجستيات وسلسلة التوريد",
      instructor: "د. محمد أحمد",
      enrolledStudents: 24,
      activeMembers: 18,
      lastMessage: {
        sender: "د. محمد أحمد",
        message: "ممتاز! سأقوم بإعداد جلسة نقاش تفاعلية غداً...",
        timestamp: "منذ 5 دقائق",
      },
      unreadCount: 3,
      isOnline: true,
    },
    {
      id: "2",
      title: "التدريب السلوكي المهني",
      description: "مجموعة مناقشة كورس التدريب السلوكي والمهني",
      instructor: "أ. فاطمة علي",
      enrolledStudents: 18,
      activeMembers: 12,
      lastMessage: {
        sender: "أحمد محمد",
        message: "شكراً على الدرس الممتاز اليوم!",
        timestamp: "منذ ساعة",
      },
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "3",
      title: "إكسل للمبتدئين",
      description: "مجموعة مناقشة كورس تعلم إكسل من الصفر",
      instructor: "أ. سارة أحمد",
      enrolledStudents: 15,
      activeMembers: 8,
      lastMessage: {
        sender: "أ. سارة أحمد",
        message: "تذكير: الاختبار النهائي غداً في الساعة 10 صباحاً",
        timestamp: "منذ 3 ساعات",
      },
      unreadCount: 1,
      isOnline: false,
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
    navigate(`/student/courses/${courseId}/chat`);
  };

  return (
    <LEMSLayout userRole="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>مجموعات الكورسات</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-education-primary">
                مجموعات الكورسات
              </h1>
              <p className="text-muted-foreground">
                انضم إلى مجموعات النقاش مع زملائك ومعلميك
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3" />
                {courseChats.length} مجموعة نشطة
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                {courseChats.reduce(
                  (sum, chat) => sum + chat.activeMembers,
                  0
                )}{" "}
                عضو متصل
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courseChats.reduce(
                    (sum, chat) => sum + chat.enrolledStudents,
                    0
                  )}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الأعضاء</p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courseChats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">
                  رسائل غير مقروءة
                </p>
              </div>
            </div>
          </Card>
        </div>

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
                          <Crown className="h-3 w-3 text-warning" />
                          <span>{chat.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {chat.activeMembers} من {chat.enrolledStudents} متصل
                          </span>
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
                      دخول المجموعة
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
                انضم إلى كورس لبدء المشاركة في مجموعات النقاش
              </p>
              <Button
                className="lems-button-primary"
                onClick={() => navigate("/student/courses")}
              >
                <BookOpen className="h-4 w-4 ml-2" />
                تصفح الكورسات
              </Button>
            </div>
          </Card>
        )}

        {/* Help Section */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="font-semibold text-education-primary">
              كيفية استخدام مجموعات الكورسات
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">💬 التواصل</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• طرح الأسئلة الأكاديمية</li>
                  <li>• مشاركة الموارد المفيدة</li>
                  <li>• مناقشة مواضيع الكورس</li>
                  <li>• طلب المساعدة من الزملاء</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">📋 الإرشادات</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• احترم جميع الأعضاء</li>
                  <li>• تجنب المحتوى غير المناسب</li>
                  <li>• استخدم اللغة العربية الفصحى</li>
                  <li>• لا تكرر الرسائل</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default CourseChats;
