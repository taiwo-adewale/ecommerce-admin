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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import Providers from "./Providers";
import FormTemplate from "./FormTemplate";
import { loginFields } from "./fields";
import { loginFormSchema } from "./schemas";
import loginImg from "public/assets/login.jpg";

type FormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const { toast } = useToast();

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
      toast({
        title: "Login Success",
        description:
          "You have successfully logged in. Redirecting to the dashboard...",
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
      return redirect("/");
    }
  }, [isSuccess]);

  return (
    <FormTemplate image={loginImg}>
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
              Login
            </Button>
          </form>
        </Form>

        <Separator className="my-12" />

        <Providers />

        <div className="flex flex-wrap justify-between gap-4 w-full">
          <Typography
            variant="a"
            href="/forgot-password"
            className="md:!text-sm"
          >
            Forgot password?
          </Typography>
          <Typography variant="a" href="/signup" className="md:!text-sm">
            Create an account
          </Typography>
        </div>
      </div>
    </FormTemplate>
  );
}
