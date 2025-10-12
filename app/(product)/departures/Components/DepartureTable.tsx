"use client";
import { useState, useMemo } from "react";
import type { SimplifiedProduct, Departure } from "@/types/departure";
import CustomTripInquiryPopup from "@/components/ProductDetail/Details/Departure/CustomInquiry";

interface DepartureTableProps {
  title?: string;
  message?: string;
  products: SimplifiedProduct[];
}

interface GroupedDeparture {
  id: number;
  productId: number;
  productName: string;
  startDate: string;
  endDate: string;
  price: string;
  departure_from: string;
  departure_to: string;
}

interface GroupedData {
  [monthYear: string]: GroupedDeparture[];
}

interface TransformedDepartureItem {
  id: number;
  dateRange: string;
  availability: string;
  price: string;
  departure_from?: string;
  departure_to?: string;
}

const DepartureTable: React.FC<DepartureTableProps> = ({
  title = "Trek Departure Date",
  message = "Select Departure Dates",
  products,
}) => {
  // Transform and group departures by month
  const groupedData = useMemo<GroupedData>(() => {
    const grouped: GroupedData = {};

    products.forEach((product) => {
      product.departures.forEach((departure) => {
        // Parse the departure date
        const startDate = new Date(departure.departure_from);
        const monthYear = startDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!grouped[monthYear]) {
          grouped[monthYear] = [];
        }

        grouped[monthYear].push({
          id: departure.id,
          productId: product.id,
          productName: product.name,
          startDate: startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          endDate: new Date(departure.departure_to).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ),
          price: departure.departure_per_price,
          departure_from: departure.departure_from,
          departure_to: departure.departure_to,
        });
      });
    });

    // Sort months chronologically
    const sortedGrouped: GroupedData = {};
    Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      })
      .forEach((key) => {
        sortedGrouped[key] = grouped[key];
      });

    return sortedGrouped;
  }, [products]);

  const months = Object.keys(groupedData);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0] || "");
  const currentData = groupedData[selectedMonth] || [];

  // Helper function to transform departure data for CustomTripInquiryPopup
  const transformDepartureData = (
    departure: GroupedDeparture
  ): TransformedDepartureItem => {
    return {
      id: departure.id,
      dateRange: `${departure.startDate} - ${departure.endDate}`,
      availability: "Available",
      price: departure.price,
      departure_from: departure.departure_from,
      departure_to: departure.departure_to,
    };
  };

  // Show message if no data available
  if (products.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden flex flex-col gap-4 p-4 w-full mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600">
            {title}
          </h1>
          <h2 className="font-bold text-gray-800">{message}</h2>
        </div>
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <p className="text-lg">No departures available at the moment</p>
          <p className="text-sm mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

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
              {currentData.map((departure, index) => (
                <tr
                  key={departure.id}
                  className={`${
                    index !== currentData.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50 transition-colors duration-150`}
                >
                  <td className="p-4 font-medium text-gray-900">
                    {departure.productName}
                  </td>
                  <td className="p-4 text-gray-700">
                    {departure.startDate} - {departure.endDate}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="font-bold">Available</span>
                      <span className="text-xs text-gray-500">
                        departure date
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-green-600">
                        ${departure.price}
                      </span>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <CustomTripInquiryPopup
                      departure={transformDepartureData(departure)}
                      trekId={departure.productId}
                      trekTitle={departure.productName}
                      buttonText="Enquire Now"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentData.map((departure) => (
          <div
            key={departure.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {departure.productName}
                </h3>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Duration
                </p>
                <p className="text-gray-800 font-medium">
                  {departure.startDate} - {departure.endDate}
                </p>
              </div>

              {/* Status and Price Row */}
              <div className="flex justify-between items-start">
                <div className="bg-gray-50 rounded-lg p-3 flex-1 mr-2">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Status
                  </p>
                  <p className="font-bold">Available</p>
                  <p className="text-xs text-gray-500">departure date</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1 ml-2 text-right">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Price
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    ${departure.price}
                  </p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              {/* Enquire Button */}
              <CustomTripInquiryPopup
                departure={transformDepartureData(departure)}
                trekId={departure.productId}
                trekTitle={departure.productName}
                buttonText="Enquire Now"
              />
            </div>
          </div>
        ))}
      </div>

      {/* No data message for selected month */}
      {currentData.length === 0 && selectedMonth && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <p className="text-lg">No departures available for {selectedMonth}</p>
          <p className="text-sm mt-2">Please select a different month</p>
        </div>
      )}
    </div>
  );
};

export default DepartureTable;
