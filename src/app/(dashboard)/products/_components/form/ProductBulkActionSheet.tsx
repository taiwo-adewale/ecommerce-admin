"use client";

import React, { useState, useTransition, useRef, LegacyRef } from "react";
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
import { FormSwitch, FormCategoryInput } from "@/components/shared/form";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { productBulkFormSchema, ProductBulkFormData } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { VServerActionResponse } from "@/types/server-action";

type Props = {
  children: React.ReactNode;
  onSuccess?: () => void;
  action: (formData: FormData) => Promise<VServerActionResponse>;
};

export default function ProductBulkActionSheet({
  children,
  action,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [container, setContainer] = useState(null);
  const categoryRef = useRef<HTMLButtonElement>(null);

  const form = useForm<ProductBulkFormData>({
    resolver: zodResolver(productBulkFormSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = (data: ProductBulkFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof ProductBulkFormData, {
            message: result.validationErrors![key],
          });
        });

        form.setFocus(
          Object.keys(result.validationErrors)[0] as keyof ProductBulkFormData
        );
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(`Products edited successfully!`, {
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
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
                  <SheetTitle>Update Selected Products</SheetTitle>
                  <SheetDescription>
                    Apply changes to the selected products from the list
                  </SheetDescription>
                </div>
              </FormSheetHeader>

              <FormSheetBody>
                <div
                  className="space-y-6"
                  ref={setContainer as LegacyRef<HTMLDivElement>}
                >
                  <FormCategoryInput
                    control={form.control}
                    name="category"
                    label="Category"
                    container={container || undefined}
                    ref={categoryRef}
                  />

                  <FormSwitch
                    control={form.control}
                    name="published"
                    label="Published"
                  />
                </div>
              </FormSheetBody>

              <FormSheetFooter>
                <FormSubmitButton isPending={isPending} className="w-full">
                  Edit Products
                </FormSubmitButton>
              </FormSheetFooter>
            </FormSheetContent>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
