import React from "react";
import { Metadata } from "next";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/terms-and-conditions");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function TermsAndConditions() {
  const content = await server.get<{ data: PageContent }>("/page/detail/terms-and-conditions");

  return (
    <main>
      <div className="container py-8">
        <article className="prose max-w-4xl mx-auto">
          <h1 className="text-center mb-5 font-bebas-neue font-medium">{content.data.data.title}</h1>
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
      </div>
    </main>
  );
}

export default TermsAndConditions;
export const dynamic = "force-static";
