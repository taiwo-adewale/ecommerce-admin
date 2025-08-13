"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteCustomer(
  customerId: string
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { error: dbError } = await supabase
    .from("customers")
    .delete()
    .eq("id", customerId);

  if (dbError) {
    console.error("Database delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the customer." };
  }

  revalidatePath("/customers");

  return { success: true };
}
