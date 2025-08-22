"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteProducts(
  productIds: string[]
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: productsData, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .in("id", productIds);

  if (fetchError) {
    console.error("Failed to fetch products for deletion:", fetchError);
    return { dbError: "Could not find the products to delete." };
  }

  const imageFileNames =
    productsData
      ?.map((product) => product.image_url)
      .filter(Boolean)
      .map((url) => `products/${url.split("/").pop()}`) ?? [];

  if (imageFileNames.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("assets")
      .remove(imageFileNames);

    if (storageError) {
      console.error("Failed to delete product images:", storageError);
    }
  }

  const { error: dbError } = await supabase
    .from("products")
    .delete()
    .in("id", productIds);

  if (dbError) {
    console.error("Database bulk delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the products." };
  }

  revalidatePath("/products");

  return { success: true };
}
