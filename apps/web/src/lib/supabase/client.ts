// Mocked Supabase client for client-side usage
export function createSupabaseClient(): any {
  const mockUser = { id: "10" };
  const mockAuth = {
    getUser: async () => ({ data: { user: mockUser } }),
    signInWithPassword: async () => ({ data: {}, error: null }),
    signUp: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
    verifyOtp: async () => ({ data: {}, error: null }),
    exchangeCodeForSession: async () => ({ data: { session: {}, user: mockUser }, error: null }),
  };
  const mockStorageFrom = () => ({
    download: async (_path: string) => ({ data: new Blob(), error: null }),
    upload: async (_path: string, _file: File, _opts?: any) => ({ data: { path: "" }, error: null }),
    remove: async (_paths: string[]) => ({ data: {}, error: null }),
  });
  return { auth: mockAuth, storage: { from: mockStorageFrom } };
}
