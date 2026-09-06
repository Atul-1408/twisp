import { supabase, isSupabaseConfigured } from './supabaseClient.js';

export const authService = {
  /**
   * Check if Supabase auth is configured with environment variables
   */
  isConfigured: () => isSupabaseConfigured(),

  /**
   * Sign in with email and password
   */
  signIn: async (email, password) => {
    if (!supabase) {
      return {
        data: null,
        error: new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'),
      };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return { data, error };
  },

  /**
   * Sign out current user
   */
  signOut: async () => {
    if (!supabase) return { error: null };
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Get active session
   */
  getSession: async () => {
    if (!supabase) return { data: { session: null }, error: null };
    return await supabase.auth.getSession();
  },

  /**
   * Get currently logged-in user
   */
  getUser: async () => {
    if (!supabase) return { data: { user: null }, error: null };
    return await supabase.auth.getUser();
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange: (callback) => {
    if (!supabase) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  },
};
