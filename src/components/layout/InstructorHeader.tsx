import React from 'react';
import { Menu, Bell, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface InstructorHeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const InstructorHeader: React.FC<InstructorHeaderProps> = ({
  onToggleSidebar,
  sidebarOpen
}) => {
  return (
    <header className="h-header bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Link to="/instructor" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LEMS</span>
          </div>
          <h1 className="font-bold text-lg text-foreground">بوابة المدربين</h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="البحث..."
            className="w-64 pl-4 pr-10 py-2 border rounded-md bg-background"
          />
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">د. محمد أحمد</span>
        </div>

        <Link to="/">
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
};