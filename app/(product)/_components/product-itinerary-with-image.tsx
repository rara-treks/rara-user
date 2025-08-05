import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  slug: string;
  data: {
    id: number;
    timeWindow: string;
    activity: string;
  }[];
  image: string;
  dossier: any;
  updated_at: string;
}

function ProductItineraryWithImage({ slug, data, image }: Props) {
  if (!data.length) return null;
  return (
    <section>
      <div className="flex items-center justify-start gap-6 mb-4">
        <h2 className="font-bold text-xl ">Itinerary</h2>
        <h2 className="font-bold text-lg text-gray-600">|</h2>
        <Link href={`/circuits/dossier/${slug}`}>
          <h2 className=" font-bold text-xl cursor-pointer text-gray-600 hover:text-gray-800 transition">
            View Dossier
          </h2>
        </Link>
      </div>
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-5">
        <div>
          <Image
            className="rounded-2xl w-full h-auto bg-white"
            src={image}
            alt="itienary-image"
            width={800}
            height={800}
          />
        </div>
        <div>
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[20px_1fr] gap-2 items-center relative pb-3 group"
            >
              <div>
                <div className="absolute top-2 block w-3 h-3 rounded-full bg-primary"></div>
                <div className="w-0.5 h-full bg-primary absolute top-4 left-[5px] group-last:hidden"></div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="group w-full">
                  <div className="grid grid-cols-[auto_30px] items-center gap-1 w-full">
                    <h4 className="text-left font-semibold md:text-lg">
                      {item.timeWindow}
                    </h4>
                    <IconChevronDown
                      size={20}
                      className="block group-aria-expanded:rotate-180 transition-transform ml-auto"
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1.5">
                  <p
                    className="prose text-black"
                    dangerouslySetInnerHTML={{
                      __html: item.activity,
                    }}
                  ></p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductItineraryWithImage;
