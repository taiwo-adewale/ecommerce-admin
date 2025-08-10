"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function toggleCategoryPublishedStatus(
  categoryId: string,
  currentPublishedStatus: boolean
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const newPublishedStatus = !currentPublishedStatus;

  const { error: dbError } = await supabase
    .from("categories")
    .update({ published: newPublishedStatus })
    .eq("id", categoryId);

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Failed to update category status." };
  }

  revalidatePath("/categories");

  return { success: true };
}
