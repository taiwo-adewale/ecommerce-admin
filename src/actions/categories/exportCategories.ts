"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";

export async function exportCategories() {
  const supabase = createServerActionClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error(`Error fetching categories:`, error);
    return { error: `Failed to fetch data for categories.` };
  }

  return { data };
}
