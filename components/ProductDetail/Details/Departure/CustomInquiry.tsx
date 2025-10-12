"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
  Mail,
  Phone,
  User,
  Calendar,
  Baby,
  UserCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import ActivitiesMultiSelect from "./ActivitiesMultiSelect";

interface CustomTripFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  destination: string;
  adults: string;
  children: string;
  departure_from: string;
  departure_to: string;
  duration: string;
  budget: string;
  accommodation: string;
  transportation: string;
  activities: number[];
  specialRequirements: string;
  message: string;
}

interface TransformedDepartureItem {
  id: number;
  dateRange: string;
  availability: string;
  price: string;
  departure_from?: string;
  departure_to?: string;
}

interface CustomTripInquiryPopupProps {
  defaultDestination?: string;
  trekTitle?: string;
  trekId?: number;
  departure?: TransformedDepartureItem;
  buttonText: string;
}

export default function CustomTripInquiryPopup({
  defaultDestination = "",
  trekTitle,
  trekId,
  departure,
  buttonText,
}: CustomTripInquiryPopupProps) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CustomTripFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    destination: "",
    adults: "",
    children: "",
    departure_from: "",
    departure_to: "",
    duration: "",
    budget: "",
    accommodation: "",
    transportation: "",
    activities: [],
    specialRequirements: "",
    message: "",
  });

  // Calculate duration
  const calculateDuration = (
    departure_from: string,
    departure_to: string
  ): string => {
    if (!departure_from || !departure_to) return "";
    const start = new Date(departure_from);
    const end = new Date(departure_to);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start)
      return "";
    const diffDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  };

  // Initialize form when component mounts or departure changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: trekTitle || defaultDestination || "",
      departure_from: departure?.departure_from || "",
      departure_to: departure?.departure_to || "",
      duration:
        departure?.departure_from && departure?.departure_to
          ? calculateDuration(departure.departure_from, departure.departure_to)
          : "",
    }));
  }, [departure, trekTitle, defaultDestination]);

  // Auto-calculate duration when dates change
  useEffect(() => {
    if (formData.departure_from && formData.departure_to) {
      const duration = calculateDuration(
        formData.departure_from,
        formData.departure_to
      );
      if (duration && duration !== formData.duration) {
        setFormData((prev) => ({ ...prev, duration }));
      }
    }
  }, [formData.departure_from, formData.departure_to]);

  const handleInputChange = (
    field: keyof CustomTripFormData,
    value: string | number[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.departure_from && formData.departure_to) {
      const start = new Date(formData.departure_from);
      const end = new Date(formData.departure_to);
      if (end <= start) {
        alert("End date must be after start date");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Calculate group size
      const groupSize =
        parseInt(formData.adults || "0") + parseInt(formData.children || "0");

      // Determine type based on whether departure dates are provided
      const inquiryType =
        departure?.departure_from && departure?.departure_to
          ? "inquiry"
          : "custom";

      // Parse duration to get numeric value
      const durationMatch = formData.duration.match(/(\d+)/);
      const durationValue = durationMatch ? parseInt(durationMatch[1]) : null;

      // Transform form data to API format
      const payload = {
        product_id: trekId || null,
        from_date: formData.departure_from || null,
        to_date: formData.departure_to || null,
        adult: parseInt(formData.adults) || 0,
        children: parseInt(formData.children) || 0,
        infant: 0,
        type: inquiryType,
        fullname: formData.fullName,
        mobile_number: formData.phone,
        email: formData.email,
        country: formData.country || null,
        group_size: groupSize.toString(),
        preferred_date: null,
        duration: durationValue,
        budget_range: formData.budget || null,
        special_message: formData.message || null,
        desired_destination: formData.destination,
        accommodation_preference: formData.accommodation || null,
        transportation_preference: formData.transportation || null,
        preference_activities: formData.activities.map(String),
        special_requirement: formData.specialRequirements || null,
      };

      console.log("custom trip: ", trekId);

      const response = await fetch("/api/product/inquiry/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      // Close the form dialog and open success dialog
      setOpen(false);
      setSuccessOpen(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        destination: trekTitle || defaultDestination || "",
        adults: "",
        children: "",
        departure_from: departure?.departure_from || "",
        departure_to: departure?.departure_to || "",
        duration:
          departure?.departure_from && departure?.departure_to
            ? calculateDuration(
                departure.departure_from,
                departure.departure_to
              )
            : "",
        budget: "",
        accommodation: "",
        transportation: "",
        activities: [],
        specialRequirements: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasPrefilledDate = Boolean(
    departure?.departure_from && departure?.departure_to
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200">
            {buttonText}
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
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
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
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder="Where would you like to go?"
                className={trekTitle ? "bg-gray-100 cursor-not-allowed" : ""}
                readOnly={!!trekTitle}
              />
            </div>

            {/* Group Size */}
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of adults" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num} Adult{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
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
                  onValueChange={(value) =>
                    handleInputChange("children", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of children" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Children</SelectItem>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num} Child{num > 1 ? "ren" : ""}
                      </SelectItem>
                    ))}
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
                  value={formData.departure_from}
                  onChange={(e) =>
                    handleInputChange("departure_from", e.target.value)
                  }
                  readOnly={hasPrefilledDate}
                  className={
                    hasPrefilledDate ? "bg-gray-100 cursor-not-allowed" : ""
                  }
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
                  value={formData.departure_to}
                  onChange={(e) =>
                    handleInputChange("departure_to", e.target.value)
                  }
                  readOnly={hasPrefilledDate}
                  className={
                    hasPrefilledDate ? "bg-gray-100 cursor-not-allowed" : ""
                  }
                  min={
                    formData.departure_from ||
                    new Date().toISOString().split("T")[0]
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
                  className="bg-gray-100 cursor-not-allowed"
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-20000">
                      $10,000 - $20,000
                    </SelectItem>
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
                  <SelectTrigger>
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
                <SelectTrigger>
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

            {/* Activities Multi-Select */}
            <div className="space-y-2">
              <Label htmlFor="activities" className="text-sm font-medium">
                Preferred Activities (Add-ons)
              </Label>
              <ActivitiesMultiSelect
                selectedActivities={formData.activities}
                onActivitiesChange={(activities) =>
                  handleInputChange("activities", activities)
                }
                placeholder="Select activities you'd like to add to your trek"
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Additional Information
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your travel style, interests, must-see places..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={4}
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
                disabled={isSubmitting}
                className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Custom Trip Request"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Inquiry Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Thank you for your custom trip inquiry! Our team will review your
              request and contact you soon at the email address you provided.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setSuccessOpen(false)}
              className="bg-[#71B344] hover:bg-[#5A8F37] text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
