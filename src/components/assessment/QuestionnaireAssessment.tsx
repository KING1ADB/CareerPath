import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { assessmentService } from '@/services/assessmentService';
import { taxonomyService } from '@/services/taxonomyService';
import type { Assessment, AssessmentAnswer, Question, QuestionOption } from '@/types';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface QuestionnaireAssessmentProps {
  profileId: string;
  onAnswered?: () => void;
}

export const QuestionnaireAssessment: React.FC<QuestionnaireAssessmentProps> = ({
  profileId,
  onAnswered,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [loading, setLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [savingQuestionId, setSavingQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [qList, activeAss] = await Promise.all([
          taxonomyService.getQuestions(),
          assessmentService.getOrCreateAssessment(profileId),
        ]);
        setQuestions(qList);
        setAssessment(activeAss);

        const currentAnswers = await assessmentService.getAnswers(activeAss.id);
        const map: Record<string, string> = {};
        currentAnswers.forEach((a) => {
          if (a.question_option_id) {
            map[a.question_id] = a.question_option_id;
          }
        });
        setAnswers(map);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profileId]);

  const handleSelectOption = async (question: Question, option: QuestionOption) => {
    if (!assessment) return;
    setSavingQuestionId(question.id);
    try {
      await assessmentService.saveAnswer(
        assessment.id,
        question.id,
        option.id,
        option.score_value
      );
      setAnswers((prev) => ({ ...prev, [question.id]: option.id }));
      onAnswered?.();

      // Auto advance to next question after small delay
      if (activeQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setActiveQuestionIndex((prev) => prev + 1);
        }, 300);
      }
    } finally {
      setSavingQuestionId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-500">Loading work personality questionnaire...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = Math.round((answeredCount / (questions.length || 1)) * 100);
  const currentQ = questions[activeQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Progress Overview Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-navy-950">Work Personality &amp; Values Assessment</h3>
            <Badge variant="teal" className="text-xs">
              {answeredCount} of {questions.length} Answered
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            10% weighted component. Evaluates collaborative style, cognitive problem solving, and workplace aspirations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48 space-y-1">
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>Progress</span>
            <span className="font-bold text-teal-700">{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Stepper Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(answers[q.id]);
          const isCurrent = idx === activeQuestionIndex;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveQuestionIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                isCurrent
                  ? 'bg-navy-950 text-white shadow-sm'
                  : isAnswered
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Q{idx + 1}</span>
              {isAnswered && <Check className="h-3 w-3 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-mono">
                {currentQ.category.replace('_', ' ')}
              </Badge>
              <span className="text-xs font-medium text-slate-400">
                Question {activeQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <CardTitle className="text-base sm:text-lg text-navy-950 font-semibold leading-relaxed">
              {currentQ.text}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 pt-2">
            {currentQ.options?.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              const isSavingThis = savingQuestionId === currentQ.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSavingThis}
                  onClick={() => handleSelectOption(currentQ, opt)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/70 shadow-sm ring-1 ring-teal-600/30'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${isSelected ? 'font-semibold text-teal-950' : 'text-slate-700'}`}>
                      {opt.option_text}
                    </p>
                    <span className="inline-block text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-mono">
                      Dimension: {opt.trait_key}
                    </span>
                  </div>
                </button>
              );
            })}
          </CardContent>

          {/* Stepper Navigation Buttons */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={activeQuestionIndex === 0}
              onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
              className="text-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous Question
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={activeQuestionIndex === questions.length - 1}
              onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
              className="text-xs"
            >
              Next Question
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
