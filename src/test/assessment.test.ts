import { assessmentService } from '@/services/assessmentService';
import { taxonomyService } from '@/services/taxonomyService';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Assessment & Taxonomy Service (Phase 2)', () => {
  const testProfileId = 'test-student-p2';

  beforeEach(() => {
    localStorage.clear();
  });

  it('loads taxonomy elements across skills, interests, academics, and questionnaire questions', async () => {
    const [skills, interests, academics, questions] = await Promise.all([
      taxonomyService.getSkills(),
      taxonomyService.getInterests(),
      taxonomyService.getAcademicStrengths(),
      taxonomyService.getQuestions(),
    ]);

    expect(skills.length).toBeGreaterThanOrEqual(20);
    expect(interests.length).toBeGreaterThanOrEqual(10);
    expect(academics.length).toBeGreaterThanOrEqual(8);
    expect(questions.length).toBeGreaterThanOrEqual(5);
    expect(questions[0].options?.length).toBeGreaterThanOrEqual(4);
  });

  it('saves and retrieves student skill proficiency ratings', async () => {
    await assessmentService.saveStudentSkill(testProfileId, 'sk-01', 4);
    await assessmentService.saveStudentSkill(testProfileId, 'sk-02', 5);

    const skills = await assessmentService.getStudentSkills(testProfileId);
    expect(skills.length).toBe(2);

    const pySkill = skills.find((s) => s.skill_id === 'sk-01');
    expect(pySkill).toBeDefined();
    expect(pySkill?.proficiency_level).toBe(4);
    expect(pySkill?.skill?.name).toBe('Python Programming');

    // Remove skill
    await assessmentService.removeStudentSkill(testProfileId, 'sk-01');
    const remaining = await assessmentService.getStudentSkills(testProfileId);
    expect(remaining.length).toBe(1);
    expect(remaining[0].skill_id).toBe('sk-02');
  });

  it('saves and retrieves Holland RIASEC student passion ratings', async () => {
    await assessmentService.saveStudentInterest(testProfileId, 'int-01', 5);
    await assessmentService.saveStudentInterest(testProfileId, 'int-04', 4);

    const interests = await assessmentService.getStudentInterests(testProfileId);
    expect(interests.length).toBe(2);

    const archInterest = interests.find((i) => i.interest_id === 'int-01');
    expect(archInterest?.interest_level).toBe(5);
    expect(archInterest?.interest?.category).toBe('investigative');
  });

  it('saves and retrieves student academic discipline mastery tiers', async () => {
    await assessmentService.saveStudentAcademicStrength(testProfileId, 'acad-01', 5);
    await assessmentService.saveStudentAcademicStrength(testProfileId, 'acad-02', 4);

    const academics = await assessmentService.getStudentAcademicStrengths(testProfileId);
    expect(academics.length).toBe(2);

    const calc = academics.find((a) => a.academic_strength_id === 'acad-01');
    expect(calc?.grade_or_rating).toBe(5);
    expect(calc?.academic_strength?.subject_area).toBe('STEM');
  });

  it('creates active assessment, saves questionnaire answers, and freezes snapshot on completion', async () => {
    // 1. Create or get active assessment
    const assessment = await assessmentService.getOrCreateAssessment(testProfileId);
    expect(assessment.status).toBe('in_progress');

    // 2. Rate skills and interests first
    await assessmentService.saveStudentSkill(testProfileId, 'sk-01', 4);
    await assessmentService.saveStudentInterest(testProfileId, 'int-01', 5);
    await assessmentService.saveStudentAcademicStrength(testProfileId, 'acad-01', 5);

    // 3. Save answers to questions
    await assessmentService.saveAnswer(assessment.id, 'q-01', 'opt-01-1', 5);
    await assessmentService.saveAnswer(assessment.id, 'q-02', 'opt-02-1', 5);

    const answers = await assessmentService.getAnswers(assessment.id);
    expect(answers.length).toBe(2);
    expect(answers[0].question_id).toBe('q-01');

    // 4. Complete assessment
    const completed = await assessmentService.completeAssessment(assessment.id, testProfileId);
    expect(completed.status).toBe('completed');
    expect(completed.completed_at).toBeDefined();
  });
});
