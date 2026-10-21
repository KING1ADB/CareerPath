import { AcademicsAssessment } from '@/components/assessment/AcademicsAssessment';
import { InterestsAssessment } from '@/components/assessment/InterestsAssessment';
import { QuestionnaireAssessment } from '@/components/assessment/QuestionnaireAssessment';
import { SkillsAssessment } from '@/components/assessment/SkillsAssessment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { assessmentService } from '@/services/assessmentService';
import { recommendationEngine } from '@/services/recommendationEngine';
import { taxonomyService } from '@/services/taxonomyService';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileCheck,
  HeartHandshake,
  Layers,
  Loader2,
  Lock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AssessmentWizardProps {
  profileId: string;
}

type PillarTab = 'skills' | 'interests' | 'academics' | 'questionnaire';

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ profileId }) => {
  const [activeTab, setActiveTab] = useState<PillarTab>('skills');
  const [ratedSkillsCount, setRatedSkillsCount] = useState(0);
  const [ratedInterestsCount, setRatedInterestsCount] = useState(0);
  const [ratedAcademicsCount, setRatedAcademicsCount] = useState(0);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [completionNotice, setCompletionNotice] = useState<string | null>(null);
  const navigate = useNavigate();

  const refreshCounts = async () => {
    try {
      const [skills, interests, academics, activeAss, questions] = await Promise.all([
        assessmentService.getStudentSkills(profileId),
        assessmentService.getStudentInterests(profileId),
        assessmentService.getStudentAcademicStrengths(profileId),
        assessmentService.getOrCreateAssessment(profileId),
        taxonomyService.getQuestions(),
      ]);

      setRatedSkillsCount(skills.length);
      setRatedInterestsCount(interests.length);
      setRatedAcademicsCount(academics.length);
      setAssessmentId(activeAss.id);
      setTotalQuestions(questions.length);

      const answers = await assessmentService.getAnswers(activeAss.id);
      setAnsweredQuestionsCount(answers.length);
    } catch (err) {
      console.error('Error refreshing counts:', err);
    }
  };

  useEffect(() => {
    refreshCounts();
  }, [profileId]);

  const handleFinalize = async () => {
    if (!assessmentId) return;
    setIsFinalizing(true);
    try {
      await assessmentService.completeAssessment(assessmentId, profileId);
      await recommendationEngine.calculateRecommendations(profileId, assessmentId);
      setCompletionNotice('Assessment finalized, snapshots frozen, and recommendations calculated!');
      setTimeout(() => {
        navigate('/dashboard/recommendations');
      }, 1000);
    } catch (err: any) {
      alert(err.message || 'Failed to finalize assessment');
    } finally {
      setIsFinalizing(false);
    }
  };

  const isSkillsReady = ratedSkillsCount >= 3;
  const isInterestsReady = ratedInterestsCount >= 2;
  const isAcademicsReady = ratedAcademicsCount >= 2;
  const isQuestionnaireReady = answeredQuestionsCount >= 3;
  const isAllReady = isSkillsReady && isInterestsReady && isAcademicsReady && isQuestionnaireReady;

  return (
    <div className="space-y-6">
      {/* Assessment Four Pillars Tab Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'skills'
              ? 'border-teal-600 bg-white shadow-md ring-2 ring-teal-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-teal-700">Pillar 1 • 40%</span>
            {isSkillsReady ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            )}
          </div>
          <h4 className="text-sm font-bold text-navy-950">Skills Inventory</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">{ratedSkillsCount} evaluated</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('interests')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'interests'
              ? 'border-teal-600 bg-white shadow-md ring-2 ring-teal-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-teal-700">Pillar 2 • 30%</span>
            {isInterestsReady ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            )}
          </div>
          <h4 className="text-sm font-bold text-navy-950">RIASEC Interests</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">{ratedInterestsCount} selected</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('academics')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'academics'
              ? 'border-teal-600 bg-white shadow-md ring-2 ring-teal-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-teal-700">Pillar 3 • 20%</span>
            {isAcademicsReady ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            )}
          </div>
          <h4 className="text-sm font-bold text-navy-950">Academic Strengths</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">{ratedAcademicsCount} graded</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('questionnaire')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'questionnaire'
              ? 'border-teal-600 bg-white shadow-md ring-2 ring-teal-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-semibold text-teal-700">Pillar 4 • 10%</span>
            {isQuestionnaireReady ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            )}
          </div>
          <h4 className="text-sm font-bold text-navy-950">Work Personality</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">{answeredQuestionsCount}/{totalQuestions} questions</p>
        </button>
      </div>

      {/* Completion Banner */}
      {completionNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <div className="text-sm font-medium">
            {completionNotice} Redirecting to your calculated career recommendations...
          </div>
        </div>
      )}

      {/* Active Pillar Tab View */}
      <div className="animate-fade-in">
        {activeTab === 'skills' && (
          <SkillsAssessment profileId={profileId} onSkillUpdated={refreshCounts} />
        )}
        {activeTab === 'interests' && (
          <InterestsAssessment profileId={profileId} onInterestUpdated={refreshCounts} />
        )}
        {activeTab === 'academics' && (
          <AcademicsAssessment profileId={profileId} onAcademicsUpdated={refreshCounts} />
        )}
        {activeTab === 'questionnaire' && (
          <QuestionnaireAssessment profileId={profileId} onAnswered={refreshCounts} />
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-navy-950">Assessment Readiness</h4>
          <p className="text-xs text-slate-500">
            {isAllReady
              ? 'All 4 pillars meet minimum recommendation requirements. Ready to finalize.'
              : 'Please complete ratings across skills (min 3), interests (min 2), academics (min 2), and questions (min 3).'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            disabled={!isAllReady || isFinalizing}
            onClick={handleFinalize}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md gap-2"
          >
            {isFinalizing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Freezing Snapshots...
              </>
            ) : (
              <>
                <FileCheck className="h-4 w-4" />
                Finalize &amp; Lock Assessment Snapshots
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
