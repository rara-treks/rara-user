"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Users,
  Mail,
  Phone,
  User,
  Calendar,
  Baby,
  UserCheck,
  Clock,
} from "lucide-react";

interface CustomTripFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  destination: string;
  adults: string;
  children: string;
  startDate: string;
  endDate: string;
  duration: string;
  budget: string;
  accommodation: string;
  transportation: string;
  activities: string;
  specialRequirements: string;
  message: string;
}

interface CustomTripInquiryPopupProps {
  defaultDestination?: string;
    trekTitle?: string;
}

export default function CustomTripInquiryPopup({
  defaultDestination = "",
  trekTitle,
}: CustomTripInquiryPopupProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CustomTripFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    destination: trekTitle || defaultDestination,
    adults: "",
    children: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: "",
    accommodation: "",
    transportation: "",
    activities: "",
    specialRequirements: "",
    message: "",
  });

  // Calculate duration when dates change
  const calculateDuration = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate) return "";

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";
      if (end <= start) return "";

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } catch (error) {
      return "";
    }
  };

  // Auto-calculate duration when dates change
  useEffect(() => {
    const duration = calculateDuration(formData.startDate, formData.endDate);
    if (duration && duration !== formData.duration) {
      setFormData((prev) => ({
        ...prev,
        duration,
      }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (
    field: keyof CustomTripFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.destination ||
      !formData.adults
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate dates
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        alert("End date must be after start date");
        return;
      }
    }

    // Process form submission here
    console.log("Custom Trip Form submitted:", formData);
    alert(
      "Thank you for your custom trip inquiry! We will contact you soon with a personalized itinerary."
    );
    setOpen(false);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      destination: trekTitle || defaultDestination,
      adults: "",
      children: "",
      startDate: "",
      endDate: "",
      duration: "",
      budget: "",
      accommodation: "",
      transportation: "",
      activities: "",
      specialRequirements: "",
      message: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200">
          Create Custom Trip
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            Custom Trip Planning Inquiry
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Let us create a personalized travel experience just for you
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="Enter your country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium">
              Desired Destination *
            </Label>
            <Input
              id="destination"
              type="text"
              value={formData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              placeholder="Where would you like to go? (e.g., Nepal, Bhutan, Tibet)"
              className={`w-full ${
                trekTitle ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              readOnly={!!trekTitle}
            />
          </div>

          {/* Group Size - Adults and Children */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="adults"
                className="text-sm font-medium flex items-center gap-1"
              >
                <UserCheck className="w-4 h-4" />
                Number of Adults *
              </Label>
              <Select
                value={formData.adults}
                onValueChange={(value) => handleInputChange("adults", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select number of adults" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
                  <SelectItem value="5">5 Adults</SelectItem>
                  <SelectItem value="6">6 Adults</SelectItem>
                  <SelectItem value="7">7 Adults</SelectItem>
                  <SelectItem value="8">8 Adults</SelectItem>
                  <SelectItem value="9+">9+ Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="children"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Baby className="w-4 h-4" />
                Number of Children
              </Label>
              <Select
                value={formData.children}
                onValueChange={(value) => handleInputChange("children", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select number of children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Children</SelectItem>
                  <SelectItem value="1">1 Child</SelectItem>
                  <SelectItem value="2">2 Children</SelectItem>
                  <SelectItem value="3">3 Children</SelectItem>
                  <SelectItem value="4">4 Children</SelectItem>
                  <SelectItem value="5+">5+ Children</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Start Date
              </Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                End Date
              </Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full"
                min={
                  formData.startDate || new Date().toISOString().split("T")[0]
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Duration
              </Label>
              <Input
                type="text"
                value={formData.duration}
                readOnly
                className="w-full bg-gray-100 cursor-not-allowed"
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          {/* Trip Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium">
                Budget Range (USD)
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange("budget", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                  <SelectItem value="20000+">$20,000+</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodation" className="text-sm font-medium">
                Accommodation Preference
              </Label>
              <Select
                value={formData.accommodation}
                onValueChange={(value) =>
                  handleInputChange("accommodation", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">
                    Budget (Hostels, Guesthouses)
                  </SelectItem>
                  <SelectItem value="mid-range">
                    Mid-range (3-star Hotels)
                  </SelectItem>
                  <SelectItem value="luxury">
                    Luxury (4-5 star Hotels)
                  </SelectItem>
                  <SelectItem value="mixed">Mixed (Variety)</SelectItem>
                  <SelectItem value="local">Local Homestays</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transportation" className="text-sm font-medium">
              Transportation Preference
            </Label>
            <Select
              value={formData.transportation}
              onValueChange={(value) =>
                handleInputChange("transportation", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transportation preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private Vehicle</SelectItem>
                <SelectItem value="public">Public Transportation</SelectItem>
                <SelectItem value="mixed">Mixed Transportation</SelectItem>
                <SelectItem value="flights">Domestic Flights</SelectItem>
                <SelectItem value="no-preference">No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities" className="text-sm font-medium">
              Preferred Activities
            </Label>
            <Textarea
              id="activities"
              placeholder="What activities interest you? (e.g., trekking, cultural tours, wildlife safari, spiritual experiences, adventure sports, etc.)"
              value={formData.activities}
              onChange={(e) => handleInputChange("activities", e.target.value)}
              rows={3}
              className="w-full resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="specialRequirements"
              className="text-sm font-medium"
            >
              Special Requirements
            </Label>
            <Input
              id="specialRequirements"
              type="text"
              placeholder="Dietary restrictions, medical conditions, accessibility needs, etc."
              value={formData.specialRequirements}
              onChange={(e) =>
                handleInputChange("specialRequirements", e.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Additional Information
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us more about your travel style, interests, must-see places, or any specific requirements for your custom trip..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className="w-full resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200"
            >
              Submit Custom Trip Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
