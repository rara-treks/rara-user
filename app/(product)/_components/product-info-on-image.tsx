import { cn } from "@/lib/utils";
import { IconMapPin, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface Props {
  product: {
    id: number;
    name: string;
    location: string;
    rating: string | null;
    image: string;
  };
}

function ProductInfoOnImage({ product }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl h-full">
      <Image
        className="aspect-square md:aspect-[9/16] object-cover"
        src={product.image}
        alt="inquire-side-image"
        width={800}
        height={800}
      />
      <div className="absolute bottom-6 left-6 right-6 text-white text-center z-10">
        <h3>{product.name}</h3>
        <h4 className="text-sm flex gap-1 items-center justify-center">
          <IconMapPin size={16} />
          {product.location}
        </h4>
        {product.rating && (
          <p className="flex gap-1 items-center justify-center">
            <IconStarFilled className="text-primary" size={16} />
            {Number(product.rating).toFixed(2)}/5
          </p>
        )}
      </div>
      <div className={cn("absolute inset-0 z-0", "bg-gradient-to-b from-transparent via-transparent to-gray-900")} />
    </div>
  );
}

export default ProductInfoOnImage;
