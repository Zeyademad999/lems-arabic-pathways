import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  Plus,
  Video,
  FileText,
  Clock,
  Users,
  Save,
  Eye
} from 'lucide-react';

const CreateCourse = () => {
  const [sections, setSections] = React.useState([
    { id: 1, title: '', lessons: [{ id: 1, title: '', type: 'video', duration: '' }] }
  ]);

  const addSection = () => {
    setSections([...sections, {
      id: sections.length + 1,
      title: '',
      lessons: [{ id: 1, title: '', type: 'video', duration: '' }]
    }]);
  };

  const addLesson = (sectionId: number) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            lessons: [...section.lessons, {
              id: section.lessons.length + 1,
              title: '',
              type: 'video',
              duration: ''
            }]
          }
        : section
    ));
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">إنشاء كورس جديد</h1>
            <p className="text-muted-foreground">قم بإنشاء وتصميم كورس تدريبي جديد</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 ml-2" />
              معاينة
            </Button>
            <Button>
              <Save className="h-4 w-4 ml-2" />
              حفظ الكورس
            </Button>
          </div>
        </div>

        {/* Course Basic Info */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">معلومات الكورس الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الكورس</label>
              <input
                type="text"
                placeholder="أدخل اسم الكورس"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">المستوى</label>
              <select className="w-full p-3 border rounded-md">
                <option>مبتدئ</option>
                <option>متوسط</option>
                <option>متقدم</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">وصف الكورس</label>
              <textarea
                rows={3}
                placeholder="أدخل وصف مختصر للكورس"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">المدة المتوقعة (بالساعات)</label>
              <input
                type="number"
                placeholder="40"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">السعر</label>
              <input
                type="number"
                placeholder="500"
                className="w-full p-3 border rounded-md"
              />
            </div>
          </div>
        </Card>

        {/* Course Sections */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">أقسام الكورس</h3>
            <Button onClick={addSection} variant="outline">
              <Plus className="h-4 w-4 ml-2" />
              إضافة قسم
            </Button>
          </div>

          <div className="space-y-4">
            {sections.map((section, sectionIndex) => (
              <Card key={section.id} className="p-4 border-2 border-dashed">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      placeholder={`اسم القسم ${sectionIndex + 1}`}
                      className="flex-1 p-2 border rounded-md"
                    />
                  </div>

                  {/* Lessons */}
                  <div className="mr-8 space-y-2">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
                        {lesson.type === 'video' ? (
                          <Video className="h-4 w-4 text-purple-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-green-600" />
                        )}
                        <input
                          type="text"
                          placeholder={`الدرس ${lessonIndex + 1}`}
                          className="flex-1 p-2 border rounded-md"
                        />
                        <select className="p-2 border rounded-md">
                          <option value="video">فيديو</option>
                          <option value="text">نص</option>
                          <option value="quiz">اختبار</option>
                        </select>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="15 دقيقة"
                            className="w-20 p-2 border rounded-md"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addLesson(section.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة درس
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Course Settings */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">إعدادات الكورس</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">نمط التسجيل</label>
              <select className="w-full p-3 border rounded-md">
                <option>تسجيل مفتوح</option>
                <option>بموافقة المدرب</option>
                <option>خاص</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">عدد الطلاب المسموح</label>
              <input
                type="number"
                placeholder="50"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">شهادة الإتمام</label>
              <select className="w-full p-3 border rounded-md">
                <option>متاحة</option>
                <option>غير متاحة</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Preview Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold mb-4">معاينة الكورس</h3>
          <div className="flex items-start gap-4">
            <div className="w-24 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">اسم الكورس</h4>
              <p className="text-sm text-muted-foreground mt-1">وصف مختصر للكورس</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge>مبتدئ</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>40 ساعة</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>50 طالب</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default CreateCourse;