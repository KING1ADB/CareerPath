// ============================================================================
// CareerPath Domain Types & Interface Definitions
// Discover. Plan. Grow.
// ============================================================================

export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url?: string | null;
  university?: string | null;
  major?: string | null;
  graduation_year?: number | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export type SkillCategory = 'technical' | 'soft' | 'analytical' | 'creative' | 'business';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description?: string | null;
  created_at: string;
}

export interface StudentSkill {
  id: string;
  profile_id: string;
  skill_id: string;
  proficiency_level: number; // 1 to 5
  created_at: string;
  skill?: Skill;
}

export type InterestCategory = 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';

export interface Interest {
  id: string;
  name: string;
  category: InterestCategory;
  description?: string | null;
  created_at: string;
}

export interface StudentInterest {
  id: string;
  profile_id: string;
  interest_id: string;
  interest_level: number; // 1 to 5
  created_at: string;
  interest?: Interest;
}

export interface AcademicStrength {
  id: string;
  name: string;
  subject_area: string;
  description?: string | null;
  created_at: string;
}

export interface StudentAcademicStrength {
  id: string;
  profile_id: string;
  academic_strength_id: string;
  grade_or_rating: number; // 1 to 5
  created_at: string;
  academic_strength?: AcademicStrength;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  industry: string;
  education_level: string;
  typical_tasks: string[];
  salary_range_illustrative: string;
  job_outlook: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  career_skills?: CareerSkill[];
  career_interests?: CareerInterest[];
  career_academic_strengths?: CareerAcademicStrength[];
}

export interface CareerSkill {
  id: string;
  career_id: string;
  skill_id: string;
  importance_weight: number; // 0.0 - 1.0
  required_proficiency: number; // 1 - 5
  is_required: boolean;
  created_at: string;
  skill?: Skill;
}

export interface CareerInterest {
  id: string;
  career_id: string;
  interest_id: string;
  weight: number; // 0.0 - 1.0
  created_at: string;
  interest?: Interest;
}

export interface CareerAcademicStrength {
  id: string;
  career_id: string;
  academic_strength_id: string;
  weight: number; // 0.0 - 1.0
  created_at: string;
  academic_strength?: AcademicStrength;
}

export interface Question {
  id: string;
  code: string;
  text: string;
  category: 'personality' | 'work_style' | 'values';
  order_index: number;
  is_active: boolean;
  created_at: string;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  trait_key: string;
  score_value: number; // 1 to 5
  order_index: number;
  created_at: string;
}

export interface RecommendationWeightsConfig {
  skills: number; // default 0.40
  interests: number; // default 0.30
  academics: number; // default 0.20
  personality: number; // default 0.10
}

export interface RecommendationRuleVersion {
  id: string;
  version_tag: string;
  description: string;
  weights_config: RecommendationWeightsConfig;
  is_active: boolean;
  created_at: string;
}

export interface Assessment {
  id: string;
  profile_id: string;
  rule_version_id?: string | null;
  status: 'in_progress' | 'completed';
  completed_at?: string | null;
  created_at: string;
  rule_version?: RecommendationRuleVersion;
  recommendations?: Recommendation[];
}

export interface AssessmentAnswer {
  id: string;
  assessment_id: string;
  question_id: string;
  question_option_id?: string | null;
  value: number; // 1 to 5
  created_at: string;
}

export interface Recommendation {
  id: string;
  assessment_id: string;
  profile_id: string;
  career_id: string;
  overall_score: number; // 0.00 - 100.00
  rank: number;
  skills_score: number;
  interests_score: number;
  academics_score: number;
  personality_score: number;
  created_at: string;
  career?: Career;
  explanation?: RecommendationExplanation;
}

export interface SkillGapItem {
  skill_id: string;
  skill_name: string;
  student_level: number;
  required_level: number;
  gap: number;
  is_required: boolean;
  weight: number;
}

export interface RecommendationExplanation {
  id: string;
  recommendation_id: string;
  explanation_text: string;
  matching_skills: Array<{ skill_id: string; name: string; match_percentage: number; weight: number }>;
  matching_interests: Array<{ interest_id: string; name: string; match_percentage: number }>;
  matching_academics: Array<{ academic_id: string; name: string; match_percentage: number }>;
  missing_skills: SkillGapItem[];
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  is_active: boolean;
  created_at: string;
  course_skills?: CourseSkill[];
}

export interface CourseSkill {
  id: string;
  course_id: string;
  skill_id: string;
  created_at: string;
  skill?: Skill;
}

export interface CareerCourse {
  id: string;
  career_id: string;
  course_id: string;
  priority: 'essential' | 'recommended' | 'optional';
  created_at: string;
  course?: Course;
}

export interface Feedback {
  id: string;
  profile_id: string;
  recommendation_id?: string | null;
  rating: number; // 1 to 5
  category: 'recommendation_accuracy' | 'system_usability' | 'career_catalog' | 'other';
  comments?: string | null;
  created_at: string;
  profile?: Profile;
}
