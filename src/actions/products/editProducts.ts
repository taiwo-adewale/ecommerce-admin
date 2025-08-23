"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { productBulkFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { VServerActionResponse } from "@/types/server-action";

export async function editProducts(
  productIds: string[],
  formData: FormData
): Promise<VServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = productBulkFormSchema.safeParse({
    category:
      formData.get("category") === "" ? undefined : formData.get("category"),
    published:
      formData.get("published") === null
        ? undefined
        : !!(formData.get("published") === "true"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  const { category, published } = parsedData.data;

  const { error: dbError } = await supabase
    .from("products")
    .update({
      category_id: category ? category : undefined,
      published: typeof published === "undefined" ? undefined : published,
    })
    .in("id", productIds);

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/products");

  return { success: true };
}
