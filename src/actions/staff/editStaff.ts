"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { staffFormSchema } from "@/app/(dashboard)/staff/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { StaffServerActionResponse } from "@/types/server-action";

export async function editStaff(
  staffId: string,
  formData: FormData
): Promise<StaffServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = staffFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    image: formData.get("image"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  const { image, ...staffData } = parsedData.data;

  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    const { data: oldStaffData, error: fetchError } = await supabase
      .from("staff")
      .select("email, image_url")
      .eq("id", staffId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch old staff data:", fetchError);
      return { dbError: "Could not find the staff to update." };
    }

    const oldImageUrl = oldStaffData.image_url;

    const fileExt = image.name.split(".").pop();
    const fileName = `staff/${oldStaffData.email}-${Date.now()}.${fileExt}`;

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
      const oldImageFileName = `staff/${oldImageUrl.split("/").pop()}`;

      if (oldImageFileName) {
        await supabase.storage.from("assets").remove([oldImageFileName]);
      }
    }
  }

  const { data: updatedStaff, error: dbError } = await supabase
    .from("staff")
    .update({
      name: staffData.name,
      phone: staffData.phone,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq("id", staffId)
    .select()
    .single();

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/staff");

  return { success: true, staff: updatedStaff };
}
