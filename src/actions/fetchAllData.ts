"use server";

import { Database } from "@/types/supabase";
import { createServerActionClient } from "@/lib/supabase/server-action";

export async function fetchAllData(
  tableName: keyof Database["public"]["Tables"]
) {
  const supabase = createServerActionClient();

  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return { error: `Failed to fetch data for ${tableName}.` };
  }

  return { data };
}
