import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type {
  Assessment,
  AssessmentAnswer,
  Career,
  Course,
  Profile,
  Question,
  Recommendation,
  RecommendationExplanation,
  RecommendationWeightsConfig,
  SkillGapItem,
  StudentAcademicStrength,
  StudentInterest,
  StudentSkill,
} from '@/types';
import { assessmentService } from './assessmentService';
import { careerService, SEED_CAREERS } from './careerService';
import { taxonomyService } from './taxonomyService';

const sb = supabase as any;

const STORAGE_KEYS = {
  RECOMMENDATIONS: 'careerpath_recommendations',
  EXPLANATIONS: 'careerpath_recommendation_explanations',
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write local key ${key}:`, e);
  }
}

export const DEFAULT_WEIGHTS: RecommendationWeightsConfig = {
  skills: 0.40,
  interests: 0.30,
  academics: 0.20,
  personality: 0.10,
};

export interface PillarBreakdown {
  skillsScore: number; // 0 - 100
  interestsScore: number; // 0 - 100
  academicsScore: number; // 0 - 100
  personalityScore: number; // 0 - 100
  overallScore: number; // 0 - 100
  matchingSkills: Array<{ skill_id: string; name: string; match_percentage: number; weight: number }>;
  missingSkills: SkillGapItem[];
  matchingInterests: Array<{ interest_id: string; name: string; match_percentage: number }>;
  matchingAcademics: Array<{ academic_id: string; name: string; match_percentage: number }>;
  explanationText: string;
}

/**
 * 1. Skills Match Score (0 - 100 scale)
 * Formula: S = (sum(weight_k * min(1, p_k / r_k)) / sum(weight_k)) * 100
 */
export function calculateSkillsMatch(
  career: Career,
  studentSkills: StudentSkill[]
): {
  score: number;
  matching: Array<{ skill_id: string; name: string; match_percentage: number; weight: number }>;
  gaps: SkillGapItem[];
} {
  const reqs = career.career_skills || [];
  if (reqs.length === 0) {
    return { score: 70, matching: [], gaps: [] };
  }

  let totalWeight = 0;
  let weightedProgress = 0;
  const matching: Array<{ skill_id: string; name: string; match_percentage: number; weight: number }> = [];
  const gaps: SkillGapItem[] = [];

  for (const req of reqs) {
    const weight = Number(req.importance_weight) || 1.0;
    const requiredProficiency = req.required_proficiency || 3;
    totalWeight += weight;

    // Student skill evaluation
    const studentItem = studentSkills.find((s) => s.skill_id === req.skill_id);
    const studentProficiency = studentItem ? studentItem.proficiency_level : 0;
    const skillName = req.skill?.name || studentItem?.skill?.name || 'Skill';

    const ratio = Math.min(1.0, studentProficiency / requiredProficiency);
    weightedProgress += weight * ratio;

    const matchPercentage = Math.round(ratio * 100);

    if (studentProficiency > 0) {
      matching.push({
        skill_id: req.skill_id,
        name: skillName,
        match_percentage: matchPercentage,
        weight,
      });
    }

    if (studentProficiency < requiredProficiency) {
      gaps.push({
        skill_id: req.skill_id,
        skill_name: skillName,
        student_level: studentProficiency,
        required_level: requiredProficiency,
        gap: requiredProficiency - studentProficiency,
        is_required: req.is_required,
        weight,
      });
    }
  }

  const score = totalWeight > 0 ? Number(((weightedProgress / totalWeight) * 100).toFixed(2)) : 0;
  return { score, matching, gaps };
}

/**
 * 2. Interests Match Score (0 - 100 scale)
 * Formula: I = (sum(weight_j * (i_j / 5)) / sum(weight_j)) * 100
 */
export function calculateInterestsMatch(
  career: Career,
  studentInterests: StudentInterest[]
): {
  score: number;
  matching: Array<{ interest_id: string; name: string; match_percentage: number }>;
} {
  const reqs = career.career_interests || [];
  if (reqs.length === 0) {
    return { score: 60, matching: [] };
  }

  let totalWeight = 0;
  let weightedProgress = 0;
  const matching: Array<{ interest_id: string; name: string; match_percentage: number }> = [];

  for (const req of reqs) {
    const weight = Number(req.weight) || 1.0;
    totalWeight += weight;

    const studentItem = studentInterests.find((i) => i.interest_id === req.interest_id);
    const level = studentItem ? studentItem.interest_level : 0;
    const interestName = req.interest?.name || studentItem?.interest?.name || 'Interest Area';

    const ratio = level / 5.0;
    weightedProgress += weight * ratio;

    if (level > 0) {
      matching.push({
        interest_id: req.interest_id,
        name: interestName,
        match_percentage: Math.round(ratio * 100),
      });
    }
  }

  const score = totalWeight > 0 ? Number(((weightedProgress / totalWeight) * 100).toFixed(2)) : 0;
  return { score, matching };
}

/**
 * 3. Academics Match Score (0 - 100 scale)
 * Formula: A = (sum(weight_m * (g_m / 5)) / sum(weight_m)) * 100
 */
export function calculateAcademicsMatch(
  career: Career,
  studentAcademics: StudentAcademicStrength[]
): {
  score: number;
  matching: Array<{ academic_id: string; name: string; match_percentage: number }>;
} {
  const reqs = career.career_academic_strengths || [];
  if (reqs.length === 0) {
    return { score: 65, matching: [] };
  }

  let totalWeight = 0;
  let weightedProgress = 0;
  const matching: Array<{ academic_id: string; name: string; match_percentage: number }> = [];

  for (const req of reqs) {
    const weight = Number(req.weight) || 1.0;
    totalWeight += weight;

    const studentItem = studentAcademics.find((a) => a.academic_strength_id === req.academic_strength_id);
    const grade = studentItem ? studentItem.grade_or_rating : 0;
    const academicName = req.academic_strength?.name || studentItem?.academic_strength?.name || 'Academic Discipline';

    const ratio = grade / 5.0;
    weightedProgress += weight * ratio;

    if (grade > 0) {
      matching.push({
        academic_id: req.academic_strength_id,
        name: academicName,
        match_percentage: Math.round(ratio * 100),
      });
    }
  }

  const score = totalWeight > 0 ? Number(((weightedProgress / totalWeight) * 100).toFixed(2)) : 0;
  return { score, matching };
}

/**
 * 4. Personality & Work Style Match Score (0 - 100 scale)
 * Maps student questionnaire answers (chosen options) to the career's primary RIASEC themes.
 */
export function calculatePersonalityMatch(
  career: Career,
  answers: AssessmentAnswer[],
  questions: Question[]
): number {
  if (answers.length === 0) {
    return 60.0; // Default neutral baseline when unanswered
  }

  // Collect career's RIASEC themes
  const careerThemes = new Set<string>();
  if (career.career_interests) {
    for (const ci of career.career_interests) {
      if (ci.interest?.category) {
        careerThemes.add(ci.interest.category.toLowerCase());
      }
    }
  }

  // Fallback defaults by industry if interests category missing
  if (careerThemes.size === 0) {
    if (career.industry.includes('Technology') || career.industry.includes('Engineering')) {
      careerThemes.add('investigative');
      careerThemes.add('realistic');
    } else if (career.industry.includes('Finance') || career.industry.includes('Business')) {
      careerThemes.add('enterprising');
      careerThemes.add('conventional');
    } else if (career.industry.includes('Creative')) {
      careerThemes.add('artistic');
    } else if (career.industry.includes('Healthcare') || career.industry.includes('Education')) {
      careerThemes.add('social');
    } else if (career.industry.includes('Law')) {
      careerThemes.add('investigative');
      careerThemes.add('enterprising');
    }
  }

  let matchPoints = 0;
  let totalEvaluated = 0;

  for (const ans of answers) {
    const question = questions.find((q) => q.id === ans.question_id);
    const selectedOption = question?.options?.find((opt) => opt.id === ans.question_option_id);
    totalEvaluated += 1;

    if (selectedOption?.trait_key) {
      const trait = selectedOption.trait_key.toLowerCase();
      if (careerThemes.has(trait)) {
        matchPoints += 1.0;
      } else {
        // Minor partial alignment credit (0.35) for complementary themes
        matchPoints += 0.35;
      }
    } else {
      matchPoints += 0.5;
    }
  }

  const score = totalEvaluated > 0 ? (matchPoints / totalEvaluated) * 100 : 60;
  return Number(Math.min(100, Math.max(0, score)).toFixed(2));
}

/**
 * 5. Overall Deterministic Score Calculation
 * Score = 0.40S + 0.30I + 0.20A + 0.10P
 */
export function calculateOverallScore(
  scores: {
    skillsScore: number;
    interestsScore: number;
    academicsScore: number;
    personalityScore: number;
  },
  weights: RecommendationWeightsConfig = DEFAULT_WEIGHTS
): number {
  const overall =
    weights.skills * scores.skillsScore +
    weights.interests * scores.interestsScore +
    weights.academics * scores.academicsScore +
    weights.personality * scores.personalityScore;

  return Number(Math.min(100, Math.max(0, overall)).toFixed(2));
}

/**
 * 6. Explainability Narrative Generator
 */
export function generateExplanationText(
  career: Career,
  scores: {
    skillsScore: number;
    interestsScore: number;
    academicsScore: number;
    personalityScore: number;
    overallScore: number;
  },
  matchingSkills: Array<{ name: string; match_percentage: number }>,
  matchingInterests: Array<{ name: string }>,
  missingSkills: SkillGapItem[]
): string {
  const topSkills = matchingSkills.slice(0, 3).map((s) => s.name).join(', ');
  const topInterests = matchingInterests.slice(0, 2).map((i) => i.name).join(' and ');
  const criticalGaps = missingSkills.filter((g) => g.is_required).slice(0, 2);

  let tone = 'Exceptional alignment';
  if (scores.overallScore < 70) tone = 'Promising foundational alignment';
  else if (scores.overallScore < 85) tone = 'Strong operational alignment';

  let explanation = `${tone} (${scores.overallScore}% compatibility). `;

  if (topSkills) {
    explanation += `Your demonstrated proficiencies in ${topSkills} meet key industry requirements for this role (Skills: ${scores.skillsScore}%). `;
  } else {
    explanation += `Your general problem-solving aptitude provides a viable baseline (Skills: ${scores.skillsScore}%). `;
  }

  if (topInterests) {
    explanation += `Your strong RIASEC affinity for ${topInterests} indicates high long-term career satisfaction (Interests: ${scores.interestsScore}%). `;
  }

  if (criticalGaps.length > 0) {
    const gapList = criticalGaps.map((g) => `${g.skill_name} (+${g.gap} level)`).join(', ');
    explanation += `To achieve peak readiness, prioritize developing required skills in: ${gapList}.`;
  } else if (missingSkills.length === 0) {
    explanation += `You possess full coverage across all requisite competencies for entry-level placement.`;
  }

  return explanation;
}

export const recommendationEngine = {
  /**
   * Evaluates all active careers for a student assessment and returns sorted recommendations
   */
  async calculateRecommendations(
    profileId: string,
    assessmentId: string,
    weights: RecommendationWeightsConfig = DEFAULT_WEIGHTS
  ): Promise<Recommendation[]> {
    // 1. Load inputs
    const [careers, studentSkills, studentInterests, studentAcademics, answers, questions] =
      await Promise.all([
        careerService.getCareers(),
        assessmentService.getStudentSkills(profileId),
        assessmentService.getStudentInterests(profileId),
        assessmentService.getStudentAcademicStrengths(profileId),
        assessmentService.getAnswers(assessmentId),
        taxonomyService.getQuestions(),
      ]);

    // 2. Compute individual pillar metrics for all active careers
    const calculatedList: Array<{
      career: Career;
      overallScore: number;
      skillsScore: number;
      interestsScore: number;
      academicsScore: number;
      personalityScore: number;
      breakdown: PillarBreakdown;
    }> = [];

    for (const career of careers) {
      const skillsResult = calculateSkillsMatch(career, studentSkills);
      const interestsResult = calculateInterestsMatch(career, studentInterests);
      const academicsResult = calculateAcademicsMatch(career, studentAcademics);
      const personalityScore = calculatePersonalityMatch(career, answers, questions);

      const overallScore = calculateOverallScore(
        {
          skillsScore: skillsResult.score,
          interestsScore: interestsResult.score,
          academicsScore: academicsResult.score,
          personalityScore,
        },
        weights
      );

      const explanationText = generateExplanationText(
        career,
        {
          skillsScore: skillsResult.score,
          interestsScore: interestsResult.score,
          academicsScore: academicsResult.score,
          personalityScore,
          overallScore,
        },
        skillsResult.matching,
        interestsResult.matching,
        skillsResult.gaps
      );

      calculatedList.push({
        career,
        overallScore,
        skillsScore: skillsResult.score,
        interestsScore: interestsResult.score,
        academicsScore: academicsResult.score,
        personalityScore,
        breakdown: {
          skillsScore: skillsResult.score,
          interestsScore: interestsResult.score,
          academicsScore: academicsResult.score,
          personalityScore,
          overallScore,
          matchingSkills: skillsResult.matching,
          missingSkills: skillsResult.gaps,
          matchingInterests: interestsResult.matching,
          matchingAcademics: academicsResult.matching,
          explanationText,
        },
      });
    }

    // 3. Deterministic Ranking Sort
    // Order: overallScore DESC, then skillsScore DESC, then interestsScore DESC, then title ASC
    calculatedList.sort((a, b) => {
      if (b.overallScore !== a.overallScore) return b.overallScore - a.overallScore;
      if (b.skillsScore !== a.skillsScore) return b.skillsScore - a.skillsScore;
      if (b.interestsScore !== a.interestsScore) return b.interestsScore - a.interestsScore;
      return a.career.title.localeCompare(b.career.title);
    });

    // 4. Formulate Recommendation and Explanation models
    const recommendations: Recommendation[] = [];

    for (let i = 0; i < calculatedList.length; i++) {
      const item = calculatedList[i];
      const rank = i + 1;
      const recId = `rec-${assessmentId.slice(0, 8)}-${item.career.slug}`;
      const expId = `exp-${recId}`;

      const explanation: RecommendationExplanation = {
        id: expId,
        recommendation_id: recId,
        explanation_text: item.breakdown.explanationText,
        matching_skills: item.breakdown.matchingSkills,
        matching_interests: item.breakdown.matchingInterests,
        matching_academics: item.breakdown.matchingAcademics,
        missing_skills: item.breakdown.missingSkills,
        created_at: new Date().toISOString(),
      };

      recommendations.push({
        id: recId,
        assessment_id: assessmentId,
        profile_id: profileId,
        career_id: item.career.id,
        overall_score: item.overallScore,
        rank,
        skills_score: item.skillsScore,
        interests_score: item.interestsScore,
        academics_score: item.academicsScore,
        personality_score: item.personalityScore,
        created_at: new Date().toISOString(),
        career: item.career,
        explanation,
      });
    }

    // 5. Persist
    await this.persistRecommendations(assessmentId, profileId, recommendations);

    return recommendations;
  },

  /**
   * Persists recommendations to PostgreSQL via Supabase or localStorage fallback
   */
  async persistRecommendations(
    assessmentId: string,
    profileId: string,
    recommendations: Recommendation[]
  ): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        // Upsert recommendations
        const recPayloads = recommendations.map((r) => ({
          assessment_id: assessmentId,
          profile_id: profileId,
          career_id: r.career_id,
          overall_score: r.overall_score,
          rank: r.rank,
          skills_score: r.skills_score,
          interests_score: r.interests_score,
          academics_score: r.academics_score,
          personality_score: r.personality_score,
        }));

        const { data: insertedRecs, error: recError } = await sb
          .from('recommendations')
          .upsert(recPayloads, { onConflict: 'assessment_id,career_id' })
          .select();

        if (recError) {
          console.warn('Supabase upsert recommendations error, using local fallback:', recError);
        } else if (insertedRecs) {
          // Upsert explanations
          const expPayloads = insertedRecs.map((recRow: any) => {
            const match = recommendations.find((r) => r.career_id === recRow.career_id);
            return {
              recommendation_id: recRow.id,
              explanation_text: match?.explanation?.explanation_text || '',
              matching_skills: match?.explanation?.matching_skills || [],
              matching_interests: match?.explanation?.matching_interests || [],
              matching_academics: match?.explanation?.matching_academics || [],
              missing_skills: match?.explanation?.missing_skills || [],
            };
          });

          await sb
            .from('recommendation_explanations')
            .upsert(expPayloads, { onConflict: 'recommendation_id' });
        }
      } catch (err) {
        console.warn('Persistence exception, falling back to local storage:', err);
      }
    }

    // Local sandbox persistence
    const allRecs = getLocal<Recommendation[]>(STORAGE_KEYS.RECOMMENDATIONS, []);
    const otherRecs = allRecs.filter((r) => r.assessment_id !== assessmentId);
    setLocal(STORAGE_KEYS.RECOMMENDATIONS, [...otherRecs, ...recommendations]);
  },

  /**
   * Retrieves recommendations for an assessment
   */
  async getRecommendations(assessmentId: string): Promise<Recommendation[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await sb
          .from('recommendations')
          .select(`
            *,
            career:careers(
              *,
              career_skills(*, skill:skills(*)),
              career_interests(*, interest:interests(*)),
              career_academic_strengths(*, academic_strength:academic_strengths(*))
            ),
            explanation:recommendation_explanations(*)
          `)
          .eq('assessment_id', assessmentId)
          .order('rank');

        if (!error && data && data.length > 0) {
          return data as Recommendation[];
        }
      } catch (e) {
        console.warn('Failed to fetch from supabase, fallback to local:', e);
      }
    }

    const allRecs = getLocal<Recommendation[]>(STORAGE_KEYS.RECOMMENDATIONS, []);
    const filtered = allRecs.filter((r) => r.assessment_id === assessmentId);
    filtered.sort((a, b) => a.rank - b.rank);
    return filtered;
  },

  /**
   * Gets or calculates latest recommendations for a student profile
   */
  async getLatestRecommendations(profileId: string): Promise<{
    assessment: Assessment | null;
    recommendations: Recommendation[];
  }> {
    const active = await assessmentService.getActiveAssessment(profileId);
    if (!active) {
      return { assessment: null, recommendations: [] };
    }

    let recs = await this.getRecommendations(active.id);

    // If no recommendations exist yet for this active/completed assessment, compute them
    if (recs.length === 0) {
      recs = await this.calculateRecommendations(profileId, active.id);
    }

    return { assessment: active, recommendations: recs };
  },
};
