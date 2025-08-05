"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";

interface Props {
  type?: "contact" | "partner";
}

const formSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  phone_number: z.string(),
  description: z.string(),
  type: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

function ContactForm({ type = "contact" }: Props) {
  const form = useForm<FormSchema>({
    defaultValues: { type },
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting } = form.formState;

  async function handleSubmit(values: FormSchema) {
    try {
      await axios.post("/api/page/add-cta", values);
      sendDataToGTM("contact", values);
      toast.success("We will get back to you soon");
    } catch (error) {
      toast.error("Failed to submit contact form");
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+977-98614877946" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us how we can help you" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-base font-semibold w-fit" loading={isSubmitting} disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;
