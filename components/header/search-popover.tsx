import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Search from "./search";

interface Props {
  children: React.ReactNode;
}

function SearchPopover({ children }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" sideOffset={10} align="end" className="p-2">
        <Search />
      </PopoverContent>
    </Popover>
  );
}

export default SearchPopover;
