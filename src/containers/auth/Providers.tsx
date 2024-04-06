"use client";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { siteUrl } from "@/constants/siteUrl";

type AuthProvider = "github" | "google";

type Props = {
  authType?: "Login" | "Signup";
};

export default function Providers({ authType = "Login" }: Props) {
  const supabase = createClientComponentClient();

  // Handle authentication with OAuth providers.
  const handleAuth = (authProvider: AuthProvider) => {
    supabase.auth.signInWithOAuth({
      provider: authProvider,
      options: {
        redirectTo: `${siteUrl}/auth/callback`, // Redirect URL after authentication
      },
    });
  };

  return (
    <div className="space-y-4 mb-10">
      <Button
        onClick={() => handleAuth("github")}
        variant="secondary"
        className="w-full min-h-14"
      >
        <FaGithub className="mr-3 size-4" />
        {authType} With Github
      </Button>

      <Button
        onClick={() => handleAuth("google")}
        variant="secondary"
        className="w-full min-h-14"
      >
        <FcGoogle className="mr-3 size-4" />
        {authType} With Google
      </Button>
    </div>
  );
}
