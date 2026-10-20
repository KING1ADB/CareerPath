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
  ClipboardCheck,
  Compass,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const StudentDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, logout, isConfigured, switchDemoRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
    { label: 'Career Assessment', path: '/dashboard/assessment', icon: ClipboardCheck },
    { label: 'Recommendations', path: '/dashboard/recommendations', icon: Sparkles },
    { label: 'Career Catalog', path: '/dashboard/careers', icon: Briefcase },
    { label: 'Skill-Gap Analysis', path: '/dashboard/skill-gap', icon: TrendingUp },
    { label: 'Assessment History', path: '/dashboard/history', icon: History },
    { label: 'Feedback', path: '/dashboard/feedback', icon: MessageSquare },
  ];

  const isCurrent = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-navy-950 text-white border-r border-slate-800 shrink-0">
        <div className="p-5 border-b border-slate-800">
          <Logo size="md" className="[&_span]:text-white [&_span.text-teal-600]:text-teal-400" />
        </div>

        {/* Student Profile Quick Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <Avatar
            fallbackText={profile?.full_name || 'ST'}
            src={profile?.avatar_url}
            className="ring-2 ring-teal-500/50"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate text-white">
              {profile?.full_name || 'University Student'}
            </h4>
            <p className="text-xs text-teal-400 truncate">
              {profile?.major || 'Undergraduate'}
            </p>
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
                    ? 'bg-teal-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions & Mode Info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {isConfigured ? 'Supabase Connected' : 'Local Sandbox Mode'}
            </span>
            <Badge variant="navy" className="text-[10px] py-0 px-1.5 bg-slate-800 border-slate-700">
              v1.0
            </Badge>
          </div>

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
      <div className="md:hidden flex items-center justify-between bg-navy-950 text-white px-4 py-3 border-b border-slate-800">
        <Logo size="sm" className="[&_span]:text-white [&_span.text-teal-600]:text-teal-400" />
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex">
          <div className="w-72 bg-navy-950 text-white h-full p-4 flex flex-col space-y-4">
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

            <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
              <Avatar fallbackText={profile?.full_name || 'ST'} size="sm" />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-white">{profile?.full_name}</p>
                <p className="text-xs text-teal-400">Student Portal</p>
              </div>
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
                      active ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
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
            <GraduationCap className="h-5 w-5 text-teal-600" />
            <span className="text-sm font-medium text-slate-600">
              University Student Career Guidance Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Presentation Mode helper for Master's defense */}
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await switchDemoRole('admin');
                navigate('/admin');
              }}
              className="text-xs gap-1.5 border-slate-200 text-slate-700 hover:border-navy-950 hover:text-navy-950"
              title="Switch to Admin Console for Thesis Defense"
            >
              <Shield className="h-3.5 w-3.5 text-amber-500" />
              Demo: Switch to Admin
            </Button>

            <div className="h-5 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2">
              <Avatar
                fallbackText={profile?.full_name || 'ST'}
                src={profile?.avatar_url}
                size="sm"
              />
              <span className="text-sm font-medium text-slate-800">{profile?.full_name || 'Student'}</span>
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
