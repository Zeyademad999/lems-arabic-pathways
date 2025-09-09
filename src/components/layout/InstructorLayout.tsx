import React from 'react';
import { InstructorHeader } from './InstructorHeader';
import { InstructorSidebar } from './InstructorSidebar';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-background">
      <InstructorHeader 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <InstructorSidebar isOpen={sidebarOpen} />
        
        <main className={`
          flex-1 p-6 transition-all duration-300
          ${sidebarOpen ? 'mr-sidebar' : 'mr-sidebar-collapsed'}
        `}>
          {children}
        </main>
      </div>
    </div>
  );
};