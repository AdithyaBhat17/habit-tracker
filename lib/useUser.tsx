import { Session, User } from "@supabase/gotrue-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase-client";

const UserContext = createContext<{
  user: User | null;
  session: Session | null;
}>({
  user: null,
  session: null,
});

function useUserValue() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return { user, session };
}

function UserProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const value = useUserValue();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUser should be used only inside a child of <UserProvider />"
    );
  }
  return context;
}

export { useUser, UserProvider };
