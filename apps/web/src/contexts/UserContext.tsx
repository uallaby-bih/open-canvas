import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext } from "react";

type UserContentType = {
  getUser: () => Promise<User | undefined>;
  user: User | undefined;
  loading: boolean;
};

const UserContext = createContext<UserContentType | undefined>(undefined);

const mockUser: User = {
  id: "10",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
};

export function UserProvider({ children }: { children: ReactNode }) {
  const user = mockUser;
  const loading = false;

  async function getUser(): Promise<User | undefined> {
    return mockUser;
  }

  const contextValue: UserContentType = { getUser, user, loading };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
