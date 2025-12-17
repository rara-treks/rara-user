"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DepartureTableProps } from "./types";
import { TransformedDepartureItem } from "../../type";
import TrekInquiryPopup from "./Inquire";
import CustomTripInquiryPopup from "./CustomInquiry";
import CustomTripBookingPopup from "./Booking";

interface ExtendedDepartureTableProps {
  trekId?: number;
  trekTitle?: string;
  departures: TransformedDepartureItem[];
  onEnquire: (departure: TransformedDepartureItem) => void;
}

const DepartureTable = ({
  departures,
  trekId,
  trekTitle,
}: ExtendedDepartureTableProps) => {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {departures.map(
              (departure: TransformedDepartureItem, index: number) => (
                <TableRow
                  key={departure.id}
                  className={`bg-[#1E2F22] hover:bg-[#2A3F2E] transition-colors duration-200 ${index < departures.length - 1
                      ? "border-b border-gray-600"
                      : ""
                    }`}
                >
                  <TableCell className="font-medium text-white">
                    {departure.dateRange}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-[#086032]">
                        {departure.availability}
                      </p>
                      <p className="text-xs text-[#F2F5F080]">departure date</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-white">
                        {departure.price}
                      </p>
                      <p className="text-xs text-[#F2F5F080]">per person</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center flex gap-2">
                    <CustomTripInquiryPopup
                      departure={departure}
                      trekId={trekId}
                      trekTitle={trekTitle}
                      buttonText="inquire Now"
                    />

                    <CustomTripBookingPopup
                      departure={departure}
                      trekId={trekId}
                      trekTitle={trekTitle}
                      buttonText="Book Now"
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {departures.map((departure: TransformedDepartureItem) => (
          <div
            key={departure.id}
            className="bg-[#1E2F22] rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg"
          >
            {/* Date Range */}
            <div className="mb-4">
              <p className="text-sm text-[#F2F5F080] mb-1">Dates</p>
              <p className="text-white font-semibold text-lg">
                {departure.dateRange}
              </p>
            </div>

            {/* Availability and Price Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-[#2A3F2E] rounded-md p-3">
                <p className="text-xs text-[#F2F5F080] mb-1">Availability</p>
                <p className="text-xl font-bold text-[#086032]">
                  {departure.availability}
                </p>
              </div>
              <div className="bg-[#2A3F2E] rounded-md p-3">
                <p className="text-xs text-[#F2F5F080] mb-1">Price</p>
                <p className="text-xl font-bold text-white">
                  {departure.price}
                </p>
                <p className="text-xs text-[#F2F5F080]">per person</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                <CustomTripInquiryPopup
                  departure={departure}
                  trekId={trekId}
                  trekTitle={trekTitle}
                  buttonText="inquire Now"
                />
              </div>
              <div className="flex-1">
                <CustomTripBookingPopup
                  departure={departure}
                  trekId={trekId}
                  trekTitle={trekTitle}
                  buttonText="Book Now"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DepartureTable;
