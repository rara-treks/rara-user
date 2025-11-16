import React from "react";

interface PricingTier {
  discounted_price_usd: number;
  number_of_people: number;
  original_price_usd: number;
}

interface InquiryData {
  prices: PricingTier[];
}

interface InquiryProps {
  data: InquiryData;
}

function MobilePrice({ data }: InquiryProps) {
  const [guests, setGuests] = React.useState(1);

  const getCurrentPricing = () => {
    if (!data.prices || data.prices.length === 0) {
      return { originalPrice: 0, currentPrice: 0 };
    }

    const matchingPrice =
      data.prices.find((price) => price.number_of_people === guests) ||
      data.prices[0];

    return {
      originalPrice: matchingPrice.original_price_usd,
      currentPrice:
        matchingPrice.discounted_price_usd > 0
          ? matchingPrice.discounted_price_usd
          : matchingPrice.original_price_usd,
    };
  };

  const { originalPrice, currentPrice } = getCurrentPricing();
  const totalPrice = currentPrice * guests;
  const discountPercentage =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 space-y-2">
        {/* Line 1: Guests & Price */}
        <div className="flex items-center justify-between">
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="text-sm font-semibold bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {data.prices.map((tier) => (
              <option key={tier.number_of_people} value={tier.number_of_people}>
                {tier.number_of_people}{" "}
                {tier.number_of_people === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${currentPrice}</span>
            {discountPercentage > 0 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Line 2: Total */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Total</span>
          <span className="text-2xl font-bold">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default MobilePrice;
