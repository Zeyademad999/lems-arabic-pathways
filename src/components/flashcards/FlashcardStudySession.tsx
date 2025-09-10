import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flashcard } from "./Flashcard";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Trophy,
  Target,
  Clock,
  Star,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  CourseFlashcards,
  Flashcard as FlashcardType,
} from "@/lib/flashcardData";

interface StudySession {
  courseId: string;
  courseName: string;
  flashcards: FlashcardType[];
  currentIndex: number;
  studiedCards: string[];
  masteredCards: string[];
  sessionStartTime: Date;
  streak: number;
}

interface FlashcardStudySessionProps {
  courseData: CourseFlashcards;
  onComplete: (session: StudySession) => void;
  onExit: () => void;
}

export const FlashcardStudySession: React.FC<FlashcardStudySessionProps> = ({
  courseData,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [studiedCards, setStudiedCards] = React.useState<string[]>([]);
  const [masteredCards, setMasteredCards] = React.useState<string[]>([]);
  const [sessionStartTime] = React.useState(new Date());
  const [streak, setStreak] = React.useState(0);
  const [sessionStats, setSessionStats] = React.useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [slideDirection, setSlideDirection] = React.useState<
    "left" | "right" | null
  >(null);

  const currentCard = courseData.flashcards[currentIndex];
  const progress = ((currentIndex + 1) / courseData.flashcards.length) * 100;
  const isLastCard = currentIndex === courseData.flashcards.length - 1;
  const isFirstCard = currentIndex === 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !studiedCards.includes(currentCard.id)) {
      setStudiedCards([...studiedCards, currentCard.id]);
    }
  };

  const handleRate = (rating: "easy" | "medium" | "hard") => {
    if (!masteredCards.includes(currentCard.id)) {
      setMasteredCards([...masteredCards, currentCard.id]);
      setStreak(streak + 1);
      setSessionStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
    }

    // Auto-advance after rating
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    if (!isLastCard) {
      setIsTransitioning(true);
      setSlideDirection("left");

      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setShowHint(false);
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 300);
    } else {
      // Session complete
      const session: StudySession = {
        courseId: courseData.courseId,
        courseName: courseData.courseName,
        flashcards: courseData.flashcards,
        currentIndex,
        studiedCards,
        masteredCards,
        sessionStartTime,
        streak,
      };
      onComplete(session);
    }
  };

  const handlePrevious = () => {
    if (!isFirstCard) {
      setIsTransitioning(true);
      setSlideDirection("right");

      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsFlipped(false);
        setShowHint(false);
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 300);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const getSessionDuration = () => {
    const now = new Date();
    const diff = now.getTime() - sessionStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getMasteryRate = () => {
    return studiedCards.length > 0
      ? Math.round((masteredCards.length / studiedCards.length) * 100)
      : 0;
  };

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <Card className="lems-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-education-primary">
                {courseData.courseName}
              </h2>
              <p className="text-sm text-muted-foreground">
                جلسة دراسة البطاقات التعليمية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">مدة الجلسة</p>
              <p className="font-semibold flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getSessionDuration()}
              </p>
            </div>
            <Button variant="outline" onClick={onExit}>
              <Home className="h-4 w-4 ml-2" />
              الخروج
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">التقدم</p>
              <p className="text-2xl font-bold">
                {currentIndex + 1}/{courseData.flashcards.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">متقن</p>
              <p className="text-2xl font-bold text-green-600">
                {masteredCards.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">معدل الإتقان</p>
              <p className="text-2xl font-bold text-purple-600">
                {getMasteryRate()}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="lems-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السلسلة</p>
              <p className="text-2xl font-bold text-orange-600">{streak}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="lems-card">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">تقدم الجلسة</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </Card>

      {/* Flashcard */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isTransitioning
            ? slideDirection === "left"
              ? "transform -translate-x-full opacity-0"
              : "transform translate-x-full opacity-0"
            : "transform translate-x-0 opacity-100"
        }`}
      >
        <Flashcard
          flashcard={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onRate={handleRate}
          showHint={showHint}
          onShowHint={handleShowHint}
          cardNumber={currentIndex + 1}
          totalCards={courseData.flashcards.length}
        />
      </div>

      {/* Navigation */}
      <Card className="lems-card">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstCard || isTransitioning}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            السابق
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {currentIndex + 1} من {courseData.flashcards.length}
            </Badge>
          </div>

          <Button
            onClick={handleNext}
            disabled={!isFlipped || isTransitioning}
            className="flex items-center gap-2 lems-button-primary"
          >
            {isLastCard ? "إنهاء الجلسة" : "التالي"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Study Tips */}
      <Card className="lems-card">
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            نصائح للدراسة الفعالة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>• اقرأ السؤال بعناية قبل النظر للإجابة</p>
              <p>• استخدم التلميحات عند الحاجة</p>
            </div>
            <div className="space-y-2">
              <p>• قيم صعوبة كل سؤال بصدق</p>
              <p>• راجع البطاقات الصعبة مرة أخرى</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
