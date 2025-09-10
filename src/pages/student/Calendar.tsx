import React from "react";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { useSignOut } from "@/hooks/useSignOut";
import { Calendar } from "@/components/calendar/Calendar";
import { EventModal } from "@/components/calendar/EventModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Users,
} from "lucide-react";
import {
  CalendarEvent,
  getUpcomingEvents,
  getEventsForMonth,
  getEventTypeColor,
  getEventTypeLabel,
} from "@/lib/calendarData";

const StudentCalendar = () => {
  const { signOut } = useSignOut();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedEvent, setSelectedEvent] =
    React.useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);

  // Convert Arabic numerals to English
  const toEnglishNumbers = (num: number): string => {
    return num.toString();
  };

  const upcomingEvents = getUpcomingEvents(7);
  const currentMonthEvents = getEventsForMonth(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return currentMonthEvents.filter((event) => event.date === today);
  };

  const todayEvents = getTodayEvents();

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                الجدول الدراسي
              </h1>
              <p className="text-muted-foreground">
                تتبع دروسك ومواعيدك المهمة
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">أحداث اليوم</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(todayEvents.length)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الأسبوع القادم</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(upcomingEvents.length)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الدروس</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(
                    currentMonthEvents.filter((e) => e.type === "lesson").length
                  )}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الامتحانات</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(
                    currentMonthEvents.filter((e) => e.type === "exam").length
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <Card className="lems-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              أحداث اليوم
            </h3>
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                        {event.location && ` • ${event.location}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="lems-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              الأحداث القادمة
            </h3>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          const date = new Date(event.date);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          return `${day}/${month}/${year}`;
                        })()}{" "}
                        • {event.startTime}
                        {event.location && ` • ${event.location}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Main Calendar */}
        <Calendar
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onEventClick={handleEventClick}
          userRole="student"
        />

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={handleCloseEventModal}
          userRole="student"
        />
      </div>
    </LEMSLayout>
  );
};

export default StudentCalendar;
