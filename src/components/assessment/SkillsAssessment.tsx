import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { assessmentService } from '@/services/assessmentService';
import { taxonomyService } from '@/services/taxonomyService';
import type { Skill, SkillCategory, StudentSkill } from '@/types';
import { Check, CheckCircle2, ChevronRight, Filter, Info, Layers, Loader2, RotateCcw, Search, Sparkles, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SkillsAssessmentProps {
  profileId: string;
  onSkillUpdated?: () => void;
}

const PROFICIENCY_LABELS: Record<number, { title: string; desc: string; color: string }> = {
  1: { title: 'Novice', desc: 'Fundamental conceptual awareness', color: 'bg-slate-100 text-slate-800 border-slate-300' },
  2: { title: 'Developing', desc: 'Can apply with routine supervision', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  3: { title: 'Intermediate', desc: 'Independent competency on standard tasks', color: 'bg-teal-50 text-teal-800 border-teal-300' },
  4: { title: 'Advanced', desc: 'Strong mastery & complex problem solving', color: 'bg-indigo-50 text-indigo-800 border-indigo-300' },
  5: { title: 'Expert', desc: 'Architectural leadership & mentorship', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
};

export const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({ profileId, onSkillUpdated }) => {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [studentSkills, setStudentSkills] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [savingSkillId, setSavingSkillId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [skills, rated] = await Promise.all([
          taxonomyService.getSkills(),
          assessmentService.getStudentSkills(profileId),
        ]);
        setAllSkills(skills);
        const map: Record<string, number> = {};
        rated.forEach((r) => {
          map[r.skill_id] = r.proficiency_level;
        });
        setStudentSkills(map);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profileId]);

  const handleRate = async (skillId: string, level: number) => {
    setSavingSkillId(skillId);
    try {
      if (studentSkills[skillId] === level) {
        // Toggle off / remove
        await assessmentService.removeStudentSkill(profileId, skillId);
        setStudentSkills((prev) => {
          const next = { ...prev };
          delete next[skillId];
          return next;
        });
      } else {
        await assessmentService.saveStudentSkill(profileId, skillId, level);
        setStudentSkills((prev) => ({ ...prev, [skillId]: level }));
      }
      onSkillUpdated?.();
    } finally {
      setSavingSkillId(null);
    }
  };

  const filteredSkills = allSkills.filter((sk) => {
    const matchesCat = selectedCategory === 'all' || sk.category === selectedCategory;
    const matchesSearch =
      sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sk.description && sk.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Domains' },
    { id: 'technical', label: 'Technical & Coding' },
    { id: 'analytical', label: 'Analytical & Quantitative' },
    { id: 'business', label: 'Business & Management' },
    { id: 'soft', label: 'Communication & Leadership' },
  ];

  const totalRated = Object.keys(studentSkills).length;

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-500">Loading skill inventory taxonomy...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-navy-950">Skills &amp; Competencies Inventory</h3>
            <Badge variant="teal" className="text-xs">
              {totalRated} of {allSkills.length} Evaluated
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Rate your current proficiency (1-5) across technical, analytical, and leadership competencies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search skills (e.g. Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === c.id
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((sk) => {
          const currentLevel = studentSkills[sk.id];
          const isSaving = savingSkillId === sk.id;
          const levelInfo = currentLevel ? PROFICIENCY_LABELS[currentLevel] : null;

          return (
            <div
              key={sk.id}
              className={`p-4 rounded-xl border transition-all duration-200 bg-white ${
                currentLevel
                  ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h4 className="font-semibold text-sm text-navy-950 flex items-center gap-2">
                    {sk.name}
                    {currentLevel && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                    )}
                  </h4>
                  <Badge variant="outline" className="text-[10px] mt-0.5 capitalize">
                    {sk.category}
                  </Badge>
                </div>

                {levelInfo && (
                  <Badge className={`text-[10px] border ${levelInfo.color}`}>
                    Level {currentLevel}: {levelInfo.title}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-500 mb-3 min-h-[32px] line-clamp-2">
                {sk.description}
              </p>

              {/* 1-5 Rating Selector */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-400 mr-1">Proficiency:</span>
                  {[1, 2, 3, 4, 5].map((level) => {
                    const isSelected = currentLevel === level;
                    const isUnderOrAt = currentLevel && currentLevel >= level;

                    return (
                      <button
                        key={level}
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleRate(sk.id, level)}
                        title={`Level ${level}: ${PROFICIENCY_LABELS[level].title} — ${PROFICIENCY_LABELS[level].desc}`}
                        className={`h-7 w-7 rounded-md flex items-center justify-center text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/30'
                            : isUnderOrAt
                            ? 'bg-teal-100 text-teal-900 hover:bg-teal-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>

                {currentLevel && (
                  <button
                    type="button"
                    onClick={() => handleRate(sk.id, currentLevel)}
                    className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                    title="Clear rating"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          <p className="text-sm font-medium">No skills match the query "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};
