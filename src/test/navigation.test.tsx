import { AuthProvider } from '@/context/AuthContext';
import { LandingPage } from '@/pages/public/LandingPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Public Navigation & Pages Rendering', () => {
  it('renders LandingPage with tagline and core call-to-actions', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Discover\. Plan\. Grow\./i)).toBeInTheDocument();
    expect(screen.getByText(/Explainable Career Guidance/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Begin Free Assessment/i })).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText(/Realistic Career Profiles/i)).toBeInTheDocument();
  });

  it('renders LoginPage with credentials input and defense quick-fill options', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign In to Portal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/student@university.edu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Student Demo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Admin Demo/i })).toBeInTheDocument();
  });

  it('renders RegisterPage with student role security notice', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Student Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Student Account Security Guaranteed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Complete Registration/i })).toBeInTheDocument();
  });
});
