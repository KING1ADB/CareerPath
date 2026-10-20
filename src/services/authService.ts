import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Profile, UserRole } from '@/types';

const DEMO_SESSION_KEY = 'careerpath_demo_session';
const DEMO_PROFILES_KEY = 'careerpath_demo_profiles';

const getDemoProfiles = (): Record<string, Profile> => {
  const stored = localStorage.getItem(DEMO_PROFILES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fallback
    }
  }

  // Initial demo accounts
  const defaults: Record<string, Profile> = {
    'demo-student-id': {
      id: 'demo-student-id',
      email: 'student@careerpath.edu',
      full_name: 'Alex Johnson',
      role: 'student',
      avatar_url: null,
      university: 'State University',
      major: 'Computer Science & Information Systems',
      graduation_year: 2026,
      bio: 'Third-year undergraduate exploring paths in software engineering and data analytics.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    'demo-admin-id': {
      id: 'demo-admin-id',
      email: 'admin@careerpath.edu',
      full_name: 'Dr. Eleanor Vance',
      role: 'admin',
      avatar_url: null,
      university: 'State University Career Center',
      major: 'Career Services Director',
      graduation_year: null,
      bio: 'Head of university career advising and academic curriculum alignment.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  };

  localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(defaults));
  return defaults;
};

export const authService = {
  async getCurrentSession() {
    if (isSupabaseConfigured()) {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    }

    const demo = localStorage.getItem(DEMO_SESSION_KEY);
    return demo ? JSON.parse(demo) : null;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Error fetching profile from Supabase:', error.message);
        return null;
      }
      return data as Profile;
    }

    const profiles = getDemoProfiles();
    return profiles[userId] || null;
  },

  async signUp(email: string, password: string, fullName: string): Promise<{ user: any; profile: Profile }> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('Registration failed: no user returned');

      // Profile is auto-created by Supabase trigger handle_new_user()
      // We fetch or construct it
      let profile = await this.getProfile(data.user.id);
      if (!profile) {
        profile = {
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'student', // ALWAYS student
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      return { user: data.user, profile };
    }

    // Demo / Offline Mode Persistence
    const profiles = getDemoProfiles();
    const newId = `user-${Date.now()}`;
    const newProfile: Profile = {
      id: newId,
      email,
      full_name: fullName,
      role: 'student', // Student role strictly enforced
      avatar_url: null,
      university: '',
      major: '',
      graduation_year: 2026,
      bio: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    profiles[newId] = newProfile;
    localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(profiles));

    const sessionObj = {
      user: { id: newId, email, user_metadata: { full_name: fullName } },
      access_token: 'demo-token-' + newId,
    };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionObj));

    return { user: sessionObj.user, profile: newProfile };
  },

  async signIn(email: string, password: string): Promise<{ user: any; profile: Profile }> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Sign in failed: no user returned');

      const profile = await this.getProfile(data.user.id);
      if (!profile) throw new Error('Associated profile not found');

      return { user: data.user, profile };
    }

    // Demo / Offline Mode
    const profiles = getDemoProfiles();
    // Match by email or use demo accounts
    let matchedProfile = Object.values(profiles).find(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    );

    if (!matchedProfile) {
      // Auto register demo student if test email
      const isEleanor = email.toLowerCase().includes('admin');
      matchedProfile = {
        id: `demo-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        role: isEleanor ? 'admin' : 'student',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      profiles[matchedProfile.id] = matchedProfile;
      localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(profiles));
    }

    const sessionObj = {
      user: { id: matchedProfile.id, email: matchedProfile.email, user_metadata: { full_name: matchedProfile.full_name } },
      access_token: 'demo-token-' + matchedProfile.id,
    };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionObj));

    return { user: sessionObj.user, profile: matchedProfile };
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    if (isSupabaseConfigured()) {
      // Clean updates: prevent tampering with role
      const sanitizedUpdates = { ...updates };
      delete sanitizedUpdates.role;
      delete sanitizedUpdates.id;

      const { data, error } = await (supabase as any)
        .from('profiles')
        .update(sanitizedUpdates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    }

    const profiles = getDemoProfiles();
    if (!profiles[userId]) throw new Error('Profile not found');

    const updated = {
      ...profiles[userId],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    profiles[userId] = updated;
    localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(profiles));
    return updated;
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_SESSION_KEY);
  },
};
