import Image from "next/image";
import React from "react";

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="mb-4">
        <Image
          src={icon}
          alt={`${title} Icon`}
          width={60}
          height={60}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 leading-tight max-w-xs">
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default Card;
