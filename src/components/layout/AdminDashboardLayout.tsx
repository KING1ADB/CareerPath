import { Logo } from '@/components/common/Logo';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings2,
  Shield,
  Sliders,
  Users,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const AdminDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, logout, switchDemoRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'System Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Career Catalog', path: '/admin/careers', icon: Briefcase },
    { label: 'Skills & Taxonomy', path: '/admin/skills', icon: Layers },
    { label: 'Recommendation Rules', path: '/admin/rules', icon: Sliders },
    { label: 'Courses & Resources', path: '/admin/courses', icon: BookOpen },
    { label: 'Student Feedback', path: '/admin/feedback', icon: MessageSquare },
  ];

  const isCurrent = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-900 text-white border-r border-slate-800 shrink-0">
        <div className="p-5 border-b border-slate-800">
          <Logo size="md" className="[&_span]:text-white [&_span.text-teal-600]:text-teal-400" />
        </div>

        {/* Administrator Role Banner */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-3">
          <Avatar
            fallbackText="AD"
            src={profile?.avatar_url}
            className="ring-2 ring-amber-400/80 bg-amber-950 text-amber-200"
          />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <Badge variant="outline" className="text-[10px] py-0 px-1 border-amber-400 text-amber-300">
                ADMIN
              </Badge>
            </div>
            <h4 className="text-sm font-semibold truncate text-white mt-0.5">
              {profile?.full_name || 'Administrator'}
            </h4>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-950/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3 border-b border-slate-800">
        <Logo size="sm" className="[&_span]:text-white [&_span.text-teal-600]:text-teal-400" />
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-900 text-white h-full p-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <Logo size="sm" className="[&_span]:text-white [&_span.text-teal-600]:text-teal-400" />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrent(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                      active ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start text-red-400 hover:bg-red-950/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar for Desktop */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-semibold text-slate-800">
              Administrator Management &amp; Analytics Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await switchDemoRole('student');
                navigate('/dashboard');
              }}
              className="text-xs gap-1.5 border-slate-200 text-slate-700 hover:border-teal-600 hover:text-teal-700"
              title="Switch to Student Experience for Thesis Defense"
            >
              <GraduationCap className="h-3.5 w-3.5 text-teal-600" />
              Demo: Switch to Student
            </Button>

            <div className="h-5 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2">
              <Avatar
                fallbackText="AD"
                src={profile?.avatar_url}
                size="sm"
              />
              <span className="text-sm font-medium text-slate-800">{profile?.full_name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
