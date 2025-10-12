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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormSchema>({
    defaultValues: { type },
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting } = form.formState;

  async function handleSubmit(values: FormSchema) {
    try {
      await axios.post("/api/product/page/add-cta", values);
      sendDataToGTM("contact", values);
      setOpen(true); // open success dialog
      form.reset({ type });
    } catch (error) {
      toast.error("Failed to submit contact form");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
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
                  <Textarea
                    placeholder="Tell us how we can help you"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="text-base font-semibold w-fit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>

      {/* ✅ Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-green-600">
              Submission Successful 🎉
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Thank you for reaching out! We’ll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setOpen(false)}
            className="mt-4 w-full font-semibold"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ContactForm;
