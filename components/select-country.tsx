import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "@/lib/data/countries.json";

interface Props {
  defaultValue?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

function SelectCountry({ defaultValue, name, value, onChange }: Props) {
  return (
    <Select name={name} defaultValue={defaultValue} value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.name} value={country.code.toLowerCase()}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectCountry;
