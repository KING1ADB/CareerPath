import { ExplainabilityModal } from '@/components/recommendations/ExplainabilityModal';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { recommendationEngine } from '@/services/recommendationEngine';
import type { Assessment, Recommendation } from '@/types';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  Filter,
  GraduationCap,
  HelpCircle,
  Layers,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  SlidersHorizontal,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const INDUSTRIES = [
  'All Industries',
  'Technology',
  'Finance',
  'Business',
  'Healthcare',
  'Engineering',
  'Creative & Design',
  'Law',
  'Education',
];

export const RecommendationsPage: React.FC = () => {
  const { profile } = useAuth();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'skills' | 'interests' | 'academics'>('rank');
  const [modalRec, setModalRec] = useState<Recommendation | null>(null);

  const loadData = async () => {
    if (!profile) return;
    setIsLoading(true);
    try {
      const result = await recommendationEngine.getLatestRecommendations(profile.id);
      setAssessment(result.assessment);
      setRecommendations(result.recommendations);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [profile?.id]);

  const handleRecalculate = async () => {
    if (!profile || !assessment) return;
    setIsRecalculating(true);
    try {
      const fresh = await recommendationEngine.calculateRecommendations(profile.id, assessment.id);
      setRecommendations(fresh);
    } catch (err) {
      console.error('Failed to recalculate recommendations:', err);
    } finally {
      setIsRecalculating(false);
    }
  };

  // Filter & Sort pipeline
  const filteredAndSorted = useMemo(() => {
    return recommendations
      .filter((rec) => {
        const matchesIndustry =
          selectedIndustry === 'All Industries' ||
          rec.career?.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          rec.career?.title.toLowerCase().includes(query) ||
          rec.career?.summary.toLowerCase().includes(query) ||
          rec.career?.industry.toLowerCase().includes(query);

        return matchesIndustry && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'skills') return b.skills_score - a.skills_score;
        if (sortBy === 'interests') return b.interests_score - a.interests_score;
        if (sortBy === 'academics') return b.academics_score - a.academics_score;
        return a.rank - b.rank; // default rank ASC (1 is best)
      });
  }, [recommendations, selectedIndustry, searchQuery, sortBy]);

  const topMatch = recommendations.find((r) => r.rank === 1);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <p className="text-sm text-slate-500 font-medium">
          Executing deterministic recommendation formula...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Career Recommendations
            </h1>
            <Badge variant="teal" className="text-xs py-0.5">
              Rule Set v1.0
            </Badge>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl">
            Ranked through deterministic multi-factor compatibility evaluation: 
            <strong className="text-slate-700 ml-1">40% Skills • 30% Interests • 20% Academics • 10% Personality</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRecalculate}
            disabled={isRecalculating || !assessment}
            className="text-xs text-slate-700 border-slate-300 hover:border-slate-400 gap-1.5 shadow-sm h-9"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRecalculating ? 'animate-spin text-teal-600' : ''}`} />
            {isRecalculating ? 'Recomputing...' : 'Recalculate Fit'}
          </Button>

          <Link to="/dashboard/assessment">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1.5 shadow-sm h-9">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Adjust Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Empty State / Not Assessed Notice */}
      {(!assessment || recommendations.length === 0) && (
        <Card className="border-teal-200 bg-teal-50/50">
          <CardContent className="p-8 text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-bold text-navy-950">No Active Career Evaluation Yet</h3>
              <p className="text-xs text-slate-600 mt-1">
                Complete your 4-pillar assessment (Skills, RIASEC Passion Areas, Academic Strengths, and Work Personality) to generate verified recommendation rankings.
              </p>
            </div>
            <Link to="/dashboard/assessment">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-6 shadow-sm gap-2">
                Launch Assessment Wizard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <>
          {/* Top Recommendation Hero Feature */}
          {topMatch && selectedIndustry === 'All Industries' && !searchQuery && (
            <div className="rounded-2xl border border-teal-300 bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Premier Career Pathway • Rank #1
                    </span>
                    <span className="text-xs text-slate-400">• {topMatch.career?.industry}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {topMatch.career?.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {topMatch.career?.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-teal-400" />
                      {topMatch.career?.education_level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-teal-400" />
                      {topMatch.career?.salary_range_illustrative}
                    </span>
                  </div>
                </div>

                {/* Score Gauge & Action */}
                <div className="flex flex-col sm:items-center md:items-end justify-center gap-3 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                  <div className="text-center md:text-right">
                    <div className="text-4xl sm:text-5xl font-extrabold text-teal-400 font-mono tracking-tight">
                      {topMatch.overall_score}%
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Match Compatibility
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      onClick={() => setModalRec(topMatch)}
                      variant="outline"
                      className="text-xs text-white border-white/20 hover:bg-white/10 bg-transparent h-9 gap-1.5"
                    >
                      <HelpCircle className="h-3.5 w-3.5 text-teal-400" />
                      Explain Math
                    </Button>

                    <Link to={`/dashboard/skill-gap?career=${topMatch.career?.slug}`}>
                      <Button
                        size="sm"
                        className="text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold h-9 gap-1.5 shadow-lg"
                      >
                        Gap Analysis
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter & Search Toolbar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Filter careers by title, industry, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium shrink-0 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                >
                  <option value="rank">Overall Fit (Rank #1 - #20)</option>
                  <option value="skills">Skills Proficiency Score</option>
                  <option value="interests">RIASEC Interests Score</option>
                  <option value="academics">Academic Disciplines Score</option>
                </select>
              </div>
            </div>

            {/* Industry Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedIndustry === ind
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredAndSorted.length}</strong> of {recommendations.length} evaluated career pathways
            </span>
            <span>
              Updated from assessment: <strong className="text-slate-700">{assessment?.id ? `${assessment.id.slice(0, 8)}...` : 'Active'}</strong>
            </span>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredAndSorted.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onExplain={(r) => setModalRec(r)}
              />
            ))}

            {filteredAndSorted.length === 0 && (
              <div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm font-medium">No careers match your search criteria.</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedIndustry('All Industries');
                    setSearchQuery('');
                  }}
                  className="mt-2 text-xs text-teal-600 hover:text-teal-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Explainability Breakdown Modal */}
      <ExplainabilityModal
        recommendation={modalRec}
        isOpen={!!modalRec}
        onClose={() => setModalRec(null)}
      />
    </div>
  );
};
