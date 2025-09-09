import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

const InstructorSettings = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    assignments: true,
    grades: false,
    attendance: true,
    behavior: true
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة إعدادات حسابك وتفضيلات النظام</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">الملف الشخصي</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    م.أ
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 ml-2" />
                      تغيير الصورة
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم الأول</label>
                    <input
                      type="text"
                      defaultValue="محمد"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم العائلة</label>
                    <input
                      type="text"
                      defaultValue="أحمد"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      defaultValue="mohammed.ahmed@lems.edu"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      defaultValue="+966501234567"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">التخصص</label>
                    <input
                      type="text"
                      defaultValue="إدارة اللوجستيات والنقل"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">نبذة شخصية</label>
                    <textarea
                      rows={3}
                      defaultValue="مدرب متخصص في إدارة اللوجستيات والنقل مع خبرة تزيد عن 10 سنوات في المجال"
                      className="w-full p-3 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">الأمان</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور الحالية"
                      className="w-full p-3 border rounded-md pl-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    placeholder="أدخل كلمة المرور الجديدة"
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">متطلبات كلمة المرور:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 8 أحرف على الأقل</li>
                    <li>• حرف كبير واحد على الأقل</li>
                    <li>• رقم واحد على الأقل</li>
                    <li>• رمز خاص واحد على الأقل</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">الإشعارات</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'إشعارات البريد الإلكتroني', description: 'تلقي الإشعارات عبر البريد الإلكتروني' },
                  { key: 'push', label: 'الإشعارات الفورية', description: 'إشعارات فورية في المتصفح' },
                  { key: 'assignments', label: 'الواجبات الجديدة', description: 'عند تسليم واجب جديد' },
                  { key: 'grades', label: 'تحديثات الدرجات', description: 'عند تحديث درجات الطلاب' },
                  { key: 'attendance', label: 'تحديثات الحضور', description: 'تقارير الحضور اليومية' },
                  { key: 'behavior', label: 'التقييم السلوكي', description: 'تحديثات التقييم السلوكي' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={() => handleNotificationChange(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold">إعدادات النظام</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اللغة</label>
                  <select className="w-full p-3 border rounded-md">
                    <option>العربية</option>
                    <option>English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">المنطقة الزمنية</label>
                  <select className="w-full p-3 border rounded-md">
                    <option>توقيت الرياض (GMT+3)</option>
                    <option>توقيت مكة المكرمة (GMT+3)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">صيغة التاريخ</label>
                  <select className="w-full p-3 border rounded-md">
                    <option>يوم/شهر/سنة</option>
                    <option>شهر/يوم/سنة</option>
                    <option>سنة/شهر/يوم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">السمة</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 text-center">
                      <div className="w-8 h-8 bg-white border-2 rounded mx-auto mb-2"></div>
                      <span className="text-sm">فاتح</span>
                    </div>
                    <div className="p-3 border-2 border-primary rounded-lg cursor-pointer bg-muted/50 text-center">
                      <div className="w-8 h-8 bg-gray-800 rounded mx-auto mb-2"></div>
                      <span className="text-sm">داكن</span>
                    </div>
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-800 rounded mx-auto mb-2"></div>
                      <span className="text-sm">تلقائي</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">معلومات الحساب</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>mohammed.ahmed@lems.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+966501234567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>عضو منذ يناير 2023</span>
                </div>
              </div>
            </Card>

            {/* Account Status */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">حالة الحساب</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">نوع الحساب</span>
                  <Badge className="bg-green-100 text-green-700">مدرب معتمد</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">الحالة</span>
                  <Badge className="bg-blue-100 text-blue-700">نشط</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">آخر دخول</span>
                  <span className="text-sm text-muted-foreground">اليوم 10:30</span>
                </div>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">إدارة البيانات</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  تصدير البيانات
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="h-4 w-4" />
                  استيراد البيانات
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <RefreshCw className="h-4 w-4" />
                  نسخ احتياطي
                </Button>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">الدعم والمساعدة</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  مركز المساعدة
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  اتصل بالدعم
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  أرسل تقرير خطأ
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button>
            <Save className="h-4 w-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>
    </InstructorLayout>
  );
};

export default InstructorSettings;