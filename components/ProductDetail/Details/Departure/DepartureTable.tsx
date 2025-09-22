"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DepartureTableProps } from "./types";
import { TransformedDepartureItem } from "../../type";
import TrekInquiryPopup from "./Inquire";

interface ExtendedDepartureTableProps {
  trekId?: number;
  trekTitle?: string;
  departures: TransformedDepartureItem[];
  onEnquire: (departure: TransformedDepartureItem) => void;
}

const DepartureTable = ({
  departures,
  onEnquire,
  trekId,
  trekTitle,
}: ExtendedDepartureTableProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableBody>
          {departures.map(
            (departure: TransformedDepartureItem, index: number) => (
              <TableRow
                key={departure.id}
                className={`bg-[#1E2F22] hover:bg-[#2A3F2E] transition-colors duration-200 ${
                  index < departures.length - 1
                    ? "border-b border-gray-600"
                    : ""
                }`}
              >
                <TableCell className="font-medium text-white">
                  {departure.dateRange}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-[#71B344]">
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
                <TableCell className="text-center">
                  {/* <Button
                  onClick={() => onEnquire(departure)}
                  className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200"
                >
                  Enquire Now
                </Button> */}
                  <TrekInquiryPopup
                    departure={departure}
                    trekId={trekId}
                    trekTitle={trekTitle}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartureTable;
