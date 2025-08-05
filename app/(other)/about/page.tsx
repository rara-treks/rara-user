import React from "react";
import Image from "next/image";
import Pattern from "@/assets/images/patterns/pattern-1.webp";
import HeroSection from "./_components/hero-section";
import WhoWeAre from "./_components/who-we-are";
import WhenYouBook from "./_components/when-you-book";
import HowItWorks from "./_components/how-it-works";
import OurStory from "./_components/our-story";
import MeetOurTeam from "./_components/meet-our-team";
import server from "@/lib/server";
import { PageContent } from "@/types/page.types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await server.get<{ data: PageContent }>("/page/detail/about");

  return {
    title: content.data.data.title,
    description: content.data.data.meta.metaDescription,
    keywords: content.data.data.meta.keywords,
    openGraph: {
      images: content.data.data.featuredImage ? [{ url: content.data.data.featuredImage }] : [],
    },
  };
}

async function About() {
  const content = await server.get<{ data: PageContent }>("/page/detail/about");

  return (
    <main>
      <div className="pb-10">
        <HeroSection
          title={content.data.data.title}
          description={content.data.data.header ?? ""}
          image={content.data.data.featuredImage}
        />
        <Image src={Pattern} alt="pattern" className="w-full h-12 object-cover opacity-30" />
        <div className="container py-8 flex flex-col gap-10">
          <WhoWeAre description={content.data.data.content1 ?? ""} />
          <WhenYouBook description={content.data.data.content2 ?? ""} />
          <HowItWorks />
        </div>
        <OurStory description={content.data.data.content3 ?? ""} />
        <MeetOurTeam />
      </div>
    </main>
  );
}

export default About;
export const dynamic = "force-static";
