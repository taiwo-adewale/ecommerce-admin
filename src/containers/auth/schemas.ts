import * as z from "zod";

// Login schema
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

// Sign up schema
export const signupFormSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    privacy: z.literal(true, {
      errorMap: () => ({ message: "You must agree to our privacy policy" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

// Password reset schema
export const passwordResetFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
});

// Password update schema
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
