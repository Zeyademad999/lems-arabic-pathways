import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  Lock, 
  Globe,
  Moon,
  Volume2,
  Shield,
  Download,
  Trash2,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  profileImage?: string;
}

interface NotificationSettings {
  assignments: boolean;
  quizzes: boolean;
  grades: boolean;
  attendance: boolean;
  general: boolean;
  email: boolean;
  sms: boolean;
}

interface PrivacySettings {
  showProfile: boolean;
  showProgress: boolean;
  showAchievements: boolean;
  dataSharing: boolean;
}

const mockProfile: UserProfile = {
  id: '1',
  name: 'أحمد محمد علي',
  email: 'ahmed.mohamed@email.com',
  phone: '+966501234567',
  address: 'الرياض، المملكة العربية السعودية',
  nationalId: '1234567890',
  dateOfBirth: '1995-05-15',
  gender: 'male'
};

const Settings = () => {
  const [profile, setProfile] = React.useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationSettings>({
    assignments: true,
    quizzes: true,
    grades: true,
    attendance: true,
    general: true,
    email: true,
    sms: false
  });
  const [privacy, setPrivacy] = React.useState<PrivacySettings>({
    showProfile: true,
    showProgress: true,
    showAchievements: true,
    dataSharing: false
  });

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profile);
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <LEMSLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">الإعدادات</h1>
          <p className="text-muted-foreground">
            إدارة الملف الشخصي والإعدادات العامة
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">الملف الشخصي</h2>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16" />
                  )}
                </div>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4 ml-2" />
                    تغيير الصورة
                  </Button>
                )}
              </div>

              {/* Profile Form */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="lems-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="lems-input pr-10"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="lems-input pr-10"
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalId">رقم الهوية</Label>
                  <Input
                    id="nationalId"
                    value={profile.nationalId}
                    onChange={(e) => setProfile(prev => ({ ...prev, nationalId: e.target.value }))}
                    disabled={!isEditing}
                    className="lems-input"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className="lems-input pr-10"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">إعدادات الإشعارات</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">إشعارات المحتوى</h3>
                <div className="space-y-3">
                  {[
                    { key: 'assignments', label: 'الواجبات الجديدة والمواعيد النهائية' },
                    { key: 'quizzes', label: 'الاختبارات والامتحانات' },
                    { key: 'grades', label: 'النتائج والدرجات' },
                    { key: 'attendance', label: 'تذكيرات الحضور' },
                    { key: 'general', label: 'الإعلانات العامة' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm">{label}</span>
                      <Switch
                        checked={notifications[key as keyof NotificationSettings]}
                        onCheckedChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-4">طرق الإشعار</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">إشعارات البريد الإلكتروني</span>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">رسائل SMS</span>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationChange('sms')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">الخصوصية والأمان</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'showProfile', label: 'إظهار الملف الشخصي للمدربين', desc: 'السماح للمدربين برؤية معلوماتك الشخصية' },
                { key: 'showProgress', label: 'إظهار التقدم للزملاء', desc: 'السماح للطلاب الآخرين برؤية تقدمك' },
                { key: 'showAchievements', label: 'إظهار الإنجازات', desc: 'عرض شاراتك وإنجازاتك علناً' },
                { key: 'dataSharing', label: 'مشاركة البيانات للتحسين', desc: 'استخدام بياناتك لتحسين تجربة التعلم' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                  <Switch
                    checked={privacy[key as keyof PrivacySettings]}
                    onCheckedChange={() => handlePrivacyChange(key as keyof PrivacySettings)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">إعدادات التطبيق</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">اللغة</p>
                  <p className="text-xs text-muted-foreground">تغيير لغة واجهة التطبيق</p>
                </div>
                <Badge variant="outline">العربية</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">الوضع المظلم</p>
                  <p className="text-xs text-muted-foreground">تبديل بين الوضع الفاتح والمظلم</p>
                </div>
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <Switch />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">الأصوات</p>
                  <p className="text-xs text-muted-foreground">تشغيل أصوات الإشعارات والتفاعل</p>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security & Data */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">الأمان والبيانات</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="h-4 w-4 ml-2" />
                تغيير كلمة المرور
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 ml-2" />
                تحميل بياناتي
              </Button>

              <div className="border-t border-border pt-4">
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف الحساب
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  تحذير: هذا الإجراء لا يمكن التراجع عنه
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LEMSLayout>
  );
};

export default Settings;