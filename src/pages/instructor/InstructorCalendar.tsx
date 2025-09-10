import React from "react";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import { Calendar } from "@/components/calendar/Calendar";
import { EventModal } from "@/components/calendar/EventModal";
import { AddEventModal } from "@/components/calendar/AddEventModal";
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
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  CalendarEvent,
  getUpcomingEvents,
  getEventsForMonth,
  getEventTypeColor,
  getEventTypeLabel,
} from "@/lib/calendarData";

const InstructorCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedEvent, setSelectedEvent] =
    React.useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = React.useState(false);

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

  const handleEditEvent = (event: CalendarEvent) => {
    // TODO: Implement edit functionality
    console.log("Edit event:", event);
  };

  const handleDeleteEvent = (event: CalendarEvent) => {
    // TODO: Implement delete functionality
    console.log("Delete event:", event);
  };

  const handleAddEvent = (newEvent: any) => {
    // TODO: Implement add event functionality
    console.log("Add event:", newEvent);
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return currentMonthEvents.filter((event) => event.date === today);
  };

  const todayEvents = getTodayEvents();

  // Instructor-specific stats
  const instructorStats = {
    totalEvents: currentMonthEvents.length,
    lessons: currentMonthEvents.filter((e) => e.type === "lesson").length,
    exams: currentMonthEvents.filter((e) => e.type === "exam").length,
    meetings: currentMonthEvents.filter((e) => e.type === "meeting").length,
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  الجدول الأكاديمي
                </h1>
                <p className="text-muted-foreground">
                  إدارة الجدول الدراسي والأحداث الأكاديمية
                </p>
              </div>
            </div>
            <Button
              className="lems-button-primary flex items-center gap-2"
              onClick={() => setIsAddEventModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              إضافة حدث
            </Button>
          </div>
        </div>

        {/* Instructor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأحداث</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(instructorStats.totalEvents)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الدروس</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(instructorStats.lessons)}
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
                  {toEnglishNumbers(instructorStats.exams)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="lems-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الاجتماعات</p>
                <p className="text-2xl font-bold text-foreground">
                  {toEnglishNumbers(instructorStats.meetings)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Schedule */}
        {todayEvents.length > 0 && (
          <Card className="lems-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              جدول اليوم
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
                        {event.courseName && ` • ${event.courseName}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                        className="p-1 h-6 w-6"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event);
                        }}
                        className="p-1 h-6 w-6 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
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
                        {event.courseName && ` • ${event.courseName}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                        className="p-1 h-6 w-6"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event);
                        }}
                        className="p-1 h-6 w-6 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
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
          userRole="instructor"
        />

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={handleCloseEventModal}
          userRole="instructor"
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />

        {/* Add Event Modal */}
        <AddEventModal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onSave={handleAddEvent}
        />
      </div>
    </InstructorLayout>
  );
};

export default InstructorCalendar;
