import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { authService } from '@/services/auth.service';
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 Initializing auth...');

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth event:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 User found:', session.user.email);
          await loadProfile(session.user.id, session.user.email || '');
        } else {
          console.log('👋 No user - showing guest view');
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string, userEmail: string = '') => {
    try {
      const profileData = await authService.getProfile(userId);
      console.log('✅ Profile loaded successfully:', profileData.full_name || profileData.email);
      setProfile(profileData);
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      // Create placeholder profile if it doesn't exist
      const placeholderProfile = {
        id: userId,
        email: userEmail,
        full_name: userEmail.split('@')[0] || 'User',
        phone: null,
        avatar_url: null,
        role: 'customer' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      console.log('📝 Created placeholder profile:', placeholderProfile.full_name);
      setProfile(placeholderProfile);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authService.signIn(email, password);
      // Auth state change listener will handle setting user and loading profile
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    await authService.signUp(email, password, fullName);
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user.id, user.email || '');
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to require authentication
export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      // You can uncomment this when you want to enforce auth
      // router.replace('/auth/login');
    }
  }, [user, loading]);

  return { user, loading };
}
