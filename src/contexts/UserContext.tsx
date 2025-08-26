"use client";

import { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

import { Tables } from "@/types/supabase";
import { createBrowserClient } from "@/lib/supabase/client";

export type UserRole = Tables<"staff_roles">["name"];

type UserContextType = {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
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
      const { data: role } = await supabase.rpc("get_my_role");
      return { user: session.user, role: role as UserRole };
    },
    staleTime: Infinity,
  });

  const value = {
    user: data?.user ?? null,
    role: data?.role ?? null,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
