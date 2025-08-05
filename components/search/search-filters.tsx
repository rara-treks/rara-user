"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProductSearch from "@/lib/hooks/use-product-search";
import MoreFilters from "./more-filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import ProductTags from "./product-tags";
import { Button } from "@/components/ui/button";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

function SearchFilters() {
  const { filter } = useProductSearch();
  const router = useRouter();

  return (
    <aside className="px-4 md:px-8 py-2 border-b bg-white">
      <div className="flex gap-4 justify-center md:justify-between items-center">
        <Tabs
          defaultValue="all"
          value={filter.type}
          onValueChange={(type) => {
            if (type === "all") {
              router.push("/search");
            } else {
              router.push(`/${type}`);
            }
          }}
        >
          <ScrollArea className="w-[100vw] max-w-fit md:w-fit max-md:px-4">
            <TabsList className="*:font-semibold text-black *:h-8 *:rounded-xl">
              <TabsTrigger className="aria-selected:!bg-primary" value="all">
                All
              </TabsTrigger>
               <TabsTrigger className="aria-selected:!bg-primary" value="packages">
                Packages
              </TabsTrigger>
              <TabsTrigger className="aria-selected:!bg-primary" value="homestays">
                Homestays
              </TabsTrigger>
              <TabsTrigger className="aria-selected:!bg-primary" value="experiences">
                Experiences
              </TabsTrigger>
              <TabsTrigger className="aria-selected:!bg-primary" value="circuits">
                Circuits
              </TabsTrigger>             
            </TabsList>
            <Scrollbar className="max-w-fit" orientation="horizontal" />
          </ScrollArea>
        </Tabs>
        <div className="hidden lg:block">
          <ProductTags />
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <MoreFilters>
            <Button variant="ghost" size="sm" className="flex gap-2">
              <IconAdjustmentsHorizontal stroke={1} />
              <h5>Filters</h5>
            </Button>
          </MoreFilters>
        </div>
      </div>
    </aside>
  );
}

export default SearchFilters;
