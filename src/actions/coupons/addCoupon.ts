"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { couponFormSchema } from "@/app/(dashboard)/coupons/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { CouponServerActionResponse } from "@/types/server-action";

export async function addCoupon(
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
    const fileExt = image.name.split(".").pop();
    const fileName = `coupons/${parsedData.data.name}-${Date.now()}.${fileExt}`;

    const { error: uploadError, data: uploadData } = await supabase.storage
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
  }

  const { data: newCoupon, error: dbError } = await supabase
    .from("coupons")
    .insert({
      campaign_name: couponData.name,
      code: couponData.code,
      start_date: couponData.startDate.toISOString(),
      end_date: couponData.endDate.toISOString(),
      discount_type: couponData.isPercentageDiscount ? "percentage" : "fixed",
      discount_value: couponData.discountValue,
      published: false,
      image_url: imageUrl as string,
    })
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

    console.error("Database insert failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/coupons");

  return { success: true, coupon: newCoupon };
}
