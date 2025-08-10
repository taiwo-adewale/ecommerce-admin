"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function toggleProductPublishedStatus(
  productId: string,
  currentPublishedStatus: boolean
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const newPublishedStatus = !currentPublishedStatus;

  const { error: dbError } = await supabase
    .from("products")
    .update({ published: newPublishedStatus })
    .eq("id", productId);

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Failed to update product status." };
  }

  revalidatePath("/products");

  return { success: true };
}
