import React from "react";
import MediaCoverageCard from "./media-coverage-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MediaCoverage as MediaCoverageType } from "@/lib/utils/server/get-home-media-coverage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextWithBrandmark from "../text-with-brandmark";

interface Props {
  data: MediaCoverageType[];
}

function MediaCoverage({ data }: Props) {
  if (data.length === 0) return null;
  return (
    <section className="max-md:-mx-8">
      <TextWithBrandmark type="h2" className="justify-center pt-4 md:pt-0 mb-4 md:mb-10" size={70}>
        Media Coverage
      </TextWithBrandmark>
      <div className="w-full overflow-hidden">
        <Carousel
          className="overflow-visible *:overflow-visible pr-10 md:pr-24 lg:pr-0 cursor-grab select-none"
          opts={{
            skipSnaps: true,
            slidesToScroll: 2,
            breakpoints: {
              "(max-width: 460px)": {
                skipSnaps: false,
                slidesToScroll: 1,
              },
            },
          }}
        >
          <CarouselContent className="w-full pl-6 md:p-0">
            {data.map((coverage, index) => (
              <CarouselItem className="min-[540px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pb-2" key={index}>
                <MediaCoverageCard
                  title={coverage.title}
                  mediaImage={coverage.media_image}
                  featuredImage={coverage.featured_image}
                  link={coverage.link}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext variant="default" className="right-2 disabled:hidden" />
          <CarouselPrevious variant="default" className="left-2 disabled:hidden" />
        </Carousel>
        <div className="flex justify-center mt-5">
          <Link href="/media-coverage">
            <Button className="rounded-full">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MediaCoverage;
