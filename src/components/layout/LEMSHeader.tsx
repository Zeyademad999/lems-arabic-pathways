import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LEMSHeaderProps {
  userRole: 'student' | 'instructor' | 'admin';
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const LEMSHeader: React.FC<LEMSHeaderProps> = ({ 
  userRole, 
  onToggleSidebar,
  sidebarOpen 
}) => {
  const getRoleTitle = () => {
    switch (userRole) {
      case 'student': return 'الطالب';
      case 'instructor': return 'المدرب';
      case 'admin': return 'المدير';
      default: return 'مستخدم';
    }
  };

  return (
    <header className="bg-card border-b border-border h-header flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-education-primary">نظام LEMS</h1>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm font-medium text-muted-foreground">{getRoleTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="p-2 hover:bg-accent relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">أحمد محمد</span>
        </div>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};