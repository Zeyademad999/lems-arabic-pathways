import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import {
  CalendarEvent,
  getEventsForDate,
  getEventTypeColor,
  getEventTypeLabel,
  getPriorityColor,
} from "@/lib/calendarData";

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  userRole: "student" | "instructor";
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onDateChange,
  onEventClick,
  userRole,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Arabic day names
  const dayNames = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  // Navigation functions
  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    onDateChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split("T")[0];
      const events = getEventsForDate(dateString);
      const isToday = date.toDateString() === today.toDateString();

      days.push({
        day,
        date: dateString,
        isToday,
        events,
        isCurrentMonth: true,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get month name in Arabic
  const getMonthName = (month: number) => {
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
    return months[month];
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="lems-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {getMonthName(currentMonth)} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={goToPreviousMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              اليوم
            </Button>
            <Button variant="outline" onClick={goToNextMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="lems-card p-0 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-border">
          {/* Day Headers */}
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              className="bg-muted p-3 text-center font-semibold text-sm text-muted-foreground"
            >
              {dayName}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-32 bg-background border border-border"
                />
              );
            }

            const { day: dayNumber, date, isToday, events } = day;
            const hasEvents = events.length > 0;

            return (
              <div
                key={date}
                className={`
                  h-32 bg-background border border-border p-2 cursor-pointer
                  hover:bg-accent transition-colors duration-200
                  ${isToday ? "bg-primary/10 border-primary" : ""}
                `}
                onClick={() => setSelectedDate(new Date(date))}
              >
                <div className="flex flex-col h-full">
                  {/* Day Number */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`
                        text-sm font-medium
                        ${
                          isToday ? "text-primary font-bold" : "text-foreground"
                        }
                      `}
                    >
                      {dayNumber}
                    </span>
                    {hasEvents && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>

                  {/* Events */}
                  <div className="flex-1 space-y-1 overflow-hidden">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`
                          text-xs p-1 rounded truncate cursor-pointer
                          ${getEventTypeColor(event.type)} text-white
                          hover:opacity-80 transition-opacity
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        title={event.title}
                      >
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{events.length - 2} أكثر
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <Card className="lems-card">
        <h3 className="text-lg font-semibold mb-4">مفتاح الأحداث</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { type: "lesson" as const, label: "دروس" },
            { type: "quiz" as const, label: "اختبارات قصيرة" },
            { type: "assignment" as const, label: "واجبات" },
            { type: "exam" as const, label: "امتحانات" },
            { type: "meeting" as const, label: "اجتماعات" },
            { type: "deadline" as const, label: "مواعيد نهائية" },
            { type: "study-session" as const, label: "جلسات دراسة" },
          ].map(({ type, label }) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${getEventTypeColor(type)}`} />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
