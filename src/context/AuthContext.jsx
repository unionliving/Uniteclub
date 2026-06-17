import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const mapUser = (user) => {
  if (!user) return null;
  return {
    email: user.email,
    name: user.user_metadata?.display_name || user.user_metadata?.full_name || '',
    uid: user.id,
    picture: user.user_metadata?.avatar_url || '',
    emailVerified: !!user.email_confirmed_at
  };
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [loading, setLoading] = useState(true);

  // Email Signup
  const signup = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name
        }
      }
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  };

  // Email Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    if (data.user && !data.user.email_confirmed_at) {
      throw new Error('Please verify your email address. We sent a link to your inbox.');
    }
    return data;
  };

  // Google Login
  const loginWithGoogle = async (from = '/') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${from}`
      }
    });
    if (error) throw error;
  };

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Reset Password
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
  };

  // Reload user data (used for polling email verification)
  const reloadUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (user) {
      setCurrentUser(mapUser(user));
    }
  };

  // 1. Listen to Auth Session changes
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user || null;
        setCurrentUser(mapUser(user));
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user || null;
      setCurrentUser(mapUser(user));
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Listen to Membership changes in Realtime
  useEffect(() => {
    if (!currentUser) {
      setIsMember(false);
      setCheckingMembership(false);
      return;
    }

    setCheckingMembership(true);

    const fetchInitialMembership = async () => {
      try {
        const { data, error } = await supabase
          .from('memberships')
          .select('status')
          .eq('uid', currentUser.uid)
          .maybeSingle();

        if (!error && data && data.status === 'active') {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (err) {
        console.error("Error fetching initial membership:", err);
        setIsMember(false);
      } finally {
        setCheckingMembership(false);
      }
    };

    fetchInitialMembership();

    const channel = supabase
      .channel(`membership:${currentUser.uid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'memberships',
          filter: `uid=eq.${currentUser.uid}`
        },
        (payload) => {
          if (payload.new && payload.new.status === 'active') {
            setIsMember(true);
          } else {
            setIsMember(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  const value = {
    currentUser,
    isMember,
    checkingMembership,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    reloadUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

