import * as z from "zod";

export const passwordResetFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
});
