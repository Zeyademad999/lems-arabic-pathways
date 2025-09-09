import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  Award, 
  Clock,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'powerpoint' | 'pdf' | 'document';
  duration: number;
  completed: boolean;
}

interface Quiz {
  id: string;
  title: string;
  questions: number;
  duration: number;
  completed: boolean;
  passed: boolean;
  minimumScore: number;
  bestScore?: number;
}

interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: Quiz;
  progress: number;
  unlocked: boolean;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  overallProgress: number;
  sections: CourseSection[];
}

interface CourseNavigationProps {
  course: Course;
  selectedSection: string;
  onSectionSelect: (sectionId: string) => void;
  onLessonSelect: (lessonId: string) => void;
  onQuizSelect: (quizId: string) => void;
}

export const CourseNavigation: React.FC<CourseNavigationProps> = ({
  course,
  selectedSection,
  onSectionSelect,
  onLessonSelect,
  onQuizSelect
}) => {
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set([selectedSection])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    onSectionSelect(sectionId);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-lg mb-2">{course.title}</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>التقدم الإجمالي</span>
            <span className="font-medium">{course.overallProgress}%</span>
          </div>
          <Progress value={course.overallProgress} className="h-2" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        {course.sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(section.id);
          const isSelected = selectedSection === section.id;
          
          return (
            <div key={section.id} className="space-y-2">
              {/* Section Header */}
              <Button
                variant="ghost"
                className={`w-full justify-between p-3 h-auto ${
                  isSelected ? 'bg-primary/10 border-primary/20' : ''
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3 text-right">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    {section.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : section.unlocked ? (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {sectionIndex + 1}. {section.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.lessons.length} درس • {section.progress}% مكتمل
                    </p>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {/* Section Content */}
              {isExpanded && (
                <div className="mr-4 space-y-1">
                  {/* Lessons */}
                  {section.lessons.map((lesson, lessonIndex) => (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto text-right hover:bg-accent"
                      onClick={() => onLessonSelect(lesson.id)}
                      disabled={!section.unlocked}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-6 h-6">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : section.unlocked ? (
                            <PlayCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div className="flex-1 text-right">
                          <p className="text-xs font-medium leading-tight">
                            {lessonIndex + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-1">
                            <span>{lesson.duration} دقيقة</span>
                            <Clock className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}

                  {/* Section Quiz */}
                  {section.quiz && (
                    <div className="mt-2 p-2 bg-muted/20 rounded-lg">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-right"
                        onClick={() => onQuizSelect(section.quiz!.id)}
                        disabled={!section.unlocked}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex items-center justify-center w-6 h-6">
                            {section.quiz.passed ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : section.unlocked ? (
                              <Award className="h-4 w-4 text-warning" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 text-right">
                            <p className="text-xs font-medium leading-tight">
                              اختبار القسم
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                              <div className="flex items-center gap-2">
                                {section.quiz.bestScore && (
                                  <Badge variant="outline" className={`text-xs ${
                                    section.quiz.passed ? 'text-success' : 'text-warning'
                                  }`}>
                                    {section.quiz.bestScore}%
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{section.quiz.questions} سؤال</span>
                                <FileText className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Button>

                      {section.quiz.completed && !section.quiz.passed && (
                        <div className="mt-2 p-2 bg-warning/10 rounded text-center">
                          <p className="text-xs text-warning">
                            يجب تحقيق {section.quiz.minimumScore}% لفتح القسم التالي
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};