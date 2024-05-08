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
import { Checkbox } from "@/components/ui/checkbox";

import Providers from "./Providers";
import FormTemplate from "./FormTemplate";
import { signupFields } from "./fields";
import { signupFormSchema } from "./schemas";
import signupImg from "public/assets/signup.jpg";

type FormData = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/auth/sign-up", formData);
    },
    onSuccess: () => {
      toast({
        title: "Sign up Success",
        description:
          "You have successfully created an account. Redirecting to the dashboard...",
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
              disabled={isPending}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
