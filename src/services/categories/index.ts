import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import { CategoryDropdown } from "./types";

export async function fetchCategoriesDropdown(
  client: SupabaseClient<Database>
): Promise<CategoryDropdown[]> {
  const { data, error } = await client.from("categories").select("name, slug");

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}
