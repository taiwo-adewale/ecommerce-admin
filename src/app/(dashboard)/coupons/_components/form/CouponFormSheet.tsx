"use client";

import { useRef, LegacyRef, useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

import {
  FormSheetContent,
  FormSheetBody,
  FormSheetHeader,
  FormSheetFooter,
} from "@/components/shared/form/FormSheet";
import {
  FormTextInput,
  FormImageInput,
  FormDatetimeInput,
  FormDiscountInput,
} from "@/components/shared/form";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { couponFormSchema, CouponFormData } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { CouponServerActionResponse } from "@/types/server-action";

type BaseCouponFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<CouponServerActionResponse>;
};

type AddCouponFormProps = BaseCouponFormProps & {
  initialData?: never;
  previewImage?: never;
};

type EditCouponFormProps = BaseCouponFormProps & {
  initialData: Partial<CouponFormData>;
  previewImage: string;
};

type CouponFormProps = AddCouponFormProps | EditCouponFormProps;

export default function CouponFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  previewImage,
  children,
  action,
}: CouponFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [container, setContainer] = useState(null);
  const imageDropzoneRef = useRef<HTMLDivElement>(null);

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      name: "",
      code: "",
      image: undefined,
      startDate: new Date(),
      endDate: new Date(),
      isPercentageDiscount: true,
      discountValue: 0,
      ...initialData,
    },
  });

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = (data: CouponFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof CouponFormData, {
            message: result.validationErrors![key],
          });
        });

        form.setFocus(
          Object.keys(result.validationErrors)[0] as keyof CouponFormData
        );
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(
          `Coupon "${result.coupon.campaign_name}" ${actionVerb} successfully!`,
          { position: "top-center" }
        );
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
        setIsSheetOpen(false);
      }
    });
  };

  const onInvalid = (errors: FieldErrors<CouponFormData>) => {
    if (errors.image) {
      imageDropzoneRef.current?.focus();
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {children}

      <SheetContent className="w-[90%] max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="size-full"
          >
            <FormSheetContent>
              <FormSheetHeader>
                <div className="flex flex-col">
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>{description}</SheetDescription>
                </div>
              </FormSheetHeader>

              <FormSheetBody>
                <div
                  className="space-y-6"
                  ref={setContainer as LegacyRef<HTMLDivElement>}
                >
                  <FormTextInput
                    control={form.control}
                    name="name"
                    label="Campaign Name"
                    placeholder="Campaign Name"
                  />

                  <FormTextInput
                    control={form.control}
                    name="code"
                    label="Campaign Code"
                    placeholder="Campaign Code"
                  />

                  <FormImageInput
                    control={form.control}
                    name="image"
                    label="Product Image"
                    previewImage={previewImage}
                    ref={imageDropzoneRef}
                  />

                  <FormDatetimeInput
                    control={form.control}
                    name="startDate"
                    label="Start Date / Time"
                    container={container || undefined}
                  />

                  <FormDatetimeInput
                    control={form.control}
                    name="endDate"
                    label="End Date / Time"
                    container={container || undefined}
                  />

                  <FormDiscountInput
                    control={form.control}
                    name="discountValue"
                    label="Discount"
                    placeholder="Discount"
                    isPercentageField="isPercentageDiscount"
                    form={form}
                  />
                </div>
              </FormSheetBody>

              <FormSheetFooter>
                <FormSubmitButton isPending={isPending} className="w-full">
                  {submitButtonText}
                </FormSubmitButton>
              </FormSheetFooter>
            </FormSheetContent>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
