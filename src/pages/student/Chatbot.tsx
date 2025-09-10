import React from "react";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Mic,
  Paperclip,
  MoreVertical,
  HelpCircle,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content:
      "مرحباً أحمد! أنا المساعد الذكي لنظام LEMS. كيف يمكنني مساعدتك اليوم؟",
    timestamp: "14:30",
  },
  {
    id: "2",
    type: "user",
    content: "أريد معرفة مواعيد الواجبات القادمة",
    timestamp: "14:31",
  },
  {
    id: "3",
    type: "bot",
    content:
      "لديك 3 واجبات قادمة:\n\n1. تقرير عن أنظمة إدارة المخازن - موعد التسليم: 20 يناير\n2. تقييم السلوك المهني الذاتي - موعد التسليم: 25 يناير\n3. مشروع الإكسل العملي - تم إرساله بالفعل\n\nهل تريد تفاصيل أكثر عن أي واجب؟",
    timestamp: "14:31",
  },
  {
    id: "4",
    type: "user",
    content: "نعم، أريد تفاصيل عن تقرير أنظمة إدارة المخازن",
    timestamp: "14:32",
  },
  {
    id: "5",
    type: "bot",
    content:
      'تفاصيل واجب "تقرير عن أنظمة إدارة المخازن":\n\n📚 الكورس: أساسيات اللوجستيات\n📅 موعد التسليم: 20 يناير 2024\n📝 نوع الواجب: تقرير مكتوب\n⏰ الوقت المتبقي: 5 أيام\n\nالمطلوب:\n- كتابة تقرير مفصل عن أنظمة إدارة المخازن الحديثة\n- التركيز على الفوائد في تحسين كفاءة العمليات\n- الحد الأدنى: 1500 كلمة\n- المرفقات المتاحة: requirements.pdf, template.docx\n\nهل تريد تحميل المرفقات أو لديك سؤال آخر؟',
    timestamp: "14:33",
  },
];

const quickActions: QuickAction[] = [
  {
    id: "1",
    label: "مواعيد الواجبات",
    icon: Clock,
    action: "assignments",
  },
  {
    id: "2",
    label: "تقدم الكورسات",
    icon: BookOpen,
    action: "progress",
  },
  {
    id: "3",
    label: "الدرجات والتقييمات",
    icon: Star,
    action: "grades",
  },
  {
    id: "4",
    label: "الأسئلة الشائعة",
    icon: HelpCircle,
    action: "faq",
  },
];

const Chatbot = () => {
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatResponse = (text: string): string => {
    if (!text) return text;

    // Split by double newlines to preserve paragraph breaks
    let formatted = text
      // Handle numbered lists (1. 2. 3. etc.)
      .replace(/(\d+\.\s+)/g, "\n$1")
      // Handle bullet points with **
      .replace(/(\*\*[^*]+\*\*)/g, "\n$1")
      // Handle questions with ?
      .replace(/(\?)/g, "$1\n")
      // Clean up multiple newlines
      .replace(/\n{3,}/g, "\n\n")
      // Trim whitespace
      .trim();

    return formatted;
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("ar", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Send POST request to the API endpoint
      const response = await fetch("http://192.168.0.182:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Format the response text nicely
      const rawResponse =
        data.message || data.response || "تم استلام رسالتك بنجاح";
      const formattedResponse = formatResponse(rawResponse);

      // Use the API response as the bot's message
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: formattedResponse,
        timestamp: new Date().toLocaleTimeString("ar", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Fallback response in case of API error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
        timestamp: new Date().toLocaleTimeString("ar", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case "assignments":
        message = "أريد معرفة مواعيد الواجبات القادمة";
        break;
      case "progress":
        message = "كيف يمكنني متابعة تقدمي في الكورسات؟";
        break;
      case "grades":
        message = "أريد مراجعة درجاتي وتقييماتي";
        break;
      case "faq":
        message = "ما هي الأسئلة الشائعة؟";
        break;
      default:
        message = action;
    }
    setInputValue(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <LEMSLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-education-primary">
                المساعد الذكي
              </h1>
              <p className="text-sm text-success flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                متصل
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2 hover:bg-accent"
                onClick={() => handleQuickAction(action.action)}
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-center">{action.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Chat Messages */}
        <Card className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Mic className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="اكتب رسالتك هنا..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="lems-input pl-12"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="lems-button-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Help Tips */}
        <Card className="lems-card">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              نصائح للاستخدام
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  أسئلة مفيدة
                </Badge>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• "ما هي واجباتي القادمة؟"</li>
                  <li>• "كيف أحسن درجاتي؟"</li>
                  <li>• "متى موعد الاختبار التالي؟"</li>
                  <li>• "أريد مراجعة حضوري"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  ميزات متقدمة
                </Badge>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• يمكنك إرسال الملفات والصور</li>
                  <li>• استخدم الرسائل الصوتية</li>
                  <li>• احفظ المحادثات المهمة</li>
                  <li>• اطلب تذكيرات للواجبات</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  مساعدة فورية
                </Badge>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• إرشادات تقنية للمنصة</li>
                  <li>• حل مشاكل تسجيل الدخول</li>
                  <li>• الدعم الأكاديمي</li>
                  <li>• التواصل مع المدربين</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Assistant Info */}
        <Card className="lems-card bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">عن المساعد الذكي</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              هذا المساعد الذكي يستخدم تقنيات الذكاء الاصطناعي لمساعدتك في رحلتك
              التعليمية. يمكنه الإجابة على استفساراتك، تقديم النصائح، ومساعدتك
              في تتبع تقدمك الأكاديمي بشكل مستمر.
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground">
                آخر تحديث: يناير 2024
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success">نشط الآن</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Chatbot;
