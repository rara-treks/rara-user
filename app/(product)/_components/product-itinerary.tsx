import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IconChevronDown } from "@tabler/icons-react";

interface Props {
  data: {
    id: number;
    timeWindow: string;
    activity: string;
  }[];
}

function ProductItinerary({ data }: Props) {
  if (!data.length) return null;
  return (
    <section>
      <h2 className="font-bold text-xl mb-4">Itinerary</h2>
      <div>
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-[20px_1fr] gap-2 items-center relative pb-3 group">
            <div>
              <div className="absolute top-2 block w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-0.5 h-full bg-primary absolute top-4 left-[5px] group-last:hidden"></div>
            </div>
            <div>
              <Collapsible>
                <CollapsibleTrigger className="group w-full">
                  <div className="grid grid-cols-[auto_30px] items-center gap-1 w-full">
                    <h4 className="text-left font-semibold md:text-lg">{item.timeWindow}</h4>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductItinerary;
