"use client";
import React from "react";
import Search from "../header/search";
import MoreFilters from "./more-filters";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import ProductTagsScrollView from "./product-tags-scroll-view";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

function SearchFiltersMobile({ className }: Props) {
  return (
    <div className={cn("md:hidden overflow-hidden", className)}>
      <div className="mx-auto mb-5 h-2 w-[100px] rounded-full bg-muted" />
      <div className="relative mb-4">
        <Search className="[&_svg]:mr-8 w-11/12 mx-auto [&_input]:border-black" />
        <MoreFilters>
          <IconAdjustmentsHorizontal className="absolute top-1/2 -translate-y-1/2 right-7" stroke={1.5} />
        </MoreFilters>
      </div>
      <ProductTagsScrollView className="mt-1 w-screen" />
    </div>
  );
}

export default SearchFiltersMobile;
