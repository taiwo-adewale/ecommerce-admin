"use client";

import { useState, useTransition } from "react";
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

import { categoryFormSchema } from "./schema";
import { categoryFormFields, CategoryFormData } from "./fields";
import { objectToFormData } from "@/helpers/objectToFormData";
import { CategoryServerActionResponse } from "@/types/server-action";

type BaseCategoryFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<CategoryServerActionResponse>;
};

type AddCategoryFormProps = BaseCategoryFormProps & {
  initialData?: never;
  previewImage?: never;
};

type EditCategoryFormProps = BaseCategoryFormProps & {
  initialData: Partial<CategoryFormData>;
  previewImage: string;
};

type CategoryFormProps = AddCategoryFormProps | EditCategoryFormProps;

export default function CategoryFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  previewImage,
  children,
  action,
}: CategoryFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      slug: "",
      ...initialData,
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof CategoryFormData, {
            message: result.validationErrors![key],
          });
        });
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(
          `Category "${result.category.name}" ${actionVerb} successfully!`,
          { position: "top-center" }
        );
        queryClient.invalidateQueries({ queryKey: ["categories"] });
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
                <div className="space-y-6">
                  {categoryFormFields.map((formField) => (
                    <FormField
                      key={formField.name}
                      form={form}
                      formField={formField}
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
