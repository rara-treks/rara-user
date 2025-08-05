"use client";
import React, { useState } from "react";
import TextWithBrandmark from "../text-with-brandmark";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhyUs } from "@/lib/utils/server/get-home-why-us";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Pattern1 from "@/assets/images/home/pattern-1.webp";
import ColorfulDots from "@/assets/images/home/colorful-dots.webp";
import BirdsCircle from "@/assets/images/home/birds-circle.webp";

interface Props {
  data: WhyUs[];
}

function WhyChooseUs({ data }: Props) {
  const [tab, setTab] = useState("0");

  return (
    <section className="max-md:bg-[url('/assets/images/patterns/pattern-2.webp')] bg-cover max-md:-mx-8 max-md:px-3 overflow-hidden">
      <TextWithBrandmark type="h2" className="justify-center pt-4 md:pt-0 mb-4 md:mb-10" size={70}>
        Why Choose Us?
      </TextWithBrandmark>
      <Tabs value={tab} onValueChange={setTab} className="relative" defaultValue={"0"}>
        <TabsList className="rounded-xl bg-white hidden md:inline-flex px-3 relative z-50">
          {data.map((whyUs, index) => (
            <TabsTrigger
              className={cn(
                "!bg-transparent !shadow-none !rounded-none border-b-[4px] border-transparent text-black",
                "aria-selected:!text-black aria-selected:border-primary aria-selected:font-semibold text-base"
              )}
              value={String(index)}
              key={whyUs.title}
            >
              {whyUs.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((whyUs, index) => (
          <TabsContent
            className={cn("relative w-full bg-white rounded-xl text-muted-foreground")}
            value={String(index)}
            key={whyUs.description}
          >
            <div className="flex flex-col gap-4 p-6 relative z-10 lg:mr-80">
              <h3 className="text-xl font-semibold text-black md:hidden">{whyUs.title}</h3>
              <p className="text-base font-medium">{whyUs.description}</p>
              <Button size="default" className="rounded-full w-fit mb-7">
                <a className="flex items-center" href={whyUs.link.concat("#who-we-are")}>
                  Discover more{" "}
                  <div className="p-0.5 bg-primary rounded-full text-white">
                    <IconChevronRight size={20} />
                  </div>
                </a>
              </Button>
            </div>
            <Image
              className="relative lg:absolute right-0 bottom-0 z-10 w-3/4 max-lg:ml-auto max-w-80"
              src={whyUs.whyUsImage}
              alt={whyUs.title}
              width={800}
              height={800}
              onError={(e) => (e.currentTarget.hidden = true)}
            />
            <Image src={Pattern1} alt="pattern" className="absolute bottom-0 right-0 z-0 w-full lg:max-w-96" />
            <Image
              src={ColorfulDots}
              alt="colorful dots"
              className="absolute bottom-7 max-md:left-6 md:right-32 z-10 w-24"
            />
            <Image src={BirdsCircle} alt="birds circle" className="absolute bottom-0 right-0 z-0 w-4/6 max-w-80" />
          </TabsContent>
        ))}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            type="button"
            disabled={Number(tab) === 0}
            className="p-0.5 bg-gradient-orange rounded-full text-white cursor-pointer border disabled:bg-none disabled:text-black disabled:bg-muted"
            onClick={() => setTab(String(Number(tab) - 1))}
          >
            <IconChevronLeft size={30} />
          </button>
          <button
            type="button"
            disabled={Number(tab) === data.length - 1}
            className="p-0.5 bg-gradient-orange rounded-full text-white cursor-pointer border disabled:bg-none disabled:text-black disabled:bg-muted"
            onClick={() => setTab(String(Number(tab) + 1))}
          >
            <IconChevronRight size={30} />
          </button>
        </div>
      </Tabs>
    </section>
  );
}

export default WhyChooseUs;
