import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code,
  Compass,
  Cpu,
  Database,
  GraduationCap,
  HeartHandshake,
  Layers,
  LineChart,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Zap,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const industries = [
    { name: 'Technology & AI', count: '4 Profiles', icon: Cpu, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { name: 'Finance & Banking', count: '2 Profiles', icon: LineChart, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: 'Business & Management', count: '3 Profiles', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { name: 'Healthcare & Clinical', count: '3 Profiles', icon: Stethoscope, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { name: 'Engineering & Infrastructure', count: '3 Profiles', icon: Zap, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'Creative & UI/UX Design', count: '2 Profiles', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'Law & Governance', count: '2 Profiles', icon: Scale, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { name: 'Education & Advising', count: '2 Profiles', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Skills Evaluation (40%)',
      desc: 'Assess both technical proficiency (Python, CAD, Financial Modeling) and essential soft skills with 1-5 mastery scales.',
      badge: 'Weight: 0.40',
    },
    {
      step: '02',
      title: 'RIASEC Interests (30%)',
      desc: 'Holland Code-aligned taxonomy mapping passion areas across Investigative, Enterprising, Artistic, and Realistic disciplines.',
      badge: 'Weight: 0.30',
    },
    {
      step: '03',
      title: 'Academic Strengths (20%)',
      desc: 'Integrates self-reported course grades and academic domains to align with educational prerequisite expectations.',
      badge: 'Weight: 0.20',
    },
    {
      step: '04',
      title: 'Work Personality (10%)',
      desc: 'Evaluates preferred collaborative dynamics, problem-solving styles, and career value orientations.',
      badge: 'Weight: 0.10',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-950 text-white py-20 lg:py-28">
        {/* Decorative Grid and Ambient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium tracking-wide">
              <GraduationCap className="h-4 w-4" />
              <span>Master's Defense Demonstration Project • Production SaaS Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Discover. Plan. Grow.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-emerald-400 mt-2">
                Explainable Career Guidance
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              A transparent, rule-based recommendation platform designed for university students. Discover ranked career matches, pinpoint skill gaps, and access curated courses with mathematical explainability.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8 shadow-lg shadow-teal-500/20">
                  Begin Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800">
                  Try Interactive Demo
                </Button>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">20+</div>
                <div className="text-xs text-slate-400 mt-1">Realistic Career Profiles</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-teal-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Explainable Formula</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">25</div>
                <div className="text-xs text-slate-400 mt-1">Normalized PostgreSQL Tables</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">Zero-Trust</div>
                <div className="text-xs text-slate-400 mt-1">Row-Level Security (RLS)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Methodology & Recommendation Engine Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="teal">Engine Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950">
              Deterministic, Explainable Recommendations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              No black-box guesses or opaque AI predictions. Every career ranking is computed using a version-controlled formula with exact compatibility breakdown:
            </p>
            <div className="inline-block p-3 rounded-lg bg-slate-100 font-mono text-sm text-navy-950 border border-slate-200">
              Score = 0.40(Skills) + 0.30(Interests) + 0.20(Academics) + 0.10(Personality)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((m) => (
              <Card key={m.step} className="border-slate-200/80 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-2xl font-bold text-teal-600">{m.step}</span>
                    <Badge variant="outline" className="text-xs bg-slate-50">{m.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{m.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 20 Career Horizons Catalog Showcase */}
      <section id="careers" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="navy">Diverse Pathways</Badge>
              <h2 className="text-3xl font-bold text-navy-950 mt-2">
                Exploration Across 8 Foundational Industries
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Each career profile details typical day-to-day responsibilities, required proficiency, illustrative salary ranges, and job outlooks.
              </p>
            </div>
            <Link to="/register">
              <Button variant="outline" className="border-slate-300 text-slate-800 hover:border-teal-600">
                Explore Full Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-xl border ${ind.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-navy-950 group-hover:text-teal-600 transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{ind.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Defense & System Architecture Note */}
      <section id="defense-notes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-5 w-5" />
                <span>Academic Rigor &amp; Defense Ready</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Engineered for Verification and Scientific Reproducibility
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                CareerPath addresses the lack of transparent, personalized guidance for higher-education students. Every assessment locks input snapshots of skills, interests, and questionnaire responses, guaranteeing that historical outputs can be audited, re-evaluated against newer rule versions, and downloaded as academic PDF reports.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Database className="h-5 w-5 text-teal-400 mb-2" />
                  <h4 className="font-semibold text-sm text-white">Full PostgreSQL DDL</h4>
                  <p className="text-xs text-slate-400 mt-1">25 normalized tables with UUIDs, cascade deletes, and versioning.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
                  <h4 className="font-semibold text-sm text-white">Strict Row Level Security</h4>
                  <p className="text-xs text-slate-400 mt-1">Multi-tenant student isolation with automated role escalation prevention.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Award className="h-5 w-5 text-amber-400 mb-2" />
                  <h4 className="font-semibold text-sm text-white">Explainable Skill-Gap</h4>
                  <p className="text-xs text-slate-400 mt-1">Mathematical gap analysis paired with targeted prerequisite course links.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="bg-teal-500 text-slate-950 hover:bg-teal-400 font-semibold">
                    Launch Student Portal
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
                    Administrator Console
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
