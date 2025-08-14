"use client";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { passwordUpdateFields } from "./fields";
import { passwordUpdateFormSchema } from "./schema";

type FormData = z.infer<typeof passwordUpdateFormSchema>;

export default function PasswordUpdateForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const form = useForm<FormData>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!code) {
      return redirect("/login");
    }
  }, [code]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/auth/update-password", {
        ...formData,
        code,
      });
    },
    onSuccess: () => {
      toast.success("Password Updated Successfully!", {
        description: "Please log in with your new password.",
        position: "top-center",
      });

      form.reset();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const { errors } = error.response?.data;

        for (const key in errors) {
          if (errors[key]) {
            form.setError(key as keyof FormData, {
              message: errors[key],
            });
          }
        }
      } else {
        console.error(error);
      }
    },
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      return redirect("/login");
    }
  }, [isSuccess]);

  return (
    <div className="w-full">
      <Typography variant="h2" className="mb-4">
        Update Password
      </Typography>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-6">
          {passwordUpdateFields.map((formField) => (
            <FormField
              key={`form-field-${formField.name}`}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={formField.inputType}
                      placeholder={formField.placeholder}
                      autoComplete={formField.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormSubmitButton isPending={isPending} className="w-full">
            Update password
          </FormSubmitButton>
        </form>
      </Form>
    </div>
  );
}
