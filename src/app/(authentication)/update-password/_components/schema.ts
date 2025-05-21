import * as z from "zod";

export const passwordUpdateFormSchema = z
  .object({
    password: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });
