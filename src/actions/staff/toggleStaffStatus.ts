"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function toggleStaffPublishedStatus(
  staffId: string,
  currentPublishedStatus: boolean
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const newPublishedStatus = !currentPublishedStatus;

  const { error: dbError } = await supabase
    .from("staff")
    .update({ published: newPublishedStatus })
    .eq("id", staffId);

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Failed to update staff status." };
  }

  revalidatePath("/staff");

  return { success: true };
}
