// ============================================================================
// Supabase Database Type Definitions
// Auto-aligned with PostgreSQL normalized schema (migrations 01, 02)
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'student' | 'admin';
          avatar_url: string | null;
          university: string | null;
          major: string | null;
          graduation_year: number | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'student' | 'admin';
          avatar_url?: string | null;
          university?: string | null;
          major?: string | null;
          graduation_year?: number | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'student' | 'admin';
          avatar_url?: string | null;
          university?: string | null;
          major?: string | null;
          graduation_year?: number | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: 'technical' | 'soft' | 'analytical' | 'creative' | 'business';
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: 'technical' | 'soft' | 'analytical' | 'creative' | 'business';
          description?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: 'technical' | 'soft' | 'analytical' | 'creative' | 'business';
          description?: string | null;
        };
      };
      student_skills: {
        Row: {
          id: string;
          profile_id: string;
          skill_id: string;
          proficiency_level: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          skill_id: string;
          proficiency_level: number;
          created_at?: string;
        };
        Update: {
          proficiency_level?: number;
        };
      };
      interests: {
        Row: {
          id: string;
          name: string;
          category: 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';
          description?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';
          description?: string | null;
        };
      };
      student_interests: {
        Row: {
          id: string;
          profile_id: string;
          interest_id: string;
          interest_level: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          interest_id: string;
          interest_level: number;
          created_at?: string;
        };
        Update: {
          interest_level?: number;
        };
      };
      academic_strengths: {
        Row: {
          id: string;
          name: string;
          subject_area: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject_area: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          subject_area?: string;
          description?: string | null;
        };
      };
      student_academic_strengths: {
        Row: {
          id: string;
          profile_id: string;
          academic_strength_id: string;
          grade_or_rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          academic_strength_id: string;
          grade_or_rating: number;
          created_at?: string;
        };
        Update: {
          grade_or_rating?: number;
        };
      };
      careers: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          description: string;
          industry: string;
          education_level: string;
          typical_tasks?: string[];
          salary_range_illustrative: string;
          job_outlook: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          summary?: string;
          description?: string;
          industry?: string;
          education_level?: string;
          typical_tasks?: string[];
          salary_range_illustrative?: string;
          job_outlook?: string;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      career_skills: {
        Row: {
          id: string;
          career_id: string;
          skill_id: string;
          importance_weight: number;
          required_proficiency: number;
          is_required: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          career_id: string;
          skill_id: string;
          importance_weight?: number;
          required_proficiency?: number;
          is_required?: boolean;
          created_at?: string;
        };
        Update: {
          importance_weight?: number;
          required_proficiency?: number;
          is_required?: boolean;
        };
      };
      career_interests: {
        Row: {
          id: string;
          career_id: string;
          interest_id: string;
          weight: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          career_id: string;
          interest_id: string;
          weight?: number;
          created_at?: string;
        };
        Update: {
          weight?: number;
        };
      };
      career_academic_strengths: {
        Row: {
          id: string;
          career_id: string;
          academic_strength_id: string;
          weight: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          career_id: string;
          academic_strength_id: string;
          weight?: number;
          created_at?: string;
        };
        Update: {
          weight?: number;
        };
      };
      questions: {
        Row: {
          id: string;
          code: string;
          text: string;
          category: 'personality' | 'work_style' | 'values';
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          text: string;
          category: 'personality' | 'work_style' | 'values';
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          text?: string;
          category?: 'personality' | 'work_style' | 'values';
          order_index?: number;
          is_active?: boolean;
        };
      };
      question_options: {
        Row: {
          id: string;
          question_id: string;
          option_text: string;
          trait_key: string;
          score_value: number;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          option_text: string;
          trait_key: string;
          score_value?: number;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          option_text?: string;
          trait_key?: string;
          score_value?: number;
          order_index?: number;
        };
      };
      recommendation_rule_versions: {
        Row: {
          id: string;
          version_tag: string;
          description: string;
          weights_config: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          version_tag: string;
          description: string;
          weights_config?: Json;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          description?: string;
          weights_config?: Json;
          is_active?: boolean;
        };
      };
      assessments: {
        Row: {
          id: string;
          profile_id: string;
          rule_version_id: string | null;
          status: 'in_progress' | 'completed';
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          rule_version_id?: string | null;
          status?: 'in_progress' | 'completed';
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          status?: 'in_progress' | 'completed';
          completed_at?: string | null;
        };
      };
      assessment_answers: {
        Row: {
          id: string;
          assessment_id: string;
          question_id: string;
          question_option_id: string | null;
          value: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          question_id: string;
          question_option_id?: string | null;
          value?: number;
          created_at?: string;
        };
        Update: {
          question_option_id?: string | null;
          value?: number;
        };
      };
      assessment_skill_snapshots: {
        Row: {
          id: string;
          assessment_id: string;
          skill_id: string;
          proficiency_level: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          skill_id: string;
          proficiency_level: number;
          created_at?: string;
        };
        Update: {
          proficiency_level?: number;
        };
      };
      assessment_interest_snapshots: {
        Row: {
          id: string;
          assessment_id: string;
          interest_id: string;
          interest_level: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          interest_id: string;
          interest_level: number;
          created_at?: string;
        };
        Update: {
          interest_level?: number;
        };
      };
      assessment_academic_snapshots: {
        Row: {
          id: string;
          assessment_id: string;
          academic_strength_id: string;
          grade_or_rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          academic_strength_id: string;
          grade_or_rating: number;
          created_at?: string;
        };
        Update: {
          grade_or_rating?: number;
        };
      };
      recommendations: {
        Row: {
          id: string;
          assessment_id: string;
          profile_id: string;
          career_id: string;
          overall_score: number;
          rank: number;
          skills_score: number;
          interests_score: number;
          academics_score: number;
          personality_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          profile_id: string;
          career_id: string;
          overall_score: number;
          rank: number;
          skills_score?: number;
          interests_score?: number;
          academics_score?: number;
          personality_score?: number;
          created_at?: string;
        };
        Update: {
          overall_score?: number;
          rank?: number;
          skills_score?: number;
          interests_score?: number;
          academics_score?: number;
          personality_score?: number;
        };
      };
      recommendation_explanations: {
        Row: {
          id: string;
          recommendation_id: string;
          explanation_text: string;
          matching_skills: Json;
          matching_interests: Json;
          matching_academics: Json;
          missing_skills: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          recommendation_id: string;
          explanation_text: string;
          matching_skills?: Json;
          matching_interests?: Json;
          matching_academics?: Json;
          missing_skills?: Json;
          created_at?: string;
        };
        Update: {
          explanation_text?: string;
          matching_skills?: Json;
          matching_interests?: Json;
          matching_academics?: Json;
          missing_skills?: Json;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          provider: string;
          url: string;
          description: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          duration_hours: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          provider: string;
          url: string;
          description: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          duration_hours?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          provider?: string;
          url?: string;
          description?: string;
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
          duration_hours?: number;
          is_active?: boolean;
        };
      };
      course_skills: {
        Row: {
          id: string;
          course_id: string;
          skill_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          skill_id: string;
          created_at?: string;
        };
        Update: {
          skill_id?: string;
        };
      };
      career_courses: {
        Row: {
          id: string;
          career_id: string;
          course_id: string;
          priority: 'essential' | 'recommended' | 'optional';
          created_at: string;
        };
        Insert: {
          id?: string;
          career_id: string;
          course_id: string;
          priority?: 'essential' | 'recommended' | 'optional';
          created_at?: string;
        };
        Update: {
          priority?: 'essential' | 'recommended' | 'optional';
        };
      };
      feedback: {
        Row: {
          id: string;
          profile_id: string;
          recommendation_id: string | null;
          rating: number;
          category: 'recommendation_accuracy' | 'system_usability' | 'career_catalog' | 'other';
          comments: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          recommendation_id?: string | null;
          rating: number;
          category: 'recommendation_accuracy' | 'system_usability' | 'career_catalog' | 'other';
          comments?: string | null;
          created_at?: string;
        };
        Update: {
          rating?: number;
          category?: 'recommendation_accuracy' | 'system_usability' | 'career_catalog' | 'other';
          comments?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
  };
}
