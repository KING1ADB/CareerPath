import { ProfileForm } from '@/components/profile/ProfileForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import React from 'react';

export const ProfilePage: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Student Profile Management
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Maintain your academic degree information, university background, and personal trajectory goals.
          </p>
        </div>
        <Badge variant="teal" className="w-fit">
          Student Self-Management Portal
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileForm />
        </div>

        {/* Informational Sidebar */}
        <div className="space-y-4">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-teal-800">
                <GraduationCap className="h-5 w-5 text-teal-600" />
                <CardTitle className="text-base">Curriculum Alignment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600">
              <p>
                Your selected university program and expected graduation timeline help CareerPath contextualize your skill acquisition rate and match relevant introductory versus senior career roles.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-semibold text-navy-950">Active Degree:</span>
                <p className="text-slate-700">{profile?.major || 'Undeclared'}</p>
                <span className="font-semibold text-navy-950 block pt-1">Institution:</span>
                <p className="text-slate-700">{profile?.university || 'University Student'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-navy-950">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">Privacy &amp; RLS Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 space-y-2">
              <p>
                Profile records are guarded by strict PostgreSQL Row Level Security:
              </p>
              <code className="block p-2 bg-slate-50 rounded text-[11px] font-mono text-teal-800 border border-slate-200">
                USING (id = auth.uid() OR is_admin())
              </code>
              <p className="text-slate-500">
                Other students cannot access or query your private academic records.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
