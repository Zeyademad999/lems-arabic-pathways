import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userRole: 'student' | 'instructor' | 'admin') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple role determination for demo
    if (formData.username.includes('instructor') || formData.username.includes('مدرب')) {
      onLogin('instructor');
    } else if (formData.username.includes('admin') || formData.username.includes('مدير')) {
      onLogin('admin');
    } else {
      onLogin('student');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-education-primary">
            نظام إدارة التعليم اللوجستي
          </h1>
          <p className="text-muted-foreground">
            مرحباً بك في منصة LEMS التعليمية
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              اسم المستخدم
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="lems-input pr-10"
                required
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="lems-input pr-10 pl-10"
                required
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="lems-button-primary w-full">
            تسجيل الدخول
          </Button>
        </form>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">للتجربة السريعة:</p>
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onLogin('student')}
              className="text-xs"
            >
              دخول كطالب
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onLogin('instructor')}
              className="text-xs"
            >
              دخول كمدرب
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};