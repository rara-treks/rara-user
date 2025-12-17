import {
  ClockCounterClockwiseIcon,
  CloudSunIcon,
  MapPinAreaIcon,
  MountainsIcon,
  PersonSimpleHikeIcon,
  UsersThreeIcon,
  PathIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  IconBackpack,
  IconShoe,
  IconJacket,
  IconBrandRedhat,
  IconTrekking,
  Icon3dCubeSphere,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface TripDetails {
  duration: string;
  location: string;
  tripGrade: string;
  maximumAltitude: string;
  groupSize: string;
  activities: string;
  bestTime: string;
  starts: string;
}

interface WhatToBringItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface TripOverviewData {
  description: string;
  intro: string;
  details: TripDetails;
  highlights: string[];
  what_to_bring: WhatToBringItem[];
}

interface UpdatedTripOverviewProps {
  data: TripOverviewData;
}

const ICONS = {
  duration: ClockCounterClockwiseIcon,
  location: MapPinAreaIcon,
  tripGrade: MountainsIcon,
  maximumAltitude: "/assets/maximum-altitude.svg",
  groupSize: UsersThreeIcon,
  activities: PersonSimpleHikeIcon,
  bestTime: CloudSunIcon,
  starts: PathIcon,
} as const;

const WHAT_TO_BRING_ICONS: { [key: string]: React.ElementType } = {
  IconBackpack,
  IconShoe,
  IconJacket,
  IconBrandRedhat,
  IconTrekking,
  Icon3dCubeSphere,
};

interface ActivityDetailProps {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
}

const WhatToBringItem = ({ item }: { item: WhatToBringItem }) => {
  return (
    <div className="flex gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#086032] hover:bg-green-50 transition-all items-start">
      <div className="flex-shrink-0">
        {React.createElement(WHAT_TO_BRING_ICONS[item.icon] || IconBackpack, {
          className: "w-6 h-6 text-[#086032]",
        })}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Trip_Overview = ({ data }: UpdatedTripOverviewProps) => {
  if (!data) {
    return (
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Trip Overview</h1>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            Trip overview data is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">Trip Overview</h1>
      <div className="rounded-3xl bg-white p-6 flex flex-col w-full gap-6 shadow-sm">
        {data.intro && (
          <p
            className="text-sm md:text-md text-[#3E641C] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />
        )}
      </div>

      <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="font-bold text-xl text-[#3E641C]">Trip Highlights</h2>
        <div className="text-sm md:text-md ">
          <div
            className="[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="font-bold text-xl text-[#3E641C]">What to Bring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.what_to_bring && data.what_to_bring.length > 0 ? (
            data.what_to_bring.map((item) => (
              <WhatToBringItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No items to bring information available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trip_Overview;
