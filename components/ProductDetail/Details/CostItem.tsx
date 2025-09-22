import Image from "next/image";

interface CostItem {
  id: number;
  name: string;
  icon?: string;
  description?: string;
}

interface CostItemProps {
  item: CostItem;
  type: "include" | "exclude";
}

const CostItem = ({ item, type }: CostItemProps) => {
  const textColor = type === "include" ? "text-[#3E641C]" : "text-[#641C1C]";
  const iconSrc =
    type === "include" ? "/assets/checkmark.svg" : "/assets/cancel.svg";
  const iconAlt = type === "include" ? "checkmark" : "cancel";

  return (
    <span className={`flex items-center gap-2 ${textColor}`}>
      <Image
        src={iconSrc}
        width={100}
        height={100}
        alt={iconAlt}
        className="w-5 h-5"
      />
      {item.name}
    </span>
  );
};

export default CostItem;
