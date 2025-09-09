import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface" dir="rtl">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-education-primary">404</h1>
        <p className="text-xl text-muted-foreground">عذراً! الصفحة غير موجودة</p>
        <p className="text-sm text-muted-foreground">
          لم نتمكن من العثور على الصفحة التي تبحث عنها
        </p>
        <a 
          href="/" 
          className="inline-block lems-button-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;
