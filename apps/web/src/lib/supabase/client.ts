import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  // Mock SSO mode: no Supabase configured, return dummy client that reads userId from localStorage
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase env missing — returning mocked client");
    return {
      auth: {
        // Return a user object with id from localStorage
        getUser: async () => {
          const id = typeof window !== 'undefined' ? localStorage.getItem('OPEN_CANVAS_USER_ID') : null;
          if (id) {
            return {
              data: { user: { id, aud: '', role: '', app_metadata: {}, user_metadata: {}, email: '', created_at: new Date().toISOString() } },
              error: null,
            };
          }
          return { data: { user: null }, error: null };
        },
        getSession: async () => {
          const id = typeof window !== 'undefined' ? localStorage.getItem('OPEN_CANVAS_USER_ID') : null;
          if (id) {
            return {
              data: { session: { user: { id, aud: '', role: '', app_metadata: {}, user_metadata: {}, email: '', created_at: new Date().toISOString() } } },
              error: null,
            };
          }
          return { data: { session: null }, error: null };
        },
        onAuthStateChange: () => ({ data: { subscription: null } }),
      },
    } as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
