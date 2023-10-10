import { cookies } from "next/headers";
import {
  Session,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

/**
 * isAuth - Function to check if a user is authenticated using Supabase.
 * @returns A Promise that resolves to the session data if authenticated, or null if not authenticated.
 */
export default async function isAuth(): Promise<Session | null> {
  const supabase = createServerComponentClient({ cookies });

  // Call Supabase's getSession() method to retrieve session data.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Return the session data obtained from Supabase, or null if not authenticated.
  return session;
}
