import React from "react";
import { Metadata } from "next";
import FaqsSection from "@/components/faqs-section";
import ContactCard from "@/components/contact/contact-card";
import ContactForm from "@/components/contact/contact-form";
import CHNPartners from "@/components/chn-partners";
import JoinUs from "@/components/join-us";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/partner-with-us");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function PartnerWithUs() {
  const content = await server.get<{ data: PageContent }>("/page/detail/partner-with-us");
  const faqs = await server.get("/page/faq/partner");

  return (
    <main>
      <div className="container py-8 max-w-4xl flex flex-col gap-10">
        <section>
          <article className="prose max-w-4xl mx-auto">
            <h1 className="text-center mb-5 font-bebas-neue font-medium">Partner With Us</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: content.data.data.content1 ?? "",
              }}
            />
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
        </section>
        <CHNPartners title="Our Partners" />
        <FaqsSection
          title="Frequently Asked Questions"
          description="All your questions about partnering with us answered here."
          faqs={faqs.data.data ?? []}
        />
        <JoinUs />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ContactCard />
          <ContactForm type="partner" />
        </section>
      </div>
    </main>
  );
}

export default PartnerWithUs;
export const dynamic = "force-static";
