import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RotateCcw,
  Lightbulb,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  BookOpen,
} from "lucide-react";

interface FlashcardProps {
  flashcard: {
    id: string;
    question: string;
    answer: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    explanation?: string;
    hint?: string;
  };
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (rating: "easy" | "medium" | "hard") => void;
  showHint: boolean;
  onShowHint: () => void;
  cardNumber: number;
  totalCards: number;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  flashcard,
  isFlipped,
  onFlip,
  onRate,
  showHint,
  onShowHint,
  cardNumber,
  totalCards,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "سهل";
      case "medium":
        return "متوسط";
      case "hard":
        return "صعب";
      default:
        return difficulty;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "🟢";
      case "medium":
        return "🟡";
      case "hard":
        return "🔴";
      default:
        return "⚪";
    }
  };

  // Generate a random color for each question based on card ID
  const getQuestionColor = (cardId: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-rose-500",
      "bg-violet-500",
      "bg-sky-500",
    ];
    const index = parseInt(cardId) % colors.length;
    return colors[index];
  };

  const getQuestionColorLight = (cardId: string) => {
    const colors = [
      "bg-blue-100",
      "bg-purple-100",
      "bg-indigo-100",
      "bg-cyan-100",
      "bg-teal-100",
      "bg-orange-100",
      "bg-pink-100",
      "bg-rose-100",
      "bg-violet-100",
      "bg-sky-100",
    ];
    const index = parseInt(cardId) % colors.length;
    return colors[index];
  };

  const getQuestionColorDark = (cardId: string) => {
    const colors = [
      "text-blue-700",
      "text-purple-700",
      "text-indigo-700",
      "text-cyan-700",
      "text-teal-700",
      "text-orange-700",
      "text-pink-700",
      "text-rose-700",
      "text-violet-700",
      "text-sky-700",
    ];
    const index = parseInt(cardId) % colors.length;
    return colors[index];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Counter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            بطاقة {cardNumber} من {totalCards}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={getDifficultyColor(flashcard.difficulty)}
          >
            {getDifficultyIcon(flashcard.difficulty)}{" "}
            {getDifficultyLabel(flashcard.difficulty)}
          </Badge>
          <Badge variant="secondary">{flashcard.category}</Badge>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div
          className="flashcard-container w-full h-[400px] cursor-pointer"
          onClick={onFlip}
        >
          <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
            {/* Question Side */}
            <div
              className={`flashcard-front ${getQuestionColorLight(
                flashcard.id
              )} border-2 border-gray-300`}
            >
              <Card className="w-full h-full border-0 shadow-lg bg-transparent">
                <div className="p-8 text-center w-full h-full flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`p-4 ${getQuestionColor(
                          flashcard.id
                        )} rounded-full shadow-lg`}
                      >
                        <span className="text-3xl text-white">❓</span>
                      </div>
                    </div>

                    <h2
                      className={`text-2xl font-bold ${getQuestionColorDark(
                        flashcard.id
                      )} mb-4`}
                    >
                      السؤال
                    </h2>

                    <p className="text-lg leading-relaxed text-gray-800 mb-6 font-medium">
                      {flashcard.question}
                    </p>

                    {flashcard.hint && !showHint && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowHint();
                        }}
                        className="flex items-center gap-2 bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                      >
                        <Lightbulb className="h-4 w-4" />
                        إظهار التلميح
                      </Button>
                    )}

                    {showHint && flashcard.hint && (
                      <div className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-bold text-yellow-800">
                            تلميح
                          </span>
                        </div>
                        <p className="text-sm text-yellow-700 font-medium">
                          {flashcard.hint}
                        </p>
                      </div>
                    )}

                    <div
                      className={`text-sm ${getQuestionColorDark(
                        flashcard.id
                      )} font-medium`}
                    >
                      انقر على البطاقة لرؤية الإجابة
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Answer Side */}
            <div className="flashcard-back bg-green-100 border-2 border-green-300">
              <Card className="w-full h-full border-0 shadow-lg bg-transparent">
                <div className="p-8 text-center w-full h-full flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 bg-green-500 rounded-full shadow-lg">
                        <span className="text-3xl text-white">💡</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-green-700 mb-4">
                      الإجابة
                    </h2>

                    <p className="text-lg leading-relaxed text-gray-800 mb-6 font-medium">
                      {flashcard.answer}
                    </p>

                    {flashcard.explanation && (
                      <div className="p-4 bg-green-200 border-2 border-green-400 rounded-lg shadow-md mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-bold text-green-800">
                            شرح إضافي
                          </span>
                        </div>
                        <p className="text-sm text-green-700 font-medium">
                          {flashcard.explanation}
                        </p>
                      </div>
                    )}

                    <div className="text-sm text-green-600 font-medium">
                      انقر على البطاقة للعودة للسؤال
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="mt-6 space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-3">
              كيف كانت صعوبة هذا السؤال؟
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRate("easy")}
              className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
            >
              <CheckCircle className="h-4 w-4" />
              سهل
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRate("medium")}
              className="flex items-center gap-2 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
            >
              <Clock className="h-4 w-4" />
              متوسط
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRate("hard")}
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4" />
              صعب
            </Button>
          </div>
        </div>
      )}

      {/* Tags */}
      {flashcard.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {flashcard.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
