"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { profileFormSchema } from "@/app/(dashboard)/edit-profile/_components/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProfileServerActionResponse } from "@/types/server-action";

export async function editProfile(
  userId: string,
  formData: FormData
): Promise<ProfileServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = profileFormSchema.safeParse({
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

  const { image, ...profileData } = parsedData.data;

  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    const { data: oldProfileData, error: fetchError } = await supabase
      .from("staff")
      .select("email, image_url")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch profile details:", fetchError);
      return { dbError: "Could not fetch your profile details." };
    }

    const oldImageUrl = oldProfileData.image_url;

    const fileExt = image.name.split(".").pop();
    const fileName = `staff/${oldProfileData.email}-${Date.now()}.${fileExt}`;

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

  const { error: dbError } = await supabase
    .from("staff")
    .update({
      name: profileData.name,
      phone: profileData.phone,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq("id", userId)
    .select()
    .single();

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/edit-profile");

  return { success: true };
}
