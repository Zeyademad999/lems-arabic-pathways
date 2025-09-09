import React from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { InstructorDashboard } from '@/components/dashboard/InstructorDashboard';

const InstructorPortal = () => {
  return (
    <InstructorLayout>
      <InstructorDashboard />
    </InstructorLayout>
  );
};

export default InstructorPortal;