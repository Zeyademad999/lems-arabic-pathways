export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  explanation?: string;
  hint?: string;
}

export interface CourseFlashcards {
  courseId: string;
  courseName: string;
  courseDescription: string;
  totalCards: number;
  categories: string[];
  flashcards: Flashcard[];
  lastStudied?: string;
  progress?: {
    studied: number;
    mastered: number;
    streak: number;
  };
}

// Mock flashcard data for different courses
export const mockFlashcardData: CourseFlashcards[] = [
  {
    courseId: "1",
    courseName: "أساسيات اللوجستيات",
    courseDescription: "مفاهيم أساسية في إدارة اللوجستيات وسلسلة التوريد",
    totalCards: 25,
    categories: ["مفاهيم أساسية", "إدارة المخزون", "النقل والتوزيع", "التخطيط"],
    lastStudied: "2024-01-15T10:30:00",
    progress: {
      studied: 15,
      mastered: 8,
      streak: 3,
    },
    flashcards: [
      {
        id: "1",
        question: "ما هو تعريف اللوجستيات؟",
        answer:
          "اللوجستيات هي إدارة تدفق الموارد بين نقطة المنشأ ونقطة الاستهلاك لتلبية متطلبات العملاء أو الشركات",
        category: "مفاهيم أساسية",
        difficulty: "easy",
        tags: ["تعريف", "مفاهيم"],
        explanation:
          "تشمل اللوجستيات تخطيط وتنفيذ ومراقبة الأنشطة المتعلقة بتدفق البضائع والمعلومات",
        hint: "تركز على التدفق من... إلى...",
      },
      {
        id: "2",
        question: "ما هي أنواع المخزون الرئيسية؟",
        answer:
          "المخزون الخام، المخزون تحت التشغيل، المخزون التام، مخزون الصيانة والإصلاح",
        category: "إدارة المخزون",
        difficulty: "medium",
        tags: ["مخزون", "أنواع"],
        explanation: "كل نوع له خصائصه وإدارة مختلفة حسب طبيعة العمل",
        hint: "4 أنواع رئيسية...",
      },
      {
        id: "3",
        question: "ما هو الفرق بين النقل والتوزيع؟",
        answer:
          "النقل هو حركة البضائع من مكان لآخر، بينما التوزيع هو إدارة تدفق البضائع من المنتج للمستهلك النهائي",
        category: "النقل والتوزيع",
        difficulty: "medium",
        tags: ["نقل", "توزيع", "فرق"],
        explanation:
          "النقل جزء من التوزيع، والتوزيع أوسع نطاقاً ويشمل التخزين والتعبئة",
        hint: "أحدهما جزء من الآخر...",
      },
      {
        id: "4",
        question: "ما هو نظام JIT في إدارة المخزون؟",
        answer:
          "Just In Time - نظام إنتاج وتوريد البضائع في الوقت المناسب تماماً لتجنب تكاليف التخزين",
        category: "إدارة المخزون",
        difficulty: "hard",
        tags: ["JIT", "نظام", "مخزون"],
        explanation:
          "يهدف لتقليل المخزون وتحسين الكفاءة من خلال التنسيق الدقيق",
        hint: "اختصار لـ Just In...",
      },
      {
        id: "5",
        question: "ما هي عناصر سلسلة التوريد؟",
        answer:
          "الموردون، المصنعون، الموزعون، تجار الجملة، تجار التجزئة، العملاء",
        category: "مفاهيم أساسية",
        difficulty: "medium",
        tags: ["سلسلة توريد", "عناصر"],
        explanation: "كل عنصر له دور محدد في إيصال المنتج للمستهلك النهائي",
        hint: "6 عناصر رئيسية...",
      },
      {
        id: "6",
        question: "ما هو مفهوم التكلفة الإجمالية للملكية؟",
        answer:
          "TCO - التكلفة الإجمالية لامتلاك وإدارة أصل معين طوال دورة حياته",
        category: "التخطيط",
        difficulty: "hard",
        tags: ["TCO", "تكلفة", "ملكية"],
        explanation: "تشمل سعر الشراء والتشغيل والصيانة والتخلص النهائي",
        hint: "اختصار TCO...",
      },
      {
        id: "7",
        question: "ما هي فوائد إدارة المخزون الفعالة؟",
        answer:
          "تقليل التكاليف، تحسين خدمة العملاء، تقليل المخاطر، تحسين التدفق النقدي",
        category: "إدارة المخزون",
        difficulty: "easy",
        tags: ["فوائد", "مخزون"],
        explanation: "تساعد في تحقيق التوازن بين التكلفة والخدمة",
        hint: "4 فوائد رئيسية...",
      },
      {
        id: "8",
        question: "ما هو الفرق بين التخزين المؤقت والتخزين الدائم؟",
        answer:
          "التخزين المؤقت للتخزين قصير المدى، والدائم للتخزين طويل المدى مع معدات متخصصة",
        category: "إدارة المخزون",
        difficulty: "medium",
        tags: ["تخزين", "مؤقت", "دائم"],
        explanation: "يختلفان في المدة والمعدات والغرض من التخزين",
        hint: "الفرق في المدة...",
      },
    ],
  },
  {
    courseId: "2",
    courseName: "إدارة المشاريع",
    courseDescription: "مبادئ وأدوات إدارة المشاريع بنجاح",
    totalCards: 20,
    categories: ["التخطيط", "التنفيذ", "المراقبة", "الإغلاق"],
    lastStudied: "2024-01-14T15:20:00",
    progress: {
      studied: 12,
      mastered: 6,
      streak: 5,
    },
    flashcards: [
      {
        id: "9",
        question: "ما هي مراحل دورة حياة المشروع؟",
        answer: "البدء، التخطيط، التنفيذ، المراقبة والتحكم، الإغلاق",
        category: "التخطيط",
        difficulty: "easy",
        tags: ["دورة حياة", "مراحل"],
        explanation: "كل مرحلة لها أهداف ومخرجات محددة",
        hint: "5 مراحل رئيسية...",
      },
      {
        id: "10",
        question: "ما هو مثلث إدارة المشاريع؟",
        answer:
          "النطاق، الوقت، التكلفة - العناصر الثلاثة التي يجب موازنتها في أي مشروع",
        category: "التخطيط",
        difficulty: "medium",
        tags: ["مثلث", "نطاق", "وقت", "تكلفة"],
        explanation: "تغيير أي عنصر يؤثر على العنصرين الآخرين",
        hint: "3 عناصر رئيسية...",
      },
      {
        id: "11",
        question: "ما هو تعريف المخاطر في إدارة المشاريع؟",
        answer: "أي حدث أو ظرف قد يؤثر سلباً أو إيجاباً على أهداف المشروع",
        category: "المراقبة",
        difficulty: "medium",
        tags: ["مخاطر", "تعريف"],
        explanation: "يمكن أن تكون المخاطر تهديدات أو فرص",
        hint: "قد تكون إيجابية أو سلبية...",
      },
      {
        id: "12",
        question: "ما هو الفرق بين القائد والمدير؟",
        answer: "القائد يوجه ويلهم، المدير يخطط وينظم ويراقب",
        category: "التنفيذ",
        difficulty: "easy",
        tags: ["قائد", "مدير", "فرق"],
        explanation: "كلاهما مهم لكن بأدوار مختلفة",
        hint: "أحدهما يوجه والآخر ينظم...",
      },
    ],
  },
  {
    courseId: "3",
    courseName: "التسويق الرقمي",
    courseDescription: "استراتيجيات وأدوات التسويق في العصر الرقمي",
    totalCards: 18,
    categories: ["SEO", "وسائل التواصل", "المحتوى", "التحليلات"],
    lastStudied: "2024-01-13T09:15:00",
    progress: {
      studied: 8,
      mastered: 3,
      streak: 1,
    },
    flashcards: [
      {
        id: "13",
        question: "ما هو SEO؟",
        answer:
          "تحسين محركات البحث - تحسين المواقع لظهورها في نتائج البحث الأولى",
        category: "SEO",
        difficulty: "easy",
        tags: ["SEO", "محركات بحث"],
        explanation: "يهدف لزيادة الزيارات العضوية للموقع",
        hint: "اختصار لـ Search Engine...",
      },
      {
        id: "14",
        question: "ما هي عناصر استراتيجية المحتوى؟",
        answer: "التخطيط، الإنتاج، التوزيع، القياس، التحسين",
        category: "المحتوى",
        difficulty: "medium",
        tags: ["محتوى", "استراتيجية"],
        explanation: "دورة مستمرة لتحسين المحتوى",
        hint: "5 عناصر رئيسية...",
      },
      {
        id: "15",
        question: "ما هو معدل التحويل؟",
        answer:
          "نسبة الزوار الذين يقومون بالعمل المطلوب (شراء، تسجيل، إلخ) من إجمالي الزوار",
        category: "التحليلات",
        difficulty: "medium",
        tags: ["تحويل", "نسبة"],
        explanation: "مؤشر مهم لقياس فعالية الحملات التسويقية",
        hint: "نسبة من يقوم بالعمل المطلوب...",
      },
    ],
  },
];

export const getCourseFlashcards = (
  courseId: string
): CourseFlashcards | undefined => {
  return mockFlashcardData.find((course) => course.courseId === courseId);
};

export const getAllCourses = (): CourseFlashcards[] => {
  return mockFlashcardData;
};
