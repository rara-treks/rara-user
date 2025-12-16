"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  TransformedDepartureItem,
  DepartureProps,
  DepartureData,
} from "../type";
import DepartureHeader from "./Departure/DepartureHeader";
import DepartureTable from "./Departure/DepartureTable";
import MonthTabs from "./Departure/MonthTabs";
import NoDataMessage from "./Departure/NoDataMessage";

const Departure = ({ data }: DepartureProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  // Early return if no data
  if (!data) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="w-4 h-4 mr-2" />
            Check Availability
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E2F22] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Departure Dates</DialogTitle>
          </DialogHeader>
          <NoDataMessage />
        </DialogContent>
      </Dialog>
    );
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
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="w-4 h-4 mr-2" />
            Check Availability
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E2F22] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Departure Dates</DialogTitle>
          </DialogHeader>
          <NoDataMessage />
        </DialogContent>
      </Dialog>
    );
  }

  // Get available months with data
  const availableMonths: string[] = Object.keys(departureData).filter(
    (month: string) => {
      const monthData: TransformedDepartureItem[] | undefined =
        departureData[month];
      return monthData && Array.isArray(monthData) && monthData.length > 0;
    }
  );

  // Set initial active tab when availableMonths changes
  useEffect(() => {
    if (availableMonths.length > 0 && !activeTab) {
      setActiveTab(availableMonths[0]);
    }
  }, [availableMonths, activeTab]);

  // Handle enquire action
  const handleEnquire = useCallback(
    (departure: TransformedDepartureItem): void => {
      alert(
        `Enquiry for: ${departure.dateRange}\nPrice: ${
          departure.price
        } per person\nTrek: ${title || "Unknown Trek"}`
      );
    },
    [title]
  );

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="w-4 h-4 mr-2" />
            Check Availability
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E2F22] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Departure Dates</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 items-center justify-center py-8">
            <p className="text-gray-300 text-center">
              No departure dates available at the moment.
            </p>
            <p className="text-gray-400 text-sm text-center">
              Please check back later or contact us for custom arrangements.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FEBD18] hover:bg-[#FEBD18] text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Check Availability
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1E2F22] text-white border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {title} - Departure Dates
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select your preferred departure date and inquire about availability
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-3">
            <p className="text-gray-200 font-medium">Select Departure Month</p>

            {/* Month Tabs */}
            <MonthTabs
              availableMonths={availableMonths}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Departure Table */}
            {activeTab && currentDepartures.length > 0 && (
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
      </DialogContent>
    </Dialog>
  );
};

export default Departure;
