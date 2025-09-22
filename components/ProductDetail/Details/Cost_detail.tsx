import CostItem from "./CostItem";
import { CostDetailProps } from "../type";

const CostDetail = ({ data }: CostDetailProps) => {
  if (!data || (!data.includes?.length && !data.excludes?.length)) {
    return (
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Cost Detail</h1>
        <div className="w-full p-6 rounded-3xl bg-[#F9FFF7] flex items-center justify-center">
          <p className="text-gray-500 text-lg">No cost details available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Cost Detail</h1>

      {/* Includes */}
      {data.includes && data.includes.length > 0 && (
        <div className="w-full p-6 rounded-3xl bg-[#F9FFF7] flex flex-col gap-4">
          <h2 className="font-bold text-xl text-[#3E641C]">What's Included</h2>
          <div className="w-full items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.includes.map((item, index) => (
              <CostItem
                key={item.id || `include-${index}`}
                item={item}
                type="include"
              />
            ))}
          </div>
        </div>
      )}

      {/* Excludes */}
      {data.excludes && data.excludes.length > 0 && (
        <div className="w-full p-6 rounded-3xl bg-[#FFF7F7] flex flex-col gap-4">
          <h2 className="font-bold text-xl text-[#641C1C]">
            What's Not Included
          </h2>
          <div className="w-full items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.excludes.map((item, index) => (
              <CostItem
                key={item.id || `exclude-${index}`}
                item={item}
                type="exclude"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CostDetail;
