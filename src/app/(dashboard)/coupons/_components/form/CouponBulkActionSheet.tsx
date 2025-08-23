"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { FormSwitch } from "@/components/shared/form";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { couponBulkFormSchema, CouponBulkFormData } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { VServerActionResponse } from "@/types/server-action";

type Props = {
  children: React.ReactNode;
  onSuccess?: () => void;
  action: (formData: FormData) => Promise<VServerActionResponse>;
};

export default function CouponBulkActionSheet({
  children,
  action,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<CouponBulkFormData>({
    resolver: zodResolver(couponBulkFormSchema),
    defaultValues: {
      published: true,
    },
  });

  const onSubmit = (data: CouponBulkFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof CouponBulkFormData, {
            message: result.validationErrors![key],
          });
        });

        form.setFocus(
          Object.keys(result.validationErrors)[0] as keyof CouponBulkFormData
        );
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(`Coupons edited successfully!`, {
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
        setIsSheetOpen(false);
        onSuccess && onSuccess();
      }
    });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {children}

      <SheetContent className="w-[90%] max-w-5xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="size-full">
            <FormSheetContent>
              <FormSheetHeader>
                <div className="flex flex-col">
                  <SheetTitle>Update Selected Coupons</SheetTitle>
                  <SheetDescription>
                    Apply changes to the selected coupons from the list
                  </SheetDescription>
                </div>
              </FormSheetHeader>

              <FormSheetBody>
                <div className="space-y-6">
                  <FormSwitch
                    control={form.control}
                    name="published"
                    label="Published"
                  />
                </div>
              </FormSheetBody>

              <FormSheetFooter>
                <FormSubmitButton isPending={isPending} className="w-full">
                  Edit Coupons
                </FormSubmitButton>
              </FormSheetFooter>
            </FormSheetContent>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
