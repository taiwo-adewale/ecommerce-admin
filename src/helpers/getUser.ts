import { User } from "@supabase/auth-helpers-nextjs";

import { createServerClient } from "@/lib/supabase/server";
/**
 * getUser - Function to retrieve user information from Supabase.
 * @returns A Promise that resolves to the user data.
 */
export async function getUser(): Promise<User | null> {
  const supabase = createServerClient();

  // Call Supabase's getUser() method to retrieve user data.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Return the user data obtained from Supabase.
  return user;
}
