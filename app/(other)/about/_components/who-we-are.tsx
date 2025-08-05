import React from "react";
import TextWithBrandmark from "@/components/text-with-brandmark";

interface Props {
  description: string;
}

function WhoWeAre({ description }: Props) {
  return (
    <section id="who-we-are">
      <TextWithBrandmark size={70} type="h2" className="justify-center">
        Who <span className="text-primary">we</span> are
      </TextWithBrandmark>
      <div
        className="prose max-w-4xl mx-auto text-center mt-5"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
    </section>
  );
}

export default WhoWeAre;
