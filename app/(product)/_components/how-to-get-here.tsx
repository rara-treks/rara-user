import Image from "next/image";
import React from "react";

interface Props {
  content: string;
  sideImage: string;
}

function HowToGetHere({ content, sideImage }: Props) {
  return (
    <section>
      <h2 className="font-bold text-xl mb-4">How to get here</h2>
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-5">
        <Image
          className="border rounded-2xl bg-white"
          src={sideImage}
          alt="How to get here cover image"
          width={800}
          height={800}
        />
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </section>
  );
}

export default HowToGetHere;
