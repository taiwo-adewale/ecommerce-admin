"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";

export async function exportProducts() {
  const supabase = createServerActionClient();

  const selectQuery = `
    *,
    categories(name)
  `;

  const { data, error } = await supabase.from("products").select(selectQuery);

  if (error) {
    console.error(`Error fetching products:`, error);
    return { error: `Failed to fetch data for products.` };
  }

  return { data };
}
