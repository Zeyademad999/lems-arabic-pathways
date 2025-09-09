import React from 'react';
import { LEMSLayout } from '@/components/layout/LEMSLayout';
import { CoursesPage } from '@/components/courses/CoursesPage';

const Courses = () => {
  return (
    <LEMSLayout userRole="student">
      <CoursesPage />
    </LEMSLayout>
  );
};

export default Courses;