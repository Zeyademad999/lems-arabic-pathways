import React from "react";
import { LEMSLayout } from "@/components/layout/LEMSLayout";
import { StudentDashboard as StudentDashboardComponent } from "@/components/dashboard/StudentDashboard";
import { useSignOut } from "@/hooks/useSignOut";

const StudentDashboard = () => {
  const { signOut } = useSignOut();

  return (
    <LEMSLayout userRole="student" onSignOut={signOut}>
      <StudentDashboardComponent />
    </LEMSLayout>
  );
};

export default StudentDashboard;
