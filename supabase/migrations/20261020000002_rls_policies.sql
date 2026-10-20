-- ============================================================================
-- CareerPath Row Level Security Policies (20261020000002_rls_policies.sql)
-- Discover. Plan. Grow.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ADMIN HELPER FUNCTION
-- Checks if current authenticated user has the 'admin' role in profiles
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ----------------------------------------------------------------------------
-- PREVENT ROLE ESCALATION TRIGGER
-- Ensures students cannot elevate their own role to 'admin'
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role != OLD.role AND NOT public.is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Only system administrators can modify user roles.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_role_escalation
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_role_escalation();

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_strengths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_academic_strengths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_academic_strengths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_rule_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_skill_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_interest_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_academic_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLICIES: PROFILES
-- ============================================================================
-- Read: Own profile or admin
CREATE POLICY "profiles_select_own_or_admin"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid() OR public.is_admin());

-- Update: Own profile or admin
CREATE POLICY "profiles_update_own_or_admin"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid() OR public.is_admin())
    WITH CHECK (id = auth.uid() OR public.is_admin());

-- ============================================================================
-- POLICIES: TAXONOMIES & REFERENCE DATA
-- Skills, Interests, Academic Strengths, Careers, Questions, Options, Courses, Rules
-- All authenticated users can read active items; Only admins can modify
-- ============================================================================

-- SKILLS
CREATE POLICY "skills_select_all"
    ON public.skills FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "skills_admin_all"
    ON public.skills FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- INTERESTS
CREATE POLICY "interests_select_all"
    ON public.interests FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "interests_admin_all"
    ON public.interests FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ACADEMIC STRENGTHS
CREATE POLICY "academic_strengths_select_all"
    ON public.academic_strengths FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "academic_strengths_admin_all"
    ON public.academic_strengths FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CAREERS
CREATE POLICY "careers_select_active"
    ON public.careers FOR SELECT
    TO authenticated, anon
    USING (is_active = true OR public.is_admin());

CREATE POLICY "careers_admin_all"
    ON public.careers FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CAREER SKILLS
CREATE POLICY "career_skills_select"
    ON public.career_skills FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "career_skills_admin_all"
    ON public.career_skills FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CAREER INTERESTS
CREATE POLICY "career_interests_select"
    ON public.career_interests FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "career_interests_admin_all"
    ON public.career_interests FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CAREER ACADEMIC STRENGTHS
CREATE POLICY "career_academic_strengths_select"
    ON public.career_academic_strengths FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "career_academic_strengths_admin_all"
    ON public.career_academic_strengths FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- QUESTIONS
CREATE POLICY "questions_select_active"
    ON public.questions FOR SELECT
    TO authenticated, anon
    USING (is_active = true OR public.is_admin());

CREATE POLICY "questions_admin_all"
    ON public.questions FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- QUESTION OPTIONS
CREATE POLICY "question_options_select"
    ON public.question_options FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "question_options_admin_all"
    ON public.question_options FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- RECOMMENDATION RULE VERSIONS
CREATE POLICY "rule_versions_select"
    ON public.recommendation_rule_versions FOR SELECT
    TO authenticated, anon
    USING (is_active = true OR public.is_admin());

CREATE POLICY "rule_versions_admin_all"
    ON public.recommendation_rule_versions FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- COURSES
CREATE POLICY "courses_select_active"
    ON public.courses FOR SELECT
    TO authenticated, anon
    USING (is_active = true OR public.is_admin());

CREATE POLICY "courses_admin_all"
    ON public.courses FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- COURSE SKILLS
CREATE POLICY "course_skills_select"
    ON public.course_skills FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "course_skills_admin_all"
    ON public.course_skills FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CAREER COURSES
CREATE POLICY "career_courses_select"
    ON public.career_courses FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "career_courses_admin_all"
    ON public.career_courses FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================================
-- POLICIES: STUDENT PERSONAL DATA
-- Student skills, interests, strengths, assessments, answers, snapshots, recommendations
-- Strictly accessible only by the owner or administrator
-- ============================================================================

-- STUDENT SKILLS
CREATE POLICY "student_skills_select"
    ON public.student_skills FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_skills_insert"
    ON public.student_skills FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "student_skills_update"
    ON public.student_skills FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin())
    WITH CHECK (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_skills_delete"
    ON public.student_skills FOR DELETE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

-- STUDENT INTERESTS
CREATE POLICY "student_interests_select"
    ON public.student_interests FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_interests_insert"
    ON public.student_interests FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "student_interests_update"
    ON public.student_interests FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin())
    WITH CHECK (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_interests_delete"
    ON public.student_interests FOR DELETE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

-- STUDENT ACADEMIC STRENGTHS
CREATE POLICY "student_academic_strengths_select"
    ON public.student_academic_strengths FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_academic_strengths_insert"
    ON public.student_academic_strengths FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "student_academic_strengths_update"
    ON public.student_academic_strengths FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin())
    WITH CHECK (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "student_academic_strengths_delete"
    ON public.student_academic_strengths FOR DELETE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

-- ASSESSMENTS
CREATE POLICY "assessments_select"
    ON public.assessments FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "assessments_insert"
    ON public.assessments FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "assessments_update"
    ON public.assessments FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin())
    WITH CHECK (profile_id = auth.uid() OR public.is_admin());

-- ASSESSMENT ANSWERS
CREATE POLICY "assessment_answers_select"
    ON public.assessment_answers FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_answers.assessment_id
            AND (a.profile_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "assessment_answers_insert"
    ON public.assessment_answers FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_answers.assessment_id
            AND a.profile_id = auth.uid()
        )
    );

-- ASSESSMENT SNAPSHOTS (Skills, Interests, Academics)
CREATE POLICY "assessment_skill_snapshots_select"
    ON public.assessment_skill_snapshots FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_skill_snapshots.assessment_id
            AND (a.profile_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "assessment_skill_snapshots_insert"
    ON public.assessment_skill_snapshots FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_skill_snapshots.assessment_id
            AND a.profile_id = auth.uid()
        )
    );

CREATE POLICY "assessment_interest_snapshots_select"
    ON public.assessment_interest_snapshots FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_interest_snapshots.assessment_id
            AND (a.profile_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "assessment_interest_snapshots_insert"
    ON public.assessment_interest_snapshots FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_interest_snapshots.assessment_id
            AND a.profile_id = auth.uid()
        )
    );

CREATE POLICY "assessment_academic_snapshots_select"
    ON public.assessment_academic_snapshots FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_academic_snapshots.assessment_id
            AND (a.profile_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "assessment_academic_snapshots_insert"
    ON public.assessment_academic_snapshots FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assessments a
            WHERE a.id = assessment_academic_snapshots.assessment_id
            AND a.profile_id = auth.uid()
        )
    );

-- RECOMMENDATIONS
CREATE POLICY "recommendations_select"
    ON public.recommendations FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "recommendations_insert"
    ON public.recommendations FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid() OR public.is_admin());

-- RECOMMENDATION EXPLANATIONS
CREATE POLICY "recommendation_explanations_select"
    ON public.recommendation_explanations FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.recommendations r
            WHERE r.id = recommendation_explanations.recommendation_id
            AND (r.profile_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "recommendation_explanations_insert"
    ON public.recommendation_explanations FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.recommendations r
            WHERE r.id = recommendation_explanations.recommendation_id
            AND (r.profile_id = auth.uid() OR public.is_admin())
        )
    );

-- FEEDBACK
CREATE POLICY "feedback_select"
    ON public.feedback FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "feedback_insert"
    ON public.feedback FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "feedback_admin_all"
    ON public.feedback FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
