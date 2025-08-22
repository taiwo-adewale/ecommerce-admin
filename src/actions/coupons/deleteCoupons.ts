"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteCoupons(
  couponIds: string[]
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: couponsData, error: fetchError } = await supabase
    .from("coupons")
    .select("image_url")
    .in("id", couponIds);

  if (fetchError) {
    console.error("Failed to fetch coupons for deletion:", fetchError);
    return { dbError: "Could not find the coupons to delete." };
  }

  const imageFileNames =
    couponsData
      ?.map((coupon) => coupon.image_url)
      .filter(Boolean)
      .map((url) => `coupons/${url.split("/").pop()}`) ?? [];

  if (imageFileNames.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("assets")
      .remove(imageFileNames);

    if (storageError) {
      console.error("Failed to delete coupon images:", storageError);
    }
  }

  const { error: dbError } = await supabase
    .from("coupons")
    .delete()
    .in("id", couponIds);

  if (dbError) {
    console.error("Database bulk delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the coupons." };
  }

  revalidatePath("/coupons");

  return { success: true };
}
