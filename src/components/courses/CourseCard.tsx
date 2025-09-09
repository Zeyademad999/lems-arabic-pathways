import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  PlayCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  status: 'available' | 'enrolled' | 'completed' | 'locked';
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  onEnroll?: () => void;
  onContinue?: () => void;
  onView?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  progress,
  status,
  difficulty,
  onEnroll,
  onContinue,
  onView
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'enrolled':
        return <PlayCircle className="h-5 w-5 text-warning" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <BookOpen className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'enrolled':
        return <Badge className="lems-badge-pending">مسجل</Badge>;
      case 'completed':
        return <Badge className="lems-badge-success">مكتمل</Badge>;
      case 'locked':
        return <Badge className="lems-badge-locked">مقفل</Badge>;
      default:
        return <Badge className="lems-badge-success">متاح</Badge>;
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'مبتدئ':
        return 'text-success';
      case 'متوسط':
        return 'text-warning';
      case 'متقدم':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActionButton = () => {
    switch (status) {
      case 'enrolled':
        return (
          <Button onClick={onContinue} className="lems-button-primary w-full">
            متابعة التعلم
          </Button>
        );
      case 'completed':
        return (
          <Button onClick={onView} variant="outline" className="w-full">
            مراجعة الكورس
          </Button>
        );
      case 'locked':
        return (
          <Button disabled className="w-full" variant="outline">
            غير متاح حالياً
          </Button>
        );
      default:
        return (
          <Button onClick={onEnroll} className="lems-button-primary w-full">
            التسجيل في الكورس
          </Button>
        );
    }
  };

  return (
    <Card className="lems-card h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Course Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <div className="space-y-1">
              <h3 className="font-semibold text-education-primary line-clamp-2">
                {title}
              </h3>
              {getStatusBadge()}
            </div>
          </div>
        </div>

        {/* Course Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Course Meta */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">المدرب:</span>
            <span className="font-medium">{instructor}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">المستوى:</span>
            <span className={`font-medium ${getDifficultyColor()}`}>
              {difficulty}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{students} طالب</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span>{rating}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar (for enrolled courses) */}
        {status === 'enrolled' && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">التقدم</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="lems-progress-bar">
              <div 
                className="lems-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-border mt-4">
        {getActionButton()}
      </div>
    </Card>
  );
};