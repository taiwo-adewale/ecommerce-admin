"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteStaff(
  staffId: string
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: staffData, error: fetchError } = await supabase
    .from("staff")
    .select("image_url")
    .eq("id", staffId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch staff for deletion:", fetchError);
    return { dbError: "Could not find the staff to delete." };
  }

  const imageUrl = staffData?.image_url;

  if (imageUrl) {
    const imageFileName = `staff/${imageUrl.split("/").pop()}`;

    if (imageFileName) {
      const { error: storageError } = await supabase.storage
        .from("assets")
        .remove([imageFileName]);

      if (storageError) {
        console.error("Failed to delete staff image:", storageError);
      }
    }
  }

  const { error: dbError } = await supabase
    .from("staff")
    .delete()
    .eq("id", staffId);

  if (dbError) {
    console.error("Database delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the staff." };
  }

  revalidatePath("/staff");

  return { success: true };
}
