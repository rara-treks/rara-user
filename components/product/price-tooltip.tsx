"use client";
import { ProductPrice } from "@/types/product.types";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import IconInfo from "../icons/info";

interface Props {
  prices: ProductPrice[];
}

function PriceTooltip({ prices }: Props) {
  const [open, setOpen] = useState(false);
  return null;

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger>
          <IconInfo
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)}
            onKeyDown={(e) => {
              e.preventDefault();
              e.key === "Enter" && setOpen(!open);
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <ol className="flex flex-col">
            {prices.map((price, index) => (
              <li key={index}>
                <span className="font-medium">{price.number_of_people} Person</span> -{" "}
                <span className="font-bebas-neue text-lg">
                  ${Number(price.discounted_price_usd ?? price.original_price_usd).toFixed(2)}
                </span>
              </li>
            ))}
          </ol>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default PriceTooltip;
