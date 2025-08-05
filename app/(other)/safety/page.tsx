import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ContactCard from "@/components/contact/contact-card";
import ContactForm from "@/components/contact/contact-form";
import JoinUs from "@/components/join-us";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";
import FaqsSection from "@/components/faqs-section";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/safety");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function Safety() {
  const faqs = await server.get("/page/faq/safety");
  const content = await server.get<{ data: PageContent }>("/page/detail/safety");

  return (
    <main>
      <div className="container py-8">
        {content.data.data.featuredImage && (
          <Image
            className="rounded-2xl w-full h-96 object-cover mb-3"
            src={content.data.data.featuredImage}
            width={1000}
            height={1000}
            alt="Safety"
          />
        )}
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <section>
            <article className="prose max-w-4xl mx-auto">
              <h1 className="text-center mb-5 font-bebas-neue font-medium">Safety</h1>
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
            description="All your questions about safety answered here."
            faqs={faqs.data.data ?? []}
          />
          <JoinUs />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ContactCard />
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Safety;
export const dynamic = "force-static";
