import React from "react";
import Awards from "@/components/home/awards";
import Impact from "@/components/home/impact";
import HeroSection from "@/components/home/hero-section";
import WhyChooseUs from "@/components/home/why-choose-us";
import getHomeMediaCoverage from "@/lib/utils/server/get-home-media-coverage";
import DiscoverNepal from "@/components/home/discover-nepal";
import getHomeWhyUs from "@/lib/utils/server/get-home-why-us";
import Promotions from "@/components/home/promotions";
import getHomePromotions from "@/lib/utils/server/get-home-promotions";
import Reviews from "@/components/home/reviews";
import BlogGrid from "@/components/blog/blog-grid";
import getHomeBlogs from "@/lib/utils/server/get-home-blogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import getHomeReviews from "@/lib/utils/server/get-home-reviews";
import MediaCoverage from "@/components/blog/media-coverage";
import ImpactVideoSection from "@/components/home/impact-video-section";
import MobileFloatingMenu from "@/components/mobile-floating-menu";
import TripadvisorRating from "@/components/tripadvisor-rating";
import BookingComRating from "@/components/booking-com-rating";
import TextWithBrandmark from "@/components/text-with-brandmark";
// import HomePopup from "@/components/home-popup";

async function Home() {
  const mediaCoverage = await getHomeMediaCoverage();
  const whyUs = await getHomeWhyUs();
  const promotions = await getHomePromotions();
  const blogs = await getHomeBlogs();
  const reviews = await getHomeReviews();

  return (
    <main className="flex flex-col gap-10 pb-10">
      <HeroSection />
      <div className="container flex flex-col gap-10">
        <WhyChooseUs data={whyUs ?? []} />
        <Awards />
        <MediaCoverage data={mediaCoverage?.slice(0, 5) ?? []} />
      </div>
      <DiscoverNepal />
      <ImpactVideoSection />
      <Reviews data={reviews ?? []} />
      <Promotions className="*:container" data={promotions ?? []} />
      
      <div>
        <TextWithBrandmark type="h2" className="justify-center" size={70}>
          Blog
        </TextWithBrandmark>
        <BlogGrid data={blogs ?? []} className="container mt-5" />
      </div>     
      
      <div className="container">
        <div className="flex justify-center">
          {(blogs ?? []).length > 0 && (
            <Link href="/blog">
              <Button variant="ghost">
                View more{" "}
                <div className="p-0.5 bg-gradient-orange rounded-full text-white ml-2">
                  <IconChevronRight size={20} />
                </div>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex gap-5 flex-wrap justify-center md:hidden mt-5">
          <TripadvisorRating />
          <BookingComRating />
        </div>
        <div className="max-w-4xl mx-auto pt-12 pb-8">
          <Impact title="Impact Partners" />
        </div>
        {/* <HomePopup /> */}
      </div>


      <MobileFloatingMenu />
    </main>
  );
}

export default Home;
export const dynamic = "force-static";
