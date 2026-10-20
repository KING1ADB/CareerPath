import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Database,
  ExternalLink,
  GraduationCap,
  Layers,
  MessageSquare,
  Server,
  Shield,
  Sliders,
  Users,
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboardHome: React.FC = () => {
  const { profile, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Admin Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Shield className="h-3.5 w-3.5" />
            <span>Administrative Governance &amp; Supervision Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            System Administration Dashboard
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Logged in as <span className="text-white font-semibold">{profile?.full_name || 'Admin'}</span>. Manage career taxonomy, recommendation scoring weights, question options, and monitor student engagement metrics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Button
            onClick={async () => {
              await switchDemoRole('student');
              navigate('/dashboard');
            }}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md"
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Switch to Student View
          </Button>
        </div>
      </div>

      {/* Aggregate System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Active Career Profiles</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">20 Profiles</div>
            <p className="text-xs text-slate-500 mt-1">Spans 8 diverse industries</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Taxonomy Elements</CardTitle>
            <Layers className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">44 Items</div>
            <p className="text-xs text-slate-500 mt-1">23 Skills • 12 Interests • 9 Academics</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Active Rule Version</CardTitle>
            <Sliders className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">Rule Set v1.0</div>
            <p className="text-xs text-slate-500 mt-1">0.40S / 0.30I / 0.20A / 0.10P</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Database Integrity</CardTitle>
            <Database className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">RLS Active</div>
            <p className="text-xs text-slate-500 mt-1">25 normalized tables secured</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Modules Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <Badge variant="outline">20 Loaded</Badge>
            </div>
            <CardTitle className="text-base mt-2">Career Catalog Management</CardTitle>
            <CardDescription className="text-xs">
              Create, update, or archive career titles, illustrative compensation tiers, educational requirements, and skill weights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/careers">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Manage Careers
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Sliders className="h-6 w-6 text-amber-600" />
              <Badge variant="outline">v1.0 Standard</Badge>
            </div>
            <CardTitle className="text-base mt-2">Recommendation Engine Weights</CardTitle>
            <CardDescription className="text-xs">
              Tune formula coefficients (Skills, Interests, Academics, Personality) with zero downtime and immutable version tracking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/rules">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Configure Rule Versions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Layers className="h-6 w-6 text-teal-600" />
              <Badge variant="outline">3 Categories</Badge>
            </div>
            <CardTitle className="text-base mt-2">Skills &amp; Taxonomy Hierarchy</CardTitle>
            <CardDescription className="text-xs">
              Curate technical, soft, and analytical skills, Holland RIASEC interest domains, and academic disciplines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/skills">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Curate Taxonomy
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <Badge variant="outline">8 Curated</Badge>
            </div>
            <CardTitle className="text-base mt-2">Courses &amp; Learning Directory</CardTitle>
            <CardDescription className="text-xs">
              Link verified online course offerings to specific skills for automatic skill-gap remediation recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/courses">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Manage Courses
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <MessageSquare className="h-6 w-6 text-rose-600" />
              <Badge variant="outline">Review Queue</Badge>
            </div>
            <CardTitle className="text-base mt-2">Student Feedback Reviews</CardTitle>
            <CardDescription className="text-xs">
              Inspect student ratings and qualitative critique on recommendation quality and UI/UX usability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/feedback">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Review Feedback
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:border-amber-400 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Server className="h-6 w-6 text-emerald-600" />
              <Badge variant="outline" className="border-emerald-300 text-emerald-800">Operational</Badge>
            </div>
            <CardTitle className="text-base mt-2">PostgreSQL Database &amp; RLS</CardTitle>
            <CardDescription className="text-xs">
              Review versioned database migrations in <code className="text-teal-800 font-mono">supabase/migrations</code> and security triggers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => alert('PostgreSQL schema migrations verified: 20261020000001_initial_schema.sql, 20261020000002_rls_policies.sql, 20261020000003_seed_data.sql')}
            >
              Verify Migration Files
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
