"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { couponFormSchema } from "@/app/(dashboard)/coupons/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { CouponServerActionResponse } from "@/types/server-action";

export async function editCoupon(
  couponId: string,
  formData: FormData
): Promise<CouponServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = couponFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    isPercentageDiscount: formData.get("isPercentageDiscount") === "true",
    discountValue: formData.get("discountValue"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  const { image, ...couponData } = parsedData.data;

  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    const { data: oldCouponData, error: fetchError } = await supabase
      .from("coupons")
      .select("image_url")
      .eq("id", couponId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch old coupon data:", fetchError);
      return { dbError: "Could not find the coupon to update." };
    }

    const oldImageUrl = oldCouponData.image_url;

    const fileExt = image.name.split(".").pop();
    const fileName = `coupons/${couponData.code}-${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("assets")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Image upload failed:", uploadError);
      return { validationErrors: { image: "Failed to upload image" } };
    }

    const { data: publicUrlData } = supabase.storage
      .from("assets")
      .getPublicUrl(uploadData.path);

    imageUrl = publicUrlData.publicUrl;

    if (oldImageUrl) {
      const oldImageFileName = `coupons/${oldImageUrl.split("/").pop()}`;

      if (oldImageFileName) {
        await supabase.storage.from("assets").remove([oldImageFileName]);
      }
    }
  }

  const { data: updatedCoupon, error: dbError } = await supabase
    .from("coupons")
    .update({
      campaign_name: couponData.name,
      code: couponData.code,
      start_date: couponData.startDate.toISOString(),
      end_date: couponData.endDate.toISOString(),
      discount_type: couponData.isPercentageDiscount ? "percentage" : "fixed",
      discount_value: couponData.discountValue,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq("id", couponId)
    .select()
    .single();

  if (dbError) {
    if (dbError.code === "23505") {
      const match = dbError.details.match(/\(([^)]+)\)/);
      const uniqueColumn = match ? match[1] : null;

      if (uniqueColumn === "code") {
        return {
          validationErrors: {
            code: "This coupon code is already in use. Please create a unique code for your new coupon.",
          },
        };
      }
    }

    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/coupons");

  return { success: true, coupon: updatedCoupon };
}
