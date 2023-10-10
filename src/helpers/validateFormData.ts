import { z, ZodSchema } from "zod";

/**
 * Validates form data against a Zod schema and returns any validation errors.
 * @param formSchema - The Zod schema to validate against.
 * @param inputs - The form data to validate.
 * @returns An object containing validation errors or null if no errors were found.
 */
export default function validateFormData<T extends ZodSchema<any>>(
  formSchema: T,
  inputs: z.infer<typeof formSchema>
): {
  errors: Record<string, string> | null;
} {
  // Initialize an empty object to store validation errors.
  const errors: Record<string, string> = {};

  try {
    // Attempt to parse the form data using the provided schema.
    formSchema.parse(inputs);
  } catch (err: any) {
    // If a validation error is caught, extract field-specific errors.
    const { fieldErrors } = err.flatten();

    // Iterate through the field errors and store the first error for each field.
    for (const key in fieldErrors) {
      if (fieldErrors.hasOwnProperty(key)) {
        errors[key] = fieldErrors[key][0];
      }
    }
  }

  // Return an object containing validation errors (if any) or null if no errors were found.
  return { errors: Object.keys(errors).length === 0 ? null : errors };
}
