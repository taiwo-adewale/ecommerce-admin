"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";

export async function exportCustomers() {
  const supabase = createServerActionClient();

  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    console.error(`Error fetching customers:`, error);
    return { error: `Failed to fetch data for customers.` };
  }

  return { data };
}
