import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings,
  FileText,
  Calendar,
  MessageCircle,
  Plus,
  Eye,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstructorSidebarProps {
  isOpen: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    icon: Home,
    path: '/instructor'
  },
  {
    id: 'courses',
    label: 'إدارة الكورسات',
    icon: BookOpen,
    path: '/instructor/courses'
  },
  {
    id: 'students',
    label: 'إدارة الطلاب',
    icon: Users,
    path: '/instructor/students'
  },
  {
    id: 'quizzes',
    label: 'الاختبارات',
    icon: FileText,
    path: '/instructor/quizzes'
  },
  {
    id: 'attendance',
    label: 'تتبع الحضور',
    icon: Calendar,
    path: '/instructor/attendance'
  },
  {
    id: 'grading',
    label: 'التصحيح والدرجات',
    icon: UserCheck,
    path: '/instructor/grading'
  },
  {
    id: 'behavior',
    label: 'التقييم السلوكي',
    icon: TrendingUp,
    path: '/instructor/behavior'
  },
  {
    id: 'chatbot',
    label: 'المساعد الذكي',
    icon: MessageCircle,
    path: '/instructor/chatbot'
  },
  {
    id: 'settings',
    label: 'الإعدادات',
    icon: Settings,
    path: '/instructor/settings'
  }
];

export const InstructorSidebar: React.FC<InstructorSidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside 
      className={`
        fixed right-0 top-header h-[calc(100vh-4rem)] bg-card border-l border-border
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'}
      `}
    >
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`
                w-full justify-start gap-3 h-12 px-3
                ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
                ${!isOpen ? 'justify-center px-2' : ''}
                transition-all duration-200
              `}
              asChild
            >
              <Link to={item.path}>
                <Icon className="h-5 w-5 shrink-0" />
                {isOpen && (
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};