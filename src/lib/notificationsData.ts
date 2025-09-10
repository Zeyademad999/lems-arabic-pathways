export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  isRead: boolean;
  category: "assignment" | "quiz" | "course" | "system" | "chat" | "calendar";
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "واجب جديد",
    message: "تم نشر واجب جديد في مادة أساسيات اللوجستيات",
    type: "info",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    category: "assignment",
    actionUrl: "/student/assignments",
    priority: "high",
  },
  {
    id: "2",
    title: "نتيجة الاختبار",
    message: "تم نشر نتائج اختبار مقدمة في اللوجستيات - حصلت على 85%",
    type: "success",
    timestamp: "2024-01-14T14:20:00Z",
    isRead: false,
    category: "quiz",
    actionUrl: "/student/quizzes",
    priority: "medium",
  },
  {
    id: "3",
    title: "رسالة جديدة",
    message: "رسالة جديدة من د. أحمد محمد في مجموعة أساسيات اللوجستيات",
    type: "info",
    timestamp: "2024-01-14T09:15:00Z",
    isRead: true,
    category: "chat",
    actionUrl: "/student/course-chats",
    priority: "low",
  },
  {
    id: "4",
    title: "موعد نهائي قريب",
    message: "موعد تسليم مشروع إدارة المخازن خلال 3 أيام",
    type: "warning",
    timestamp: "2024-01-13T16:45:00Z",
    isRead: false,
    category: "assignment",
    actionUrl: "/student/assignments",
    priority: "high",
  },
  {
    id: "5",
    title: "كورس جديد متاح",
    message: "تم إضافة كورس جديد: إدارة سلسلة التوريد",
    type: "info",
    timestamp: "2024-01-12T11:00:00Z",
    isRead: true,
    category: "course",
    actionUrl: "/student/courses",
    priority: "low",
  },
  {
    id: "6",
    title: "تذكير بموعد",
    message: "محاضرة أساسيات اللوجستيات غداً في الساعة 9:00 صباحاً",
    type: "info",
    timestamp: "2024-01-11T20:30:00Z",
    isRead: false,
    category: "calendar",
    actionUrl: "/student/calendar",
    priority: "medium",
  },
  {
    id: "7",
    title: "نظام الصيانة",
    message: "سيتم إجراء صيانة للنظام يوم الجمعة من 2:00 إلى 4:00 صباحاً",
    type: "warning",
    timestamp: "2024-01-10T15:20:00Z",
    isRead: true,
    category: "system",
    priority: "low",
  },
  {
    id: "8",
    title: "اختبار قريب",
    message: "اختبار منتصف الفصل في مادة التدريب السلوكي المهني خلال أسبوع",
    type: "warning",
    timestamp: "2024-01-09T12:10:00Z",
    isRead: false,
    category: "quiz",
    actionUrl: "/student/quizzes",
    priority: "high",
  },
];

// Instructor notifications
export const mockInstructorNotifications: Notification[] = [
  {
    id: "i1",
    title: "تسليم واجب جديد",
    message: "تم تسليم واجب من الطالب أحمد محمد في مادة أساسيات اللوجستيات",
    type: "info",
    timestamp: "2024-01-15T08:30:00Z",
    isRead: false,
    category: "assignment",
    actionUrl: "/instructor/assignments",
    priority: "medium",
  },
  {
    id: "i2",
    title: "رسالة من طالب",
    message: "رسالة جديدة من الطالب فاطمة علي حول مشروع إدارة المخازن",
    type: "info",
    timestamp: "2024-01-14T16:45:00Z",
    isRead: false,
    category: "chat",
    actionUrl: "/instructor/course-chats",
    priority: "medium",
  },
  {
    id: "i3",
    title: "طلب إعادة تصحيح",
    message: "طلب الطالب خالد السعيد إعادة تصحيح اختبار مقدمة في اللوجستيات",
    type: "warning",
    timestamp: "2024-01-14T10:20:00Z",
    isRead: true,
    category: "quiz",
    actionUrl: "/instructor/grading",
    priority: "low",
  },
  {
    id: "i4",
    title: "تذكير بموعد محاضرة",
    message: "محاضرة أساسيات اللوجستيات غداً في الساعة 9:00 صباحاً",
    type: "info",
    timestamp: "2024-01-13T20:00:00Z",
    isRead: false,
    category: "calendar",
    actionUrl: "/instructor/calendar",
    priority: "high",
  },
  {
    id: "i5",
    title: "تقرير الحضور",
    message: "تقرير حضور الأسبوع الحالي جاهز للمراجعة",
    type: "success",
    timestamp: "2024-01-12T14:30:00Z",
    isRead: true,
    category: "system",
    actionUrl: "/instructor/attendance",
    priority: "low",
  },
  {
    id: "i6",
    title: "طلب إضافة طالب",
    message: "طلب إضافة طالب جديد للكورس: إدارة المشاريع",
    type: "info",
    timestamp: "2024-01-11T11:15:00Z",
    isRead: false,
    category: "course",
    actionUrl: "/instructor/students",
    priority: "medium",
  },
];

export const getNotifications = (
  userRole: "student" | "instructor" | "admin"
): Notification[] => {
  return userRole === "instructor" || userRole === "admin"
    ? mockInstructorNotifications
    : mockNotifications;
};

export const getUnreadCount = (
  userRole: "student" | "instructor" | "admin"
): number => {
  const notifications = getNotifications(userRole);
  return notifications.filter((n) => !n.isRead).length;
};

export const markAsRead = (
  notificationId: string,
  userRole: "student" | "instructor" | "admin"
): void => {
  const notifications = getNotifications(userRole);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }
};

export const markAllAsRead = (
  userRole: "student" | "instructor" | "admin"
): void => {
  const notifications = getNotifications(userRole);
  notifications.forEach((n) => (n.isRead = true));
};
