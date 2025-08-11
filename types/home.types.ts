export interface TrekCardProps {
  title?: string;
  images?: string[];
  rating?: number;
  discount?: string;
  duration?: string;
  minPeople?: string;
  difficulty?: string;
  currentPrice?: string;
  originalPrice?: string;
  currency?: string;
  availableSeats?: string;
  availabilityDate?: string;
  onBookNow?: () => void;
  onViewDetails?: () => void;
}
