"use client";

import axios from "axios";
import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

import Providers from "./Providers";
import FormTemplate from "./FormTemplate";
import { signupFields } from "./fields";
import { signupFormSchema } from "./schemas";
import signupImg from "public/assets/signup.jpg";

export default function SignupForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Initialize the form using react-hook-form and zodResolver for schema-based validation.
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect to the dashboard when sign up is successful.
  useEffect(() => {
    if (success) {
      return redirect("/");
    }
  }, [success]);

  // Handle form submission.
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setSuccess(false);
    setIsLoading(true);

    try {
      await axios.post("/auth/sign-up", {
        ...values,
      });

      // Show a success toast and reset the form on successful sign up.
      toast({
        title: "Sign up Success",
        description:
          "You have successfully created an account. Redirecting to the dashboard...",
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
    <FormTemplate image={signupImg}>
      <div className="w-full">
        <Typography variant="h2" className="mb-8">
          Create an Account
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {signupFields.map((formField) => (
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

            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormLabel className="!m-0">
                      I agree to the{" "}
                      <Typography
                        variant="a"
                        href="#"
                        className="md:!text-sm font-medium"
                      >
                        privacy policy
                      </Typography>
                    </FormLabel>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>
        </Form>

        <Separator className="my-12" />
        <Providers authType="Signup" />

        <div>
          <Typography variant="a" href="/login" className="md:!text-sm">
            Already have an account? Login
          </Typography>
        </div>
      </div>
    </FormTemplate>
  );
}
