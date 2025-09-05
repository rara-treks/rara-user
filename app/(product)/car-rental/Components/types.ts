export interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  pricePerDay: number;
  rating: number;
  reviews: number;
  features: string[];
  fuelType: string;
  transmission: string;
  seats: number;
  available: boolean;
}

export interface BookingData {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface StatsItem {
  value: string;
  label: string;
}

export interface ServiceFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export interface SpecialService {
  title: string;
  description: string;
  buttonText: string;
}
