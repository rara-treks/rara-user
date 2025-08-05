import { ProductPrice } from "@/types/product.types";

function calculatePrice(guestCount: number, prices: ProductPrice[]): { original: number; discounted: number | null } {
  // Sort prices by number_of_people
  const sortedPrices = prices.sort((a, b) => a.number_of_people - b.number_of_people);

  // Find the closest match
  let closestMatch = sortedPrices[0];
  for (const price of sortedPrices) {
    if (price.number_of_people <= guestCount) {
      closestMatch = price;
    } else {
      break;
    }
  }

  // Calculate the price ratio
  const ratio = guestCount / closestMatch.number_of_people;

  // Calculate and return the adjusted prices
  return {
    original: parseFloat(closestMatch.original_price_usd) * ratio,
    discounted: closestMatch.discounted_price_usd ? parseFloat(closestMatch.discounted_price_usd) * ratio : null,
  };
}

export { calculatePrice };
