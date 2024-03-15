"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
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

export default function LoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize the form using react-hook-form and zodResolver for schema-based validation.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "test@admin.com",
      password: "test12345",
    },
  });

  // Redirect to the dashboard when login is successful.
  useEffect(() => {
    if (success) {
      return redirect("/");
    }
  }, [success]);

  // Handle form submission.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setSuccess(false);
    setIsLoading(true);

    try {
      await axios.post("/auth/sign-in", {
        ...values,
      });

      // Show a success toast and reset the form on successful login.
      toast({
        title: "Login Success",
        description:
          "You have successfully logged in. Redirecting to the dashboard...",
        variant: "success",
      });

      setIsLoading(false);
      setSuccess(true);
      form.reset();
    } catch (e: any) {
      // Handle errors from the server and display them in the form.
      const { errors } = e.response.data;
      for (const key in errors) {
        if (errors[key]) {
          // @ts-ignore
          form.setError(key, {
            message: errors[key],
          });
        }
      }
      setIsLoading(false);
    }
  }

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
              disabled={isLoading}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
