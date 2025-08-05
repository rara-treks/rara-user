import React from "react";
import Image from "next/image";
import ICIMODImg from "@/assets/images/partners/icimod.webp";
import PlaneterraImg from "@/assets/images/partners/planeterra.webp";
import TextWithBrandmark from "../text-with-brandmark";

interface Props {
  title: string;
  className?: string;
}

function Impact({ title, className }: Props) {
  return (
    <section className={className}>
      <TextWithBrandmark type="h2" className="justify-center pt-4 md:pt-0 mb-4 md:mb-10" size={70}>{title}</TextWithBrandmark>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center *:my-0">
        <div className="hidden md:flex"></div>
        <Image src={PlaneterraImg} alt="Planeterra" />
        <Image src={ICIMODImg} alt="ICIMOD" />
        <div className="hidden md:flex"></div>
      </div>
    </section>
  );
}

export default Impact;
