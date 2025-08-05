"use client";
import React from "react";
import axios, { AxiosError } from "axios";
import OrSeparator from "../or-separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { ServerError } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string(),
  verificationCode: z.string(),
  fullName: z.string(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  email: string;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: (values: FormSchema) => void;
}

function RegisterConfirmationForm({ email, stepIndex, setStepIndex, onSubmit }: Props) {
  const form = useForm<FormSchema>({
    defaultValues: {
      email,
    },
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, errors } = form.formState;

  async function registerUser(values: FormSchema) {
    try {
      await axios.post("/api/register", values);
      onSubmit?.(values);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response?.data as ServerError;
      form.setError("root", {
        message: errorResponse?.error ? errorResponse.error : "Something went wrong",
      });
    }
  }

  return (
    <>
      <p className="text-center text-[15px]">
        We have send a verification code to your email <span className="font-semibold">{email}</span>
        <br />
        <span
          title="Not your email?"
          className="underline font-semibold cursor-pointer"
          onClick={() => {
            setStepIndex(0);
            form.reset({
              email: "",
              verificationCode: "",
              fullName: "",
              password: "",
            });
          }}
        >
          Not your email?
        </span>
      </p>
      <OrSeparator />
      <Form {...form}>
        <form id="register-form" className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(registerUser)}>
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem hidden={stepIndex === 0}>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="XXX-XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem hidden={stepIndex === 0}>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Krazinscki" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem hidden={stepIndex === 0}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
        </form>
      </Form>
      <Button form="register-form" className="text-base font-semibold" loading={isSubmitting} disabled={isSubmitting}>
        Create Account
      </Button>
      <p className="text-[15px] text-center">
        By creating an account you accept our{" "}
        <Link href="/terms" title="Terms and Conditions" className="underline font-semibold">
          Terms and Conditions
        </Link>
      </p>
    </>
  );
}

export default RegisterConfirmationForm;
