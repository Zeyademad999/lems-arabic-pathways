import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "lesson",
    priority: "medium",
    location: "",
    courseName: "",
    instructor: "",
    attendees: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      attendees: formData.attendees
        ? formData.attendees.split(",").map((a) => a.trim())
        : [],
      status: "scheduled" as const,
      isRecurring: false,
    };
    onSave(newEvent);
    onClose();
    // Reset form
    setFormData({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "lesson",
      priority: "medium",
      location: "",
      courseName: "",
      instructor: "",
      attendees: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary rounded-lg">
              <Plus className="h-5 w-5 text-white" />
            </div>
            إضافة حدث جديد
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الحدث *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="أدخل عنوان الحدث"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">نوع الحدث *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الحدث" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lesson">درس</SelectItem>
                    <SelectItem value="exam">امتحان</SelectItem>
                    <SelectItem value="meeting">اجتماع</SelectItem>
                    <SelectItem value="deadline">موعد نهائي</SelectItem>
                    <SelectItem value="study-session">جلسة دراسة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">التاريخ *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">الأولوية</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="أدخل وصف الحدث"
                rows={3}
              />
            </div>
          </div>

          {/* Time Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات الوقت</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">وقت البداية *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">وقت النهاية *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات إضافية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="أدخل موقع الحدث"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseName">اسم المادة</Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => handleInputChange("courseName", e.target.value)}
                  placeholder="أدخل اسم المادة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">المحاضر</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange("instructor", e.target.value)}
                  placeholder="أدخل اسم المحاضر"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendees">المشاركون</Label>
                <Input
                  id="attendees"
                  value={formData.attendees}
                  onChange={(e) => handleInputChange("attendees", e.target.value)}
                  placeholder="أدخل أسماء المشاركين مفصولة بفواصل"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title || !formData.date || !formData.startTime || !formData.endTime}
              className="lems-button-primary"
            >
              <CalendarIcon className="h-4 w-4 ml-2" />
              إضافة الحدث
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
