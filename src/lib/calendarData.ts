export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  type:
    | "lesson"
    | "quiz"
    | "assignment"
    | "exam"
    | "meeting"
    | "deadline"
    | "study-session";
  courseId?: string;
  courseName?: string;
  location?: string;
  instructor?: string;
  priority: "low" | "medium" | "high";
  isRecurring?: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly";
  attendees?: string[];
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  reminder?: {
    enabled: boolean;
    minutesBefore: number;
  };
}

export interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}

// Mock calendar events data
export const mockCalendarEvents: CalendarEvent[] = [
  // Current month events
  {
    id: "1",
    title: "درس أساسيات اللوجستيات",
    description: "مقدمة في مفاهيم اللوجستيات الأساسية وإدارة سلسلة التوريد",
    date: "2024-12-15",
    startTime: "09:00",
    endTime: "10:30",
    type: "lesson",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة المحاضرات أ",
    instructor: "د. أحمد محمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 15 },
  },
  {
    id: "2",
    title: "اختبار إدارة المشاريع",
    description: "اختبار شامل على مفاهيم إدارة المشاريع والتخطيط",
    date: "2024-12-16",
    startTime: "14:00",
    endTime: "16:00",
    type: "exam",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    location: "معمل الحاسوب 1",
    instructor: "د. فاطمة علي",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 30 },
  },
  {
    id: "3",
    title: "تسليم مشروع التسويق الرقمي",
    description: "آخر موعد لتسليم مشروع التسويق الرقمي",
    date: "2024-12-18",
    startTime: "23:59",
    endTime: "23:59",
    type: "deadline",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    instructor: "د. خالد السعيد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 60 },
  },
  {
    id: "4",
    title: "جلسة مراجعة جماعية",
    description: "جلسة مراجعة للمواد الدراسية مع الزملاء",
    date: "2024-12-20",
    startTime: "16:00",
    endTime: "18:00",
    type: "study-session",
    location: "مكتبة الجامعة",
    priority: "medium",
    status: "scheduled",
    attendees: ["أحمد محمد", "فاطمة علي", "خالد السعيد"],
  },
  {
    id: "5",
    title: "محاضرة النقل والتوزيع",
    description: "دراسة أنظمة النقل والتوزيع في اللوجستيات",
    date: "2024-12-22",
    startTime: "10:00",
    endTime: "11:30",
    type: "lesson",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة المحاضرات ب",
    instructor: "د. أحمد محمد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "6",
    title: "اختبار قصير - التسويق الرقمي",
    description: "اختبار قصير على مفاهيم التسويق الرقمي",
    date: "2024-12-25",
    startTime: "11:00",
    endTime: "12:00",
    type: "quiz",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    location: "قاعة المحاضرات ج",
    instructor: "د. خالد السعيد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "7",
    title: "اجتماع مع المشرف الأكاديمي",
    description: "مناقشة التقدم الأكاديمي والمشاريع المستقبلية",
    date: "2024-12-28",
    startTime: "15:00",
    endTime: "16:00",
    type: "meeting",
    location: "مكتب المشرف",
    instructor: "د. محمد حسن",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "8",
    title: "ورشة عمل التخطيط الاستراتيجي",
    description: "ورشة تفاعلية حول التخطيط الاستراتيجي في الأعمال",
    date: "2024-12-30",
    startTime: "09:00",
    endTime: "12:00",
    type: "lesson",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    location: "قاعة الورش",
    instructor: "د. فاطمة علي",
    priority: "medium",
    status: "scheduled",
  },
  // Next month events
  {
    id: "9",
    title: "امتحان منتصف الفصل",
    description: "امتحان شامل لجميع المواد",
    date: "2025-01-05",
    startTime: "09:00",
    endTime: "12:00",
    type: "exam",
    location: "قاعة الامتحانات الرئيسية",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 60 },
  },
  {
    id: "10",
    title: "عطلة منتصف الفصل",
    description: "عطلة رسمية من الدراسة",
    date: "2025-01-10",
    startTime: "00:00",
    endTime: "23:59",
    type: "meeting",
    priority: "low",
    status: "scheduled",
  },
  // Additional events for current month (December 2024)
  {
    id: "11",
    title: "محاضرة إدارة المخزون",
    description: "دراسة استراتيجيات إدارة المخزون والتحكم في التكاليف",
    date: "2024-12-17",
    startTime: "11:00",
    endTime: "12:30",
    type: "lesson",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة المحاضرات أ",
    instructor: "د. أحمد محمد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "12",
    title: "ورشة التسويق الرقمي",
    description: "ورشة عملية حول أدوات التسويق الرقمي",
    date: "2024-12-19",
    startTime: "14:00",
    endTime: "17:00",
    type: "lesson",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    location: "معمل الحاسوب 2",
    instructor: "د. خالد السعيد",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "13",
    title: "اختبار قصير - اللوجستيات",
    description: "اختبار على مفاهيم إدارة سلسلة التوريد",
    date: "2024-12-21",
    startTime: "10:00",
    endTime: "11:00",
    type: "quiz",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة المحاضرات ب",
    instructor: "د. أحمد محمد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "14",
    title: "تسليم واجب إدارة المشاريع",
    description: "آخر موعد لتسليم واجب التخطيط الاستراتيجي",
    date: "2024-12-23",
    startTime: "23:59",
    endTime: "23:59",
    type: "deadline",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    instructor: "د. فاطمة علي",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 120 },
  },
  {
    id: "15",
    title: "جلسة مراجعة الامتحان",
    description: "مراجعة شاملة قبل امتحان منتصف الفصل",
    date: "2024-12-24",
    startTime: "16:00",
    endTime: "19:00",
    type: "study-session",
    location: "مكتبة الجامعة - الطابق الثاني",
    priority: "high",
    status: "scheduled",
    attendees: ["أحمد محمد", "فاطمة علي", "خالد السعيد", "مريم حسن"],
  },
  {
    id: "16",
    title: "محاضرة التخطيط الاستراتيجي",
    description: "مفاهيم التخطيط الاستراتيجي في إدارة المشاريع",
    date: "2024-12-26",
    startTime: "09:00",
    endTime: "10:30",
    type: "lesson",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    location: "قاعة المحاضرات ج",
    instructor: "د. فاطمة علي",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "17",
    title: "اجتماع لجنة التقييم",
    description: "اجتماع لتقييم أداء الطلاب ومناقشة التحسينات",
    date: "2024-12-27",
    startTime: "15:00",
    endTime: "17:00",
    type: "meeting",
    location: "قاعة الاجتماعات الرئيسية",
    instructor: "د. محمد حسن",
    priority: "high",
    status: "scheduled",
    attendees: ["د. أحمد محمد", "د. فاطمة علي", "د. خالد السعيد"],
  },
  {
    id: "18",
    title: "اختبار نهائي - التسويق الرقمي",
    description: "الاختبار النهائي لمادة التسويق الرقمي",
    date: "2024-12-29",
    startTime: "09:00",
    endTime: "12:00",
    type: "exam",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    location: "قاعة الامتحانات الرئيسية",
    instructor: "د. خالد السعيد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 60 },
  },
  {
    id: "19",
    title: "ورشة التطبيق العملي",
    description: "تطبيق عملي لمفاهيم اللوجستيات",
    date: "2024-12-31",
    startTime: "10:00",
    endTime: "13:00",
    type: "lesson",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "معمل اللوجستيات",
    instructor: "د. أحمد محمد",
    priority: "medium",
    status: "scheduled",
  },
  // Events for next month (January 2025)
  {
    id: "20",
    title: "بداية الفصل الدراسي الثاني",
    description: "بداية الفصل الدراسي الثاني",
    date: "2025-01-01",
    startTime: "08:00",
    endTime: "08:00",
    type: "meeting",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "21",
    title: "محاضرة إدارة الجودة",
    description: "مقدمة في مفاهيم إدارة الجودة والتحسين المستمر",
    date: "2025-01-02",
    startTime: "09:00",
    endTime: "10:30",
    type: "lesson",
    courseId: "quality-management",
    courseName: "إدارة الجودة",
    location: "قاعة المحاضرات أ",
    instructor: "د. سارة أحمد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "22",
    title: "اختبار منتصف الفصل - اللوجستيات",
    description: "امتحان منتصف الفصل لمادة أساسيات اللوجستيات",
    date: "2025-01-03",
    startTime: "10:00",
    endTime: "12:00",
    type: "exam",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة الامتحانات الرئيسية",
    instructor: "د. أحمد محمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 30 },
  },
  {
    id: "23",
    title: "ورشة إدارة المشاريع",
    description: "ورشة تفاعلية حول أدوات إدارة المشاريع",
    date: "2025-01-04",
    startTime: "14:00",
    endTime: "17:00",
    type: "lesson",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    location: "معمل الحاسوب 1",
    instructor: "د. فاطمة علي",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "24",
    title: "اجتماع الطلاب الجدد",
    description: "ترحيب بالطلاب الجدد وتوضيح الأنظمة",
    date: "2025-01-06",
    startTime: "11:00",
    endTime: "12:30",
    type: "meeting",
    location: "القاعة الكبرى",
    instructor: "د. محمد حسن",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "25",
    title: "محاضرة التسويق الرقمي المتقدم",
    description: "مفاهيم متقدمة في التسويق الرقمي",
    date: "2025-01-07",
    startTime: "09:00",
    endTime: "10:30",
    type: "lesson",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    location: "قاعة المحاضرات ب",
    instructor: "د. خالد السعيد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "26",
    title: "تسليم مشروع إدارة الجودة",
    description: "آخر موعد لتسليم مشروع إدارة الجودة",
    date: "2025-01-08",
    startTime: "23:59",
    endTime: "23:59",
    type: "deadline",
    courseId: "quality-management",
    courseName: "إدارة الجودة",
    instructor: "د. سارة أحمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 180 },
  },
  {
    id: "27",
    title: "جلسة مراجعة جماعية",
    description: "مراجعة المواد الدراسية مع الزملاء",
    date: "2025-01-09",
    startTime: "16:00",
    endTime: "18:00",
    type: "study-session",
    location: "مكتبة الجامعة",
    priority: "medium",
    status: "scheduled",
    attendees: ["أحمد محمد", "فاطمة علي", "خالد السعيد"],
  },
  {
    id: "28",
    title: "اختبار قصير - إدارة الجودة",
    description: "اختبار على مفاهيم إدارة الجودة",
    date: "2025-01-11",
    startTime: "11:00",
    endTime: "12:00",
    type: "quiz",
    courseId: "quality-management",
    courseName: "إدارة الجودة",
    location: "قاعة المحاضرات ج",
    instructor: "د. سارة أحمد",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "29",
    title: "ورشة التخطيط الاستراتيجي",
    description: "ورشة عملية حول التخطيط الاستراتيجي",
    date: "2025-01-12",
    startTime: "09:00",
    endTime: "12:00",
    type: "lesson",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    location: "قاعة الورش",
    instructor: "د. فاطمة علي",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "30",
    title: "اجتماع لجنة المناهج",
    description: "مناقشة تطوير المناهج الدراسية",
    date: "2025-01-13",
    startTime: "14:00",
    endTime: "16:00",
    type: "meeting",
    location: "قاعة الاجتماعات",
    instructor: "د. محمد حسن",
    priority: "medium",
    status: "scheduled",
    attendees: [
      "د. أحمد محمد",
      "د. فاطمة علي",
      "د. خالد السعيد",
      "د. سارة أحمد",
    ],
  },
  // Events for September 2025 (Simplified)
  {
    id: "31",
    title: "بداية العام الدراسي الجديد",
    description: "بداية العام الدراسي 2025-2026",
    date: "2025-09-01",
    startTime: "08:00",
    endTime: "08:00",
    type: "meeting",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "32",
    title: "محاضرة مقدمة في اللوجستيات",
    description: "مقدمة شاملة لمفاهيم اللوجستيات الحديثة",
    date: "2025-09-03",
    startTime: "09:00",
    endTime: "10:30",
    type: "lesson",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة المحاضرات الرئيسية",
    instructor: "د. أحمد محمد",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "33",
    title: "اجتماع الطلاب الجدد",
    description: "ترحيب بالطلاب الجدد وتوضيح الأنظمة الأكاديمية",
    date: "2025-09-05",
    startTime: "11:00",
    endTime: "12:30",
    type: "meeting",
    location: "القاعة الكبرى",
    instructor: "د. محمد حسن",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "34",
    title: "اختبار تحديد المستوى",
    description: "اختبار لتحديد المستوى الأكاديمي للطلاب الجدد",
    date: "2025-09-08",
    startTime: "09:00",
    endTime: "12:00",
    type: "exam",
    location: "قاعة الامتحانات الرئيسية",
    instructor: "د. سارة أحمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 30 },
  },
  {
    id: "35",
    title: "تسليم الواجب الأول",
    description: "آخر موعد لتسليم الواجب الأول في إدارة المشاريع",
    date: "2025-09-15",
    startTime: "23:59",
    endTime: "23:59",
    type: "deadline",
    courseId: "project-management",
    courseName: "إدارة المشاريع",
    instructor: "د. فاطمة علي",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 120 },
  },
  {
    id: "36",
    title: "اختبار منتصف الفصل - اللوجستيات",
    description: "امتحان منتصف الفصل لمادة أساسيات اللوجستيات",
    date: "2025-09-20",
    startTime: "10:00",
    endTime: "12:00",
    type: "exam",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    location: "قاعة الامتحانات الرئيسية",
    instructor: "د. أحمد محمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 30 },
  },
  {
    id: "37",
    title: "جلسة مراجعة جماعية",
    description: "مراجعة المواد الدراسية مع الزملاء",
    date: "2025-09-22",
    startTime: "16:00",
    endTime: "18:00",
    type: "study-session",
    location: "مكتبة الجامعة",
    priority: "medium",
    status: "scheduled",
    attendees: ["أحمد محمد", "فاطمة علي", "خالد السعيد", "مريم حسن"],
  },
  {
    id: "38",
    title: "اختبار نهائي - التسويق الرقمي",
    description: "الاختبار النهائي لمادة التسويق الرقمي",
    date: "2025-09-25",
    startTime: "09:00",
    endTime: "12:00",
    type: "exam",
    courseId: "digital-marketing",
    courseName: "التسويق الرقمي",
    location: "قاعة الامتحانات الرئيسية",
    instructor: "د. خالد السعيد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 60 },
  },
  {
    id: "39",
    title: "تسليم مشروع اللوجستيات",
    description: "آخر موعد لتسليم مشروع إدارة سلسلة التوريد",
    date: "2025-09-28",
    startTime: "23:59",
    endTime: "23:59",
    type: "deadline",
    courseId: "logistics-101",
    courseName: "أساسيات اللوجستيات",
    instructor: "د. أحمد محمد",
    priority: "high",
    status: "scheduled",
    reminder: { enabled: true, minutesBefore: 180 },
  },
];

// Helper functions
export const getEventsForDate = (date: string): CalendarEvent[] => {
  return mockCalendarEvents.filter((event) => event.date === date);
};

export const getEventsForMonth = (
  year: number,
  month: number
): CalendarEvent[] => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return mockCalendarEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
};

export const getUpcomingEvents = (days: number = 7): CalendarEvent[] => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

  return mockCalendarEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= futureDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getEventTypeColor = (type: CalendarEvent["type"]): string => {
  const colors = {
    lesson: "bg-blue-500",
    quiz: "bg-yellow-500",
    assignment: "bg-green-500",
    exam: "bg-red-500",
    meeting: "bg-purple-500",
    deadline: "bg-orange-500",
    "study-session": "bg-indigo-500",
  };
  return colors[type] || "bg-gray-500";
};

export const getEventTypeLabel = (type: CalendarEvent["type"]): string => {
  const labels = {
    lesson: "درس",
    quiz: "اختبار قصير",
    assignment: "واجب",
    exam: "امتحان",
    meeting: "اجتماع",
    deadline: "موعد نهائي",
    "study-session": "جلسة دراسة",
  };
  return labels[type] || type;
};

export const getPriorityColor = (
  priority: CalendarEvent["priority"]
): string => {
  const colors = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };
  return colors[priority] || "text-gray-600";
};

export const getStatusColor = (status: CalendarEvent["status"]): string => {
  const colors = {
    scheduled: "text-blue-600",
    completed: "text-green-600",
    cancelled: "text-red-600",
    "in-progress": "text-yellow-600",
  };
  return colors[status] || "text-gray-600";
};
