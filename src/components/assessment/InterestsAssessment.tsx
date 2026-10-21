import { Badge } from '@/components/ui/badge';
import { assessmentService } from '@/services/assessmentService';
import { taxonomyService } from '@/services/taxonomyService';
import type { Interest, InterestCategory } from '@/types';
import { CheckCircle2, Compass, Heart, Loader2, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface InterestsAssessmentProps {
  profileId: string;
  onInterestUpdated?: () => void;
}

const RIASEC_META: Record<
  InterestCategory,
  { name: string; tag: string; color: string; badgeColor: string }
> = {
  investigative: {
    name: 'Investigative (The Thinker)',
    tag: 'Analytical & Research',
    color: 'border-blue-200 bg-blue-50/30 text-blue-900',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  enterprising: {
    name: 'Enterprising (The Persuader)',
    tag: 'Leadership & Commerce',
    color: 'border-amber-200 bg-amber-50/30 text-amber-900',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  artistic: {
    name: 'Artistic (The Creator)',
    tag: 'Design & Expression',
    color: 'border-purple-200 bg-purple-50/30 text-purple-900',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  social: {
    name: 'Social (The Helper)',
    tag: 'Care & Mentorship',
    color: 'border-emerald-200 bg-emerald-50/30 text-emerald-900',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  realistic: {
    name: 'Realistic (The Builder)',
    tag: 'Physical & Structural',
    color: 'border-orange-200 bg-orange-50/30 text-orange-900',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  conventional: {
    name: 'Conventional (The Organizer)',
    tag: 'Data & Systems Order',
    color: 'border-slate-200 bg-slate-50/30 text-slate-900',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
  },
};

const INTEREST_LABELS: Record<number, string> = {
  1: 'Slight Curiosity',
  2: 'Mild Interest',
  3: 'Moderate Passion',
  4: 'Strong Enthusiasm',
  5: 'Driving Passion',
};

export const InterestsAssessment: React.FC<InterestsAssessmentProps> = ({ profileId, onInterestUpdated }) => {
  const [allInterests, setAllInterests] = useState<Interest[]>([]);
  const [studentInterests, setStudentInterests] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [interests, rated] = await Promise.all([
          taxonomyService.getInterests(),
          assessmentService.getStudentInterests(profileId),
        ]);
        setAllInterests(interests);
        const map: Record<string, number> = {};
        rated.forEach((r) => {
          map[r.interest_id] = r.interest_level;
        });
        setStudentInterests(map);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profileId]);

  const handleRate = async (interestId: string, level: number) => {
    setSavingId(interestId);
    try {
      if (studentInterests[interestId] === level) {
        await assessmentService.removeStudentInterest(profileId, interestId);
        setStudentInterests((prev) => {
          const next = { ...prev };
          delete next[interestId];
          return next;
        });
      } else {
        await assessmentService.saveStudentInterest(profileId, interestId, level);
        setStudentInterests((prev) => ({ ...prev, [interestId]: level }));
      }
      onInterestUpdated?.();
    } finally {
      setSavingId(null);
    }
  };

  const totalRated = Object.keys(studentInterests).length;

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-500">Loading Holland RIASEC passion themes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-navy-950">Holland RIASEC Interest Alignment</h3>
            <Badge variant="teal" className="text-xs">
              {totalRated} of {allInterests.length} Themes Selected
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Weighted at 30% of the overall recommendation formula. Rate which intellectual and professional activities naturally inspire you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allInterests.map((item) => {
          const meta = RIASEC_META[item.category];
          const currentLevel = studentInterests[item.id];
          const isSaving = savingId === item.id;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 bg-white ${
                currentLevel ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-sm text-navy-950 flex items-center gap-2">
                    {item.name}
                    {currentLevel && <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />}
                  </h4>
                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 border ${meta.badgeColor}`}>
                    {meta.name}
                  </span>
                </div>

                {currentLevel && (
                  <Badge variant="teal" className="text-[10px]">
                    {currentLevel}/5 • {INTEREST_LABELS[currentLevel]}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-500 mb-3 min-h-[30px]">{item.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-400 mr-1">Passion Level:</span>
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const isSelected = currentLevel === lvl;
                    const isUnderOrAt = currentLevel && currentLevel >= lvl;

                    return (
                      <button
                        key={lvl}
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleRate(item.id, lvl)}
                        title={`Level ${lvl}: ${INTEREST_LABELS[lvl]}`}
                        className={`h-7 w-7 rounded-md flex items-center justify-center text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/30'
                            : isUnderOrAt
                            ? 'bg-teal-100 text-teal-900 hover:bg-teal-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>

                {currentLevel && (
                  <button
                    type="button"
                    onClick={() => handleRate(item.id, currentLevel)}
                    className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
