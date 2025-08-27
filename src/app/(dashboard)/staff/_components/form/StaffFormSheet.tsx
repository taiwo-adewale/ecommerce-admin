"use client";

import { useRef, useState, useTransition, useEffect } from "react";
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
  FormReadonly,
} from "@/components/shared/form";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { staffFormSchema, StaffFormData } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { StaffServerActionResponse } from "@/types/server-action";
import { useUser } from "@/contexts/UserContext";

type BaseStaffFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<StaffServerActionResponse>;
};

type EditStaffFormProps = BaseStaffFormProps & {
  initialData: Partial<StaffFormData>;
  previewImage?: string;
  staffEmail: string;
};

type StaffFormProps = EditStaffFormProps;

export default function StaffFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  previewImage,
  staffEmail,
  children,
  action,
}: StaffFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const imageDropzoneRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      image: undefined,
      ...initialData,
    },
  });

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = (data: StaffFormData) => {
    const formData = objectToFormData(data);

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof StaffFormData, {
            message: result.validationErrors![key],
          });
        });
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset();
        toast.success(
          `Staff "${result.staff.name}" ${actionVerb} successfully!`,
          { position: "top-center" }
        );
        queryClient.invalidateQueries({ queryKey: ["staff"] });
        if (user && user.id === result.staff.id) {
          queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        }

        setIsSheetOpen(false);
      }
    });
  };

  const onInvalid = (errors: FieldErrors<StaffFormData>) => {
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
                <div className="space-y-6">
                  <FormTextInput
                    control={form.control}
                    name="name"
                    label="Staff Name"
                    placeholder="Staff Name"
                  />

                  <FormReadonly label="Staff Email" value={staffEmail} />

                  <FormImageInput
                    control={form.control}
                    name="image"
                    label="Staff Image"
                    previewImage={previewImage}
                    ref={imageDropzoneRef}
                  />

                  <FormTextInput
                    control={form.control}
                    name="phone"
                    label="Staff Phone"
                    placeholder="Staff Phone"
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
