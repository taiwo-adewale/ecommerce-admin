"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteCategory(
  categoryId: string
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: categoryData, error: fetchError } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", categoryId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch category for deletion:", fetchError);
    return { dbError: "Could not find the category to delete." };
  }

  const imageUrl = categoryData?.image_url;

  if (imageUrl) {
    const imageFileName = `categories/${imageUrl.split("/").pop()}`;

    if (imageFileName) {
      const { error: storageError } = await supabase.storage
        .from("assets")
        .remove([imageFileName]);

      if (storageError) {
        console.error("Failed to delete category image:", storageError);
      }
    }
  }

  const { error: dbError } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (dbError) {
    console.error("Database delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the category." };
  }

  revalidatePath("/categories");

  return { success: true };
}
