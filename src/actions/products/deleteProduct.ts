"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteProduct(
  productId: string
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: productData, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", productId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch product for deletion:", fetchError);
    return { dbError: "Could not find the product to delete." };
  }

  const imageUrl = productData?.image_url;

  if (imageUrl) {
    const imageFileName = imageUrl.split("/").pop();

    if (imageFileName) {
      const { error: storageError } = await supabase.storage
        .from("product-images")
        .remove([imageFileName]);

      if (storageError) {
        console.error("Failed to delete product image:", storageError);
      }
    }
  }

  const { error: dbError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (dbError) {
    console.error("Database delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the product." };
  }

  revalidatePath("/products");

  return { success: true };
}
