"use client";

import { LegacyRef, useState, useTransition } from "react";
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
import { FormField } from "@/components/shared/form/FormField";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { productFormSchema } from "./schema";
import { productFormFields, ProductFormData } from "./fields";
import { objectToFormData } from "@/helpers/objectToFormData";
import { ProductServerActionResponse } from "@/types/server-action";

type BaseProductFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<ProductServerActionResponse>;
};

type AddProductFormProps = BaseProductFormProps & {
  initialData?: never;
  previewImage?: never;
};

type EditProductFormProps = BaseProductFormProps & {
  initialData: Partial<ProductFormData>;
  previewImage: string;
};

type ProductFormProps = AddProductFormProps | EditProductFormProps;

export default function ProductFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  previewImage,
  children,
  action,
}: ProductFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [container, setContainer] = useState(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      sku: "",
      category: "",
      costPrice: 0,
      salesPrice: 0,
      stock: 0,
      minStockThreshold: 0,
      slug: "",
      ...initialData,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof ProductFormData, {
            message: result.validationErrors![key],
          });
        });
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(
          `Product "${result.product.name}" ${actionVerb} successfully!`,
          { position: "top-center" }
        );
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setIsSheetOpen(false);
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
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>{description}</SheetDescription>
                </div>
              </FormSheetHeader>

              <FormSheetBody>
                <div
                  className="space-y-6"
                  ref={setContainer as LegacyRef<HTMLDivElement>}
                >
                  {productFormFields.map((formField) => (
                    <FormField
                      key={formField.name}
                      form={form}
                      formField={formField}
                      portalContainer={
                        formField.inputType === "category"
                          ? container || undefined
                          : undefined
                      }
                      previewImage={
                        previewImage && formField.inputType === "file"
                          ? previewImage
                          : undefined
                      }
                    />
                  ))}
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
