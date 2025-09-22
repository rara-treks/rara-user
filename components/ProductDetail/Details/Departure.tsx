"use client";

import { useState, useCallback, useEffect } from "react";
import {
  TransformedDepartureItem,
  DepartureProps,
  DepartureData,
} from "../type";
import CustomTripSection from "./Departure/CustomTripSection";
import DepartureHeader from "./Departure/DepartureHeader";
import DepartureTable from "./Departure/DepartureTable";
import MonthTabs from "./Departure/MonthTabs";
import NoDataMessage from "./Departure/NoDataMessage";

const Departure = ({ data }: DepartureProps) => {
  // Early return if no data
  if (!data) {
    return <NoDataMessage />;
  }

  const {
    id,
    title,
    departureData,
  }: {
    id: number;
    title: string;
    departureData: DepartureData;
  } = data;

  // Check if departureData exists and has valid structure
  if (!departureData || typeof departureData !== "object") {
    return <NoDataMessage />;
  }

  // Get available months with data
  const availableMonths: string[] = Object.keys(departureData).filter(
    (month: string) => {
      const monthData: TransformedDepartureItem[] | undefined =
        departureData[month];
      return monthData && Array.isArray(monthData) && monthData.length > 0;
    }
  );

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("");

  // Set initial active tab when availableMonths changes
  useEffect(() => {
    if (availableMonths.length > 0 && !activeTab) {
      setActiveTab(availableMonths[0]);
    }
  }, [availableMonths, activeTab]);

  // Handle enquire action
  const handleEnquire = useCallback(
    (departure: TransformedDepartureItem): void => {
      // You can replace this with actual enquiry logic
      console.log("Enquiry for departure:", departure);
      alert(
        `Enquiry for: ${departure.dateRange}\nPrice: ${
          departure.price
        } per person\nTrek: ${title || "Unknown Trek"}`
      );
    },
    [title]
  );

  // Handle custom trip creation
  const handleCreateCustomTrip = useCallback((): void => {
    // You can replace this with actual custom trip logic
    console.log("Creating custom trip for:", title);
    alert(
      `Redirecting to custom trip creation for: ${title || "Unknown Trek"}`
    );
  }, [title]);

  // Handle tab change
  const handleTabChange = useCallback(
    (month: string): void => {
      if (availableMonths.includes(month)) {
        setActiveTab(month);
      }
    },
    [availableMonths]
  );

  // Get current departures for active tab
  const currentDepartures: TransformedDepartureItem[] =
    departureData[activeTab] || [];

  // Show no data message if no months available
  if (availableMonths.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6 p-6 bg-[#1E2F22] text-white rounded-2xl">
          <DepartureHeader title="Departure Date" />
          <div className="flex flex-col gap-3 items-center justify-center py-8">
            <p className="text-gray-300 text-center">
              No departure dates available at the moment.
            </p>
            <p className="text-gray-400 text-sm text-center">
              Please check back later or contact us for custom arrangements.
            </p>
          </div>
        </div>
        <CustomTripSection
          trekTitle={title}
          onCreateCustomTrip={handleCreateCustomTrip}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-6 p-6 bg-[#1E2F22] text-white rounded-2xl">
        <DepartureHeader title="Departure Date" />

        <div className="flex flex-col gap-3">
          <p className="text-gray-200">Select Departure Dates</p>

          <div className="w-full flex flex-col gap-3">
            {/* Month Tabs */}
            <MonthTabs
              availableMonths={availableMonths}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Departure Table */}
            {activeTab && (
              <DepartureTable
                departures={currentDepartures}
                onEnquire={handleEnquire}
                trekId={id}
                trekTitle={title}
              />
            )}

            {/* Show message if no departures for selected month */}
            {activeTab && currentDepartures.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-gray-300 text-center">
                  No departures available for {activeTab}.
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Please select another month or contact us for custom
                  arrangements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Trip Section */}
      <CustomTripSection
        trekTitle={title}
        onCreateCustomTrip={handleCreateCustomTrip}
      />
    </div>
  );
};

export default Departure;
