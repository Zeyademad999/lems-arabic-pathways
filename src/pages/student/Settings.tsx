import React from "react";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSignOut } from "@/hooks/useSignOut";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Bell,
  Lock,
  Shield,
  Download,
  Trash2,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nationalId: string;
  dateOfBirth: string;
  gender: "male" | "female";
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
  push: boolean;
}

interface ChangeRequest {
  id: string;
  type: "profile" | "contact" | "personal";
  field: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  adminComment?: string;
}

const mockProfile: UserProfile = {
  id: "1",
  name: "أحمد محمد علي",
  email: "ahmed.mohamed@email.com",
  phone: "+966501234567",
  address: "الرياض، المملكة العربية السعودية",
  nationalId: "1234567890",
  dateOfBirth: "1995-05-15",
  gender: "male",
};

const mockChangeRequests: ChangeRequest[] = [
  {
    id: "1",
    type: "contact",
    field: "phone",
    currentValue: "+966501234567",
    requestedValue: "+966501234568",
    reason: "تغيير رقم الهاتف بسبب تغيير الشركة",
    status: "pending",
    submittedAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    type: "profile",
    field: "name",
    currentValue: "أحمد محمد علي",
    requestedValue: "أحمد محمد علي الأحمد",
    reason: "تصحيح الاسم الكامل",
    status: "approved",
    submittedAt: "2024-01-10T14:20:00",
    reviewedAt: "2024-01-12T09:15:00",
    adminComment: "تم الموافقة على التغيير",
  },
];

const Settings = () => {
  const { signOut } = useSignOut();
  const { toast } = useToast();
  const [profile] = React.useState<UserProfile>(mockProfile);
  const [changeRequests, setChangeRequests] =
    React.useState<ChangeRequest[]>(mockChangeRequests);
  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [requestType, setRequestType] = React.useState<
    "profile" | "contact" | "personal"
  >("profile");
  const [requestField, setRequestField] = React.useState("");
  const [requestValue, setRequestValue] = React.useState("");
  const [requestReason, setRequestReason] = React.useState("");

  const [notifications, setNotifications] =
    React.useState<NotificationSettings>({
      assignments: true,
      quizzes: true,
      grades: true,
      attendance: true,
      general: true,
      email: true,
      sms: false,
      push: true,
    });

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    toast({
      title: "تم حفظ الإعدادات",
      description: "تم تحديث إعدادات الإشعارات بنجاح",
    });
  };

  const handleSubmitRequest = () => {
    if (!requestField || !requestValue || !requestReason) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const newRequest: ChangeRequest = {
      id: Date.now().toString(),
      type: requestType,
      field: requestField,
      currentValue: profile[requestField as keyof UserProfile] as string,
      requestedValue: requestValue,
      reason: requestReason,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    setChangeRequests((prev) => [newRequest, ...prev]);
    setShowRequestForm(false);
    setRequestField("");
    setRequestValue("");
    setRequestReason("");

    toast({
      title: "تم إرسال الطلب",
      description: "تم إرسال طلب التغيير للمراجعة من قبل الإدارة",
    });
  };

  const getFieldLabel = (field: string) => {
    const labels: { [key: string]: string } = {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      address: "العنوان",
      nationalId: "رقم الهوية",
      dateOfBirth: "تاريخ الميلاد",
      gender: "الجنس",
    };
    return labels[field] || field;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600">
            <Clock className="h-3 w-3 ml-1" />
            في الانتظار
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle className="h-3 w-3 ml-1" />
            موافق عليه
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 ml-1" />
            مرفوض
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-education-primary">
            الإعدادات
          </h1>
          <p className="text-muted-foreground">
            إدارة الملف الشخصي والإعدادات - معظم التغييرات تتطلب موافقة الإدارة
          </p>
        </div>

        {/* Profile Information (Read-Only) */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">الملف الشخصي</h2>
              </div>
              <Badge variant="outline" className="text-yellow-600">
                <Lock className="h-3 w-3 ml-1" />
                للعرض فقط
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>رقم الهوية</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.nationalId}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>تاريخ الميلاد</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.dateOfBirth}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>العنوان</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                onClick={() => setShowRequestForm(true)}
                className="lems-button-primary"
              >
                <Edit className="h-4 w-4 ml-2" />
                طلب تعديل المعلومات
              </Button>
            </div>
          </div>
        </Card>

        {/* Change Requests */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">طلبات التغيير</h2>
            </div>

            {changeRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات تغيير</p>
              </div>
            ) : (
              <div className="space-y-4">
                {changeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {getFieldLabel(request.field)}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(request.submittedAt).toLocaleDateString(
                          "ar-SA"
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          القيمة الحالية:
                        </span>
                        <p className="font-medium">{request.currentValue}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          القيمة المطلوبة:
                        </span>
                        <p className="font-medium">{request.requestedValue}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-sm">
                        السبب:
                      </span>
                      <p className="text-sm">{request.reason}</p>
                    </div>

                    {request.adminComment && (
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <span className="text-muted-foreground text-sm">
                          تعليق الإدارة:
                        </span>
                        <p className="text-sm">{request.adminComment}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Notification Settings (Editable) */}
        <Card className="lems-card">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">إعدادات الإشعارات</h2>
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="h-3 w-3 ml-1" />
                قابل للتعديل
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">إشعارات المحتوى</h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "assignments",
                      label: "الواجبات الجديدة والمواعيد النهائية",
                    },
                    { key: "quizzes", label: "الاختبارات والامتحانات" },
                    { key: "grades", label: "النتائج والدرجات" },
                    { key: "attendance", label: "تذكيرات الحضور" },
                    { key: "general", label: "الإعلانات العامة" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{label}</span>
                      <Switch
                        checked={
                          notifications[key as keyof NotificationSettings]
                        }
                        onCheckedChange={() =>
                          handleNotificationChange(
                            key as keyof NotificationSettings
                          )
                        }
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
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">رسائل SMS</span>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationChange("sms")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">الإشعارات الفورية</span>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange("push")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <Card className="lems-card bg-blue-50 border-blue-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">
                سياسة الخصوصية
              </h2>
            </div>

            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <EyeOff className="h-4 w-4 mt-0.5 text-blue-600" />
                <p>
                  <strong>لا يتم مشاركة بياناتك:</strong> نحن لا نشارك معلوماتك
                  الشخصية مع أطراف ثالثة
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 mt-0.5 text-blue-600" />
                <p>
                  <strong>حماية البيانات:</strong> جميع معلوماتك محمية بتشفير
                  متقدم
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <p>
                  <strong>التحكم الكامل:</strong> يمكنك طلب تعديل أو حذف بياناتك
                  في أي وقت
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">طلب تعديل المعلومات</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRequestForm(false)}
                  >
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>نوع التعديل</Label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value as any)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="profile">معلومات شخصية</option>
                      <option value="contact">معلومات الاتصال</option>
                      <option value="personal">معلومات شخصية حساسة</option>
                    </select>
                  </div>

                  <div>
                    <Label>المجال المراد تعديله</Label>
                    <select
                      value={requestField}
                      onChange={(e) => setRequestField(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">اختر المجال</option>
                      <option value="name">الاسم الكامل</option>
                      <option value="email">البريد الإلكتروني</option>
                      <option value="phone">رقم الهاتف</option>
                      <option value="address">العنوان</option>
                      <option value="nationalId">رقم الهوية</option>
                      <option value="dateOfBirth">تاريخ الميلاد</option>
                    </select>
                  </div>

                  <div>
                    <Label>القيمة الجديدة</Label>
                    <Input
                      value={requestValue}
                      onChange={(e) => setRequestValue(e.target.value)}
                      placeholder="أدخل القيمة الجديدة"
                    />
                  </div>

                  <div>
                    <Label>سبب التعديل</Label>
                    <Textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="اشرح سبب طلب هذا التعديل..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={handleSubmitRequest}
                    className="flex-1 lems-button-primary"
                  >
                    <Send className="h-4 w-4 ml-2" />
                    إرسال الطلب
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </LEMSLayout>
  );
};

export default Settings;
