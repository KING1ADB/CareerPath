import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { AdminDashboardLayout } from '@/components/layout/AdminDashboardLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { StudentDashboardLayout } from '@/components/layout/StudentDashboardLayout';
import { AdminDashboardHome } from '@/pages/admin/AdminDashboardHome';
import {
  AdminCareersShell,
  AdminCoursesShell,
  AdminFeedbackShell,
  AdminRulesShell,
  AdminSkillsShell,
} from '@/pages/admin/AdminModulePlaceholders';
import { LandingPage } from '@/pages/public/LandingPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { DashboardHome } from '@/pages/student/DashboardHome';
import {
  StudentAssessmentShell,
  StudentCareersShell,
  StudentFeedbackShell,
  StudentHistoryShell,
  StudentProfileShell,
  StudentRecommendationsShell,
  StudentSkillGapShell,
} from '@/pages/student/StudentModulePlaceholders';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      {/* Protected Student Portal */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="student">
              <StudentDashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<StudentProfileShell />} />
        <Route path="assessment" element={<StudentAssessmentShell />} />
        <Route path="recommendations" element={<StudentRecommendationsShell />} />
        <Route path="careers" element={<StudentCareersShell />} />
        <Route path="skill-gap" element={<StudentSkillGapShell />} />
        <Route path="history" element={<StudentHistoryShell />} />
        <Route path="feedback" element={<StudentFeedbackShell />} />
      </Route>

      {/* Protected Admin Console */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard requiredRole="admin">
              <AdminDashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} />
        <Route path="careers" element={<AdminCareersShell />} />
        <Route path="skills" element={<AdminSkillsShell />} />
        <Route path="rules" element={<AdminRulesShell />} />
        <Route path="courses" element={<AdminCoursesShell />} />
        <Route path="feedback" element={<AdminFeedbackShell />} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
