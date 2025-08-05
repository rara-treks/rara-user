"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { Product } from "@/types/product.types";
import ProductListCard from "../product/product-list-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { validProductTypes } from "@/lib/data/product";
import { PopoverOrDrawer, PopoverOrDrawerContent, PopoverOrDrawerTrigger } from "@/components/ui/popover-or-drawer";

interface Props {
  children: React.ReactNode;
}

function QuickSearchPopup({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("all");
  const debouncedSearchTeam = useDebounce(searchTerm, 500);

  const { data: products, isPending } = useQuery<Product[]>({
    queryKey: ["chn-quick-search", debouncedSearchTeam, activeType],
    queryFn: async () => {
      const { data } = await axios.post("/api/product/list", {
        filters: { type: activeType === "all" ? undefined : activeType.slice(0, -1), search: debouncedSearchTeam },
      });
      const products = data.data.data;
      return products;
    },
    enabled: open,
  });

  return (
    <PopoverOrDrawer open={open} onOpenChange={setOpen}>
      <PopoverOrDrawerTrigger asChild>{children}</PopoverOrDrawerTrigger>
      <PopoverOrDrawerContent
        className="flex flex-col gap-4 md:!max-w-full md:w-[470px]"
        align="end"
        side="bottom"
        sideOffset={8}
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <Input
          className="border rounded-full border-black"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="min-h-[26px]">
          <div className="flex gap-2 *:text-sm *:cursor-pointer relative">
            <Badge variant={activeType === "all" ? "default" : "outline"} onClick={() => setActiveType("all")}>
              All
            </Badge>
            {validProductTypes.map((type) => (
              <Badge
                className="capitalize"
                key={type}
                onClick={() => setActiveType(type)}
                variant={activeType === type ? "default" : "outline"}
              >
                {type}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
        <ScrollArea className="h-[40vh] md:h-[30vh]">
          <div className="flex flex-col gap-5">
            {isPending &&
              Array.from({ length: 5 })?.map((_, index) => <ProductListCard key={`loading-${index}`} loading />)}
            {products?.map((product) => (
              <ProductListCard
                key={product.id}
                href={`/${product.type}s/${product.slug}`}
                name={product.name}
                location={product.location}
                rating={product.average_rating}
                featuredImage={product.featuredImage}
                onClick={() => setOpen(false)}
              />
            ))}
            {products?.length === 0 && (
              <div className="w-full h-full flex justify-center items-center py-5">No Results Found</div>
            )}
          </div>
        </ScrollArea>
      </PopoverOrDrawerContent>
    </PopoverOrDrawer>
  );
}

export default QuickSearchPopup;
