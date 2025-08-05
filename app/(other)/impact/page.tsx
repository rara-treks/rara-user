import React from "react";
import { Metadata } from "next";

import HeroSection from "./_components/hero-section";
import Content from "./_components/content";
import CHNPartners from "@/components/chn-partners";
import FaqsSection from "@/components/faqs-section";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/impact");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function Impact() {
  const content = await server.get<{ data: PageContent }>("/page/detail/impact");
  const faqs = await server.get("/page/faq/impact");

  return (
    <main>
      <HeroSection
        title={content.data.data.title}
        description={content.data.data.header ?? ""}
        image={content.data.data.featuredImage}
      />
      <div className="container py-8">
        <Content content={content.data.data.content1 ?? ""} />
        <div className="max-w-4xl mx-auto">
          <CHNPartners title="Our Impact Partners" />
          <FaqsSection
            className="mt-10"
            title="Frequently Asked Questions"
            description="All your questions about the inquiry process with us answered here."
            faqs={faqs.data.data ?? []}
          />
        </div>
      </div>
    </main>
  );
}

export default Impact;
export const dynamic = "force-static";
