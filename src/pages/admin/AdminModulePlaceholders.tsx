import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Briefcase, Layers, MessageSquare, Plus, Sliders } from 'lucide-react';
import React from 'react';

export const AdminCareersShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Career Catalog Management</h1>
        <p className="text-sm text-slate-600">Create, edit, and configure requirements for all career profiles</p>
      </div>
      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5 text-xs">
        <Plus className="h-4 w-4" />
        Add New Career
      </Button>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Database Seed Status</CardTitle>
        <CardDescription>20 normalized career profiles loaded with industry taxonomy and required proficiency levels</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600">
          Administrator CRUD interfaces for careers, skill importance weights, and required proficiencies are scheduled for Phase 4 &amp; Phase 5.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const AdminSkillsShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Skills &amp; Taxonomy Hierarchy</h1>
        <p className="text-sm text-slate-600">Manage categories, skills definitions, RIASEC interest tags, and academic subject areas</p>
      </div>
      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5 text-xs">
        <Plus className="h-4 w-4" />
        Add Skill
      </Button>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Taxonomy Master Directory</CardTitle>
        <CardDescription>Governs skills, interests, and academic strengths available to students and careers</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600">
          Admins can inspect and curate taxonomy definitions directly in PostgreSQL <code className="text-teal-800 font-mono">skills</code> and <code className="text-teal-800 font-mono">interests</code> tables.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const AdminRulesShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Recommendation Engine Weights &amp; Rules</h1>
        <p className="text-sm text-slate-600">Configure weighting coefficients and manage versioned algorithm snapshots</p>
      </div>
      <Badge variant="outline" className="border-amber-400 text-amber-800">Rule v1.0 Active</Badge>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Rule Version: v1.0 Standard</CardTitle>
        <CardDescription>Weights applied to student matching algorithm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <span className="text-xs text-slate-500">Skills Weight</span>
            <p className="text-lg font-bold text-teal-600">40%</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <span className="text-xs text-slate-500">Interests Weight</span>
            <p className="text-lg font-bold text-teal-600">30%</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <span className="text-xs text-slate-500">Academics Weight</span>
            <p className="text-lg font-bold text-teal-600">20%</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <span className="text-xs text-slate-500">Personality Weight</span>
            <p className="text-lg font-bold text-teal-600">10%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const AdminCoursesShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Courses &amp; Learning Resources</h1>
        <p className="text-sm text-slate-600">Manage curated educational resources linked to skill-gap remediation</p>
      </div>
      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5 text-xs">
        <Plus className="h-4 w-4" />
        Add Course
      </Button>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Course Catalogue Directory</CardTitle>
        <CardDescription>8 curated courses from OpenCourseWare, freeCodeCamp, AWS, and DesignLab</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600">
          Enables automatic course suggestions whenever a student has a negative skill gap for a target career.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const AdminFeedbackShell: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Student Feedback &amp; Defense Metrics</h1>
        <p className="text-sm text-slate-600">Audit student feedback and ratings on recommendation accuracy</p>
      </div>
    </div>
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Feedback Ingestion Log</CardTitle>
        <CardDescription>Real-time submission reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600">
          Provides empirical data on algorithm perception, usability, and curriculum relevance for Master's defense presentation.
        </p>
      </CardContent>
    </Card>
  </div>
);
