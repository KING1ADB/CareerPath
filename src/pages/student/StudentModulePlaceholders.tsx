import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, ChevronRight, FileText, Info, Layers, Sparkles, TrendingUp } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const StudentProfileShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Student Profile &amp; Academic Background</h1>
        <p className="text-sm text-slate-600">Manage university credentials, academic major, graduation timeline, and career interests</p>
      </div>
      <Badge variant="teal">Phase 2 Module Ready</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Academic Profile Configuration</CardTitle>
        <CardDescription>All profile updates are synchronized directly to PostgreSQL profiles table with owner-only RLS</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Institution &amp; Degree Program</span>
            <p className="text-sm font-semibold text-navy-950 mt-1">State University • Computer Science &amp; Info Systems</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Expected Graduation</span>
            <p className="text-sm font-semibold text-navy-950 mt-1">Class of 2026 • Undergraduate Senior</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between">
          <span>Detailed profile editing, avatar uploads, and university department validation are ready for Phase 2 activation.</span>
          <Link to="/dashboard/assessment">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs">
              Proceed to Assessment
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const StudentAssessmentShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Skills &amp; Interests Assessment</h1>
        <p className="text-sm text-slate-600">Evaluate competencies across technical skills, RIASEC interests, and personality traits</p>
      </div>
      <Badge variant="teal">Phase 2 Core Engine</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Assessment Pipeline Preview</CardTitle>
        <CardDescription>Four-pillar evaluation generating reproducible snapshot tables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <h4 className="font-semibold text-sm text-navy-950 mb-1">1. Skills Matrix (40%)</h4>
            <p className="text-xs text-slate-600">Interactive proficiency rating (1-5) across technical, analytical, business, and soft skills.</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <h4 className="font-semibold text-sm text-navy-950 mb-1">2. RIASEC Passion Areas (30%)</h4>
            <p className="text-xs text-slate-600">Holland Occupational Themes: Investigative, Enterprising, Artistic, and Realistic.</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <h4 className="font-semibold text-sm text-navy-950 mb-1">3. Academic Strengths (20%)</h4>
            <p className="text-xs text-slate-600">Course performance metrics in calculus, CS principles, biology, finance, and jurisprudence.</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <h4 className="font-semibold text-sm text-navy-950 mb-1">4. Work Personality (10%)</h4>
            <p className="text-xs text-slate-600">Work styles, cognitive problem solving, and workplace value orientation questions.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const StudentRecommendationsShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Career Recommendations</h1>
        <p className="text-sm text-slate-600">Deterministic ranked results with transparent mathematical breakdown</p>
      </div>
      <Badge variant="teal">Phase 3 Engine</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Explainable Recommendation Ranking Output</CardTitle>
        <CardDescription>Outputs rank, compatibility score, matching skills, and missing prerequisites</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="teal">Rank #1 • 94% Compatibility</Badge>
              <h3 className="font-bold text-base text-navy-950">Software Engineer</h3>
            </div>
            <p className="text-xs text-slate-600 mt-1">Technology • Computer Science Bachelor's Pathway</p>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Score Breakdown: S: 96% (38.4/40) | I: 92% (27.6/30) | A: 90% (18.0/20) | P: 100% (10.0/10)
            </p>
          </div>
          <Link to="/dashboard/skill-gap">
            <Button size="sm" variant="outline" className="text-xs text-teal-800 border-teal-300">
              Analyze Skill Gaps
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const StudentCareersShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Career Exploration &amp; Catalog</h1>
        <p className="text-sm text-slate-600">Explore 20 verified career profiles across 8 industries with illustrative salary ranges</p>
      </div>
      <Badge variant="navy">20 Profiles Seeded</Badge>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { title: 'Software Engineer', ind: 'Technology', sal: '$75k - $160k (Illustrative)', slug: 'software-engineer' },
        { title: 'Data Scientist', ind: 'Technology', sal: '$80k - $165k (Illustrative)', slug: 'data-scientist' },
        { title: 'Cybersecurity Analyst', ind: 'Technology', sal: '$70k - $145k (Illustrative)', slug: 'cybersecurity-analyst' },
        { title: 'Cloud Solutions Architect', ind: 'Technology', sal: '$90k - $185k (Illustrative)', slug: 'cloud-solutions-architect' },
        { title: 'UI/UX Designer', ind: 'Creative', sal: '$65k - $140k (Illustrative)', slug: 'ui-ux-designer' },
        { title: 'Financial Analyst', ind: 'Finance', sal: '$68k - $140k (Illustrative)', slug: 'financial-analyst' },
      ].map((c) => (
        <Card key={c.slug} className="border-slate-200 hover:border-teal-500 transition-colors">
          <CardHeader className="pb-2">
            <Badge variant="outline" className="w-fit text-[10px]">{c.ind}</Badge>
            <CardTitle className="text-base mt-1">{c.title}</CardTitle>
            <CardDescription className="text-xs">{c.sal}</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button size="sm" variant="ghost" className="w-full text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50 justify-between">
              <span>View Career Specifications</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const StudentSkillGapShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Skill-Gap Analysis &amp; Course Pathways</h1>
        <p className="text-sm text-slate-600">Compare personal proficiency levels against career benchmark requirements</p>
      </div>
      <Badge variant="teal">Phase 4 Engine</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Missing Skills Identification</CardTitle>
        <CardDescription>Mathematical gap calculation paired with database-linked courses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-navy-950">Cloud Computing (AWS/GCP)</span>
              <Badge variant="amber" className="text-[10px]">Gap: -2 Levels</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">Current Student Level: 2/5 • Target Career Level: 4/5</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs text-teal-700 border-teal-300">
            View Recommended Course
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const StudentHistoryShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Assessment History &amp; Audit Logs</h1>
        <p className="text-sm text-slate-600">Review past attempts, frozen input snapshots, and download PDF reports</p>
      </div>
      <Badge variant="teal">Phase 5 Feature</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Historical Assessment Records</CardTitle>
        <CardDescription>All previous evaluations are version-locked with immutable snapshot tables</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-navy-950">Assessment Run #01 • Rule Version v1.0</span>
            <p className="text-xs text-slate-500 mt-0.5">Top Match: Software Engineer (94%)</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1.5 text-slate-700">
            <FileText className="h-3.5 w-3.5 text-teal-600" />
            Download PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const StudentFeedbackShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-3xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Recommendation &amp; System Feedback</h1>
        <p className="text-sm text-slate-600">Rate match accuracy and submit qualitative observations for thesis evaluation</p>
      </div>
      <Badge variant="teal">Phase 5 Feature</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Student Feedback Survey</CardTitle>
        <CardDescription>Recorded in feedback table for administrator review and thesis metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600 leading-relaxed">
          The feedback module allows students to rate their recommendation matches on a 1-5 scale and provide constructive critique on career recommendations, system usability, and curriculum alignment.
        </p>
      </CardContent>
    </Card>
  </div>
);
