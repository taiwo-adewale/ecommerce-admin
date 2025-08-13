"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function deleteCoupon(
  couponId: string
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const { data: couponData, error: fetchError } = await supabase
    .from("coupons")
    .select("image_url")
    .eq("id", couponId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch coupon for deletion:", fetchError);
    return { dbError: "Could not find the coupon to delete." };
  }

  const imageUrl = couponData?.image_url;

  if (imageUrl) {
    const imageFileName = `coupons/${imageUrl.split("/").pop()}`;

    if (imageFileName) {
      const { error: storageError } = await supabase.storage
        .from("assets")
        .remove([imageFileName]);

      if (storageError) {
        console.error("Failed to delete coupon image:", storageError);
      }
    }
  }

  const { error: dbError } = await supabase
    .from("coupons")
    .delete()
    .eq("id", couponId);

  if (dbError) {
    console.error("Database delete failed:", dbError);
    return { dbError: "Something went wrong. Could not delete the coupon." };
  }

  revalidatePath("/coupons");

  return { success: true };
}
