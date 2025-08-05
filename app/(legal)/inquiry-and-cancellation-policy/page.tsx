import React from "react";
import { Metadata } from "next";
import FaqsSection from "@/components/faqs-section";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/inquiry-and-cancellation");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function InquiryAndCancellationPolicy() {
  const inquiryFaqs = await server.get("/page/faq/inquiry-and-cancellation");
  const cancellationFaqs = await server.get("/page/faq/cancellation");
  const content = await server.get<{ data: PageContent }>("/page/detail/inquiry-and-cancellation");

  return (
    <main>
      <div className="container py-8 max-w-4xl flex flex-col gap-10">
        <article className="prose mx-auto max-w-4xl">
          <h1 className="text-center mb-5 font-bebas-neue font-medium">Inquiry Policy</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: content.data.data.content1 ?? "",
            }}
          />
        </article>
        <FaqsSection
          title="Frequently Asked Questions"
          description="All your questions about the inquiry process with us answered here."
          faqs={inquiryFaqs.data.data ?? []}
        />
        <article className="prose mx-auto max-w-4xl">
          <h1 className="text-center mb-5 font-bebas-neue font-medium">Cancellation Policy</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: content.data.data.content2 ?? "",
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: content.data.data.content3 ?? "",
            }}
          />
        </article>
        <FaqsSection
          title="Frequently Asked Questions"
          description="All your questions about the cancellation policy with us answered here."
          faqs={cancellationFaqs.data.data ?? []}
        />
      </div>
    </main>
  );
}

export default InquiryAndCancellationPolicy;
export const dynamic = "force-static";
