import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { IconMapPin } from "@tabler/icons-react";
import { useWindowSize } from "@uidotdev/usehooks";
import ProductTypeIcon from "../product/product-type-icon";

interface Props {
  id: number;
  title: string;
  type: string;
  location: string;
  image: string;
  price: string | number | undefined;
  lat: number;
  lng: number;
  href: string;
}

function MapProductCard({ id, image, location, type, price, title, lat, lng, href }: Props) {
  const [open, setOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { width } = useWindowSize();
  const isMobile = width && width < 768;
  const BadgeWrapper = isMobile ? Link : "div";

  return (
    <div className="*:bg-red-100">
      <AdvancedMarker ref={markerRef} position={{ lat: lat, lng: lng }} onClick={() => setOpen(!open)}>
        <BadgeWrapper href={`#product-${id}`}>
          <Badge className="text-xs md:text-base grid grid-cols-[auto_auto] gap-1.5">
            <ProductTypeIcon type={type} className="w-3 h-3 md:w-5 md:h-5 invert text-black" />
            {title.split(" ")?.[0] ?? "???"}
          </Badge>
        </BadgeWrapper>
      </AdvancedMarker>
      {open && (
        <InfoWindow
          className="!p-0 overflow-hidden rounded-2xl !max-h-60 hidden md:block"
          anchor={marker}
          onClose={() => setOpen(false)}
          headerDisabled
          disableAutoPan
          maxWidth={200}
          minWidth={200}
        >
          <article className="relative rounded-2xl overflow-hidden border h-fit bg-white">
            <Link href={href}>
              <Image
                src={image}
                alt={title}
                width={200}
                height={200}
                className="aspect-[4/2.5] object-cover bg-gray-100"
              />
            </Link>
            <div className="p-3">
              <h3 className="text-base font-semibold leading-tight">{title}</h3>
              <h4 className="grid grid-cols-[16px_auto] gap-1 items-center text-sm truncate font-medium mt-1">
                <IconMapPin className="text-red-500" size={16} />
                {location}
              </h4>
            </div>
          </article>
        </InfoWindow>
      )}
    </div>
  );
}

export default MapProductCard;
