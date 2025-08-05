"use client";
import { ProductPrice } from "@/types/product.types";
import { create } from "zustand";

export interface BookingData {
  id: number;
  name: string;
  location: string;
  averageRating: string | null;
  featuredImage: string;
  type: string;
  relatedProducts: {
    id: number;
    name: string;
    prices: ProductPrice[];
  }[];
  prices: ProductPrice[];
}

interface State {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  adults: number;
  childrens: number;
  infants: number;
  note: string;
  phone: string;
  additionalProducts: number[];
}

interface Actions {
  setData: (data: Partial<State>) => void;
}

const useBooking = create<State & Actions>((set) => ({
  fromDate: undefined,
  toDate: undefined,
  adults: 1,
  childrens: 0,
  infants: 0,
  note: "",
  additionalProducts: [],
  phone: "",
  setData: (data: Partial<State>) => set((prevData) => ({ ...prevData, ...data })),
}));

export default useBooking;
