-- ============================================================================
-- CareerPath Initial Schema Migration (20261020000001_initial_schema.sql)
-- Discover. Plan. Grow.
-- ============================================================================

-- Ensure UUID generator extension is active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROFILES
-- Links directly to auth.users. Never allows public self-assignment of admin role.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    avatar_url TEXT,
    university TEXT,
    major TEXT,
    graduation_year INTEGER,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ----------------------------------------------------------------------------
-- 2. SKILLS TAXONOMY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('technical', 'soft', 'analytical', 'creative', 'business')),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);

-- ----------------------------------------------------------------------------
-- 3. STUDENT SKILLS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER NOT NULL CHECK (proficiency_level BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_student_skill UNIQUE (profile_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_student_skills_profile ON public.student_skills(profile_id);

-- ----------------------------------------------------------------------------
-- 4. INTERESTS TAXONOMY (RIASEC Aligned)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional')),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_interests_category ON public.interests(category);

-- ----------------------------------------------------------------------------
-- 5. STUDENT INTERESTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest_id UUID NOT NULL REFERENCES public.interests(id) ON DELETE CASCADE,
    interest_level INTEGER NOT NULL CHECK (interest_level BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_student_interest UNIQUE (profile_id, interest_id)
);

CREATE INDEX IF NOT EXISTS idx_student_interests_profile ON public.student_interests(profile_id);

-- ----------------------------------------------------------------------------
-- 6. ACADEMIC STRENGTHS TAXONOMY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academic_strengths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    subject_area TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_academic_strengths_subject ON public.academic_strengths(subject_area);

-- ----------------------------------------------------------------------------
-- 7. STUDENT ACADEMIC STRENGTHS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_academic_strengths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    academic_strength_id UUID NOT NULL REFERENCES public.academic_strengths(id) ON DELETE CASCADE,
    grade_or_rating INTEGER NOT NULL CHECK (grade_or_rating BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_student_academic_strength UNIQUE (profile_id, academic_strength_id)
);

CREATE INDEX IF NOT EXISTS idx_student_academic_strengths_profile ON public.student_academic_strengths(profile_id);

-- ----------------------------------------------------------------------------
-- 8. CAREERS CATALOG
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    industry TEXT NOT NULL,
    education_level TEXT NOT NULL,
    typical_tasks TEXT[] NOT NULL DEFAULT '{}',
    salary_range_illustrative TEXT NOT NULL,
    job_outlook TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_careers_industry ON public.careers(industry);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON public.careers(slug);
CREATE INDEX IF NOT EXISTS idx_careers_is_active ON public.careers(is_active);

-- ----------------------------------------------------------------------------
-- 9. CAREER SKILLS (Requirements & Weights)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    importance_weight NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (importance_weight BETWEEN 0.00 AND 1.00),
    required_proficiency INTEGER NOT NULL DEFAULT 3 CHECK (required_proficiency BETWEEN 1 AND 5),
    is_required BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_career_skill UNIQUE (career_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_career_skills_career ON public.career_skills(career_id);

-- ----------------------------------------------------------------------------
-- 10. CAREER INTERESTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    interest_id UUID NOT NULL REFERENCES public.interests(id) ON DELETE CASCADE,
    weight NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (weight BETWEEN 0.00 AND 1.00),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_career_interest UNIQUE (career_id, interest_id)
);

CREATE INDEX IF NOT EXISTS idx_career_interests_career ON public.career_interests(career_id);

-- ----------------------------------------------------------------------------
-- 11. CAREER ACADEMIC STRENGTHS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_academic_strengths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    academic_strength_id UUID NOT NULL REFERENCES public.academic_strengths(id) ON DELETE CASCADE,
    weight NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (weight BETWEEN 0.00 AND 1.00),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_career_academic_strength UNIQUE (career_id, academic_strength_id)
);

CREATE INDEX IF NOT EXISTS idx_career_academic_strengths_career ON public.career_academic_strengths(career_id);

-- ----------------------------------------------------------------------------
-- 12. QUESTIONNAIRE QUESTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    text TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('personality', 'work_style', 'values')),
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_questions_order ON public.questions(order_index);

-- ----------------------------------------------------------------------------
-- 13. QUESTION OPTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    trait_key TEXT NOT NULL,
    score_value INTEGER NOT NULL DEFAULT 3 CHECK (score_value BETWEEN 1 AND 5),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_question_options_question ON public.question_options(question_id);

-- ----------------------------------------------------------------------------
-- 14. RECOMMENDATION RULE VERSIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recommendation_rule_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_tag TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    weights_config JSONB NOT NULL DEFAULT '{"skills": 0.40, "interests": 0.30, "academics": 0.20, "personality": 0.10}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed initial standard rule version v1.0
INSERT INTO public.recommendation_rule_versions (version_tag, description, weights_config, is_active)
VALUES ('v1.0', 'Standard academic weighted formula: 40% Skills, 30% Interests, 20% Academics, 10% Personality', '{"skills": 0.40, "interests": 0.30, "academics": 0.20, "personality": 0.10}'::jsonb, true)
ON CONFLICT (version_tag) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 15. ASSESSMENTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rule_version_id UUID REFERENCES public.recommendation_rule_versions(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_assessments_profile ON public.assessments(profile_id);

-- ----------------------------------------------------------------------------
-- 16. ASSESSMENT ANSWERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    question_option_id UUID REFERENCES public.question_options(id) ON DELETE SET NULL,
    value INTEGER NOT NULL DEFAULT 3 CHECK (value BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_assessment_answer UNIQUE (assessment_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_answers_assessment ON public.assessment_answers(assessment_id);

-- ----------------------------------------------------------------------------
-- 17. ASSESSMENT SKILL SNAPSHOTS
-- Freezes student skills at assessment submission time for reproducibility
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_skill_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER NOT NULL CHECK (proficiency_level BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_assessment_skill_snapshot UNIQUE (assessment_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_skill_snapshots_assessment ON public.assessment_skill_snapshots(assessment_id);

-- ----------------------------------------------------------------------------
-- 18. ASSESSMENT INTEREST SNAPSHOTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_interest_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    interest_id UUID NOT NULL REFERENCES public.interests(id) ON DELETE CASCADE,
    interest_level INTEGER NOT NULL CHECK (interest_level BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_assessment_interest_snapshot UNIQUE (assessment_id, interest_id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_interest_snapshots_assessment ON public.assessment_interest_snapshots(assessment_id);

-- ----------------------------------------------------------------------------
-- 19. ASSESSMENT ACADEMIC SNAPSHOTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_academic_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    academic_strength_id UUID NOT NULL REFERENCES public.academic_strengths(id) ON DELETE CASCADE,
    grade_or_rating INTEGER NOT NULL CHECK (grade_or_rating BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_assessment_academic_snapshot UNIQUE (assessment_id, academic_strength_id)
);

CREATE INDEX IF NOT EXISTS idx_assessment_academic_snapshots_assessment ON public.assessment_academic_snapshots(assessment_id);

-- ----------------------------------------------------------------------------
-- 20. RECOMMENDATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    overall_score NUMERIC(5,2) NOT NULL CHECK (overall_score BETWEEN 0.00 AND 100.00),
    rank INTEGER NOT NULL CHECK (rank >= 1),
    skills_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    interests_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    academics_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    personality_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_assessment_career UNIQUE (assessment_id, career_id)
);

CREATE INDEX IF NOT EXISTS idx_recommendations_assessment ON public.recommendations(assessment_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_profile ON public.recommendations(profile_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_career ON public.recommendations(career_id);

-- ----------------------------------------------------------------------------
-- 21. RECOMMENDATION EXPLANATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recommendation_explanations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_id UUID NOT NULL UNIQUE REFERENCES public.recommendations(id) ON DELETE CASCADE,
    explanation_text TEXT NOT NULL,
    matching_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    matching_interests JSONB NOT NULL DEFAULT '[]'::jsonb,
    matching_academics JSONB NOT NULL DEFAULT '[]'::jsonb,
    missing_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 22. COURSES / LEARNING RESOURCES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    duration_hours INTEGER NOT NULL DEFAULT 10,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_courses_provider ON public.courses(provider);
CREATE INDEX IF NOT EXISTS idx_courses_difficulty ON public.courses(difficulty_level);

-- ----------------------------------------------------------------------------
-- 23. COURSE SKILLS (Targeted skills taught)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_course_skill UNIQUE (course_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_course_skills_course ON public.course_skills(course_id);
CREATE INDEX IF NOT EXISTS idx_course_skills_skill ON public.course_skills(skill_id);

-- ----------------------------------------------------------------------------
-- 24. CAREER COURSES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    priority TEXT NOT NULL DEFAULT 'recommended' CHECK (priority IN ('essential', 'recommended', 'optional')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_career_course UNIQUE (career_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_career_courses_career ON public.career_courses(career_id);

-- ----------------------------------------------------------------------------
-- 25. FEEDBACK
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recommendation_id UUID REFERENCES public.recommendations(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    category TEXT NOT NULL CHECK (category IN ('recommendation_accuracy', 'system_usability', 'career_catalog', 'other')),
    comments TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_feedback_profile ON public.feedback(profile_id);

-- ----------------------------------------------------------------------------
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- Automatically creates a student profile with role='student' upon auth.users insertion
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        'student' -- ALWAYS defaults strictly to student; prevents privilege escalation
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for auto updating updated_at on profiles & careers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_careers_updated_at ON public.careers;
CREATE TRIGGER set_careers_updated_at
    BEFORE UPDATE ON public.careers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
