"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  children: React.ReactNode;
  adults: number;
  setAdults: (value: number) => void;
  childrens: number;
  setChildrens: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
}

function GuestSelector({
  children,
  adults,
  setAdults,
  childrens,
  setChildrens,
  infants,
  setInfants,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="z-[999]">
        <div className="flex flex-col gap-4">
          <GuestSelectorWithNumbers
            label="Adults (Age 11+)"
            value={adults}
            setValue={setAdults}
          />
          {/* <GuestSelectorWithNumbers label="Childrens (Ages 2-10)" value={childrens} setValue={setChildrens} /> */}
          {/* <GuestSelectorWithNumbers label="infants (Under 2)" value={infants} setValue={setInfants} /> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default GuestSelector;

function GuestSelectorWithNumbers({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-sm">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {numbers.map((num) => (
          <Button
            key={num}
            size="sm"
            variant={value === num ? "default" : "outline"}
            className="h-9 w-9"
            onClick={() => setValue(num)}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
}
