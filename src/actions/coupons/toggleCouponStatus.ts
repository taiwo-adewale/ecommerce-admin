"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { ServerActionResponse } from "@/types/server-action";

export async function toggleCouponPublishedStatus(
  couponId: string,
  currentPublishedStatus: boolean
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient();

  const newPublishedStatus = !currentPublishedStatus;

  const { error: dbError } = await supabase
    .from("coupons")
    .update({ published: newPublishedStatus })
    .eq("id", couponId);

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Failed to update coupon status." };
  }

  revalidatePath("/coupons");

  return { success: true };
}
