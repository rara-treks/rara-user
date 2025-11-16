import { Flag, Star } from "lucide-react";
import React from "react";

// Define prop types
interface TestimonialCardProps {
  name: string;
  trek: string;
  rating: number;
  review: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  trek,
  rating,
  review,
}) => {
  // Create array of stars based on rating
  const renderStars = (): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index: number) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
        }`}
      />
    ));
  };

  // Get first letter of name
  const getInitial = (): string => {
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="bg-[#1E2F22] flex flex-col gap-4 items-start justify-start p-8 rounded-xl h-fit w-full flex-shrink-0">
      <div className="flex items-start gap-3 justify-start w-full">
        <div className="w-12 h-12 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
          <span className="text-[#1E2F22] font-bold text-xl">
            {getInitial()}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-1 flex-1">
          <span className="flex items-center gap-2">
            <p className="font-bold text-white text-base">{name}</p>
            <Flag className="text-white w-4 h-4" />
          </span>
          <p className="font-satisfy text-white text-sm italic">{trek}</p>
          <div className="flex items-center gap-1 mt-1">{renderStars()}</div>
        </div>
      </div>

      <div className="w-full text-white">
        <p className="text-sm leading-relaxed line-clamp-5">{review}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
