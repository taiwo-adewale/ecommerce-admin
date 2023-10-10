import { cookies } from "next/headers";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

/**
 * getUser - Function to retrieve user information from Supabase.
 * @returns A Promise that resolves to the user data.
 */
export default async function getUser(): Promise<User | null> {
  const supabase = createServerComponentClient({ cookies });

  // Call Supabase's getUser() method to retrieve user data.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Return the user data obtained from Supabase.
  return user;
}
