import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Recommendation } from '@/types';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  Sparkles,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onExplain: (recommendation: Recommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onExplain,
}) => {
  const { career, overall_score, rank, skills_score, interests_score, academics_score, personality_score, explanation } =
    recommendation;

  const isTopThree = rank <= 3;
  const isRankOne = rank === 1;

  // Rank Styling
  let rankBadge = (
    <span className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono border border-slate-200">
      #{rank}
    </span>
  );

  if (isRankOne) {
    rankBadge = (
      <span className="h-8 w-8 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center font-mono border border-amber-300 shadow-sm ring-2 ring-amber-200">
        #1
      </span>
    );
  } else if (rank === 2) {
    rankBadge = (
      <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center font-mono border border-slate-300 shadow-sm">
        #2
      </span>
    );
  } else if (rank === 3) {
    rankBadge = (
      <span className="h-7 w-7 rounded-full bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center font-mono border border-amber-200">
        #3
      </span>
    );
  }

  // Score Color
  let scoreColorClass = 'text-teal-600 bg-teal-50 border-teal-200';
  let badgeVariant: 'teal' | 'green' | 'amber' | 'default' = 'teal';
  let matchLabel = 'High Match';

  if (overall_score >= 88) {
    scoreColorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200 ring-1 ring-emerald-300';
    badgeVariant = 'green';
    matchLabel = 'Premier Match';
  } else if (overall_score < 70) {
    scoreColorClass = 'text-amber-700 bg-amber-50 border-amber-200';
    badgeVariant = 'amber';
    matchLabel = 'Developing Match';
  }

  const matchingSkills = explanation?.matching_skills || [];
  const missingSkills = explanation?.missing_skills || [];

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-md border ${
        isRankOne
          ? 'border-teal-400 bg-gradient-to-b from-teal-50/20 via-white to-white ring-1 ring-teal-200'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      {isRankOne && (
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-[11px] font-semibold tracking-wide py-1 px-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            Highest Compatibility Career Recommendation
          </span>
          <span className="font-mono text-teal-100">Top Overall Fit</span>
        </div>
      )}

      <CardContent className="p-5 sm:p-6 space-y-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {rankBadge}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant={badgeVariant} className="text-[11px] font-semibold py-0.5">
                  {matchLabel}
                </Badge>
                <Badge variant="outline" className="text-[11px] text-slate-600 bg-slate-50">
                  {career?.industry}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-navy-950 hover:text-teal-700 transition-colors">
                <Link to={`/dashboard/careers?career=${career?.slug}`}>{career?.title}</Link>
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 max-w-xl">
                {career?.summary}
              </p>
            </div>
          </div>

          {/* Compatibility Score Pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0">
            <div
              className={`px-3 py-1.5 rounded-xl border font-mono font-extrabold text-lg sm:text-xl flex items-center gap-1.5 ${scoreColorClass}`}
            >
              <span>{overall_score}%</span>
              <span className="text-[10px] font-normal uppercase tracking-wider text-slate-500">Fit</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Rank #{rank} of 20</span>
          </div>
        </div>

        {/* 4 Pillars Contribution Bars */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Skills */}
          <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Wrench className="h-3 w-3 text-teal-600" />
                Skills (40%)
              </span>
              <span className="font-mono font-bold text-navy-950">{skills_score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${skills_score}%` }}
              />
            </div>
          </div>

          {/* Interests */}
          <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Compass className="h-3 w-3 text-indigo-600" />
                Interests (30%)
              </span>
              <span className="font-mono font-bold text-navy-950">{interests_score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${interests_score}%` }}
              />
            </div>
          </div>

          {/* Academics */}
          <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <GraduationCap className="h-3 w-3 text-blue-600" />
                Academics (20%)
              </span>
              <span className="font-mono font-bold text-navy-950">{academics_score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${academics_score}%` }}
              />
            </div>
          </div>

          {/* Personality */}
          <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Award className="h-3 w-3 text-amber-600" />
                Personality (10%)
              </span>
              <span className="font-mono font-bold text-navy-950">{personality_score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${personality_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Competencies Snapshot & Gaps */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {matchingSkills.length > 0 && (
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>{matchingSkills.length}</strong> skills aligned: {matchingSkills.slice(0, 2).map((s) => s.name).join(', ')}
              </span>
            </div>
          )}

          {missingSkills.length > 0 ? (
            <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>{missingSkills.length}</strong> prerequisite gaps to close
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-teal-800 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
              <span>All required skills satisfied</span>
            </div>
          )}

          <span className="text-[11px] text-slate-400 ml-auto hidden sm:inline">
            {career?.salary_range_illustrative}
          </span>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExplain(recommendation)}
            className="text-xs text-teal-700 hover:text-teal-800 hover:bg-teal-50/80 gap-1.5 font-semibold px-2.5 h-8"
          >
            <HelpCircle className="h-3.5 w-3.5 text-teal-600" />
            Explain Score Formula &amp; Math
          </Button>

          <div className="flex items-center gap-2 ml-auto">
            <Link to={`/dashboard/skill-gap?career=${career?.slug}`}>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-slate-700 border-slate-200 hover:border-slate-300 h-8 gap-1"
              >
                Analyze Skill Gaps
              </Button>
            </Link>

            <Link to={`/dashboard/careers?career=${career?.slug}`}>
              <Button
                size="sm"
                className="text-xs bg-navy-950 hover:bg-navy-900 text-white h-8 gap-1 shadow-sm"
              >
                Career Profile
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
