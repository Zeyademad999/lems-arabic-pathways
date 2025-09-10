import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Users,
  Crown,
  Check,
  CheckCheck,
  Clock,
  Maximize2,
  Minimize2,
  Reply,
} from "lucide-react";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "student" | "instructor";
  avatar?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  messageType: "text" | "image" | "file" | "system";
  replyTo?: {
    messageId: string;
    senderName: string;
    message: string;
  };
}

interface CourseChatProps {
  courseId: string;
  courseName: string;
  userRole: "student" | "instructor";
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

// Mock data for the chat with realistic conversation flow
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "مرحباً بكم جميعاً في كورس أساسيات اللوجستيات! أتمنى لكم رحلة تعليمية ممتعة ومفيدة. اليوم سنبدأ بالدرس الأول حول المفاهيم الأساسية.",
    timestamp: "2024-01-10T09:00:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "2",
    senderId: "student-1",
    senderName: "أحمد محمد",
    senderRole: "student",
    message: "شكراً دكتور! متحمس جداً لبدء هذا الكورس",
    timestamp: "2024-01-10T09:05:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "3",
    senderId: "student-2",
    senderName: "فاطمة علي",
    senderRole: "student",
    message: "هل يمكننا الحصول على المادة التدريبية قبل بدء الدرس الأول؟",
    timestamp: "2024-01-10T09:10:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "4",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "بالطبع! سأقوم برفع جميع المواد التدريبية في قسم المرفقات خلال الساعة القادمة.",
    timestamp: "2024-01-10T09:15:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "5",
    senderId: "student-3",
    senderName: "محمد حسن",
    senderRole: "student",
    message:
      "دكتور، لدي سؤال حول الاختبار الأول. هل سيكون متاحاً طوال الأسبوع؟",
    timestamp: "2024-01-10T09:20:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
    replyTo: {
      messageId: "4",
      senderName: "د. محمد أحمد",
      message: "بالطبع! سأقوم برفع جميع المواد التدريبية...",
    },
  },
  {
    id: "6",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "نعم، الاختبار سيكون متاحاً من يوم الاثنين حتى يوم الجمعة. يمكنكم إجراء الاختبار في أي وقت خلال هذه الفترة.",
    timestamp: "2024-01-10T09:25:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "7",
    senderId: "student-4",
    senderName: "سارة أحمد",
    senderRole: "student",
    message: "شكراً دكتور على التوضيح! 🙏",
    timestamp: "2024-01-10T09:30:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "8",
    senderId: "student-1",
    senderName: "أحمد محمد",
    senderRole: "student",
    message: "هل يمكننا مناقشة بعض الأمثلة العملية في اللوجستيات؟",
    timestamp: "2024-01-10T10:00:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "9",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "ممتاز! سأقوم بإعداد جلسة نقاش تفاعلية غداً في الساعة 2:00 مساءً لمناقشة أمثلة عملية من الواقع.",
    timestamp: "2024-01-10T10:05:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "10",
    senderId: "student-5",
    senderName: "علي محمود",
    senderRole: "student",
    message:
      "أنا أيضاً مهتم بالأمثلة العملية! هل سنناقش حالات من الشركات المحلية؟",
    timestamp: "2024-01-10T10:10:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
    replyTo: {
      messageId: "9",
      senderName: "د. محمد أحمد",
      message: "ممتاز! سأقوم بإعداد جلسة نقاش تفاعلية غداً...",
    },
  },
  {
    id: "11",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "نعم بالطبع! سنناقش حالات من شركات سعودية مثل أرامكو وشركة الاتصالات السعودية. سيكون هناك أمثلة حقيقية من سوق العمل.",
    timestamp: "2024-01-10T10:15:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "12",
    senderId: "student-2",
    senderName: "فاطمة علي",
    senderRole: "student",
    message: "هذا رائع! هل يمكننا الحصول على قراءات إضافية حول هذه الشركات؟",
    timestamp: "2024-01-10T10:20:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
    replyTo: {
      messageId: "11",
      senderName: "د. محمد أحمد",
      message: "نعم بالطبع! سنناقش حالات من شركات سعودية...",
    },
  },
  {
    id: "13",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "سأقوم برفع قائمة بالمراجع والقراءات الإضافية في قسم المرفقات. تشمل تقارير سنوية وتحليلات لوجستية.",
    timestamp: "2024-01-10T10:25:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "14",
    senderId: "student-3",
    senderName: "محمد حسن",
    senderRole: "student",
    message: "دكتور، لدي سؤال حول الواجب الأول. هل يمكن تسليمه في أي وقت؟",
    timestamp: "2024-01-10T10:30:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "15",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "الواجب الأول موعد تسليمه يوم الأحد القادم في منتصف الليل. يمكنكم التسليم في أي وقت قبل هذا الموعد.",
    timestamp: "2024-01-10T10:35:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "16",
    senderId: "student-1",
    senderName: "أحمد محمد",
    senderRole: "student",
    message: "هل يمكننا العمل على الواجب بشكل جماعي؟",
    timestamp: "2024-01-10T10:40:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
    replyTo: {
      messageId: "15",
      senderName: "د. محمد أحمد",
      message: "الواجب الأول موعد تسليمه يوم الأحد القادم...",
    },
  },
  {
    id: "17",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "نعم، يمكنكم العمل بشكل جماعي ومناقشة الأفكار، لكن كل طالب يجب أن يقدم واجبه الخاص. لا تنسوا ذكر المراجع.",
    timestamp: "2024-01-10T10:45:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "18",
    senderId: "student-4",
    senderName: "سارة أحمد",
    senderRole: "student",
    message: "شكراً دكتور! هذا سيساعدنا كثيراً في التعلم",
    timestamp: "2024-01-10T10:50:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "19",
    senderId: "student-5",
    senderName: "علي محمود",
    senderRole: "student",
    message: "هل يمكننا إنشاء مجموعة واتساب للتواصل السريع؟",
    timestamp: "2024-01-10T11:00:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
  {
    id: "20",
    senderId: "instructor-1",
    senderName: "د. محمد أحمد",
    senderRole: "instructor",
    message:
      "أفضل أن نستخدم هذه المنصة الرسمية للتواصل الأكاديمي. يمكنكم استخدامها لطرح الأسئلة ومشاركة الأفكار.",
    timestamp: "2024-01-10T11:05:00",
    isRead: true,
    isDelivered: true,
    messageType: "text",
  },
];

const mockParticipants = [
  {
    id: "instructor-1",
    name: "د. محمد أحمد",
    role: "instructor",
    avatar: "",
    isOnline: true,
  },
  {
    id: "student-1",
    name: "أحمد محمد",
    role: "student",
    avatar: "",
    isOnline: true,
  },
  {
    id: "student-2",
    name: "فاطمة علي",
    role: "student",
    avatar: "",
    isOnline: false,
  },
  {
    id: "student-3",
    name: "محمد حسن",
    role: "student",
    avatar: "",
    isOnline: true,
  },
  {
    id: "student-4",
    name: "سارة أحمد",
    role: "student",
    avatar: "",
    isOnline: false,
  },
  {
    id: "student-5",
    name: "علي محمود",
    role: "student",
    avatar: "",
    isOnline: true,
  },
];

export const CourseChat: React.FC<CourseChatProps> = ({
  courseId,
  courseName,
  userRole,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = React.useState("");
  const [showParticipants, setShowParticipants] = React.useState(false);
  const [replyingTo, setReplyingTo] = React.useState<ChatMessage | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: "current-user",
        senderName: userRole === "instructor" ? "د. محمد أحمد" : "أحمد محمد",
        senderRole: userRole,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        isDelivered: false,
        messageType: "text",
        replyTo: replyingTo
          ? {
              messageId: replyingTo.id,
              senderName: replyingTo.senderName,
              message:
                replyingTo.message.length > 50
                  ? replyingTo.message.substring(0, 50) + "..."
                  : replyingTo.message,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setReplyingTo(null);
    }
  };

  const handleReplyToMessage = (message: ChatMessage) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "اليوم";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "أمس";
    } else {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const onlineCount = mockParticipants.filter((p) => p.isOnline).length;

  return (
    <div
      className={`flex bg-background border border-border rounded-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 h-screen rounded-none" : "h-[600px]"
      }`}
    >
      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h3 className="font-semibold text-education-primary">
                {courseName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {onlineCount} من {mockParticipants.length} متصل الآن
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="h-4 w-4" />
            </Button>
            {onToggleFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={onToggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === "current-user";
            const showDate =
              index === 0 ||
              formatDate(message.timestamp) !==
                formatDate(messages[index - 1].timestamp);

            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="flex justify-center my-4">
                    <Badge variant="secondary" className="text-xs">
                      {formatDate(message.timestamp)}
                    </Badge>
                  </div>
                )}

                {/* Message */}
                <div
                  className={`flex gap-3 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(message.senderName)}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col max-w-[70%] ${
                      isCurrentUser ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Sender Name */}
                    {!isCurrentUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {message.senderName}
                        </span>
                        {message.senderRole === "instructor" && (
                          <Crown className="h-3 w-3 text-warning" />
                        )}
                      </div>
                    )}

                    {/* Message Content */}
                    <div
                      className={`relative group ${
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Reply Indicator */}
                      {message.replyTo && (
                        <div className="mb-2 p-2 bg-muted/50 rounded-lg border-r-4 border-primary">
                          <p className="text-xs text-muted-foreground">
                            رد على {message.replyTo.senderName}
                          </p>
                          <p className="text-sm truncate">
                            {message.replyTo.message}
                          </p>
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div
                        className={`
                         px-4 py-2 rounded-2xl relative group
                         ${
                           isCurrentUser
                             ? "bg-primary text-primary-foreground rounded-br-md"
                             : "bg-card border border-border rounded-bl-md"
                         }
                       `}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.message}
                        </p>

                        {/* Message Status */}
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-xs opacity-70">
                            {formatTime(message.timestamp)}
                          </span>
                          {isCurrentUser && (
                            <div className="flex items-center">
                              {message.isDelivered ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : message.isRead ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Reply Button - Show on hover */}
                        {!isCurrentUser && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute -left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                            onClick={() => handleReplyToMessage(message)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-card border-t border-border p-4">
          {/* Reply Indicator */}
          {replyingTo && (
            <div className="mb-3 p-3 bg-muted/50 rounded-lg border-r-4 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    رد على {replyingTo.senderName}
                  </p>
                  <p className="text-sm truncate">{replyingTo.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelReply}
                  className="p-1 h-6 w-6"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-end gap-3">
            <Button variant="ghost" size="sm" className="p-2 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالة..."
                className="pr-12 pl-4 py-3 rounded-full border-border focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="lems-button-primary p-3 rounded-full shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <div className="w-80 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h4 className="font-semibold">أعضاء المجموعة</h4>
            <p className="text-sm text-muted-foreground">
              {mockParticipants.length} عضو
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {getInitials(participant.name)}
                    </AvatarFallback>
                  </Avatar>
                  {participant.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{participant.name}</p>
                    {participant.role === "instructor" && (
                      <Crown className="h-3 w-3 text-warning" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {participant.isOnline ? "متصل الآن" : "غير متصل"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
