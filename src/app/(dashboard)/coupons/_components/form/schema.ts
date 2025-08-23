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
  .instanceof(File, { message: "Coupon image is required" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported"
  );

export const couponFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Campaign name is required" })
      .max(100, "Campaign name must be 100 characters or less"),
    code: z
      .string()
      .min(1, { message: "Campaign code is required" })
      .regex(/^[0-9A-Z]+$/, {
        message: "Code must contain only numbers and capital letters",
      })
      .max(100, "Campaign code must be 100 characters or less"),
    image: z.union([fileSchema, z.string().url()]),
    startDate: z.coerce.date({
      invalid_type_error: "Start date must be a valid date",
    }),
    endDate: z.coerce.date({
      invalid_type_error: "End date must be a valid date",
    }),
    isPercentageDiscount: z.coerce.boolean(),
    discountValue: z.coerce
      .number({
        invalid_type_error: "Discount value must be a number",
      })
      .min(1, { message: "Discount value must be greater than 0" }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after the start date",
        path: ["endDate"],
      });
    }

    if (data.isPercentageDiscount && data.discountValue > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Percentage discount cannot be more than 100",
        path: ["discountValue"],
      });
    }
  });

export const couponBulkFormSchema = z.object({
  published: z.coerce.boolean(),
});

export type CouponFormData = z.infer<typeof couponFormSchema>;
export type CouponBulkFormData = z.infer<typeof couponBulkFormSchema>;
