import React from "react";
import { Metadata } from "next";
import FaqsSection from "@/components/faqs-section";
import ContactCard from "@/components/contact/contact-card";
import ContactForm from "@/components/contact/contact-form";
import JoinUs from "@/components/join-us";
import { PageContent } from "@/types/page.types";
import server from "@/lib/server";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/volunteer-with-us");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function VolunteerWithUs() {
  const content = await server.get<{ data: PageContent }>("/page/detail/volunteer-with-us");
  const faqs = await server.get("/page/faq/volunteer");

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
        <FaqsSection
          title="Frequently Asked Questions"
          description="All your questions about volunteering with us answered here."
          faqs={faqs.data.data ?? []}
        />
        <JoinUs />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ContactCard />
          <ContactForm />
        </section>
      </div>
    </main>
  );
}

export default VolunteerWithUs;
export const dynamic = "force-static";
