"import client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, X } from "lucide-react";

interface Activity {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

interface ActivitiesMultiSelectProps {
  selectedActivities: number[];
  onActivitiesChange: (activityIds: number[]) => void;
  placeholder?: string;
}

function ActivitiesMultiSelect({
  selectedActivities,
  onActivitiesChange,
  placeholder = "Select activities",
}: ActivitiesMultiSelectProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/product/product/activities/lists");

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      const data = await response.json();
      setActivities(data.data || data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActivity = (activityId: number) => {
    const newSelection = selectedActivities.includes(activityId)
      ? selectedActivities.filter((id) => id !== activityId)
      : [...selectedActivities, activityId];

    onActivitiesChange(newSelection);
  };

  const removeActivity = (activityId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onActivitiesChange(selectedActivities.filter((id) => id !== activityId));
  };

  const getSelectedActivityNames = () => {
    return activities
      .filter((activity) => selectedActivities.includes(activity.id))
      .map((activity) => activity.name);
  };

  const selectedNames = getSelectedActivityNames();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[40px] px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#086032] focus:border-transparent hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-wrap gap-1.5">
            {isLoading ? (
              <span className="text-gray-400 text-sm">
                Loading activities...
              </span>
            ) : error ? (
              <span className="text-red-500 text-sm">{error}</span>
            ) : selectedNames.length === 0 ? (
              <span className="text-gray-400 text-sm">{placeholder}</span>
            ) : (
              selectedNames.map((name, index) => {
                const activityId = activities.find((a) => a.name === name)?.id;
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#086032] text-white text-xs rounded-full"
                  >
                    {name}
                    <X
                      className="w-3 h-3 cursor-pointer hover:bg-[#5A8F37] rounded-full"
                      onClick={(e) =>
                        activityId && removeActivity(activityId, e)
                      }
                    />
                  </span>
                );
              })
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${isOpen ? "transform rotate-180" : ""
              }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isLoading && !error && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {activities.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              No activities available
            </div>
          ) : (
            <div className="py-1">
              {activities.map((activity) => {
                const isSelected = selectedActivities.includes(activity.id);
                return (
                  <div
                    key={activity.id}
                    onClick={() => toggleActivity(activity.id)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors flex items-start justify-between group"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {activity.name}
                        </span>

                      </div>

                    </div>
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${isSelected
                          ? "bg-[#086032] border-[#086032]"
                          : "border-gray-300 group-hover:border-[#086032]"
                        }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ActivitiesMultiSelect;
