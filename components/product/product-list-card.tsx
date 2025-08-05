import { IconMapPin, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import IconVerified from "../icons/verified";

interface BaseProps {
  loading?: boolean;
}

interface LoadingProps extends BaseProps {
  loading: true;
}

interface NonLoadingProps extends BaseProps {
  name: string;
  location: string;
  rating: string | null;
  featuredImage: string;
  href: string;
  onClick?: () => void;
}

type Props = LoadingProps | NonLoadingProps;

function ProductListCard(props: Props) {
  if (props.loading) {
    return <Skeleton className="w-full h-20 rounded-2xl" />;
  }

  return (
    <Link href={props.href} onClick={props?.onClick}>
      <article className="grid grid-cols-[80px_auto] gap-4">
        <div>
          <Image
            className="w-full h-auto aspect-square rounded-2xl object-cover bg-gray-100"
            src={props.featuredImage}
            alt={props.name}
            width={400}
            height={400}
          />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-sm md:text-base">{props.name}</h3>
          <h4 className="grid grid-cols-[16px_auto] gap-1 items-center text-sm my-1 truncate font-medium">
            <IconMapPin className="text-red-500" size={16} />
            {props.location}
          </h4>
          {!!props.rating && (
            <div className="flex gap-1 items-center whitespace-nowrap">
              <IconStarFilled size={16} className="text-primary" />
              <p className="text-base text-gray-500 font-bold">{props.rating}</p>
              <IconVerified />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default ProductListCard;
