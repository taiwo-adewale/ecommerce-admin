"use client";

import { useState, useEffect, useTransition } from "react";
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
import { FormTextInput } from "@/components/shared/form";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { customerFormSchema, CustomerFormData } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { CustomerServerActionResponse } from "@/types/server-action";

type BaseCustomerFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<CustomerServerActionResponse>;
};

type AddCustomerFormProps = BaseCustomerFormProps & {
  initialData?: never;
};

type EditCustomerFormProps = BaseCustomerFormProps & {
  initialData: Partial<CustomerFormData>;
};

type CustomerFormProps = AddCustomerFormProps | EditCustomerFormProps;

export default function CustomerFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  children,
  action,
}: CustomerFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ...initialData,
    },
  });

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = (data: CustomerFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof CustomerFormData, {
            message: result.validationErrors![key],
          });
        });
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(
          `Customer "${result.customer.name}" ${actionVerb} successfully!`,
          { position: "top-center" }
        );
        queryClient.invalidateQueries({ queryKey: ["customers"] });
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
                  <FormTextInput
                    control={form.control}
                    name="name"
                    label="Customer Name"
                    placeholder="Customer Name"
                  />

                  <FormTextInput
                    control={form.control}
                    name="email"
                    label="Customer Email"
                    placeholder="Customer Email"
                  />

                  <FormTextInput
                    control={form.control}
                    name="phone"
                    label="Customer Phone"
                    placeholder="Customer Phone"
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
