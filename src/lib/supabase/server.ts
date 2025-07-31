import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies });
};
