"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  const ref = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width && width < 768;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "60%" : "120%"]);
  const heritageY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "40%" : "80%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "100%" : "400%"]);
  const MotionImage = motion.create(Image);

  return (
    <section
      className="relative w-full h-[80vh] xl:h-screen -mt-20 md:-mt-20 md:grid place-items-start justify-center overflow-hidden *:select-none"
      ref={ref}
    >
      <motion.div
        className="relative z-10 text-left md:text-center mt-24 md:mt-36 text-white max-md:p-6"
        style={{ y: textY }}
      >
        <h1
          className="font-bebas-neue text-[20vw] sm:text-[15vw] md:text-[10vw] lg:text-[9vw] 2xl:text-[7vw] leading-[17vw] sm:leading-[13vw] md:leading-none"
          style={{
            textShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          Live
          <br className="md:hidden" /> with
          <br className="md:hidden" /> locals
        </h1>
        <h2 className="text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[2vw] 2xl:text-[1.5vw] [&_a:hover]:text-primary font-medium">
          <Link className="mr-3" href="/homestays">
            Stay
          </Link>
          <Link className="mr-3" href="/experiences">
            Engage
          </Link>
          <Link className="mr-3" href="/circuits">
            Travel
          </Link>
          <Link href="/packages">Explore</Link>
        </h2>
      </motion.div>
      <MotionImage
        loading="eager"
        src="/assets/images/home/golden-hour.webp"
        alt="Golden Hour"
        draggable={false}
        className="absolute z-0 inset-0 w-full h-full object-cover max-h-none"
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/terai-houses.png"
        alt="Terai houses"
        draggable={false}
        className={cn(
          "absolute z-30 bottom-0 left-1/2",
          "max-lg:-translate-x-1/2 w-[180vw] md:w-[120vw] lg:w-full max-w-none",
          "lg:left-0 lg:right-0"
        )}
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/fog.webp"
        alt="Fog"
        draggable={false}
        className="absolute z-[3] bottom-0 w-full h-full"
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/fog2.webp"
        alt="Fog"
        draggable={false}
        className="absolute z-[3] bottom-0 w-full h-full"
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/trees.webp"
        alt="Trees"
        draggable={false}
        className="absolute z-[5] bottom-0 left-0 w-auto h-[50vw] md:h-[35vw]"
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/trees2.webp"
        alt="Trees2"
        draggable={false}
        className="absolute z-[5] bottom-0 right-0 w-auto h-[50vw] md:h-[35vw]"
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/mountain.webp"
        alt="Mountain"
        draggable={false}
        className="absolute z-0 bottom-0 md:bottom-36 lg:bottom-56 w-full h-[55vh] md:h-[35vh] lg:h-[30vw] object-cover object-top"
        style={{
          y: mountainY,
        }}
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/heritage.webp"
        alt="Heritage"
        draggable={false}
        className="absolute z-0 bottom-32 md:bottom-44 xl:bottom-[23vh] left-1/2 w-[150vw] md:w-full max-w-7xl md:max-w-[80vw]"
        style={{
          y: heritageY,
          x: "-50%",
        }}
        width={1400}
        height={1400}
        priority
      />
      <MotionImage
        loading="eager"
        src="/assets/images/home/times.png"
        alt="Terai houses"
        draggable={false}
        className="hidden md:flex absolute z-30 md:bottom-[24vh] xl:bottom-[34vh] xl:left-[12vh] md:left-12 md:w-full max-w-7xl md:max-w-[250px]"
        width={1400}
        height={1400}
        priority
      />

      <MotionImage
        loading="eager"
        src="/assets/images/home/times.png"
        alt="Terai houses"
        draggable={false}
        className="md:hidden flex absolute z-30 top-[12vh] right-2 w-[150px] md:w-full max-w-7xl md:max-w-[200px]"
        width={1400}
        height={1400}
        priority
      />
      <div className="absolute inset-0 bg-black/30 z-[5] w-screen h-screen"></div>
    </section>
  );
}

export default HeroSection;
