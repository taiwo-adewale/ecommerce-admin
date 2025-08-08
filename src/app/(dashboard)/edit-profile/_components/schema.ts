import * as z from "zod";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const editProfileFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  number: z.string(),
  profilePicture: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE_MB}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional(),
});
