import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Props {
  value: number[];
  onValueChange: React.Dispatch<React.SetStateAction<number[]>>;
  max: number;
}

function PriceSlider({ value, onValueChange, max }: Props) {
  return (
    <>
      <Label>Price</Label>
      <div>
        <Slider value={value} onValueChange={onValueChange} thumbs={2} max={max} />
        <div className="flex justify-between mt-2">
          <p>${value?.[0] ?? 0}</p>
          <p>${value?.[1] ?? 1000}</p>
        </div>
      </div>
    </>
  );
}

export default PriceSlider;
