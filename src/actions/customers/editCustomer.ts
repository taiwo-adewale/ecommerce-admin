"use server";

import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { customerFormSchema } from "@/app/(dashboard)/customers/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { CustomerServerActionResponse } from "@/types/server-action";

export async function editCustomer(
  customerId: string,
  formData: FormData
): Promise<CustomerServerActionResponse> {
  const supabase = createServerActionClient();

  const parsedData = customerFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  const customerData = parsedData.data;

  const { data: updatedCustomer, error: dbError } = await supabase
    .from("customers")
    .update({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
    })
    .eq("id", customerId)
    .select()
    .single();

  if (dbError) {
    console.error("Database update failed:", dbError);
    return { dbError: "Something went wrong. Please try again later." };
  }

  revalidatePath("/customers");
  revalidatePath(`/customer-orders/${updatedCustomer.id}`);

  return { success: true, customer: updatedCustomer };
}
