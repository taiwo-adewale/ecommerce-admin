"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { productFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProductServerActionResponse } from "@/types/server-action";

export async function editProduct(
  productId: string,
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
    const { data: oldProductData, error: fetchError } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", productId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch old product data:", fetchError);
      return { dbError: "Could not find the product to update." };
    }

    const oldImageUrl = oldProductData.image_url;

    const fileExt = image.name.split(".").pop();
    const fileName = `products/${productData.slug}-${Date.now()}.${fileExt}`;

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
      const oldImageFileName = `products/${oldImageUrl.split("/").pop()}`;
      if (oldImageFileName) {
        await supabase.storage.from("assets").remove([oldImageFileName]);
      }
    }
  }

  const { data: updatedProduct, error: dbError } = await supabase
    .from("products")
    .update({
      name: productData.name,
      description: productData.description,
      cost_price: productData.costPrice,
      selling_price: productData.salesPrice,
      stock: productData.stock,
      min_stock_threshold: productData.minStockThreshold,
      category_id: productData.category,
      slug: productData.slug,
      sku: productData.sku,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq("id", productId)
    .select()
    .single();

  if (dbError) {
    if (dbError.code === "23505") {
      const match = dbError.details.match(/\(([^)]+)\)/);
      const uniqueColumn = match ? match[1] : null;

      if (uniqueColumn === "slug") {
        return {
          validationErrors: {
            slug: "This product slug is already in use. Please choose a different one.",
          },
        };
      } else if (uniqueColumn === "sku") {
        return {
          validationErrors: {
            sku: "This product SKU is already assigned to an existing item. Please enter a different SKU.",
          },
        };
      }
    }

    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${updatedProduct.slug}`);

  return { success: true, product: updatedProduct };
}
