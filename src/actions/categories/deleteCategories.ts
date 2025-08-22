"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteCategories(
  categoryIds: string[]
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: categoriesData, error: fetchError } = await supabase
    .from("categories")
    .select("image_url")
    .in("id", categoryIds);

  if (fetchError) {
    console.error("Failed to fetch categories for deletion:", fetchError);
    return { dbError: "Could not find the categories to delete." };
  }

  const imageFileNames =
    categoriesData
      ?.map((category) => category.image_url)
      .filter(Boolean)
      .map((url) => `categories/${url.split("/").pop()}`) ?? [];

  if (imageFileNames.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("assets")
      .remove(imageFileNames);

    if (storageError) {
      console.error("Failed to delete category images:", storageError);
    }
  }

  const { error: dbError } = await supabase
    .from("categories")
    .delete()
    .in("id", categoryIds);

  if (dbError) {
    console.error("Database bulk delete failed:", dbError);
    return {
      dbError: "Something went wrong. Could not delete the categories.",
    };
  }

  revalidatePath("/categories");

  return { success: true };
}
