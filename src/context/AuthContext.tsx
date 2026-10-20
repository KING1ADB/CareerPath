import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { authService } from '@/services/authService';
import type { Profile, UserRole } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<Profile>;
  register: (email: string, password: string, fullName: string) => Promise<Profile>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  switchDemoRole: (targetRole: UserRole) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  const loadCurrentAuth = async () => {
    try {
      setIsLoading(true);
      const session = await authService.getCurrentSession();
      if (session && session.user) {
        setUser(session.user);
        const userProfile = await authService.getProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch (err) {
      console.error('Failed to load session:', err);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentAuth();

    if (isConfigured) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          setUser(session.user);
          const p = await authService.getProfile(session.user.id);
          setProfile(p);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConfigured]);

  const login = async (email: string, password: string): Promise<Profile> => {
    setIsLoading(true);
    try {
      const { user: authedUser, profile: p } = await authService.signIn(email, password);
      setUser(authedUser);
      setProfile(p);
      return p;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<Profile> => {
    setIsLoading(true);
    try {
      const { user: registeredUser, profile: p } = await authService.signUp(email, password, fullName);
      setUser(registeredUser);
      setProfile(p);
      return p;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      const p = await authService.getProfile(user.id);
      setProfile(p);
    }
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<Profile> => {
    if (!user?.id) throw new Error('Not authenticated');
    const updated = await authService.updateProfile(user.id, updates);
    setProfile(updated);
    return updated;
  };

  // Helper for Master's defense presentations to demonstrate both student and admin experiences seamlessly
  const switchDemoRole = async (targetRole: UserRole) => {
    if (targetRole === 'admin') {
      await login('admin@careerpath.edu', 'demo1234');
    } else {
      await login('student@careerpath.edu', 'demo1234');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || null,
        isLoading,
        isConfigured,
        login,
        register,
        logout,
        refreshProfile,
        updateProfile,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
