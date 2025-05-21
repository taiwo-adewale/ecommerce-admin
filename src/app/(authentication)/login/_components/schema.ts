import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
