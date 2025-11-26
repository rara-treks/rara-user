interface PricingTier {
  discounted_price_usd: number;
  number_of_people: number;
  original_price_usd: number;
}

interface CostSummaryProps {
  costPerAdult: number;
  totalCost: number;
  numberOfPeople: number;
  pricingTiers: PricingTier[];
  onNumberOfPeopleChange: (number: number) => void;
}

function CostSummary({
  costPerAdult,
  totalCost,
  numberOfPeople,
  pricingTiers,
  onNumberOfPeopleChange,
}: CostSummaryProps) {
  const selectedTier = pricingTiers.find(
    (tier) => tier.number_of_people === numberOfPeople
  );
  const showDiscount =
    selectedTier &&
    selectedTier.original_price_usd > selectedTier.discounted_price_usd;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-700 font-medium block mb-2">
          Select Number of People:
        </label>
        <select
          value={numberOfPeople}
          onChange={(e) => onNumberOfPeopleChange(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {pricingTiers.map((tier) => (
            <option key={tier.number_of_people} value={tier.number_of_people}>
              {tier.number_of_people}{" "}
              {tier.number_of_people === 1 ? "Person" : "People"}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 font-medium">Price per Person:</span>
          <div className="text-right">
            {showDiscount && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${selectedTier?.original_price_usd}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ${costPerAdult}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Cost:</span>
          <span className="text-2xl font-bold text-green-600">
            ${totalCost}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CostSummary;
