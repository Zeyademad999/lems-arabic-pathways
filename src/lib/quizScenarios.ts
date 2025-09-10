export interface QuizAttempt {
  attemptNumber: number;
  score: number;
  passed: boolean;
  timestamp: string;
  answers: { [questionId: string]: any };
}

export interface QuizScenario {
  id: string;
  title: string;
  description: string;
  duration: number;
  attempts: number;
  maxAttempts: number;
  minimumScore: number;
  sectionTitle: string;
  attempts: QuizAttempt[];
  questions: any[];
}

// Quiz scenarios with different attempt outcomes
export const quizScenarios: QuizScenario[] = [
  {
    id: "1",
    title: "اختبار: مقدمة في اللوجستيات",
    description:
      "اختبار شامل يغطي المفاهيم الأساسية في اللوجستيات وأهميتها في الاقتصاد الحديث",
    duration: 20,
    attempts: 2, // Student has attempted 2 times
    maxAttempts: 3,
    minimumScore: 70,
    sectionTitle: "مقدمة في اللوجستيات",
    attempts: [
      {
        attemptNumber: 1,
        score: 45, // Failed first attempt
        passed: false,
        timestamp: "2024-01-10T10:30:00Z",
        answers: {
          "1": 0, // Wrong answer
          "2": 1, // Wrong answer
          "3": 1, // Wrong answer
          "4": 0, // Wrong answer
          "5": 1, // Wrong answer
        },
      },
      {
        attemptNumber: 2,
        score: 85, // Passed second attempt
        passed: true,
        timestamp: "2024-01-12T14:20:00Z",
        answers: {
          "1": 1, // Correct answer
          "2": 0, // Correct answer
          "3": 2, // Correct answer
          "4": 1, // Correct answer
          "5": 0, // Correct answer
        },
      },
    ],
    questions: [
      {
        id: "1",
        type: "multiple_choice",
        question: "ما هو التعريف الأدق للوجستيات؟",
        options: [
          "علم النقل والشحن فقط",
          "إدارة تدفق البضائع والمعلومات من المنشأ إلى الاستهلاك",
          "إدارة المخازن والمستودعات",
          "تسويق المنتجات والخدمات",
        ],
        correctAnswer: 1,
        explanation:
          "اللوجستيات هي علم إدارة تدفق البضائع والمعلومات والموارد من نقطة المنشأ إلى نقطة الاستهلاك.",
        points: 5,
      },
      {
        id: "2",
        type: "true_false",
        question: "تشمل اللوجستيات فقط النقل والتوزيع.",
        correctAnswer: 0,
        explanation:
          "اللوجستيات تشمل أيضاً إدارة المخازن، المخزون، خدمة العملاء، ومعالجة الطلبات.",
        points: 3,
      },
      {
        id: "3",
        type: "multiple_choice",
        question: "أي من العناصر التالية ليس من العناصر الأساسية للوجستيات؟",
        options: [
          "النقل والتوزيع",
          "إدارة المخازن",
          "التسويق الرقمي",
          "إدارة المخزون",
        ],
        correctAnswer: 2,
        explanation: "التسويق الرقمي ليس جزءاً من العناصر الأساسية للوجستيات.",
        points: 4,
      },
      {
        id: "4",
        type: "multiple_choice",
        question: "ما هي الفائدة الرئيسية للوجستيات في الشركات؟",
        options: [
          "زيادة عدد الموظفين",
          "تقليل التكاليف وتحسين الكفاءة",
          "زيادة سعر المنتجات",
          "تعقيد العمليات",
        ],
        correctAnswer: 1,
        explanation:
          "اللوجستيات تساعد في تقليل التكاليف وتحسين كفاءة العمليات وزيادة رضا العملاء.",
        points: 4,
      },
      {
        id: "5",
        type: "true_false",
        question: "يمكن للشركات الصغيرة الاستغناء عن تطبيق مبادئ اللوجستيات.",
        correctAnswer: 0,
        explanation:
          "حتى الشركات الصغيرة تحتاج لتطبيق مبادئ اللوجستيات لتحسين عملياتها وخفض التكاليف.",
        points: 4,
      },
    ],
  },
  {
    id: "2",
    title: "اختبار: إدارة المخازن",
    description: "اختبار يغطي مفاهيم إدارة المخازن الحديثة وأنواعها",
    duration: 15,
    attempts: 3, // Student has attempted 3 times (max attempts reached)
    maxAttempts: 3,
    minimumScore: 75,
    sectionTitle: "إدارة المخازن",
    attempts: [
      {
        attemptNumber: 1,
        score: 60, // Failed first attempt
        passed: false,
        timestamp: "2024-01-08T09:15:00Z",
        answers: {
          "1": 1, // Wrong answer
          "2": 0, // Wrong answer
          "3": 2, // Wrong answer
        },
      },
      {
        attemptNumber: 2,
        score: 65, // Failed second attempt (close but not enough)
        passed: false,
        timestamp: "2024-01-09T11:30:00Z",
        answers: {
          "1": 0, // Wrong answer
          "2": 1, // Wrong answer
          "3": 1, // Wrong answer
        },
      },
      {
        attemptNumber: 3,
        score: 80, // Passed third attempt
        passed: true,
        timestamp: "2024-01-11T16:45:00Z",
        answers: {
          "1": 2, // Correct answer
          "2": 2, // Correct answer
          "3": 0, // Correct answer
        },
      },
    ],
    questions: [
      {
        id: "1",
        type: "multiple_choice",
        question: "ما هو النوع الأكثر شيوعاً من المخازن؟",
        options: [
          "مخازن التوزيع",
          "مخازن الإنتاج",
          "مخازن التجزئة",
          "مخازن الجملة",
        ],
        correctAnswer: 2,
        explanation:
          "مخازن التجزئة هي الأكثر شيوعاً وتستخدم لتخزين المنتجات النهائية.",
        points: 5,
      },
      {
        id: "2",
        type: "multiple_choice",
        question: "أي من التالي ليس من مبادئ إدارة المخازن؟",
        options: [
          "تنظيم المساحة",
          "مراقبة المخزون",
          "تسويق المنتجات",
          "التحكم في التكاليف",
        ],
        correctAnswer: 2,
        explanation:
          "تسويق المنتجات ليس من مبادئ إدارة المخازن، بل من مبادئ التسويق.",
        points: 5,
      },
      {
        id: "3",
        type: "true_false",
        question: "يمكن استخدام نفس نظام إدارة المخازن لجميع أنواع المنتجات.",
        correctAnswer: 0,
        explanation:
          "كل نوع من المنتجات يحتاج نظام إدارة مخازن مناسب لطبيعته ومتطلباته.",
        points: 5,
      },
    ],
  },
  {
    id: "3",
    title: "اختبار: النقل والتوزيع",
    description: "اختبار يغطي أنظمة النقل ووسائل التوزيع المختلفة",
    duration: 25,
    attempts: 1, // Student has attempted 1 time
    maxAttempts: 2,
    minimumScore: 80,
    sectionTitle: "النقل والتوزيع",
    attempts: [
      {
        attemptNumber: 1,
        score: 55, // Failed first attempt
        passed: false,
        timestamp: "2024-01-13T13:20:00Z",
        answers: {
          "1": 0, // Wrong answer
          "2": 1, // Wrong answer
          "3": 0, // Wrong answer
          "4": 2, // Wrong answer
        },
      },
    ],
    questions: [
      {
        id: "1",
        type: "multiple_choice",
        question: "أي وسيلة نقل هي الأسرع للبضائع الخفيفة؟",
        options: [
          "النقل البحري",
          "النقل الجوي",
          "النقل البري",
          "النقل بالسكك الحديدية",
        ],
        correctAnswer: 1,
        explanation: "النقل الجوي هو الأسرع للبضائع الخفيفة رغم كونه الأغلى.",
        points: 6,
      },
      {
        id: "2",
        type: "multiple_choice",
        question: "ما هو الهدف الرئيسي من التوزيع؟",
        options: [
          "زيادة التكاليف",
          "توصيل المنتجات للعملاء في الوقت المناسب",
          "تعقيد العمليات",
          "تقليل الجودة",
        ],
        correctAnswer: 1,
        explanation:
          "الهدف الرئيسي من التوزيع هو توصيل المنتجات للعملاء في الوقت المناسب وبالجودة المطلوبة.",
        points: 6,
      },
      {
        id: "3",
        type: "true_false",
        question: "النقل البحري مناسب فقط للبضائع الثقيلة.",
        correctAnswer: 0,
        explanation:
          "النقل البحري مناسب للبضائع الثقيلة والخفيفة، لكنه الأبطأ والأرخص.",
        points: 6,
      },
      {
        id: "4",
        type: "multiple_choice",
        question: "أي من التالي ليس من أنواع التوزيع؟",
        options: [
          "التوزيع المباشر",
          "التوزيع غير المباشر",
          "التوزيع الهجين",
          "التوزيع الافتراضي",
        ],
        correctAnswer: 3,
        explanation:
          "التوزيع الافتراضي ليس من أنواع التوزيع التقليدية المعروفة.",
        points: 7,
      },
    ],
  },
];

export const getQuizScenario = (quizId: string): QuizScenario | undefined => {
  return quizScenarios.find((quiz) => quiz.id === quizId);
};

export const getCurrentAttempt = (quizId: string): QuizAttempt | null => {
  const quiz = getQuizScenario(quizId);
  if (!quiz || quiz.attempts.length === 0) return null;
  return quiz.attempts[quiz.attempts.length - 1]; // Get the latest attempt
};

export const canRetakeQuiz = (quizId: string): boolean => {
  const quiz = getQuizScenario(quizId);
  if (!quiz) return false;
  return quiz.attempts < quiz.maxAttempts;
};

export const getQuizStatus = (
  quizId: string
):
  | "not-started"
  | "in-progress"
  | "passed"
  | "failed"
  | "max-attempts-reached" => {
  const quiz = getQuizScenario(quizId);
  if (!quiz) return "not-started";

  if (quiz.attempts.length === 0) return "not-started";

  const latestAttempt = quiz.attempts[quiz.attempts.length - 1];
  if (latestAttempt.passed) return "passed";

  if (quiz.attempts >= quiz.maxAttempts) return "max-attempts-reached";

  return "failed";
};
