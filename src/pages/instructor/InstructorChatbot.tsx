import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Settings,
  TrendingUp,
  Users,
  Clock,
  Star,
  HelpCircle,
  BookOpen,
  BarChart3,
  Calendar
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  type: 'text' | 'suggestion' | 'data';
}

interface ChatStats {
  totalQuestions: number;
  resolvedQuestions: number;
  averageResponseTime: string;
  popularTopics: string[];
  satisfactionRate: number;
}

const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    message: 'كيف يمكنني تتبع تقدم الطلاب في كورس أساسيات اللوجستيات؟',
    timestamp: '2024-01-22 10:30',
    type: 'text'
  },
  {
    id: '2',
    sender: 'bot',
    message: 'يمكنك تتبع تقدم الطلاب من خلال صفحة "متابعة التقدم" حيث ستجد معلومات مفصلة عن كل طالب بما في ذلك معدل الإتمام والدرجات.',
    timestamp: '2024-01-22 10:31',
    type: 'text'
  },
  {
    id: '3',
    sender: 'user',
    message: 'أريد إنشاء تقرير عن حضور الطلاب',
    timestamp: '2024-01-22 11:15',
    type: 'text'
  },
  {
    id: '4',
    sender: 'bot',
    message: 'يمكنك إنشاء تقرير الحضور من صفحة "تتبع الحضور". اضغط على زر "تصدير التقرير" لتحميل تقرير مفصل بصيغة PDF أو Excel.',
    timestamp: '2024-01-22 11:16',
    type: 'text'
  }
];

const mockChatStats: ChatStats = {
  totalQuestions: 89,
  resolvedQuestions: 84,
  averageResponseTime: '2.3 ثانية',
  popularTopics: ['إدارة الكورسات', 'تتبع التقدم', 'التقييم السلوكي', 'الحضور والغياب'],
  satisfactionRate: 4.7
};

const InstructorChatbot = () => {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>(mockChatHistory);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date().toLocaleString('ar-SA'),
      type: 'text'
    };

    setChatMessages([...chatMessages, newMessage]);
    setCurrentMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: 'شكراً لسؤالك. أقوم حالياً بمعالجة استفسارك وسأعطيك إجابة مفصلة في أقرب وقت ممكن.',
        timestamp: new Date().toLocaleString('ar-SA'),
        type: 'text'
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const quickActions = [
    { icon: BarChart3, label: 'عرض تقرير الأداء', action: 'إظهار تقرير شامل عن أداء الطلاب' },
    { icon: Users, label: 'قائمة الطلاب المتفوقين', action: 'من هم الطلاب الأكثر تميزاً هذا الأسبوع؟' },
    { icon: Calendar, label: 'جدولة مهمة جديدة', action: 'كيف يمكنني جدولة اختبار جديد؟' },
    { icon: BookOpen, label: 'إحصائيات الكورسات', action: 'أظهر إحصائيات جميع الكورسات' }
  ];

  return (
    <InstructorLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">المساعد الذكي للمدربين</h3>
                  <p className="text-sm text-muted-foreground">متاح 24/7 لمساعدتك</p>
                </div>
                <div className="mr-auto">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 p-3 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chat Stats */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">إحصائيات المساعد</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">إجمالي الأسئلة</span>
                <span className="font-medium">{mockChatStats.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">تم حلها</span>
                <span className="font-medium text-green-600">{mockChatStats.resolvedQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">متوسط وقت الرد</span>
                <span className="font-medium">{mockChatStats.averageResponseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">تقييم الرضا</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mockChatStats.satisfactionRate}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">إجراءات سريعة</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-2 h-auto p-3"
                    onClick={() => setCurrentMessage(action.action)}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Popular Topics */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">المواضيع الشائعة</h3>
            <div className="space-y-2">
              {mockChatStats.popularTopics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="block text-center py-2">
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Help Tips */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">نصائح مفيدة</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium mb-1">استخدم أسئلة محددة</p>
                <p className="text-muted-foreground text-xs">
                  اطرح أسئلة واضحة ومحددة للحصول على إجابات أكثر دقة
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium mb-1">اطلب تقارير مخصصة</p>
                <p className="text-muted-foreground text-xs">
                  يمكنك طلب تقارير مخصصة حول أي جانب من جوانب التدريس
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium mb-1">احفظ الإجابات المفيدة</p>
                <p className="text-muted-foreground text-xs">
                  انسخ الإجابات المفيدة لاستخدامها لاحقاً
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </InstructorLayout>
  );
};

export default InstructorChatbot;