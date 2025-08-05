import React, { useState } from "react";
import useProductSearch from "@/lib/hooks/use-product-search";
import PriceSlider from "../price-slider";
import { Button } from "@/components/ui/button";
import { PopoverOrDrawer, PopoverOrDrawerContent, PopoverOrDrawerTrigger } from "@/components/ui/popover-or-drawer";

interface Props {
  children: React.ReactNode;
}

function MoreFilters({ children }: Props) {
  const { updateFilter } = useProductSearch();
  const [price, setPrice] = useState([0, 3000]);
  const [open, setOpen] = useState(false);

  function applyFilters(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(false);
    updateFilter([
      {
        key: "min_price",
        value: String(price?.[0] ?? 0),
      },
      {
        key: "max_price",
        value: String(price?.[1] ?? 3000),
      },
    ]);
  }

  return (
    <PopoverOrDrawer open={open} onOpenChange={setOpen}>
      <PopoverOrDrawerTrigger asChild>{children}</PopoverOrDrawerTrigger>
      <PopoverOrDrawerContent
        className="p-0"
        side="bottom"
        align="end"
        sideOffset={8}
        collisionPadding={12}
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <form className="p-4 text-left flex flex-col gap-5" onSubmit={applyFilters}>
          <PriceSlider value={price} onValueChange={setPrice} max={3000} />
          <Button className="mt-2">Apply Filters</Button>
        </form>
      </PopoverOrDrawerContent>
    </PopoverOrDrawer>
  );
}

export default MoreFilters;
