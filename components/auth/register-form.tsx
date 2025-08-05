"use client";
import React from "react";
import axios, { AxiosError } from "axios";
import OrSeparator from "../or-separator";
import Link from "next/link";
import SocialLoginButton from "./social-login-button";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ServerError } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterConfirmationForm from "./register-confirmation-form";

const formSchema = z.object({
  email: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: (values: FormSchema) => void;
}

function RegisterForm({ stepIndex, setStepIndex, onSubmit }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, errors } = form.formState;
  const email = form.watch("email");

  async function sendVerificationMail(values: FormSchema) {
    try {
      await axios.post("/api/register/send-mail", values);
      setStepIndex(1);
      return;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response?.data as ServerError;
      form.setError("root", {
        message: errorResponse?.error ? errorResponse.error : "Something went wrong",
      });
    }
  }

  if (stepIndex === 1) {
    return (
      <RegisterConfirmationForm email={email} stepIndex={stepIndex} setStepIndex={setStepIndex} onSubmit={onSubmit} />
    );
  }

  return (
    <>
      <SocialLoginButton provider="google" />
      <OrSeparator />
      <Form {...form}>
        <form
          id="register-form"
          className="flex flex-col gap-[10px]"
          onSubmit={form.handleSubmit(sendVerificationMail)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johnfrans@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
        </form>
      </Form>
      <Button form="register-form" className="text-base font-semibold" loading={isSubmitting} disabled={isSubmitting}>
        Continue
      </Button>
      <p className="text-[15px] text-center">
        Already have an account?{" "}
        <Link href="/login" title="Sign In" className="underline font-semibold">
          Sign In
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
