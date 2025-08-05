"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import InquiryForm from "./inquiry-form";
import BookNowForm from "./book-now-form";
import { cn } from "@/lib/utils";
import { useProduct } from "../_hooks/product-provider";

interface Props {
  defaultTab?: string;
  dateType?: "single" | "double";
  className?: string;
}

function BookingForms({ defaultTab = "inquire-availability", className, dateType }: Props) {
  const product = useProduct();
  return (
    <div className={cn("border border-border rounded-2xl p-4 bg-white", className)}>
      <Tabs defaultValue={defaultTab}>
        <TabsList className="w-full bg-muted">
          <TabsTrigger
            className="aria-selected:!bg-white aria-selected:!text-black !font-medium w-full"
            value="inquire-availability"
          >
            Inquire Availability
          </TabsTrigger>
          <TabsTrigger
            className="aria-selected:!bg-white aria-selected:!text-black !font-medium w-full"
            value="book-now"
          >
            Book Now
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inquire-availability">
          <InquiryForm
            dateType={dateType}
            product={{
              id: product.id,
              type: product.type,
              name: product.name,
              location: product.location,
              averageRating: product.average_rating,
              featuredImage: product.files.featuredImage,
              relatedProducts: [...product.related_experiences, ...product.related_homestays],
              prices: product.prices,
            }}
          />
        </TabsContent>
        <TabsContent value="book-now">
          <BookNowForm dateType={dateType} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BookingForms;
