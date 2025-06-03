import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

// Check for env vars during runtime, but allow build to proceed with warning
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key missing. Supabase client will not initialize.");
  // Assign a dummy client to avoid runtime errors in non-critical contexts
  supabase = {
    auth: {
      signInWithPassword: async () => ({ error: new Error("Supabase not initialized") }),
      signInWithOAuth: async () => ({ error: new Error("Supabase not initialized") }),
      signUp: async () => ({ error: new Error("Supabase not initialized") }),
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      updateUser: async () => ({ error: new Error("Supabase not initialized") }),
      signOut: async () => ({ error: null }),
      exchangeCodeForSession: async () => ({ error: new Error("Supabase not initialized") }),
      resetPasswordForEmail: async () => ({ error: new Error("Supabase not initialized") }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };