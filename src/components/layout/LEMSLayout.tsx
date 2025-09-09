import React from 'react';
import { LEMSHeader } from './LEMSHeader';
import { LEMSSidebar } from './LEMSSidebar';

interface LEMSLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'instructor' | 'admin';
  showSidebar?: boolean;
}

export const LEMSLayout: React.FC<LEMSLayoutProps> = ({ 
  children, 
  userRole = 'student', 
  showSidebar = true 
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <LEMSHeader 
        userRole={userRole}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        {showSidebar && (
          <LEMSSidebar 
            userRole={userRole}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        
        <main 
          className={`
            flex-1 transition-all duration-300 ease-in-out
            ${showSidebar ? (sidebarOpen ? 'mr-sidebar' : 'mr-sidebar-collapsed') : ''}
          `}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};