import React from "react";
import Image from "next/image";
import OurImpactImg from "@/assets/images/impact/our-impact-chart.webp";
import ImpactRoadmapImg from "@/assets/images/impact/roadmap.png";

interface Props {
  content: string;
}

function Content({ content }: Props) {
  return (
    <section>
      <article className="prose max-w-4xl mx-auto prose-h2:text-3xl">
        <h2 className="font-bebas-neue font-medium text-center">
          What does <span className="text-primary font-bebas-neue">women empowerment</span> mean for the communities?
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
        <div>
          <h2 className="font-bebas-neue font-medium text-center">
            Our <span className="text-primary font-bebas-neue font-medium">Impact</span>
          </h2>
          <Image src={OurImpactImg} alt="Our Impact" className="w-full h-auto" />
        </div>
        <div>
          <h2 className="font-bebas-neue font-medium text-center">
            <span className="text-primary font-bebas-neue font-medium">Impact</span> Roadmap
          </h2>
          <Image src={ImpactRoadmapImg} alt="Impact Roadmap" className="w-full h-auto" />
        </div>
      </article>
    </section>
  );
}

export default Content;
