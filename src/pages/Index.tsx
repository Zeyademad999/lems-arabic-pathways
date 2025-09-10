import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = (userRole: "student" | "instructor" | "admin") => {
    // Redirect to appropriate portal
    if (userRole === "instructor") {
      navigate("/instructor");
    } else if (userRole === "student") {
      navigate("/student");
    }
  };

  // Always show login form - redirects happen after login
  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
