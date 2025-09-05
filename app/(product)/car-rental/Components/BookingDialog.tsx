"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Car, BookingData } from "./types";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  selectedCar,
}) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    returnLocation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = () => {
    alert(`Booking submitted for ${selectedCar?.name}!`);
    onClose();
  };

  if (!selectedCar) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border border-slate-700/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Quick Booking
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-20 h-12 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-bold text-white">{selectedCar.name}</h4>
              <p className="text-emerald-400 font-semibold">
                ${selectedCar.pricePerDay}/day
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={bookingData.pickupLocation}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter pickup location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={bookingData.pickupDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={bookingData.returnDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Return Location
            </label>
            <input
              type="text"
              name="returnLocation"
              value={bookingData.returnLocation}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter return location"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 text-slate-300 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBookingSubmit}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;