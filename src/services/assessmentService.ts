import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { taxonomyService } from '@/services/taxonomyService';
import type {
  Assessment,
  AssessmentAnswer,
  StudentAcademicStrength,
  StudentInterest,
  StudentSkill,
} from '@/types';

const sb = supabase as any;

const STORAGE_KEYS = {
  SKILLS: 'careerpath_student_skills',
  INTERESTS: 'careerpath_student_interests',
  ACADEMICS: 'careerpath_student_academics',
  ASSESSMENTS: 'careerpath_assessments',
  ANSWERS: 'careerpath_assessment_answers',
};

const getLocal = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const assessmentService = {
  // --------------------------------------------------------------------------
  // 1. STUDENT SKILLS
  // --------------------------------------------------------------------------
  async getStudentSkills(profileId: string): Promise<StudentSkill[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_skills')
        .select('*, skill:skills(*)')
        .eq('profile_id', profileId);

      if (!error && data) return data as StudentSkill[];
    }

    const all = getLocal<StudentSkill[]>(STORAGE_KEYS.SKILLS, []);
    const studentItems = all.filter((s) => s.profile_id === profileId);
    const skills = await taxonomyService.getSkills();

    return studentItems.map((item) => ({
      ...item,
      skill: skills.find((s) => s.id === item.skill_id),
    }));
  },

  async saveStudentSkill(profileId: string, skillId: string, proficiencyLevel: number): Promise<StudentSkill> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_skills')
        .upsert(
          {
            profile_id: profileId,
            skill_id: skillId,
            proficiency_level: proficiencyLevel,
          },
          { onConflict: 'profile_id,skill_id' }
        )
        .select('*, skill:skills(*)')
        .single();

      if (error) throw error;
      return data as StudentSkill;
    }

    const all = getLocal<StudentSkill[]>(STORAGE_KEYS.SKILLS, []);
    const existingIndex = all.findIndex((s) => s.profile_id === profileId && s.skill_id === skillId);
    const skills = await taxonomyService.getSkills();
    const skillObj = skills.find((s) => s.id === skillId);

    const record: StudentSkill = {
      id: existingIndex >= 0 ? all[existingIndex].id : `ssk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      profile_id: profileId,
      skill_id: skillId,
      proficiency_level: proficiencyLevel,
      created_at: existingIndex >= 0 ? all[existingIndex].created_at : new Date().toISOString(),
      skill: skillObj,
    };

    if (existingIndex >= 0) {
      all[existingIndex] = record;
    } else {
      all.push(record);
    }
    setLocal(STORAGE_KEYS.SKILLS, all);
    return record;
  },

  async removeStudentSkill(profileId: string, skillId: string): Promise<void> {
    if (isSupabaseConfigured()) {
      await sb
        .from('student_skills')
        .delete()
        .eq('profile_id', profileId)
        .eq('skill_id', skillId);
      return;
    }

    const all = getLocal<StudentSkill[]>(STORAGE_KEYS.SKILLS, []);
    const filtered = all.filter((s) => !(s.profile_id === profileId && s.skill_id === skillId));
    setLocal(STORAGE_KEYS.SKILLS, filtered);
  },

  // --------------------------------------------------------------------------
  // 2. STUDENT INTERESTS (RIASEC)
  // --------------------------------------------------------------------------
  async getStudentInterests(profileId: string): Promise<StudentInterest[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_interests')
        .select('*, interest:interests(*)')
        .eq('profile_id', profileId);

      if (!error && data) return data as StudentInterest[];
    }

    const all = getLocal<StudentInterest[]>(STORAGE_KEYS.INTERESTS, []);
    const studentItems = all.filter((i) => i.profile_id === profileId);
    const interests = await taxonomyService.getInterests();

    return studentItems.map((item) => ({
      ...item,
      interest: interests.find((int) => int.id === item.interest_id),
    }));
  },

  async saveStudentInterest(profileId: string, interestId: string, interestLevel: number): Promise<StudentInterest> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_interests')
        .upsert(
          {
            profile_id: profileId,
            interest_id: interestId,
            interest_level: interestLevel,
          },
          { onConflict: 'profile_id,interest_id' }
        )
        .select('*, interest:interests(*)')
        .single();

      if (error) throw error;
      return data as StudentInterest;
    }

    const all = getLocal<StudentInterest[]>(STORAGE_KEYS.INTERESTS, []);
    const existingIndex = all.findIndex((i) => i.profile_id === profileId && i.interest_id === interestId);
    const interests = await taxonomyService.getInterests();
    const interestObj = interests.find((int) => int.id === interestId);

    const record: StudentInterest = {
      id: existingIndex >= 0 ? all[existingIndex].id : `sint-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      profile_id: profileId,
      interest_id: interestId,
      interest_level: interestLevel,
      created_at: existingIndex >= 0 ? all[existingIndex].created_at : new Date().toISOString(),
      interest: interestObj,
    };

    if (existingIndex >= 0) {
      all[existingIndex] = record;
    } else {
      all.push(record);
    }
    setLocal(STORAGE_KEYS.INTERESTS, all);
    return record;
  },

  async removeStudentInterest(profileId: string, interestId: string): Promise<void> {
    if (isSupabaseConfigured()) {
      await sb
        .from('student_interests')
        .delete()
        .eq('profile_id', profileId)
        .eq('interest_id', interestId);
      return;
    }

    const all = getLocal<StudentInterest[]>(STORAGE_KEYS.INTERESTS, []);
    const filtered = all.filter((i) => !(i.profile_id === profileId && i.interest_id === interestId));
    setLocal(STORAGE_KEYS.INTERESTS, filtered);
  },

  // --------------------------------------------------------------------------
  // 3. STUDENT ACADEMIC STRENGTHS
  // --------------------------------------------------------------------------
  async getStudentAcademicStrengths(profileId: string): Promise<StudentAcademicStrength[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_academic_strengths')
        .select('*, academic_strength:academic_strengths(*)')
        .eq('profile_id', profileId);

      if (!error && data) return data as StudentAcademicStrength[];
    }

    const all = getLocal<StudentAcademicStrength[]>(STORAGE_KEYS.ACADEMICS, []);
    const studentItems = all.filter((a) => a.profile_id === profileId);
    const academics = await taxonomyService.getAcademicStrengths();

    return studentItems.map((item) => ({
      ...item,
      academic_strength: academics.find((acad) => acad.id === item.academic_strength_id),
    }));
  },

  async saveStudentAcademicStrength(profileId: string, strengthId: string, rating: number): Promise<StudentAcademicStrength> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('student_academic_strengths')
        .upsert(
          {
            profile_id: profileId,
            academic_strength_id: strengthId,
            grade_or_rating: rating,
          },
          { onConflict: 'profile_id,academic_strength_id' }
        )
        .select('*, academic_strength:academic_strengths(*)')
        .single();

      if (error) throw error;
      return data as StudentAcademicStrength;
    }

    const all = getLocal<StudentAcademicStrength[]>(STORAGE_KEYS.ACADEMICS, []);
    const existingIndex = all.findIndex((a) => a.profile_id === profileId && a.academic_strength_id === strengthId);
    const academics = await taxonomyService.getAcademicStrengths();
    const acadObj = academics.find((acad) => acad.id === strengthId);

    const record: StudentAcademicStrength = {
      id: existingIndex >= 0 ? all[existingIndex].id : `sacad-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      profile_id: profileId,
      academic_strength_id: strengthId,
      grade_or_rating: rating,
      created_at: existingIndex >= 0 ? all[existingIndex].created_at : new Date().toISOString(),
      academic_strength: acadObj,
    };

    if (existingIndex >= 0) {
      all[existingIndex] = record;
    } else {
      all.push(record);
    }
    setLocal(STORAGE_KEYS.ACADEMICS, all);
    return record;
  },

  async removeStudentAcademicStrength(profileId: string, strengthId: string): Promise<void> {
    if (isSupabaseConfigured()) {
      await sb
        .from('student_academic_strengths')
        .delete()
        .eq('profile_id', profileId)
        .eq('academic_strength_id', strengthId);
      return;
    }

    const all = getLocal<StudentAcademicStrength[]>(STORAGE_KEYS.ACADEMICS, []);
    const filtered = all.filter((a) => !(a.profile_id === profileId && a.academic_strength_id === strengthId));
    setLocal(STORAGE_KEYS.ACADEMICS, filtered);
  },

  // --------------------------------------------------------------------------
  // 4. ASSESSMENT LIFECYCLE & QUESTIONNAIRE ANSWERS
  // --------------------------------------------------------------------------
  async getOrCreateAssessment(profileId: string): Promise<Assessment> {
    if (isSupabaseConfigured()) {
      // Look for active in_progress assessment
      const { data: existing } = await sb
        .from('assessments')
        .select('*')
        .eq('profile_id', profileId)
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) return existing as Assessment;

      // Create new assessment
      const { data: newAssessment, error } = await sb
        .from('assessments')
        .insert({
          profile_id: profileId,
          status: 'in_progress',
        })
        .select()
        .single();

      if (error) throw error;
      return newAssessment as Assessment;
    }

    const assessments = getLocal<Assessment[]>(STORAGE_KEYS.ASSESSMENTS, []);
    const active = assessments.find((a) => a.profile_id === profileId && a.status === 'in_progress');
    if (active) return active;

    const newAss: Assessment = {
      id: `ass-${Date.now()}`,
      profile_id: profileId,
      status: 'in_progress',
      created_at: new Date().toISOString(),
    };
    assessments.push(newAss);
    setLocal(STORAGE_KEYS.ASSESSMENTS, assessments);
    return newAss;
  },

  async saveAnswer(assessmentId: string, questionId: string, optionId: string, value: number): Promise<AssessmentAnswer> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('assessment_answers')
        .upsert(
          {
            assessment_id: assessmentId,
            question_id: questionId,
            question_option_id: optionId,
            value,
          },
          { onConflict: 'assessment_id,question_id' }
        )
        .select()
        .single();

      if (error) throw error;
      return data as AssessmentAnswer;
    }

    const answers = getLocal<AssessmentAnswer[]>(STORAGE_KEYS.ANSWERS, []);
    const index = answers.findIndex((a) => a.assessment_id === assessmentId && a.question_id === questionId);
    const newAnswer: AssessmentAnswer = {
      id: index >= 0 ? answers[index].id : `ans-${Date.now()}`,
      assessment_id: assessmentId,
      question_id: questionId,
      question_option_id: optionId,
      value,
      created_at: index >= 0 ? answers[index].created_at : new Date().toISOString(),
    };

    if (index >= 0) {
      answers[index] = newAnswer;
    } else {
      answers.push(newAnswer);
    }
    setLocal(STORAGE_KEYS.ANSWERS, answers);
    return newAnswer;
  },

  async getAnswers(assessmentId: string): Promise<AssessmentAnswer[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('assessment_answers')
        .select('*')
        .eq('assessment_id', assessmentId);

      if (!error && data) return data as AssessmentAnswer[];
    }

    const answers = getLocal<AssessmentAnswer[]>(STORAGE_KEYS.ANSWERS, []);
    return answers.filter((a) => a.assessment_id === assessmentId);
  },

  // Completes assessment & freezes input snapshots for deterministic scientific reproducibility
  async completeAssessment(assessmentId: string, profileId: string): Promise<Assessment> {
    const studentSkills = await this.getStudentSkills(profileId);
    const studentInterests = await this.getStudentInterests(profileId);
    const studentAcademics = await this.getStudentAcademicStrengths(profileId);

    if (isSupabaseConfigured()) {
      // 1. Freeze skill snapshots
      if (studentSkills.length > 0) {
        await sb.from('assessment_skill_snapshots').upsert(
          studentSkills.map((s) => ({
            assessment_id: assessmentId,
            skill_id: s.skill_id,
            proficiency_level: s.proficiency_level,
          })),
          { onConflict: 'assessment_id,skill_id' }
        );
      }

      // 2. Freeze interest snapshots
      if (studentInterests.length > 0) {
        await sb.from('assessment_interest_snapshots').upsert(
          studentInterests.map((i) => ({
            assessment_id: assessmentId,
            interest_id: i.interest_id,
            interest_level: i.interest_level,
          })),
          { onConflict: 'assessment_id,interest_id' }
        );
      }

      // 3. Freeze academic snapshots
      if (studentAcademics.length > 0) {
        await sb.from('assessment_academic_snapshots').upsert(
          studentAcademics.map((a) => ({
            assessment_id: assessmentId,
            academic_strength_id: a.academic_strength_id,
            grade_or_rating: a.grade_or_rating,
          })),
          { onConflict: 'assessment_id,academic_strength_id' }
        );
      }

      // 4. Update status to completed
      const { data, error } = await sb
        .from('assessments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', assessmentId)
        .select()
        .single();

      if (error) throw error;
      return data as Assessment;
    }

    // Local sandbox persistence
    const assessments = getLocal<Assessment[]>(STORAGE_KEYS.ASSESSMENTS, []);
    const idx = assessments.findIndex((a) => a.id === assessmentId);
    const completed: Assessment = {
      ...(assessments[idx] || { id: assessmentId, profile_id: profileId, created_at: new Date().toISOString() }),
      status: 'completed',
      completed_at: new Date().toISOString(),
    };

    if (idx >= 0) {
      assessments[idx] = completed;
    } else {
      assessments.push(completed);
    }
    setLocal(STORAGE_KEYS.ASSESSMENTS, assessments);
    return completed;
  },
};
