"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { productFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProductServerActionResponse } from "@/types/server-action";

export async function addProduct(
  formData: FormData
): Promise<ProductServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = productFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    sku: formData.get("sku"),
    category: formData.get("category"),
    costPrice: formData.get("costPrice"),
    salesPrice: formData.get("salesPrice"),
    stock: formData.get("stock"),
    minStockThreshold: formData.get("minStockThreshold"),
    slug: formData.get("slug"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  const { image, ...productData } = parsedData.data;

  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    const fileExt = image.name.split(".").pop();
    const fileName = `${parsedData.data.slug}-${Date.now()}.${fileExt}`;

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("product-images")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Image upload failed:", uploadError);
      return { validationErrors: { image: "Failed to upload image" } };
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(uploadData.path);

    imageUrl = publicUrlData.publicUrl;
  }

  const { data: newProduct, error: dbError } = await supabase
    .from("products")
    .insert({
      name: productData.name,
      description: productData.description,
      cost_price: productData.costPrice,
      selling_price: productData.salesPrice,
      stock: productData.stock,
      min_stock_threshold: productData.minStockThreshold,
      category_id: productData.category,
      slug: productData.slug,
      sku: productData.sku,
      published: false,
      image_url: imageUrl as string,
    })
    .select()
    .single();

  if (dbError) {
    console.error("Database insert failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/products");

  return { success: true, product: newProduct };
}
