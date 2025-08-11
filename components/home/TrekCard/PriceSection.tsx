import React from "react";

interface PriceSectionProps {
  currentPrice?: string; 
  originalPrice: string;
  currency?: string;
}

const PriceSection = ({
  currentPrice,
  originalPrice,
  currency = "USD",
}: PriceSectionProps) => (
  <div className="bg-gray-50 p-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-end justify-end">
        {currentPrice ? (
          <>
            <span className="text-xl font-bold text-green-600">
              {currency} {currentPrice}
            </span>
            <div className="text-gray-400 line-through">
              {currency} {originalPrice}
            </div>
          </>
        ) : (
          <span className="text-xl font-bold text-black">
            {currency} {originalPrice}
          </span>
        )}
      </div>
    </div>
  </div>
);


export default PriceSection;
