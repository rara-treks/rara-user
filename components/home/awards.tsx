import React from "react";
import BookingComBoosterAwardImg from "@/assets/images/awards/booking-com-booster-award-wb.webp";
import FrontRunnersSummit2021Img from "@/assets/images/awards/front-runners-innovation-summit-winner-2021-wb.webp";
import GlobalStartupCompetitionImg from "@/assets/images/awards/global-startup-competition-wb.webp";
import IIPTAward2019Img from "@/assets/images/awards/iipt-awards-2019-wb.webp";
import ICIMODAwardImg from "@/assets/images/awards/icimod-award.png";
import PATAGold2020Img from "@/assets/images/awards/pata-gold-award-2020-wb.webp";
import WorldResponsibleAward2021Img from "@/assets/images/awards/world-responsible-tourism-awards-2021-wb.webp";
import GenderEqualityChampionoftheYear from "@/assets/images/awards/Gender Equality Champion of the  Year - Logo.png"
import Image from "next/image";
import TextWithBrandmark from "../text-with-brandmark";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AWARD_WIDTH = 800;
const AWARD_HEIGHT = 800;

function Awards() {
  return (
    <section className="-mx-8 md:mx-0">
      <TextWithBrandmark
        type="h2"
        className="justify-center pt-4 md:pt-0 mb-4 md:mb-10"
        size={70}
      >
        Awards & Recognitions
      </TextWithBrandmark>
      <div
        className="bg-white p-5 md:rounded-xl h-full"
        style={{
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Carousel
          opts={{
            slidesToScroll: 2,
          }}
        >
          <CarouselContent className="items-center">
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.equalityintourism.org/gender-equality-award/"
                target="_blank"
              >
                <Image
                  src={GenderEqualityChampionoftheYear}
                  alt="Gender Equality Champion of the  Year"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://hub.wtm.com/press/travel-forward/front-runners-start-ups-pitch-winners-brings-innovation-to-the-fore/"
                target="_blank"
              >
                <Image
                  src={FrontRunnersSummit2021Img}
                  alt="Front Runners Innovation Summit Winner 2021"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.pata.org/press-release/pata-announces-pata-gold-awards-2020-winners"
                target="_blank"
              >
                <Image
                  src={PATAGold2020Img}
                  alt="PATA Gold Award 2020"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://news.booking.com/fr/bookingcom-devoile-les-10-laureats-de-ledition-2018-de-son-programme-booking-booster/"
                target="_blank"
              >
                <Image
                  src={BookingComBoosterAwardImg}
                  alt="Booking.com Booster Award"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.resiliencecouncil.co.uk/resiliencecouncil/en/page/iipt-destination-awards-asia"
                target="_blank"
              >
                <Image
                  src={IIPTAward2019Img}
                  alt="IIPT Award 2019"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.unwto.org/news/transforming-tourism-unwto-global-startup-competition-winners-announced"
                target="_blank"
              >
                <Image
                  src={GlobalStartupCompetitionImg}
                  alt="Global Startup Competition"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.wtm.com/responsible-tourism/en-gb/awards/2021-winners/rest-of-the-world.html"
                target="_blank"
              >
                <Image
                  src={WorldResponsibleAward2021Img}
                  alt="World Responsible Tourism Awards 2021"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-10">
              <Link
                href="https://www.icimod.org/dr-andreas-schild-memorial-mountain-prize-winner-2021/"
                target="_blank"
              >
                <Image
                  src={ICIMODAwardImg}
                  alt="ICIMOD Mountain Prize 2021"
                  width={AWARD_WIDTH}
                  height={AWARD_HEIGHT}
                />
              </Link>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext
            className="-right-3 disabled:hidden"
            variant="default"
          />
          <CarouselPrevious
            className="-left-3 disabled:hidden"
            variant="default"
          />
        </Carousel>
      </div>
      <div className="flex justify-center mt-5">
        <a href="/about#our-story">
          <Button className="rounded-full">Learn more</Button>
        </a>
      </div>
    </section>
  );
}

export default Awards;
