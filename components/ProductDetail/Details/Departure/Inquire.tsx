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
  Calendar as CalendarIcon,
} from "lucide-react";
import { TransformedDepartureItem } from "../../type";


interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tourPackage: string;
  groupSize: string;
  preferredDate: string;
  duration: string;
  budget: string;
  specialRequirements: string;
  message: string;
}

interface TrekInquiryPopupProps {
  departure?: TransformedDepartureItem;
  trekId?: number;
  trekTitle?: string;
  buttonText?: string;
  buttonClassName?: string;
}

export default function TrekInquiryPopup({
  departure,
  trekId, 
  trekTitle,
  buttonText = "inquire Now",
  buttonClassName,
}: TrekInquiryPopupProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    tourPackage: "",
    groupSize: "",
    preferredDate: "",
    duration: "",
    budget: "",
    specialRequirements: "",
    message: "",
  });

  // Calculate duration from date range
  const calculateDuration = (dateRange: string): string => {
    if (!dateRange) return "";

    try {
      // Extract dates from format "Aug 10 - Aug 25" or "August 10 - August 25"
      const dates = dateRange.split(" - ");
      if (dates.length !== 2) return "";

      // Handle different date formats
      const parseDate = (dateStr: string): Date => {
        // Try different parsing approaches
        const cleanDateStr = dateStr.trim();

        // If it contains year, use as is
        if (cleanDateStr.match(/\d{4}/)) {
          return new Date(cleanDateStr);
        }

        // If no year, assume current year
        const currentYear = new Date().getFullYear();
        return new Date(`${cleanDateStr} ${currentYear}`);
      };

      const startDate = parseDate(dates[0]);
      const endDate = parseDate(dates[1]);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "";

      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

      return `${diffDays} days`;
    } catch (error) {
      return "";
    }
  };

  // Extract start date from date range
  const getStartDate = (dateRange: string): string => {
    if (!dateRange) return "";

    try {
      const dates = dateRange.split(" - ");
      return dates[0]?.trim() || "";
    } catch (error) {
      return "";
    }
  };

  // Initialize form data when component receives props
  useEffect(() => {
    if (departure && trekTitle) {
      setFormData((prev: InquiryFormData) => ({
        ...prev,
        tourPackage: trekTitle,
        preferredDate: getStartDate(departure.dateRange),
        duration: calculateDuration(departure.dateRange),
      }));
    } else if (trekTitle) {
      // If only trekTitle is provided without departure
      setFormData((prev: InquiryFormData) => ({
        ...prev,
        tourPackage: trekTitle,
      }));
    }
  }, [departure, trekTitle]);

  const handleInputChange = (
    field: keyof InquiryFormData,
    value: string
  ): void => {
    setFormData((prev: InquiryFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (): void => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.tourPackage
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Process form submission here
    const submissionData = {
      ...formData,
      trekId: trekId?.toString(), // Convert number to string for submission
      departureInfo: departure,
      submittedAt: new Date().toISOString(),
    };

    alert("Thank you for your inquiry! We will contact you soon.");
    setOpen(false);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      tourPackage: trekTitle || "",
      groupSize: "",
      preferredDate: departure ? getStartDate(departure.dateRange) : "",
      duration: departure ? calculateDuration(departure.dateRange) : "",
      budget: "",
      specialRequirements: "",
      message: "",
    });
  };

  // Check if date fields should be editable
  const hasPrefilledDate: boolean = Boolean(departure?.dateRange);

  const defaultButtonClassName =
    "bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName || defaultButtonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            Plan your Journey with Us
          </DialogTitle>
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
                required
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
                required
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
                required
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

          {/* Trek Details */}
          <div className="space-y-2">
            <Label htmlFor="tourPackage" className="text-sm font-medium">
              Tour Package *
            </Label>
            <Input
              id="tourPackage"
              type="text"
              value={formData.tourPackage}
              onChange={(e) => handleInputChange("tourPackage", e.target.value)}
              placeholder="Enter tour package name"
              className={`w-full ${
                trekTitle ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              readOnly={!!trekTitle}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="groupSize"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Users className="w-4 h-4" />
                Group Size
              </Label>
              <Select
                value={formData.groupSize}
                onValueChange={(value: string) =>
                  handleInputChange("groupSize", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo (1 person)</SelectItem>
                  <SelectItem value="2">Couple (2 people)</SelectItem>
                  <SelectItem value="3-5">Small Group (3-5 people)</SelectItem>
                  <SelectItem value="6-10">
                    Medium Group (6-10 people)
                  </SelectItem>
                  <SelectItem value="10+">Large Group (10+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                Preferred Date
              </Label>
              <Input
                type={hasPrefilledDate ? "text" : "date"}
                value={formData.preferredDate}
                onChange={
                  !hasPrefilledDate
                    ? (e) => handleInputChange("preferredDate", e.target.value)
                    : undefined
                }
                readOnly={!!hasPrefilledDate}
                className={`w-full ${
                  hasPrefilledDate ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder={
                  hasPrefilledDate
                    ? "Date will be auto-filled"
                    : "Select your preferred date"
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration
              </Label>
              <Input
                id="duration"
                type="text"
                value={formData.duration}
                onChange={
                  !hasPrefilledDate
                    ? (e) => handleInputChange("duration", e.target.value)
                    : undefined
                }
                readOnly={!!hasPrefilledDate}
                className={`w-full ${
                  hasPrefilledDate ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder={
                  hasPrefilledDate
                    ? "Duration will be auto-filled"
                    : "e.g., 14 days"
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium">
              Budget Range (USD)
            </Label>
            <Select
              value={formData.budget}
              onValueChange={(value: string) =>
                handleInputChange("budget", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000+">$10,000+</SelectItem>
              </SelectContent>
            </Select>
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
              placeholder="Dietary restrictions, medical conditions, etc."
              value={formData.specialRequirements}
              onChange={(e) =>
                handleInputChange("specialRequirements", e.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Additional Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us more about your trek preferences, experience level, or any specific questions..."
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
              Submit Inquiry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
