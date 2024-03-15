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
import { useToast } from "@/components/ui/use-toast";

import FormTemplate from "./FormTemplate";
import { passwordResetFields } from "./fields";
import { passwordResetFormSchema } from "./schemas";
import forgotPasswordImg from "public/assets/forgot-password.jpg";

export default function PasswordResetForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize the form using react-hook-form and zodResolver for schema-based validation.
  const form = useForm<z.infer<typeof passwordResetFormSchema>>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Redirect to the login page when password reset is successful.
  useEffect(() => {
    if (success) {
      return redirect("/login");
    }
  }, [success]);

  // Handle form submission.
  async function onSubmit(values: z.infer<typeof passwordResetFormSchema>) {
    setSuccess(false);
    setIsLoading(true);

    try {
      await axios.post("/auth/forgot-password", {
        ...values,
      });

      // Show a success toast and reset the form on successful password reset.
      toast({
        title: "Password Reset Email Sent",
        description:
          "We've sent you an email with instructions to reset your password. Please check your inbox and follow the instructions.",
        variant: "success",
      });

      setIsLoading(false);
      setSuccess(true);
      form.reset();
    } catch (e: any) {
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
              disabled={isLoading}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Recover password
            </Button>
          </form>
        </Form>

        <div>
          <Typography variant="a" href="/login" className="md:!text-sm">
            Already have an account? Login
          </Typography>
        </div>
      </div>
    </FormTemplate>
  );
}
