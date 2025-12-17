"use client";

import { Cake, ChevronDown, ChevronUp, Clock, Home, Hotel, MapPin, MountainIcon } from "lucide-react";
import React, { useState } from "react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: string;
  duration: string;
  location: string;
  accommodation: string;
  meals: string;
  activities: string;
}

interface ItineraryProps {
  data: ItineraryDay[];
}

const Itinerary = ({ data }: ItineraryProps) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1])); // First day expanded by default

  const toggleDay = (day: number) => {
    const newExpandedDays = new Set(expandedDays);
    if (newExpandedDays.has(day)) {
      newExpandedDays.delete(day);
    } else {
      newExpandedDays.add(day);
    }
    setExpandedDays(newExpandedDays);
  };

  const expandAll = () => {
    const allDays = new Set(data.map((item) => item.day));
    setExpandedDays(allDays);
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

  // Helper function to strip HTML tags from description
  const stripHtml = (html: string): string => {
    if (typeof window !== "undefined") {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    }
    // Fallback for server-side rendering
    return html.replace(/<[^>]*>/g, "").trim();
  };

  // Helper function to format meals
  const formatMeals = (meals: string): string => {
    if (!meals || meals === "N/A") return "Not specified";
    return meals.replace(/,\s*/g, ", ").replace(/\b(B|L|D)\b/g, (match) => {
      switch (match) {
        case "B":
          return "Breakfast";
        case "L":
          return "Lunch";
        case "D":
          return "Dinner";
        default:
          return match;
      }
    });
  };

  // Helper function to extract max altitude
  const getMaxAltitude = (): number => {
    return Math.max(
      ...data.map((d) => {
        const altStr = d.altitude.replace(/\D/g, "");
        return altStr ? parseInt(altStr) : 0;
      })
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Trek Itinerary
          </h2>
          <p className="text-gray-600">
            No itinerary information available for this trek.
          </p>
        </div>
      </div>
    );
  }

  const maxAltitude = getMaxAltitude();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Trek Itinerary
            </h2>
            <p className="text-gray-600">
              Detailed daily breakdown of your {data.length}-day adventure
            </p>
          </div>

          {/* Expand/Collapse Controls */}
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="px-4 py-2 text-sm font-medium text-[#086032] border border-[#086032] rounded-lg hover:bg-[#086032] hover:text-white transition-colors duration-200"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="hidden md:block md:absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {data.map((dayData, index) => {
            const isExpanded = expandedDays.has(dayData.day);

            return (
              <div key={dayData.day} className="relative">
                {/* Timeline Node */}
                <div className="hidden md:block md:absolute left-4 md:left-6 w-4 h-4 bg-[#086032] rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content Card */}
                <div className=" md:ml-16">
                  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Day Header - Always Visible */}
                    <div
                      className="py-3 px-4 md:p-4 cursor-pointer"
                      onClick={() => toggleDay(dayData.day)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#086032] text-white">
                              Day {dayData.day}
                            </span>
                            <h3 className="text-md md:text-lg font-semibold text-gray-900 mb-1">
                              {dayData.title}
                            </h3>
                          </div>
                        </div>
                        <button className="ml-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 md:px-4 pb-2 md:pb-4 border-t border-gray-100">
                        <div className="pt-2 space-y-2">
                          {/* Description */}
                          <div>
                            <div className="text-sm md:text-md text-gray-700 leading-relaxed">
                              {stripHtml(dayData.description)}
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                            {dayData.duration !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Clock className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Duration
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {dayData.duration}
                                  </div>
                                </div>
                              </div>
                            )}

                            {dayData.location !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <MapPin className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Location
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {dayData.location}
                                  </div>
                                </div>
                              </div>
                            )}

                            {dayData.altitude !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <MountainIcon className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Altitude
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {dayData.altitude}
                                  </div>
                                </div>
                              </div>
                            )}

                            {dayData.activities !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Home className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Activities
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {dayData.activities}
                                  </div>
                                </div>
                              </div>
                            )}

                            {dayData.accommodation !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Hotel className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Accommodation
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {dayData.accommodation}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Meals */}
                            {dayData.meals !== "N/A" && (
                              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <Cake className="w-5 h-5 text-[#086032] mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 text-md">
                                    Meals Included
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {formatMeals(dayData.meals)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Itinerary may be subject to change due to
          weather conditions, local circumstances, or safety considerations.
          Your guide will inform you of any necessary adjustments during the
          trek.
        </p>
      </div>
    </div>
  );
};

export default Itinerary;
