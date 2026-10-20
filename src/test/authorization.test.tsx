import { RoleGuard } from '@/components/auth/RoleGuard';
import { AuthContext } from '@/context/AuthContext';
import type { Profile } from '@/types';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

const renderWithAuth = (
  ui: React.ReactElement,
  authValues: { role: 'student' | 'admin' | null; profile: Profile | null; isLoading: boolean }
) => {
  const mockContextValue: any = {
    user: authValues.profile ? { id: authValues.profile.id, email: authValues.profile.email } : null,
    profile: authValues.profile,
    role: authValues.role,
    isLoading: authValues.isLoading,
    isConfigured: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshProfile: vi.fn(),
    updateProfile: vi.fn(),
    switchDemoRole: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={mockContextValue}>
        {ui}
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Role-Based Access Control (RoleGuard)', () => {
  const studentProfile: Profile = {
    id: 'student-1',
    email: 'student@careerpath.edu',
    full_name: 'Alex Johnson',
    role: 'student',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const adminProfile: Profile = {
    id: 'admin-1',
    email: 'admin@careerpath.edu',
    full_name: 'Dr. Eleanor Vance',
    role: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it('allows student access to student-guarded components', () => {
    renderWithAuth(
      <RoleGuard requiredRole="student">
        <div>Student Portal Content</div>
      </RoleGuard>,
      { role: 'student', profile: studentProfile, isLoading: false }
    );

    expect(screen.getByText('Student Portal Content')).toBeInTheDocument();
  });

  it('strictly blocks student accounts from accessing admin-guarded components', () => {
    renderWithAuth(
      <RoleGuard requiredRole="admin">
        <div>Admin Secret Dashboard</div>
      </RoleGuard>,
      { role: 'student', profile: studentProfile, isLoading: false }
    );

    expect(screen.queryByText('Admin Secret Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('Access Restricted')).toBeInTheDocument();
    expect(screen.getByText(/Role-Based Access Control/i)).toBeInTheDocument();
  });

  it('permits administrator accounts into admin-guarded components', () => {
    renderWithAuth(
      <RoleGuard requiredRole="admin">
        <div>Admin Management Console</div>
      </RoleGuard>,
      { role: 'admin', profile: adminProfile, isLoading: false }
    );

    expect(screen.getByText('Admin Management Console')).toBeInTheDocument();
  });
});
