import * as z from "zod";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .instanceof(File, { message: "Category image is required" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported"
  );

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(100, "Category name must be 100 characters or less"),
  description: z
    .string()
    .min(1, { message: "Category description is required" })
    .max(1000, "Category description must be 1000 characters or less"),
  image: z.union([fileSchema, z.string().url()]),
  slug: z
    .string()
    .min(1, { message: "Category slug is required" })
    .max(100, "Category slug must be 100 characters or less")
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Slug must be lowercase, alphanumeric, and use hyphens for spaces",
    }),
});

export const categoryBulkFormSchema = z.object({
  published: z.coerce.boolean(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
export type CategoryBulkFormData = z.infer<typeof categoryBulkFormSchema>;
