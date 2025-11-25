import React from "react";

interface PriceSectionProps {
  currentPrice: string;
  originalPrice?: string;
  currency?: string;
}

const PriceSection = ({
  currentPrice,
  originalPrice,
  currency = "$",
}: PriceSectionProps) => {
  const hasDiscount = originalPrice && originalPrice !== currentPrice;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-end justify-end">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-green-600">
                {currency}{currentPrice}
              </span>
              <div className="text-gray-400 line-through text-sm">
                {currency}{originalPrice}
              </div>
            </>
          ) : (
            <span className="text-xl font-bold text-green-600">
              {currency}{currentPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
