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
  .instanceof(File, { message: "Staff image is required" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported"
  );

export const staffFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Staff name is required" })
    .max(100, "Staff name must be 100 characters or less"),
  phone: z
    .string()
    .regex(/^\+?[0-9]\d{1,14}$/, { message: "Invalid phone number format" })
    .optional()
    .or(z.literal("")),
  image: z.union([fileSchema, z.string().url()]),
});

export type StaffFormData = z.infer<typeof staffFormSchema>;
