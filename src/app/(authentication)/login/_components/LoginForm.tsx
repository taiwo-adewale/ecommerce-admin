"use client";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Separator } from "@/components/ui/separator";
import { FormSubmitButton } from "@/components/shared/form/FormSubmitButton";

import { loginFields } from "./fields";
import { loginFormSchema } from "./schema";
import AuthProviders from "@/components/shared/auth/AuthProviders";

type FormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "test@admin.com",
      password: "test12345",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/auth/sign-in", formData);
    },
    onSuccess: () => {
      toast.success("Login Success!", {
        description: searchParams.get("redirect_to")
          ? "Redirecting to your page..."
          : "Redirecting to the dashboard...",
        position: "top-center",
      });

      form.reset();
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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
      const redirectTo = searchParams.get("redirect_to");

      return redirect(redirectTo || "/");
    }
  }, [isSuccess, searchParams]);

  return (
    <div className="w-full">
      <Typography variant="h2" className="mb-8">
        Login
      </Typography>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {loginFields.map((formField) => (
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
            Login
          </FormSubmitButton>
        </form>
      </Form>

      <Separator className="my-12" />

      <AuthProviders />

      <div className="flex flex-wrap justify-between gap-4 w-full">
        <Typography variant="a" href="/forgot-password" className="md:!text-sm">
          Forgot password?
        </Typography>
        <Typography variant="a" href="/signup" className="md:!text-sm">
          Create an account
        </Typography>
      </div>
    </div>
  );
}
