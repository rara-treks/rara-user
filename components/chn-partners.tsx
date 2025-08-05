import React from "react";
import Image from "next/image";
import ICIMODImg from "@/assets/images/partners/icimod.webp";
// import NabilBankImg from "@/assets/images/partners/nabil-bank.webp";
// import GlobalAcademyOfTourismAndHospitalityImg from "@/assets/images/partners/global-academy-of-tourism-and-hospitality.webp";
import PlaneterraImg from "@/assets/images/partners/planeterra.webp";

interface Props {
  title: string;
  className?: string;
}

function CHNPartners({ title, className }: Props) {
  return (
    <section className={className}>
      <h2 className="text-center font-bebas-neue font-medium text-3xl mb-5">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center *:my-0">
        {/* <Image src={NabilBankImg} alt="NabilBank" /> */}
        <div></div>
        <Image src={PlaneterraImg} alt="Planeterra" />
        {/* <Image src={GlobalAcademyOfTourismAndHospitalityImg} alt="Global Academy of Tourism and Hospitality" /> */}
        <Image src={ICIMODImg} alt="ICIMOD" />
      </div>
    </section>
  );
}

export default CHNPartners;
