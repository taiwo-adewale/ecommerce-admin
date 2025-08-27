"use client";

import { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

import { Tables } from "@/types/supabase";
import { createBrowserClient } from "@/lib/supabase/client";

export type UserRole = Tables<"staff_roles">["name"];

type UserProfile = {
  name: string | null;
  image_url: string | null;
  role: UserRole | null;
};

type UserContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createBrowserClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        return { user: null, role: null };
      }

      const { data: profile } = await supabase.rpc("get_my_profile");
      return { user: session.user, profile: profile as UserProfile };
    },
    staleTime: Infinity,
  });

  const value = {
    user: data?.user ?? null,
    profile: data?.profile ?? null,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
