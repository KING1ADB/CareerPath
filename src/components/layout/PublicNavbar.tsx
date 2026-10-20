import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, LogIn, Menu, Shield, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role } = useAuth();
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              isCurrent('/') ? 'text-teal-600 font-semibold' : 'text-slate-600'
            }`}
          >
            Overview
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
          >
            Methodology
          </a>
          <a
            href="#careers"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
          >
            Career Catalog
          </a>
          <a
            href="#defense-notes"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
          >
            Academic Scope
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link to={role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="navy" size="sm" className="gap-2">
                  {role === 'admin' ? (
                    <>
                      <Shield className="h-4 w-4 text-amber-400" />
                      Admin Console
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="h-4 w-4 text-teal-400" />
                      Student Portal
                    </>
                  )}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-1.5 text-slate-700">
                  <LogIn className="h-4 w-4 text-slate-500" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm" className="gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-teal-600"
          >
            Overview
          </Link>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-teal-600"
          >
            Methodology
          </a>
          <a
            href="#careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-teal-600"
          >
            Career Catalog
          </a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <Link
                to={role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="navy" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Register as Student
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
