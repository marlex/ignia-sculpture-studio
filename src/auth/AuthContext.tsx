import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  role: string | null;
  founding_artist: boolean;
  origin: string | null;
  technique: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  portfolio_url: string | null;
} | null;

type AuthCtx = {
  session: Session | null;
  user: User | null;
  profile: Profile;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId?: string) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("role, founding_artist, origin, technique, bio, instagram, website, portfolio_url")
      .eq("id", userId)
      .maybeSingle();
    setProfile(data ?? null);
  };

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      loadProfile(data.session?.user.id).finally(() => {
        if (alive) setLoading(false);
      });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      loadProfile(newSession?.user.id);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    await loadProfile(session?.user.id);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Ctx.Provider value={{ session, user: session?.user ?? null, profile, loading, refreshProfile, signOut }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
