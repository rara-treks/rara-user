import React from "react";
import TextWithBrandmark from "@/components/text-with-brandmark";
import Image from "next/image";
import Link from "next/link";
import PinnedPhotos from "@/assets/images/about/pinned-photos.webp";

interface Props {
  description: string;
}

function WhenYouBook({ description }: Props) {
  return (
    <section className="grid md:grid-cols-[1fr_2fr] gap-8">
      <div>
        <Image src={PinnedPhotos} alt="Pinned Photos" className="w-full h-auto max-w-96 object-cover" />
      </div>
      <div>
        <TextWithBrandmark size={70} type="h2" className="*:font-bebas-neue *:font-medium">
          When <span className="text-primary">you</span> book
        </TextWithBrandmark>
        <div
          className="prose max-w-4xl mt-5"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
    </section>
  );
}

export default WhenYouBook;
