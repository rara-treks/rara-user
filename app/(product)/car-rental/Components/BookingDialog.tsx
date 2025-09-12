"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Car } from "./types";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
}

interface BookingData {
  name: string;
  email: string;
  contact: string;
  departureDate: string;
  returnDate: string;
  pickupAddress: string;
  dropoffAddress: string;
  additionalRequests: string;
}

const BookingDialog = ({
  isOpen,
  onClose,
  selectedCar,
}: BookingDialogProps) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    contact: "",
    departureDate: "",
    returnDate: "",
    pickupAddress: "",
    dropoffAddress: "",
    additionalRequests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = () => {
    // Basic validation
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.contact ||
      !bookingData.departureDate ||
      !bookingData.pickupAddress ||
      !bookingData.dropoffAddress
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(`Booking submitted for ${selectedCar?.name}!`);
    onClose();
  };

  if (!selectedCar) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border border-slate-700/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🚗</span> Book This Car
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center space-x-4 bg-slate-700/50 p-4 rounded-lg">
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
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={bookingData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="contact"
              value={bookingData.contact}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Pickup Date *
              </label>
              <input
                type="date"
                name="departureDate"
                value={bookingData.departureDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                required
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

          {/* Location Information */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Pickup Address *
            </label>
            <input
              type="text"
              name="pickupAddress"
              value={bookingData.pickupAddress}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter pickup location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Drop-off Address *
            </label>
            <input
              type="text"
              name="dropoffAddress"
              value={bookingData.dropoffAddress}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400"
              placeholder="Enter drop-off location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Additional Requests
            </label>
            <textarea
              name="additionalRequests"
              value={bookingData.additionalRequests}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 resize-none"
              placeholder="Any special requirements or requests..."
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">Daily Rate:</span>
              <span className="text-sm font-medium text-white">
                ${selectedCar.pricePerDay}.00
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">Insurance:</span>
              <span className="text-sm font-medium text-emerald-400">
                Included
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">24/7 Support:</span>
              <span className="text-sm font-medium text-emerald-400">
                Included
              </span>
            </div>
            <div className="border-t border-slate-600 my-2"></div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span className="text-white">Total:</span>
              <span className="text-emerald-400">
                ${selectedCar.pricePerDay}.00/day
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 text-slate-300 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBookingSubmit}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all font-medium flex items-center justify-center gap-2"
            >
              <span>✓</span> Reserve Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-slate-400 text-center space-y-1 pt-2">
            <p>✓ Free cancellation up to 24 hours before pickup</p>
            <p>✓ No hidden fees or charges</p>
            <p>✓ Instant booking confirmation</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
