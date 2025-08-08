"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
  PersonSimpleTaiChi,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  dropdownItems: string[];
}

const navigationItems: NavigationItem[] = [
  {
    id: "trek",
    label: "Trek",
    icon: PersonSimpleHike,
    dropdownItems: [
      "Everest Base Camp",
      "Annapurna Circuit",
      "Langtang Valley",
      "Manaslu Circuit",
    ],
  },
  {
    id: "tour",
    label: "Tour",
    icon: Mountains,
    dropdownItems: [
      "Cultural Tours",
      "Heritage Sites",
      "City Tours",
      "Temple Tours",
    ],
  },
  {
    id: "departures",
    label: "Departures",
    icon: AirplaneTakeoff,
    dropdownItems: [
      "Group Departures",
      "Private Departures",
      "Fixed Departures",
      "Custom Departures",
    ],
  },
  {
    id: "activities",
    label: "Activities",
    icon: PersonSimpleTaiChi,
    dropdownItems: [
      "Rock Climbing",
      "Paragliding",
      "River Rafting",
      "Bungee Jumping",
    ],
  },
  {
    id: "safari",
    label: "Safari",
    icon: Jeep,
    dropdownItems: [
      "Jungle Safari",
      "Wildlife Safari",
      "Jeep Safari",
      "Elephant Safari",
    ],
  },
];

function NavigationMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownChange = (itemId: string, isOpen: boolean) => {
    setActiveDropdown(isOpen ? itemId : null);
  };

  return (
    <div className="w-full flex justify-center gap-24 items-center">
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeDropdown === item.id;

        return (
          <DropdownMenu
            key={item.id}
            onOpenChange={(isOpen) => handleDropdownChange(item.id, isOpen)}
          >
            <DropdownMenuTrigger asChild>
              <div className="flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200">
                <IconComponent
                  size={32}
                  className={isActive ? "text-[#1E2F22]" : "text-[#1E2F22]/40"}
                />
                <span className="flex items-center gap-1">
                  <p className={isActive ? "text-gray-800" : "text-gray-400"}>
                    {item.label}
                  </p>
                  <ChevronDown
                    className={`text-md transition-colors duration-200 ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                    size={18}
                  />
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-48 mt-2">
              {item.dropdownItems.map((dropdownItem, index) => (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {dropdownItem}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}

export default NavigationMenu;
