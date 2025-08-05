import React from "react";
import TextWithBrandmark from "@/components/text-with-brandmark";
import Image from "next/image";
import HowItWorksImg from "@/assets/images/about/how-it-works.webp";

function HowItWorks() {
  return (
    <section>
      <TextWithBrandmark size={70} type="h2" className="*:font-bebas-neue *:font-medium justify-center">
        How it <span className="text-primary">works</span>
      </TextWithBrandmark>
      <div>
        <Image src={HowItWorksImg} alt="How it works" className="w-full h-auto max-w-[700px] object-cover mx-auto" />
      </div>
    </section>
  );
}

export default HowItWorks;
