import Image from "next/image";
import Link from "next/link";
import React from "react";
import FrontRunnersSummit2021Img from "@/assets/images/awards/front-runners-innovation-summit-winner-2021-wb.webp";
import GlobalStartupCompetitionImg from "@/assets/images/awards/global-startup-competition-wb.webp";
import WorldResponsibleAward2021Img from "@/assets/images/awards/world-responsible-tourism-awards-2021-wb.webp";

function Story2021() {
  return (
    <div className="relative group">
      <h2>2021</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        Community Homestay Network is awarded as one of the winners for <b>UNWTO SDGs Global Startup Competition</b>
        for <b>SDG 8: Decent Work and Economic Growth</b> and winner of <b>Front Runners 2021</b> in the category of
        <b>Experience Revolution</b>.
      </p>
      <p>
        Project Koseli also received recognition from the World Travel Market 2021 <b>Responsible Tourism Awards</b>
        as <b>Ones to Watch</b> and receives the <b>Dr. Andreas Schild Memorial Mountain Prize 2021</b> from{" "}
        <b>ICIMOD</b>.
      </p>
      <p>
        Partnered with{" "}
        <Link href="https://www.icimod.org/country/nepal/" target="_blank">
          <b>International Centre for Integrated Mountain Development</b>
        </Link>{" "}
        (ICIMOD) to develop and promote community homestays within Kangchenjunga Landscape in Bhutan, India and Nepal.
      </p>
      <Link href="/assets/reports/2021.pdf" target="_blank">
        <b>2021 Annual Report</b>
      </Link>
      <div className="grid grid-cols-3 gap-4 md:gap-8 mt-3">
        <Image src={GlobalStartupCompetitionImg} alt="Global Startup Competition" />
        <Image src={FrontRunnersSummit2021Img} alt="Front Runners Innovation Summit Winner 2021" />
        <Image src={WorldResponsibleAward2021Img} alt="World Responsible Tourism Awards 2021" />
      </div>
    </div>
  );
}

export default Story2021;
