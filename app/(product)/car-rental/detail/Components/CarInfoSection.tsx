import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CarInfoSectionProps {
  carName: string;
  description: string;
  rating: number;
  reviewCount: string;
  dailyRate: number;
  originalRate: number;
  discount: string;
  badgeText: string;
}

export default function CarInfoSection({
  carName,
  description,
  rating,
  reviewCount,
  dailyRate,
  originalRate,
  discount,
  badgeText,
}: CarInfoSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{badgeText}</Badge>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">{carName}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex items-center gap-4 mb-6">
        <div className="text-3xl font-bold text-blue-600">${dailyRate}/day</div>
        <div className="text-sm text-gray-500">
          <span className="line-through">${originalRate}/day</span>
          <Badge variant="destructive" className="ml-2">
            {discount}
          </Badge>
        </div>
      </div>
    </div>
  );
}
