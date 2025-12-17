import { Button } from "@/components/ui/button";
import {
  ClockCounterClockwiseIcon,
  CloudSunIcon,
  MapPinAreaIcon,
  MountainsIcon,
  PersonSimpleHikeIcon,
  UsersThreeIcon,
  PathIcon,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import React from "react";
import Departure from "./Departure";

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

interface TransformedDepartureItem {
  id: number;
  dateRange: string;
  price: string;
  availability: string;
  departure_from: string;
  departure_to: string;
  departure_per_price: number;
}

interface DepartureData {
  [month: string]: TransformedDepartureItem[];
}

interface DepartureDataProp {
  id: number;
  title: string;
  departureData: DepartureData;
}

interface UpdatedTripOverviewProps {
  data: TripOverviewData;
  departureData: DepartureDataProp;
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

interface ActivityDetailProps {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
}

const ActivityDetailItem = ({ icon, label, value }: ActivityDetailProps) => {
  const IconComponent = ICONS[icon];
  return (
    <div className="flex items-center gap-3 justify-start p-2 bg-white rounded-lg shadow-sm">
      {typeof IconComponent === "string" ? (
        <Image
          src={IconComponent}
          alt={label.toLowerCase()}
          width={24}
          height={24}
          className="w-5 h-5 text-[#086032]"
        />
      ) : (
        <IconComponent className="w-5 h-5 text-[#086032]" />
      )}
      <div className="flex flex-col items-start justify-start">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <h3 className="font-bold text-sm text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

const Trip_Data = ({ data, departureData }: UpdatedTripOverviewProps) => {
  if (!data) {
    return (
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Trip Details</h1>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            Trip data is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 lg:px-3">
      <div className="rounded-3xl bg-white p-4 flex flex-col w-full gap-6 shadow-sm">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-800">Trip Details</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
            <ActivityDetailItem
              icon="duration"
              label="Duration"
              value={data.details.duration}
            />
            <ActivityDetailItem
              icon="location"
              label="Location"
              value={data.details.location}
            />
            <ActivityDetailItem
              icon="tripGrade"
              label="Trip Grade"
              value={data.details.tripGrade}
            />
            <ActivityDetailItem
              icon="maximumAltitude"
              label="Maximum Altitude"
              value={data.details.maximumAltitude}
            />
            <ActivityDetailItem
              icon="groupSize"
              label="Group Size"
              value={data.details.groupSize}
            />
            <ActivityDetailItem
              icon="activities"
              label="Activities"
              value={data.details.activities}
            />
            <ActivityDetailItem
              icon="bestTime"
              label="Best Time"
              value={data.details.bestTime}
            />
            <ActivityDetailItem
              icon="starts"
              label="Starts/Ends"
              value={data.details.starts}
            />
            <br className="block md:hidden mt-4 md:mt-0" />
            <div className="p-2">
              <Departure data={departureData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip_Data;
