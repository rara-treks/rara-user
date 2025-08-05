import React, { useMemo } from "react";
import { calculatePrice } from "@/lib/utils/calculate-price";
import { cn } from "@/lib/utils";
import useBooking from "../_hooks/use-booking";
import { ProductPrice } from "@/types/product.types";
import { IconX } from "@tabler/icons-react";
import { differenceInDays } from "date-fns";
import { useIsClient } from "@uidotdev/usehooks";

interface Props {
  className?: string;
  hideLabels?: boolean;
  hideOffers?: boolean;
  product: {
    type: string;
    prices: ProductPrice[];
    relatedProducts: {
      id: number;
      name: string;
      prices: ProductPrice[];
    }[];
  };
}

const specialProductType = ["circuit", "package"];

function OrderCalculations({ className, hideLabels, hideOffers, product }: Props) {
  const booking = useBooking();
  const bookingDays =
    booking.fromDate && booking.toDate ? Math.max(differenceInDays(booking.toDate, booking.fromDate), 1) : 1;
  const isClient = useIsClient();
  const isSpecialProduct = specialProductType.includes(product.type);

  const totalGuests = useMemo(
    () => booking.adults + booking.childrens / 2,
    [booking.adults, booking.childrens, booking.infants]
  );

  const group4Price = useMemo(() => {
    const totalGuests = 4;
    const price = calculatePrice(totalGuests, product.prices);
    price.discounted = price.discounted ? price.discounted / totalGuests : price.discounted;
    price.original = price.original / totalGuests;

    return price;
  }, []);

  const closestCostPrice = useMemo(() => {
    const price = calculatePrice(totalGuests, product.prices);
    price.discounted = price.discounted ? price.discounted / totalGuests : price.discounted;
    price.original = price.original / totalGuests;

    return price;
  }, [totalGuests]);

  const productTotal = useMemo(() => {
    const total = calculatePrice(totalGuests, product.prices);
    return (total.discounted ?? total.original) * bookingDays;
  }, [product.prices, totalGuests, bookingDays]);

  const additionalProducts = useMemo(() => {
    const filteredData = product.relatedProducts.filter((product) => booking.additionalProducts.includes(product.id));
    const data = filteredData.map((product) => ({
      ...product,
      // price: calculatePrice(totalGuests, product.prices),
      price: product.prices?.[0],
    }));
    return data;
  }, [booking.additionalProducts, product.relatedProducts, product.prices, totalGuests]);

  const additionalProductsTotal = useMemo(() => {
    const total = additionalProducts.reduce(
      (acc, product) =>
        acc + (Number(product.price.discounted_price_usd) ?? Number(product.price.original_price_usd) ?? 0),
      0
    );
    return total * totalGuests;
  }, [product.prices, additionalProducts]);

  const total = productTotal + additionalProductsTotal;

  function removeAdditionalProduct(productId: number) {
    booking.setData({
      additionalProducts: booking.additionalProducts.filter((product) => product !== productId),
    });
  }

  if (!isClient) return null;

  return (
    <table className={cn("flex flex-col gap-3 text-center", className)}>
      {!hideLabels && (
        <thead className="flex justify-between">
          <th>Particulars</th>
          <th>Price</th>
        </thead>
      )}
      <tbody>
        {additionalProducts.map((product) => (
          <tr className="flex justify-between" key={product.id}>
            <td className="text-left flex gap-1.5 items-center capitalize">
              {product.name}{" "}
              <IconX
                className="cursor-pointer rounded-full bg-primary text-white"
                size={16}
                onClick={() => removeAdditionalProduct(product.id)}
              />
            </td>
            <td>${Number(product.price.discounted_price_usd ?? product.price.original_price_usd).toFixed(2)}/adult</td>
          </tr>
        ))}
        <tr className="flex justify-between font-medium">
          <td>Cost</td>
          <td>${(closestCostPrice.discounted ?? closestCostPrice.original).toFixed(2)}/adult</td>
        </tr>
        <tr className="flex justify-between capitalize font-medium">
          <td>{product.type === "homestay" ? "Grand Total" : "Total"}</td> <td>${total.toFixed(2)}</td>
        </tr>
        {isSpecialProduct && (
          <span className="text-sm">
            (Number of guests X Cost per adult)
            <br />
          </span>
        )}
        {isSpecialProduct && <span className="text-sm">(Price varies by group size)</span>}
      </tbody>
      {!hideOffers && isSpecialProduct && totalGuests < 4 && (
        <div className="border rounded-lg bg-secondary text-black p-2 font-semibold text-sm">
          Travel with 3 of your friends and pay just ${(group4Price.discounted ?? group4Price.original).toFixed(2)} per
          adult.
        </div>
      )}
    </table>
  );
}

export default OrderCalculations;
