import { createServerActionClient as createClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export const createServerActionClient = () => {
  return createClient<Database>({ cookies });
};
