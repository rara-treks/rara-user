import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Service {
  title: string;
  image?: string;
  route: string;
  width: string;
}

interface MobileServicesProps {
  mobileGrid: Service[][];
}

const MobileServices: React.FC<MobileServicesProps> = ({ mobileGrid }) => {
  return (
    <div className="lg:hidden w-full">
      <ScrollArea className="w-full">
        <div className="flex flex-col gap-4 pb-4">
          {mobileGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((service, serviceIndex) => (
                <Link
                  key={serviceIndex}
                  href={service.route}
                  className="relative w-[calc(40vw-8px)] h-20 rounded-[32px] overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  {service.image ? (
                    <>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition duration-300"
                        sizes="40vw"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition duration-300">
                        <h3 className="text-white text-sm font-semibold text-center px-2 leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition duration-300">
                      <h3 className="text-gray-700 text-sm font-semibold text-center px-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default MobileServices;
