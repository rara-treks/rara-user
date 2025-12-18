import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Associate } from "@/types/footer";

interface FooterAssociatesProps {
  associates: Associate[];
}

function FooterAssociates({ associates }: FooterAssociatesProps) {
  const renderAssociate = (associate: Associate, index: number) => {
    const imageElement = (
      <Image
        src={associate.src}
        alt={associate.alt}
        width={100}
        height={100}
        className="w-12 h-12 object-cover hover:opacity-80 transition-opacity"
      />
    );

    if (associate.href) {
      return (
        <Link
          key={index}
          href={associate.href}
          target="_blank"
          rel="noopener noreferrer"
          title={associate.alt}
        >
          {imageElement}
        </Link>
      );
    }

    return <div key={index}>{imageElement}</div>;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-end md:items-center gap-3 md:gap-6 text-white md:pl-12">
      <div className="flex items-center justify-center gap-2">
        <p>Associated with:</p>
      </div>
      <div className="flex items-center gap-6 justify-start">
        {associates.map(renderAssociate)}
      </div>
    </div>
  );
}

export default FooterAssociates;
