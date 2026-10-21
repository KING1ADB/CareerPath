import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Recommendation } from '@/types';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  HelpCircle,
  Sparkles,
  Target,
  Wrench,
  X,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface ExplainabilityModalProps {
  recommendation: Recommendation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({
  recommendation,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !recommendation) return null;

  const { career, explanation } = recommendation;
  const s = recommendation.skills_score;
  const i = recommendation.interests_score;
  const a = recommendation.academics_score;
  const p = recommendation.personality_score;
  const overall = recommendation.overall_score;

  const weightedS = (s * 0.4).toFixed(2);
  const weightedI = (i * 0.3).toFixed(2);
  const weightedA = (a * 0.2).toFixed(2);
  const weightedP = (p * 0.1).toFixed(2);

  const missingSkills = explanation?.missing_skills || [];
  const matchingSkills = explanation?.matching_skills || [];
  const matchingInterests = explanation?.matching_interests || [];
  const matchingAcademics = explanation?.matching_academics || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Badge variant="teal" className="text-xs font-semibold px-2.5 py-0.5">
              Rank #{recommendation.rank} Match
            </Badge>
            <span className="text-xs text-slate-300">• {career?.industry}</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            {career?.title}
            <span className="text-teal-400 text-xl font-mono">({overall}%)</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            {career?.summary}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800">
          {/* Synthesis Narrative */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-1.5">
              <Sparkles className="h-4 w-4 text-teal-600" />
              Advisory Match Synthesis
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {explanation?.explanation_text ||
                'Calculated through normalized comparison between student competencies and industry career requirement matrices.'}
            </p>
          </div>

          {/* Mathematical Proof Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <Target className="h-4 w-4 text-teal-600" />
                Deterministic Scoring Decomposition
              </h4>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Score = 0.40S + 0.30I + 0.20A + 0.10P
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Evaluation Pillar</th>
                    <th className="py-2.5 px-3 text-center">Weight</th>
                    <th className="py-2.5 px-3 text-center">Raw Score</th>
                    <th className="py-2.5 px-3 text-right">Weighted Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 flex items-center gap-2 text-navy-950">
                      <Wrench className="h-3.5 w-3.5 text-teal-600" />
                      Skills Inventory (S)
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">40%</td>
                    <td className="py-2.5 px-3 text-center font-mono">{s}%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-teal-700 font-bold">
                      +{weightedS} pts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 flex items-center gap-2 text-navy-950">
                      <Compass className="h-3.5 w-3.5 text-indigo-600" />
                      RIASEC Passion Themes (I)
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">30%</td>
                    <td className="py-2.5 px-3 text-center font-mono">{i}%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-indigo-700 font-bold">
                      +{weightedI} pts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 flex items-center gap-2 text-navy-950">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                      Academic Disciplines (A)
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">20%</td>
                    <td className="py-2.5 px-3 text-center font-mono">{a}%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-blue-700 font-bold">
                      +{weightedA} pts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 flex items-center gap-2 text-navy-950">
                      <Award className="h-3.5 w-3.5 text-amber-600" />
                      Work Personality &amp; Style (P)
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">10%</td>
                    <td className="py-2.5 px-3 text-center font-mono">{p}%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700 font-bold">
                      +{weightedP} pts
                    </td>
                  </tr>
                  <tr className="bg-slate-50/80 font-bold">
                    <td className="py-2.5 px-3 text-navy-950" colSpan={3}>
                      Final Deterministic Compatibility Score
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm text-teal-700">
                      {overall}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Drilldown: Skills Matched vs Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matching Strengths */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Demonstrated Competencies ({matchingSkills.length})
                </h5>
              </div>
              {matchingSkills.length > 0 ? (
                <div className="space-y-2">
                  {matchingSkills.map((sk) => (
                    <div
                      key={sk.skill_id}
                      className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800">{sk.name}</span>
                      <span className="font-mono text-emerald-700 font-semibold">
                        {sk.match_percentage}% met
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No evaluated skills match this profile yet.</p>
              )}
            </div>

            {/* Skill Gaps to Close */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Prerequisites to Develop ({missingSkills.length})
                </h5>
              </div>
              {missingSkills.length > 0 ? (
                <div className="space-y-2">
                  {missingSkills.slice(0, 4).map((gap) => (
                    <div
                      key={gap.skill_id}
                      className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-slate-800">{gap.skill_name}</span>
                        {gap.is_required && (
                          <span className="ml-1.5 text-[10px] text-amber-700 bg-amber-100 px-1 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-600">
                        Lvl {gap.student_level} / {gap.required_level}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-600 font-medium">
                  Zero skill gaps! You meet all required proficiency thresholds.
                </p>
              )}
            </div>
          </div>

          {/* Interests & Academics Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-indigo-600" />
                RIASEC Themes Aligned
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {matchingInterests.map((mi) => (
                  <span
                    key={mi.interest_id}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1"
                  >
                    <span>{mi.name}</span>
                    <span className="text-[10px] text-indigo-600 font-mono">({mi.match_percentage}%)</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-blue-600" />
                Academic Discipline Strengths
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {matchingAcademics.map((ma) => (
                  <span
                    key={ma.academic_id}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1"
                  >
                    <span>{ma.name}</span>
                    <span className="text-[10px] text-blue-600 font-mono">({ma.match_percentage}%)</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Education Level: <strong className="text-slate-700">{career?.education_level}</strong>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
            <Link to={`/dashboard/skill-gap?career=${career?.slug}`} onClick={onClose}>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1.5 shadow-sm">
                Open Skill-Gap Analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
