import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsModal } from "@/components/notifications/NotificationsModal";
import { getUnreadCount } from "@/lib/notificationsData";

interface LEMSHeaderProps {
  userRole: "student" | "instructor" | "admin";
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onSignOut?: () => void;
}

export const LEMSHeader: React.FC<LEMSHeaderProps> = ({
  userRole,
  onToggleSidebar,
  sidebarOpen,
  onSignOut,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const unreadCount = getUnreadCount(userRole);
  const getRoleTitle = () => {
    switch (userRole) {
      case "student":
        return "الطالب";
      case "instructor":
        return "المدرب";
      case "admin":
        return "المدير";
      default:
        return "مستخدم";
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
          <h1 className="text-xl font-bold text-education-primary">
            نظام LEMS
          </h1>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm font-medium text-muted-foreground">
            {getRoleTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-accent relative"
          onClick={() => setIsNotificationsOpen(true)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>

        <div className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">أحمد محمد</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-destructive/10 hover:text-destructive"
          onClick={onSignOut}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        userRole={userRole}
      />
    </header>
  );
};
