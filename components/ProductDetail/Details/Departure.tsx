"use client";

import { useState, useCallback } from "react";
import { DepartureItem, DepartureProps } from "../type";
import CustomTripSection from "./Departure/CustomTripSection";
import DepartureHeader from "./Departure/DepartureHeader";
import DepartureTable from "./Departure/DepartureTable";
import MonthTabs from "./Departure/MonthTabs";
import NoDataMessage from "./Departure/NoDataMessage";

const Departure = ({ data }: DepartureProps) => {
  if (!data) {
    return <NoDataMessage />;
  }

  const { id, title, departureData } = data;

  const availableMonths: string[] = Object.keys(departureData).filter(
    (month: string) => departureData[month] && departureData[month].length > 0
  );

  const [activeTab, setActiveTab] = useState<string>(availableMonths[0] || "");

  const handleEnquire = useCallback(
    (departure: DepartureItem): void => {
      alert(
        `Enquiry for: ${departure.dateRange}\nPrice: ${
          departure.price
        } per person\nTrek: ${title || "Unknown Trek"}`
      );
    },
    [title]
  );

  const handleCreateCustomTrip = useCallback((): void => {
    alert(
      `Redirecting to custom trip creation for: ${title || "Unknown Trek"}`
    );
  }, [title]);

  const handleTabChange = useCallback((month: string): void => {
    setActiveTab(month);
  }, []);

  const currentDepartures: DepartureItem[] = departureData[activeTab] || [];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-6 p-6 bg-[#1E2F22] text-white rounded-2xl">
        <DepartureHeader title="Departure Date" />

        <div className="flex flex-col gap-3">
          <p>Select Departure Dates</p>

          <div className="w-full flex flex-col gap-3">
            <MonthTabs
              availableMonths={availableMonths}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            <DepartureTable
              departures={currentDepartures}
              onEnquire={handleEnquire}
              trekId={id}
              trekTitle={title}
            />
          </div>
        </div>
      </div>

      <CustomTripSection
        trekTitle={title}
        onCreateCustomTrip={handleCreateCustomTrip}
      />
    </div>
  );
};

export default Departure;
