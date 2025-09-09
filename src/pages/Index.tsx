import React from 'react';
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { InstructorDashboard } from "@/components/dashboard/InstructorDashboard";

const Index = () => {
  const [user, setUser] = React.useState<{
    role: 'student' | 'instructor' | 'admin';
    isAuthenticated: boolean;
  } | null>(null);

  const handleLogin = (userRole: 'student' | 'instructor' | 'admin') => {
    setUser({
      role: userRole,
      isAuthenticated: true
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Show login form if not authenticated
  if (!user?.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'admin':
        return <InstructorDashboard />; // Admin uses similar interface for now
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <LEMSLayout userRole={user.role}>
      {renderDashboard()}
    </LEMSLayout>
  );
};

export default Index;
