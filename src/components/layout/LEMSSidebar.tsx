import React from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings,
  GraduationCap,
  FileText,
  Award,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LEMSSidebarProps {
  userRole: 'student' | 'instructor' | 'admin';
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  roles: string[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'الرئيسية',
    icon: Home,
    path: '/',
    roles: ['student', 'instructor', 'admin']
  },
  {
    id: 'courses',
    label: 'الكورسات',
    icon: BookOpen,
    path: '/courses',
    roles: ['student', 'instructor', 'admin']
  },
  {
    id: 'assignments',
    label: 'الواجبات',
    icon: ClipboardList,
    path: '/assignments',
    roles: ['student', 'instructor']
  },
  {
    id: 'quizzes',
    label: 'الاختبارات',
    icon: FileText,
    path: '/quizzes',
    roles: ['student', 'instructor']
  },
  {
    id: 'progress',
    label: 'التقدم',
    icon: BarChart3,
    path: '/progress',
    roles: ['student', 'instructor', 'admin']
  },
  {
    id: 'behavior',
    label: 'التقييم السلوكي',
    icon: Award,
    path: '/behavior',
    roles: ['student', 'instructor']
  },
  {
    id: 'attendance',
    label: 'الحضور',
    icon: Calendar,
    path: '/attendance',
    roles: ['student', 'instructor', 'admin']
  },
  {
    id: 'students',
    label: 'الطلاب',
    icon: Users,
    path: '/students',
    roles: ['instructor', 'admin']
  },
  {
    id: 'create-course',
    label: 'إنشاء كورس',
    icon: GraduationCap,
    path: '/create-course',
    roles: ['instructor', 'admin']
  },
  {
    id: 'chatbot',
    label: 'المساعد الذكي',
    icon: MessageCircle,
    path: '/chatbot',
    roles: ['student', 'instructor', 'admin']
  },
  {
    id: 'settings',
    label: 'الإعدادات',
    icon: Settings,
    path: '/settings',
    roles: ['student', 'instructor', 'admin']
  }
];

export const LEMSSidebar: React.FC<LEMSSidebarProps> = ({ 
  userRole, 
  isOpen 
}) => {
  const [activeItem, setActiveItem] = React.useState('dashboard');
  
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <aside 
      className={`
        fixed right-0 top-header h-[calc(100vh-4rem)] bg-card border-l border-border
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'}
      `}
    >
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
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
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};