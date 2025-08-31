"use client";
import { useState } from "react";

// Type definitions
interface Trek {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "Guaranteed" | "Available";
  price: number;
}

interface TrekData {
  [key: string]: Trek[];
}

interface DepartureTableProps {
  title?: string;
  message?: string;
  customData?: TrekData;
}

// Default dataset
const defaultTrekData: TrekData = {
  "August 2025": [
    {
      id: 1,
      name: "Annapurna Base Camp Trek",
      startDate: "August 10 2025",
      endDate: "August 25 2025",
      status: "Guaranteed",
      price: 2100,
    },
    {
      id: 2,
      name: "Everest Base Camp Trek",
      startDate: "August 15 2025",
      endDate: "August 30 2025",
      status: "Guaranteed",
      price: 2500,
    },
  ],
  "September 2025": [
    {
      id: 3,
      name: "Annapurna Base Camp Trek",
      startDate: "September 05 2025",
      endDate: "September 20 2025",
      status: "Guaranteed",
      price: 2100,
    },
    {
      id: 4,
      name: "Manaslu Circuit Trek",
      startDate: "September 12 2025",
      endDate: "September 27 2025",
      status: "Available",
      price: 1900,
    },
  ],
  "October 2025": [
    {
      id: 5,
      name: "Everest Base Camp Trek",
      startDate: "October 01 2025",
      endDate: "October 16 2025",
      status: "Guaranteed",
      price: 2600,
    },
    {
      id: 6,
      name: "Annapurna Circuit Trek",
      startDate: "October 10 2025",
      endDate: "October 25 2025",
      status: "Available",
      price: 1800,
    },
  ],
  "November 2025": [
    {
      id: 7,
      name: "Annapurna Base Camp Trek",
      startDate: "November 05 2025",
      endDate: "November 20 2025",
      status: "Available",
      price: 1950,
    },
    {
      id: 8,
      name: "Gokyo Lakes Trek",
      startDate: "November 15 2025",
      endDate: "November 30 2025",
      status: "Guaranteed",
      price: 2200,
    },
  ],
};

const DepartureTable: React.FC<DepartureTableProps> = ({
  title = "Trek Departure Date",
  message = "Select Departure Dates",
  customData,
}) => {
  const trekData = customData || defaultTrekData;
  const [selectedMonth, setSelectedMonth] = useState<string>(
    Object.keys(trekData)[0]
  );
  const months = Object.keys(trekData);
  const currentData = trekData[selectedMonth] || [];

  return (
    <div className="rounded-lg overflow-hidden flex flex-col gap-4 p-4 w-full mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          {title}
        </h1>
        <h2 className="font-bold text-gray-800">{message}</h2>
      </div>

      {/* Month Tabs */}
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`
              ${
                selectedMonth === month
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                  : "bg-transparent border-0 text-gray-700 hover:bg-gray-50"
              } 
              rounded-full px-4 md:px-6 py-2 transition-all duration-200 whitespace-nowrap text-sm md:text-base font-medium
            `}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-transparent overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {currentData.map((trek, index) => (
                <tr
                  key={trek.id}
                  className={`${
                    index !== currentData.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50 transition-colors duration-150`}
                >
                  <td className="p-4 font-medium text-gray-900">{trek.name}</td>
                  <td className="p-4 text-gray-700">
                    {trek.startDate} - {trek.endDate}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="font-bold">{trek.status}</span>
                      <span className="text-xs text-gray-500">
                        departure date
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-green-600">
                        ${trek.price}
                      </span>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 transition-colors duration-200 font-medium">
                      Enquire Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentData.map((trek) => (
          <div
            key={trek.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-4">
              {/* Trek Name */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {trek.name}
                </h3>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Duration
                </p>
                <p className="text-gray-800 font-medium">
                  {trek.startDate} - {trek.endDate}
                </p>
              </div>

              {/* Status and Price Row */}
              <div className="flex justify-between items-start">
                <div className="bg-gray-50 rounded-lg p-3 flex-1 mr-2">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Status
                  </p>
                  <p className="font-bold">{trek.status}</p>
                  <p className="text-xs text-gray-500">departure date</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1 ml-2 text-right">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Price
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    ${trek.price}
                  </p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              {/* Enquire Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 transition-colors duration-200 font-medium">
                Enquire Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No data message */}
      {currentData.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <p className="text-lg">No treks available for {selectedMonth}</p>
          <p className="text-sm mt-2">Please select a different month</p>
        </div>
      )}
    </div>
  );
};

export default DepartureTable;
