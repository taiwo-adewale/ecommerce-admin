"use client";

import { useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";

import {
  FormSheetContent,
  FormSheetBody,
  FormSheetHeader,
  FormSheetFooter,
} from "@/components/shared/form/FormSheet";
import { FormField } from "@/components/shared/form/FormField";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { addProductSchema } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { addProduct } from "@/actions/addProduct";
import { addProductFields, ProductFormData } from "./fields";

type Props = {
  handleSheetClose: () => void;
};

export default function AddProduct({ handleSheetClose }: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const portalContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(addProductSchema),
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
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await addProduct(formData);

      if (result.validationErrors) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof ProductFormData, {
            message: result.validationErrors[key],
          });
        });
      } else if (result.dbError) {
        toast.error(result.dbError);
      } else if (result.success) {
        form.reset();
        toast.success(`Product "${result.product.name}" added successfully!`, {
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        handleSheetClose();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="size-full">
        <FormSheetContent>
          <FormSheetHeader>
            <div className="flex flex-col">
              <SheetTitle>Add Product</SheetTitle>
              <SheetDescription>
                Add necessary product information here
              </SheetDescription>
            </div>
          </FormSheetHeader>

          <FormSheetBody>
            <div className="space-y-6" ref={portalContainerRef}>
              {addProductFields.map((formField) => (
                <FormField
                  key={formField.name}
                  form={form}
                  formField={formField}
                  portalContainer={
                    formField.inputType === "category"
                      ? portalContainerRef.current || undefined
                      : undefined
                  }
                />
              ))}
            </div>
          </FormSheetBody>

          <FormSheetFooter>
            <FormSubmitButton isPending={isPending}>
              Add Product
            </FormSubmitButton>
          </FormSheetFooter>
        </FormSheetContent>
      </form>
    </Form>
  );
}
