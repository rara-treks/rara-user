"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  fromDate?: Date;
  children: React.ReactNode;
}

function DatePicker({ date, setDate, fromDate, children }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[999]">
        <Calendar mode="single" selected={date} onSelect={setDate} fromDate={fromDate} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
