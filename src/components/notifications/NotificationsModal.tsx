import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Bell,
  Check,
  CheckCheck,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  Notification,
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/lib/notificationsData";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: "student" | "instructor" | "admin";
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  userRole,
}) => {
  const [notifications, setNotifications] = React.useState<Notification[]>(
    getNotifications(userRole)
  );

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "منذ دقائق";
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} يوم`;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, userRole);
    setNotifications(getNotifications(userRole));
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(userRole);
    setNotifications(getNotifications(userRole));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold">الإشعارات</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} إشعار غير مقروء`
                    : "جميع الإشعارات مقروءة"}
                </div>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                تعيين الكل كمقروء
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لا توجد إشعارات</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? "border-l-4 border-l-primary" : ""
                } ${getTypeColor(notification.type)}`}
                onClick={() => {
                  if (!notification.isRead) {
                    handleMarkAsRead(notification.id);
                  }
                  if (notification.actionUrl) {
                    // Navigate to action URL
                    window.location.href = notification.actionUrl;
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            !notification.isRead ? "font-semibold" : ""
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <div
                            className={`w-2 h-2 rounded-full ${getPriorityColor(
                              notification.priority
                            )}`}
                          />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {notification.category === "assignment" && "واجب"}
                          {notification.category === "quiz" && "اختبار"}
                          {notification.category === "course" && "كورس"}
                          {notification.category === "system" && "نظام"}
                          {notification.category === "chat" && "محادثة"}
                          {notification.category === "calendar" && "جدول"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          <Check className="h-3 w-3 ml-1" />
                          تعيين كمقروء
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
