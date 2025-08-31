import { DepartureItem, DepartureData, DepartureProps } from "../../type";

export interface MonthTabsProps {
  availableMonths: string[];
  activeTab: string;
  onTabChange: (month: string) => void;
}

export interface DepartureTableProps {
  departures: DepartureItem[];
  onEnquire: (departure: DepartureItem) => void;
}

export interface CustomTripSectionProps {
  onCreateCustomTrip: () => void;
  trekTitle?: string;
}

export interface DepartureHeaderProps {
  title: string;
}
