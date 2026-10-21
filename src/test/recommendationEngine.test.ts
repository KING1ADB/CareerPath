import {
  calculateAcademicsMatch,
  calculateInterestsMatch,
  calculateOverallScore,
  calculatePersonalityMatch,
  calculateSkillsMatch,
  DEFAULT_WEIGHTS,
  generateExplanationText,
  recommendationEngine,
} from '@/services/recommendationEngine';
import { SEED_CAREERS } from '@/services/careerService';
import type { AssessmentAnswer, Career, Question, StudentAcademicStrength, StudentInterest, StudentSkill } from '@/types';
import { describe, expect, it } from 'vitest';

describe('Phase 3: Recommendation Engine Mathematical Correctness', () => {
  const softwareEngineer = SEED_CAREERS.find((c) => c.slug === 'software-engineer')!;

  describe('1. Skills Match Score (Pillar S, 40%)', () => {
    it('returns 100% and zero gaps when student meets or exceeds all required proficiencies', () => {
      const studentSkills: StudentSkill[] = [
        { id: '1', profile_id: 'p1', skill_id: 'sk-02', proficiency_level: 5, created_at: '' }, // req 4
        { id: '2', profile_id: 'p1', skill_id: 'sk-01', proficiency_level: 4, created_at: '' }, // req 3
        { id: '3', profile_id: 'p1', skill_id: 'sk-03', proficiency_level: 5, created_at: '' }, // req 3
        { id: '4', profile_id: 'p1', skill_id: 'sk-04', proficiency_level: 3, created_at: '' }, // req 3
        { id: '5', profile_id: 'p1', skill_id: 'sk-20', proficiency_level: 3, created_at: '' }, // req 3
      ];

      const result = calculateSkillsMatch(softwareEngineer, studentSkills);
      expect(result.score).toBe(100);
      expect(result.gaps.length).toBe(0);
      expect(result.matching.length).toBe(5);
    });

    it('returns 0% and flags all career skills as gaps when student has no evaluated skills', () => {
      const studentSkills: StudentSkill[] = [];
      const result = calculateSkillsMatch(softwareEngineer, studentSkills);

      expect(result.score).toBe(0);
      expect(result.matching.length).toBe(0);
      expect(result.gaps.length).toBe(softwareEngineer.career_skills!.length);
      expect(result.gaps[0].gap).toBeGreaterThan(0);
    });

    it('accurately computes proportional partial match when proficiencies are partially met', () => {
      // Software engineer skills:
      // sk-02 (weight 1.0, req 4) -> student 2 -> ratio 0.5 (wt contribution 0.5)
      // sk-01 (weight 0.9, req 3) -> student 3 -> ratio 1.0 (wt contribution 0.9)
      // Others not rated (0)
      const studentSkills: StudentSkill[] = [
        { id: '1', profile_id: 'p1', skill_id: 'sk-02', proficiency_level: 2, created_at: '' },
        { id: '2', profile_id: 'p1', skill_id: 'sk-01', proficiency_level: 3, created_at: '' },
      ];

      const result = calculateSkillsMatch(softwareEngineer, studentSkills);
      const totalWeight = softwareEngineer.career_skills!.reduce((acc, s) => acc + Number(s.importance_weight), 0);
      const expectedScore = Number((((1.0 * 0.5 + 0.9 * 1.0) / totalWeight) * 100).toFixed(2));

      expect(result.score).toBe(expectedScore);
      expect(result.gaps.find((g) => g.skill_id === 'sk-02')?.gap).toBe(2);
    });
  });

  describe('2. RIASEC Interests Match Score (Pillar I, 30%)', () => {
    it('returns 100% when student rates matching RIASEC interests at 5/5', () => {
      const studentInterests: StudentInterest[] = [
        { id: '1', profile_id: 'p1', interest_id: 'int-01', interest_level: 5, created_at: '' },
        { id: '2', profile_id: 'p1', interest_id: 'int-03', interest_level: 5, created_at: '' },
      ];

      const result = calculateInterestsMatch(softwareEngineer, studentInterests);
      expect(result.score).toBe(100);
      expect(result.matching.length).toBe(2);
    });

    it('returns normalized fractional score when student rates interests at 3/5', () => {
      const studentInterests: StudentInterest[] = [
        { id: '1', profile_id: 'p1', interest_id: 'int-01', interest_level: 3, created_at: '' },
        { id: '2', profile_id: 'p1', interest_id: 'int-03', interest_level: 3, created_at: '' },
      ];

      const result = calculateInterestsMatch(softwareEngineer, studentInterests);
      expect(result.score).toBe(60); // 3/5 = 60%
    });
  });

  describe('3. Academic Disciplines Match Score (Pillar A, 20%)', () => {
    it('returns 100% when student earns top marks (5/5) in required academic subjects', () => {
      const studentAcademics: StudentAcademicStrength[] = [
        { id: '1', profile_id: 'p1', academic_strength_id: 'acad-02', grade_or_rating: 5, created_at: '' },
        { id: '2', profile_id: 'p1', academic_strength_id: 'acad-01', grade_or_rating: 5, created_at: '' },
      ];

      const result = calculateAcademicsMatch(softwareEngineer, studentAcademics);
      expect(result.score).toBe(100);
    });

    it('returns 0% when student has not graded relevant academic subjects', () => {
      const studentAcademics: StudentAcademicStrength[] = [];
      const result = calculateAcademicsMatch(softwareEngineer, studentAcademics);
      expect(result.score).toBe(0);
    });
  });

  describe('4. Personality & Work Style Match Score (Pillar P, 10%)', () => {
    it('awards high score when student responses align with career RIASEC themes', () => {
      const questions: Question[] = [
        {
          id: 'q-01',
          code: 'Q01',
          text: '',
          category: 'work_style',
          order_index: 1,
          is_active: true,
          created_at: '',
          options: [
            { id: 'opt-1', question_id: 'q-01', option_text: '', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: '' },
          ],
        },
      ];

      const answers: AssessmentAnswer[] = [
        { id: 'ans-1', assessment_id: 'ass-1', question_id: 'q-01', question_option_id: 'opt-1', value: 5, created_at: '' },
      ];

      const score = calculatePersonalityMatch(softwareEngineer, answers, questions);
      expect(score).toBe(100);
    });
  });

  describe('5. Overall Deterministic Formula: 0.40S + 0.30I + 0.20A + 0.10P', () => {
    it('calculates the exact mathematical weighted sum without floating point drift', () => {
      const scores = {
        skillsScore: 90.0,
        interestsScore: 80.0,
        academicsScore: 70.0,
        personalityScore: 60.0,
      };

      // 0.40 * 90 = 36.00
      // 0.30 * 80 = 24.00
      // 0.20 * 70 = 14.00
      // 0.10 * 60 = 6.00
      // Total = 80.00
      const overall = calculateOverallScore(scores, DEFAULT_WEIGHTS);
      expect(overall).toBe(80.0);
    });

    it('enforces 0 boundary if all scores are 0', () => {
      const scores = { skillsScore: 0, interestsScore: 0, academicsScore: 0, personalityScore: 0 };
      expect(calculateOverallScore(scores)).toBe(0);
    });

    it('enforces 100 boundary if all scores are 100', () => {
      const scores = { skillsScore: 100, interestsScore: 100, academicsScore: 100, personalityScore: 100 };
      expect(calculateOverallScore(scores)).toBe(100);
    });
  });

  describe('6. Full Recommendation Engine Pipeline & Ranking Integrity', () => {
    it('evaluates all 20 careers, orders them strictly by descending overall score, and assigns ranks 1..20', async () => {
      const profileId = 'test-student-prof-1';
      const assessmentId = 'test-assessment-id-1';

      const recs = await recommendationEngine.calculateRecommendations(profileId, assessmentId);

      expect(recs.length).toBe(20);

      // Verify rank sequence 1 to 20
      for (let i = 0; i < recs.length; i++) {
        expect(recs[i].rank).toBe(i + 1);
        if (i > 0) {
          expect(recs[i - 1].overall_score).toBeGreaterThanOrEqual(recs[i].overall_score);
        }
      }

      // Verify every recommendation has an explanation and career attached
      const topRec = recs[0];
      expect(topRec.career).toBeDefined();
      expect(topRec.explanation).toBeDefined();
      expect(topRec.explanation?.explanation_text.length).toBeGreaterThan(20);
    });

    it('is strictly deterministic: consecutive calculations with identical student inputs yield identical results', async () => {
      const profileId = 'test-student-prof-det';
      const assessmentId = 'test-assessment-id-det';

      const run1 = await recommendationEngine.calculateRecommendations(profileId, assessmentId);
      const run2 = await recommendationEngine.calculateRecommendations(profileId, assessmentId);

      expect(run1.length).toBe(run2.length);
      for (let i = 0; i < run1.length; i++) {
        expect(run1[i].career_id).toBe(run2[i].career_id);
        expect(run1[i].overall_score).toBe(run2[i].overall_score);
        expect(run1[i].rank).toBe(run2[i].rank);
      }
    });
  });

  describe('7. Explainability Generator', () => {
    it('generates coherent, descriptive text highlighting competencies and identifying gaps', () => {
      const text = generateExplanationText(
        softwareEngineer,
        {
          skillsScore: 88,
          interestsScore: 90,
          academicsScore: 85,
          personalityScore: 100,
          overallScore: 89.2,
        },
        [{ name: 'JavaScript / TypeScript', match_percentage: 100 }],
        [{ name: 'Software Architecture & Coding' }],
        [
          {
            skill_id: 'sk-04',
            skill_name: 'Cloud Computing (AWS/GCP/Azure)',
            student_level: 1,
            required_level: 3,
            gap: 2,
            is_required: true,
            weight: 0.8,
          },
        ]
      );

      expect(text).toContain('89.2%');
      expect(text).toContain('JavaScript / TypeScript');
      expect(text).toContain('Software Architecture & Coding');
      expect(text).toContain('Cloud Computing (AWS/GCP/Azure)');
    });
  });
});
