import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { ClipboardCheck, Sparkles } from 'lucide-react';
import React from 'react';

export const AssessmentPage: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Career Guidance Assessment
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Complete the four evaluation pillars to generate deterministic, explainable career matches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="teal" className="gap-1.5 text-xs py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 text-teal-300" />
            Rule Set v1.0 Standard
          </Badge>
        </div>
      </div>

      <AssessmentWizard profileId={profile.id} />
    </div>
  );
};
