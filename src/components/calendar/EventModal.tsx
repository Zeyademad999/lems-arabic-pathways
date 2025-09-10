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
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle,
  User,
  Bell,
  CheckCircle,
  XCircle,
  PlayCircle,
  Edit,
  Trash2,
} from "lucide-react";
import {
  CalendarEvent,
  getEventTypeColor,
  getEventTypeLabel,
  getPriorityColor,
  getStatusColor,
} from "@/lib/calendarData";

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  userRole: "student" | "instructor";
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  userRole,
  onEdit,
  onDelete,
}) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const weekdays = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const weekday = weekdays[date.getDay()];
    const monthName = months[date.getMonth()];

    return `${weekday}، ${day} ${monthName} ${year}`;
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getStatusIcon = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "in-progress":
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityIcon = (priority: CalendarEvent["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold">{event.title}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {getEventTypeLabel(event.type)}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date and Time */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">التاريخ</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.date)}
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">الوقت</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
              </div>
            </Card>

            {/* Location */}
            {event.location && (
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">الموقع</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </Card>
            )}

            {/* Course */}
            {event.courseName && (
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">المادة</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.courseName}
                  </p>
                </div>
              </Card>
            )}

            {/* Instructor */}
            {event.instructor && (
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">المحاضر</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.instructor}
                  </p>
                </div>
              </Card>
            )}

            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">المشاركون</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {event.attendees.map((attendee, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <Card className="p-4">
              <h4 className="font-medium mb-2">الوصف</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </Card>
          )}

          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(event.status)}
              <span className="text-sm font-medium">الحالة:</span>
              <Badge className={getStatusColor(event.status)}>
                {event.status === "scheduled" && "مجدول"}
                {event.status === "completed" && "مكتمل"}
                {event.status === "cancelled" && "ملغي"}
                {event.status === "in-progress" && "جاري"}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {getPriorityIcon(event.priority)}
              <span className="text-sm font-medium">الأولوية:</span>
              <Badge className={getPriorityColor(event.priority)}>
                {event.priority === "high" && "عالية"}
                {event.priority === "medium" && "متوسطة"}
                {event.priority === "low" && "منخفضة"}
              </Badge>
            </div>
          </div>

          {/* Reminder */}
          {event.reminder && event.reminder.enabled && (
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">التذكير</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                سيتم تذكيرك قبل {event.reminder.minutesBefore} دقيقة من بداية
                الحدث
              </p>
            </Card>
          )}

          {/* Recurring Pattern */}
          {event.isRecurring && event.recurringPattern && (
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">نمط التكرار</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {event.recurringPattern === "daily" && "يومي"}
                {event.recurringPattern === "weekly" && "أسبوعي"}
                {event.recurringPattern === "monthly" && "شهري"}
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          {userRole === "instructor" && (onEdit || onDelete) && (
            <div className="flex items-center gap-2 pt-4 border-t">
              {onEdit && (
                <Button
                  variant="outline"
                  onClick={() => onEdit(event)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  تعديل
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  onClick={() => onDelete(event)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
