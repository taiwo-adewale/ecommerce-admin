"use client";

import axios from "axios";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FormTemplate from "./FormTemplate";
import { passwordResetFields } from "./fields";
import { passwordResetFormSchema } from "./schemas";
import forgotPasswordImg from "public/assets/forgot-password.jpg";

type FormData = z.infer<typeof passwordResetFormSchema>;

export default function PasswordResetForm() {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/auth/forgot-password", formData);
    },
    onSuccess: () => {
      toast({
        title: "Password Reset Email Sent",
        description:
          "We've sent you an email with instructions to reset your password. Please check your inbox and follow the instructions.",
        variant: "success",
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
    <FormTemplate image={forgotPasswordImg}>
      <div className="w-full">
        <Typography variant="h2" className="mb-4">
          Forgot Password?
        </Typography>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pb-6"
          >
            {passwordResetFields.map((formField) => (
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              disabled={isPending}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Recover password
            </Button>
          </form>
        </Form>

        <div>
          <Typography variant="a" href="/signup" className="md:!text-sm">
            Don&apos;t have an account? Create one now
          </Typography>
        </div>
      </div>
    </FormTemplate>
  );
}
