"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";

export async function exportCoupons() {
  const supabase = createServerActionClient();

  const { data, error } = await supabase.from("coupons").select("*");

  if (error) {
    console.error(`Error fetching coupons:`, error);
    return { error: `Failed to fetch data for coupons.` };
  }

  return { data };
}
