interface CourseProgress {
  courseId: string;
  sections: SectionProgress[];
  overallProgress: number;
  completedLessons: string[];
  quizResults: { [quizId: string]: QuizResult };
}

interface SectionProgress {
  sectionId: string;
  unlocked: boolean;
  completed: boolean;
  progress: number;
  lessonsCompleted: string[];
}

interface QuizResult {
  quizId: string;
  attempts: number;
  bestScore: number;
  passed: boolean;
  completedAt: string;
  unlockNext: boolean;
}

class ProgressionService {
  private static STORAGE_KEY = 'lems_course_progress';

  static getCourseProgress(courseId: string): CourseProgress {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const allProgress = stored ? JSON.parse(stored) : {};
    
    return allProgress[courseId] || this.getInitialProgress(courseId);
  }

  static getInitialProgress(courseId: string): CourseProgress {
    return {
      courseId,
      sections: [
        {
          sectionId: '1',
          unlocked: true,
          completed: false,
          progress: 0,
          lessonsCompleted: []
        },
        {
          sectionId: '2',
          unlocked: false,
          completed: false,
          progress: 0,
          lessonsCompleted: []
        },
        {
          sectionId: '3',
          unlocked: false,
          completed: false,
          progress: 0,
          lessonsCompleted: []
        }
      ],
      overallProgress: 0,
      completedLessons: [],
      quizResults: {}
    };
  }

  static updateCourseProgress(courseId: string, updates: Partial<CourseProgress>) {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const allProgress = stored ? JSON.parse(stored) : {};
    
    const currentProgress = this.getCourseProgress(courseId);
    const updatedProgress = { ...currentProgress, ...updates };
    
    allProgress[courseId] = updatedProgress;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('courseProgressUpdate', {
      detail: { courseId, progress: updatedProgress }
    }));
    
    return updatedProgress;
  }

  static completeQuiz(courseId: string, quizId: string, score: number, minimumScore: number): boolean {
    const progress = this.getCourseProgress(courseId);
    const passed = score >= minimumScore;
    
    const quizResult: QuizResult = {
      quizId,
      attempts: (progress.quizResults[quizId]?.attempts || 0) + 1,
      bestScore: Math.max(score, progress.quizResults[quizId]?.bestScore || 0),
      passed,
      completedAt: new Date().toISOString(),
      unlockNext: passed
    };

    progress.quizResults[quizId] = quizResult;

    // If quiz passed, unlock next section
    if (passed) {
      this.unlockNextSection(progress, quizId);
    }

    this.updateCourseProgress(courseId, progress);
    return passed;
  }

  private static unlockNextSection(progress: CourseProgress, completedQuizId: string) {
    // Find the section that contains this quiz
    const sectionMapping = {
      '1': '2', // Quiz 1 unlocks section 2
      '2': '3', // Quiz 2 unlocks section 3
    };

    const nextSectionId = sectionMapping[completedQuizId as keyof typeof sectionMapping];
    if (nextSectionId) {
      const nextSection = progress.sections.find(s => s.sectionId === nextSectionId);
      if (nextSection) {
        nextSection.unlocked = true;
      }
    }

    // Mark current section as completed
    const currentSectionId = completedQuizId;
    const currentSection = progress.sections.find(s => s.sectionId === currentSectionId);
    if (currentSection) {
      currentSection.completed = true;
      currentSection.progress = 100;
    }

    // Update overall progress
    const unlockedSections = progress.sections.filter(s => s.unlocked).length;
    const completedSections = progress.sections.filter(s => s.completed).length;
    progress.overallProgress = Math.round((completedSections / progress.sections.length) * 100);
  }

  static completeLesson(courseId: string, sectionId: string, lessonId: string) {
    const progress = this.getCourseProgress(courseId);
    
    // Add lesson to completed lessons
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    // Update section progress
    const section = progress.sections.find(s => s.sectionId === sectionId);
    if (section && !section.lessonsCompleted.includes(lessonId)) {
      section.lessonsCompleted.push(lessonId);
      
      // Calculate section progress based on completed lessons
      // Assuming each section has 3 lessons (you can make this dynamic)
      const totalLessonsInSection = 3;
      section.progress = Math.round((section.lessonsCompleted.length / totalLessonsInSection) * 100);
    }

    this.updateCourseProgress(courseId, progress);
  }

  static getUnlockedSections(courseId: string): string[] {
    const progress = this.getCourseProgress(courseId);
    return progress.sections.filter(s => s.unlocked).map(s => s.sectionId);
  }

  static isLessonUnlocked(courseId: string, sectionId: string): boolean {
    const progress = this.getCourseProgress(courseId);
    const section = progress.sections.find(s => s.sectionId === sectionId);
    return section?.unlocked || false;
  }

  static getQuizResult(courseId: string, quizId: string): QuizResult | null {
    const progress = this.getCourseProgress(courseId);
    return progress.quizResults[quizId] || null;
  }
}

export { ProgressionService };
export type { CourseProgress, SectionProgress, QuizResult };