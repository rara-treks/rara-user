"use client";

import { Button } from "@/components/ui/button";
import { MonthTabsProps } from "./types";

const MonthTabs = ({
  availableMonths,
  activeTab,
  onTabChange,
}: MonthTabsProps) => {
  return (
    <div className="flex items-center justify-start gap-3 w-full flex-wrap">
      {availableMonths.map((month: string) => (
        <Button
          key={month}
          onClick={() => onTabChange(month)}
          className={`${activeTab === month
              ? "bg-[#086032] text-white"
              : "bg-transparent hover:bg-[#086032] text-white"
            } rounded-full px-6 py-2 transition-all duration-200`}
        >
          {month}
        </Button>
      ))}
    </div>
  );
};

export default MonthTabs;
