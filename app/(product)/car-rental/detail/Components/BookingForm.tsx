"use client";

import { useState } from "react";
import { Car, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";

// Zod validation schema
const bookingSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name must be less than 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),

    contact: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .regex(/^[+]?[\d\s()-]+$/, "Please enter a valid phone number"),

    departureDate: z
      .string()
      .min(1, "Pickup date is required")
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Pickup date cannot be in the past"),

    returnDate: z.string().optional(),

    pickupAddress: z
      .string()
      .min(5, "Pickup address must be at least 5 characters long")
      .max(200, "Pickup address must be less than 200 characters"),

    dropoffAddress: z
      .string()
      .min(5, "Drop-off address must be at least 5 characters long")
      .max(200, "Drop-off address must be less than 200 characters"),

    additionalRequests: z
      .string()
      .max(500, "Additional requests must be less than 500 characters")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.returnDate) {
        const pickupDate = new Date(data.departureDate);
        const returnDate = new Date(data.returnDate);
        return returnDate > pickupDate;
      }
      return true;
    },
    {
      message: "Return date must be after pickup date",
      path: ["returnDate"],
    }
  );

interface BookingFormProps {
  dailyRate: number;
  onSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  contact: string;
  departureDate: string;
  returnDate: string;
  pickupAddress: string;
  dropoffAddress: string;
  additionalRequests: string;
}

type ValidationErrors = Partial<Record<keyof BookingFormData, string>>;

export default function BookingForm({ dailyRate, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    contact: "",
    departureDate: "",
    returnDate: "",
    pickupAddress: "",
    dropoffAddress: "",
    additionalRequests: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      bookingSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof BookingFormData;
          newErrors[fieldName] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  const calculateDays = () => {
    if (formData.departureDate && formData.returnDate) {
      const pickup = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      const timeDiff = returnDate.getTime() - pickup.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff > 0 ? daysDiff : 1;
    }
    return 1;
  };

  const totalDays = calculateDays();
  const totalAmount = dailyRate * totalDays;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Book This Car
        </CardTitle>
        <CardDescription>
          Fill in your details to reserve this vehicle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact">Phone Number *</Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={errors.contact ? "border-red-500" : ""}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate">Pickup Date *</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={handleInputChange}
                className={errors.departureDate ? "border-red-500" : ""}
              />
              {errors.departureDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.departureDate}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <Input
                id="returnDate"
                name="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={handleInputChange}
                className={errors.returnDate ? "border-red-500" : ""}
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="pickupAddress">Pickup Address *</Label>
            <Input
              id="pickupAddress"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              placeholder="Enter pickup location"
              className={errors.pickupAddress ? "border-red-500" : ""}
            />
            {errors.pickupAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pickupAddress}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="dropoffAddress">Drop-off Address *</Label>
            <Input
              id="dropoffAddress"
              name="dropoffAddress"
              value={formData.dropoffAddress}
              onChange={handleInputChange}
              placeholder="Enter drop-off location"
              className={errors.dropoffAddress ? "border-red-500" : ""}
            />
            {errors.dropoffAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dropoffAddress}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="additionalRequests">Additional Requests</Label>
            <Textarea
              id="additionalRequests"
              name="additionalRequests"
              value={formData.additionalRequests}
              onChange={handleInputChange}
              placeholder="Any special requirements or requests..."
              rows={3}
              className={errors.additionalRequests ? "border-red-500" : ""}
            />
            {errors.additionalRequests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.additionalRequests}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.additionalRequests.length}/500 characters
            </p>
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Daily Rate:</span>
              <span className="text-sm font-medium">
                ${dailyRate.toFixed(2)}
              </span>
            </div>
            {formData.returnDate && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Duration:</span>
                <span className="text-sm font-medium">
                  {totalDays} day{totalDays > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Insurance:</span>
              <span className="text-sm font-medium text-green-600">
                Included
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">24/7 Support:</span>
              <span className="text-sm font-medium text-green-600">
                Included
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">
                {formData.returnDate
                  ? `$${totalAmount.toFixed(2)} (${totalDays} day${
                      totalDays > 1 ? "s" : ""
                    })`
                  : `$${dailyRate.toFixed(2)}/day`}
              </span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isSubmitting ? "Processing..." : "Reserve Now"}
          </Button>

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>✓ Free cancellation up to 24 hours before pickup</p>
            <p>✓ No hidden fees or charges</p>
            <p>✓ Instant booking confirmation</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
