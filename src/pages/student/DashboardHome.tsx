import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Info,
  Layers,
  LineChart,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import { recommendationEngine } from '@/services/recommendationEngine';
import type { Recommendation } from '@/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
  const { profile } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setIsLoadingRecs(true);
    recommendationEngine
      .getLatestRecommendations(profile.id)
      .then((res) => {
        setRecommendations(res.recommendations);
      })
      .catch((err) => console.error('Error fetching dashboard recommendations:', err))
      .finally(() => setIsLoadingRecs(false));
  }, [profile?.id]);

  const hasRecs = recommendations.length > 0;
  const topThree = recommendations.slice(0, 3);

  const steps = [
    { title: 'Personal Profile', completed: Boolean(profile?.university && profile?.major), path: '/dashboard/profile' },
    { title: 'Skills Inventory', completed: true, path: '/dashboard/assessment' },
    { title: 'Interests & Strengths', completed: true, path: '/dashboard/assessment' },
    { title: 'Work Personality', completed: hasRecs, path: '/dashboard/assessment' },
    { title: 'Recommendations', completed: hasRecs, path: '/dashboard/recommendations' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium">
            <Compass className="h-3.5 w-3.5" />
            <span>Discover. Plan. Grow.</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Welcome back, {profile?.full_name || 'Student'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {profile?.university ? `${profile.university} • ${profile.major || 'Degree Candidate'}` : 'University Career Assessment Portal'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/dashboard/assessment">
              <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold shadow-md">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Resume Career Assessment
              </Button>
            </Link>
            <Link to="/dashboard/careers">
              <Button variant="outline" className="border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800">
                <Briefcase className="h-4 w-4 mr-2" />
                Explore 20+ Careers
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Journey Tracker */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Assessment Journey Progress</CardTitle>
              <CardDescription className="text-xs">
                Complete your competency profiles to trigger deterministic recommendation calculation
              </CardDescription>
            </div>
            <Badge variant="teal">60% Complete</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {steps.map((s, idx) => (
              <Link
                key={s.title}
                to={s.path}
                className={`p-3 rounded-lg border text-left transition-all ${
                  s.completed
                    ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-teal-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-slate-400">Step 0{idx + 1}</span>
                  {s.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                  )}
                </div>
                <p className="text-xs font-semibold text-navy-950">{s.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {s.completed ? 'Completed' : 'Action needed'}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Calculated Matches</CardTitle>
            <Sparkles className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">20 Available</div>
            <p className="text-xs text-slate-500 mt-1">Ready for ranking generation</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Active Rule Set</CardTitle>
            <Award className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">v1.0 Standard</div>
            <p className="text-xs text-slate-500 mt-1">40% S • 30% I • 20% A • 10% P</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Skill-Gap Readiness</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">Explainable</div>
            <p className="text-xs text-slate-500 mt-1">Identifies missing prerequisites</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">PDF Audit Report</CardTitle>
            <BookOpen className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-950">Ready</div>
            <p className="text-xs text-slate-500 mt-1">Downloadable defense evidence</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Explorations & Model Transparency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">High-Alignment Career Preview</CardTitle>
              <Link to="/dashboard/careers" className="text-xs text-teal-600 font-semibold hover:underline">
                View All 20 Profiles
              </Link>
            </div>
            <CardDescription className="text-xs">
              Preview careers across tech, healthcare, business, and engineering with realistic tasks and prerequisites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasRecs ? (
              topThree.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-white hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        Rank #{rec.rank}
                      </span>
                      <h4 className="font-semibold text-sm text-navy-950">{rec.career?.title}</h4>
                      <Badge variant="teal" className="text-[10px] font-mono">
                        {rec.overall_score}% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{rec.career?.industry}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rec.explanation?.matching_skills.slice(0, 3).map((sk) => (
                        <span key={sk.skill_id} className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-100">
                          {sk.name} ({sk.match_percentage}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/dashboard/recommendations">
                    <Button size="sm" variant="outline" className="text-xs text-teal-700 border-teal-200 hover:bg-teal-50 shrink-0">
                      View Explainability
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              [
                {
                  title: 'Software Engineer',
                  industry: 'Technology',
                  match: '94% Compatibility',
                  skills: ['Python', 'JavaScript/TypeScript', 'SQL'],
                  slug: 'software-engineer',
                },
                {
                  title: 'Data Scientist',
                  industry: 'Technology / Analytics',
                  match: '89% Compatibility',
                  skills: ['Statistics', 'Machine Learning', 'Data Visualization'],
                  slug: 'data-scientist',
                },
                {
                  title: 'Product Manager',
                  industry: 'Business & Technology',
                  match: '85% Compatibility',
                  skills: ['Agile Leadership', 'Market Analysis', 'Communication'],
                  slug: 'product-manager',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-white hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-navy-950">{c.title}</h4>
                      <Badge variant="teal" className="text-[10px]">{c.match}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{c.industry}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.skills.map((sk) => (
                        <span key={sk} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/dashboard/assessment">
                    <Button size="sm" variant="outline" className="text-xs text-teal-700 border-teal-200 hover:bg-teal-50 shrink-0">
                      Run Assessment Match
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Algorithm Explainability Box */}
        <Card className="border-slate-200 bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2 text-teal-800">
              <Info className="h-5 w-5 text-teal-600" />
              <CardTitle className="text-lg">Deterministic Transparency</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Master's defense explainability specification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600">
            <p>
              Recommendations are mathematically calculated by evaluating four normalized sub-scores against career requirement thresholds:
            </p>

            <ul className="space-y-2">
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium text-slate-800">Skills Compatibility (S):</span>
                <span className="font-semibold text-teal-700">40%</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium text-slate-800">RIASEC Interests (I):</span>
                <span className="font-semibold text-teal-700">30%</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium text-slate-800">Academic Strengths (A):</span>
                <span className="font-semibold text-teal-700">20%</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium text-slate-800">Work Personality (P):</span>
                <span className="font-semibold text-teal-700">10%</span>
              </li>
            </ul>

            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <p className="font-semibold text-navy-950 mb-1">Zero Hallucinations Guarantee:</p>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Inputs are strictly preserved in versioned snapshots (<code className="font-mono text-teal-800">assessment_skill_snapshots</code>) guaranteeing identical scores for the same profile and rules version.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
