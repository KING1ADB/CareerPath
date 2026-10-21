import { Badge } from '@/components/ui/badge';
import { assessmentService } from '@/services/assessmentService';
import { taxonomyService } from '@/services/taxonomyService';
import type { AcademicStrength } from '@/types';
import { BookOpen, CheckCircle2, GraduationCap, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface AcademicsAssessmentProps {
  profileId: string;
  onAcademicsUpdated?: () => void;
}

const PERFORMANCE_LEVELS: Record<number, { label: string; desc: string; color: string }> = {
  1: { label: 'Fundamental', desc: 'Basic coursework knowledge', color: 'bg-slate-100 text-slate-800' },
  2: { label: 'Competent', desc: 'Satisfactory performance (Grade C)', color: 'bg-blue-50 text-blue-800' },
  3: { label: 'Proficient', desc: 'Solid academic grasp (Grade B)', color: 'bg-teal-50 text-teal-800' },
  4: { label: 'Advanced', desc: 'High academic distinction (Grade A)', color: 'bg-indigo-50 text-indigo-800' },
  5: { label: 'Distinction / Honors', desc: 'Top tier mastery / Research honors', color: 'bg-emerald-50 text-emerald-800' },
};

export const AcademicsAssessment: React.FC<AcademicsAssessmentProps> = ({ profileId, onAcademicsUpdated }) => {
  const [allAcademics, setAllAcademics] = useState<AcademicStrength[]>([]);
  const [studentAcademics, setStudentAcademics] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [academics, rated] = await Promise.all([
          taxonomyService.getAcademicStrengths(),
          assessmentService.getStudentAcademicStrengths(profileId),
        ]);
        setAllAcademics(academics);
        const map: Record<string, number> = {};
        rated.forEach((r) => {
          map[r.academic_strength_id] = r.grade_or_rating;
        });
        setStudentAcademics(map);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profileId]);

  const handleRate = async (acadId: string, level: number) => {
    setSavingId(acadId);
    try {
      if (studentAcademics[acadId] === level) {
        await assessmentService.removeStudentAcademicStrength(profileId, acadId);
        setStudentAcademics((prev) => {
          const next = { ...prev };
          delete next[acadId];
          return next;
        });
      } else {
        await assessmentService.saveStudentAcademicStrength(profileId, acadId, level);
        setStudentAcademics((prev) => ({ ...prev, [acadId]: level }));
      }
      onAcademicsUpdated?.();
    } finally {
      setSavingId(null);
    }
  };

  const totalRated = Object.keys(studentAcademics).length;

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-500">Loading academic discipline matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-navy-950">Academic Strengths &amp; Subject Mastery</h3>
            <Badge variant="teal" className="text-xs">
              {totalRated} of {allAcademics.length} Disciplines Evaluated
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Weighted at 20% in recommendation matching. Rate your historical academic performance and comfort level in each discipline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allAcademics.map((item) => {
          const currentLevel = studentAcademics[item.id];
          const isSaving = savingId === item.id;
          const levelInfo = currentLevel ? PERFORMANCE_LEVELS[currentLevel] : null;

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
                  <Badge variant="outline" className="text-[10px] mt-0.5">
                    {item.subject_area}
                  </Badge>
                </div>

                {levelInfo && (
                  <Badge className={`text-[10px] border ${levelInfo.color}`}>
                    {currentLevel}/5 • {levelInfo.label}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-500 mb-3 min-h-[30px]">{item.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-400 mr-1">Mastery:</span>
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const isSelected = currentLevel === lvl;
                    const isUnderOrAt = currentLevel && currentLevel >= lvl;

                    return (
                      <button
                        key={lvl}
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleRate(item.id, lvl)}
                        title={`Grade Tier ${lvl}: ${PERFORMANCE_LEVELS[lvl].label} (${PERFORMANCE_LEVELS[lvl].desc})`}
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
