import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Student pages
import Courses from "./pages/student/Courses";
import CourseDetail from "./pages/student/CourseDetail";
import LessonView from "./pages/student/LessonView";
// Student quiz routes
import QuizPreview from "./pages/student/QuizPreview";
import QuizTaking from "./pages/student/QuizTaking";
import QuizResults from "./pages/student/QuizResults";
import Assignments from "./pages/student/Assignments";
import Quizzes from "./pages/student/Quizzes";
import Progress from "./pages/student/Progress";
import Behavior from "./pages/student/Behavior";
import Attendance from "./pages/student/Attendance";
import Chatbot from "./pages/student/Chatbot";
import Settings from "./pages/student/Settings";

// Instructor pages
import InstructorPortal from "./pages/instructor/InstructorPortal";
import Students from "./pages/instructor/Students";
import CreateCourse from "./pages/instructor/CreateCourse";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorAssignments from "./pages/instructor/InstructorAssignments";
import InstructorQuizzes from "./pages/instructor/InstructorQuizzes";
import InstructorAnalytics from "./pages/instructor/InstructorAnalytics";
import InstructorGrading from "./pages/instructor/InstructorGrading";
import InstructorAttendance from "./pages/instructor/InstructorAttendance";
import InstructorBehavior from "./pages/instructor/InstructorBehavior";
import InstructorProgress from "./pages/instructor/InstructorProgress";
import InstructorChatbot from "./pages/instructor/InstructorChatbot";
import InstructorSettings from "./pages/instructor/InstructorSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div dir="rtl" className="font-arabic">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Student routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonView />} />
            <Route path="/quizzes" element={<Quizzes />} />
            
            {/* Quiz routes */}
            <Route path="/quiz/:quizId/preview" element={<QuizPreview />} />
            <Route path="/quiz/:quizId/take" element={<QuizTaking />} />
            <Route path="/quiz/:quizId/retake" element={<QuizTaking />} />
            <Route path="/quiz/:quizId/results" element={<QuizResults />} />
            
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Instructor Portal - Completely separate */}
            <Route path="/instructor" element={<InstructorPortal />} />
            <Route path="/instructor/students" element={<Students />} />
            <Route path="/instructor/courses" element={<InstructorCourses />} />
            <Route path="/instructor/create-course" element={<CreateCourse />} />
            <Route path="/instructor/assignments" element={<InstructorAssignments />} />
            <Route path="/instructor/quizzes" element={<InstructorQuizzes />} />
            <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
            <Route path="/instructor/grading" element={<InstructorGrading />} />
            <Route path="/instructor/attendance" element={<InstructorAttendance />} />
            <Route path="/instructor/chatbot" element={<InstructorChatbot />} />
            <Route path="/instructor/settings" element={<InstructorSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
