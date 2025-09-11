"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Luggage,
  Fuel,
  Car,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CarRentalDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    departureDate: "",
    returnDate: "",
    pickupAddress: "",
    dropoffAddress: "",
    additionalRequests: "",
  });

  const carImages = [
    "/assets/car/baleno.png",
    "/assets/car/deepal.png",
    "/assets/car/fortuner.png",
    "/assets/car/landcruiser.png",
  ];

  const carFeatures = [
    {
      icon: Users,
      label: "5 Passengers",
      description: "Comfortable seating for up to 5 adults",
    },
    {
      icon: Luggage,
      label: "4 Large Bags",
      description: "Spacious trunk for all your luggage",
    },
    {
      icon: Fuel,
      label: "Hybrid Engine",
      description: "Fuel-efficient hybrid technology",
    },
    {
      icon: Car,
      label: "Automatic",
      description: "Smooth automatic transmission",
    },
    {
      icon: Shield,
      label: "Full Insurance",
      description: "Comprehensive coverage included",
    },
    {
      icon: MapPin,
      label: "GPS Navigation",
      description: "Built-in GPS navigation system",
    },
  ];

  const specifications = {
    "Make & Model": "Toyota Camry Hybrid 2024",
    Engine: "2.5L 4-Cylinder Hybrid",
    "Fuel Type": "Hybrid (Petrol + Electric)",
    Transmission: "CVT Automatic",
    "Drive Type": "Front-Wheel Drive",
    "Fuel Economy": "28 km/L (Combined)",
    "Safety Rating": "5 Stars ANCAP",
    Features: "Apple CarPlay, Android Auto, Wireless Charging",
  };

  const faqs = [
    {
      question: "What documents do I need to rent this car?",
      answer:
        "You need a valid driver's license, passport or national ID, and a credit card in the driver's name.",
    },
    {
      question: "Is there a minimum age requirement?",
      answer:
        "Yes, the minimum age is 21 years. Drivers under 25 may incur additional fees.",
    },
    {
      question: "What is included in the rental price?",
      answer:
        "The price includes basic insurance, unlimited mileage, and 24/7 roadside assistance.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer:
        "Yes, you can modify or cancel your booking up to 24 hours before pickup without charges.",
    },
    {
      question: "What happens if I return the car late?",
      answer:
        "Late returns incur additional charges. Please contact us if you expect to be late.",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carImages.length) % carImages.length
    );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", formData);
    alert("Booking request submitted successfully! We will contact you soon.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="bg-transparent">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Carousel */}
            <div className="relative">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img
                  src={carImages[currentImageIndex]}
                  alt={`Car view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Car Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Premium</Badge>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.9/5)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Toyota Camry Hybrid 2024
              </h1>
              <p className="text-gray-600 mb-6">
                Experience luxury and efficiency with our premium Toyota Camry
                Hybrid. Perfect for business trips, family vacations, or city
                exploration. Features advanced safety technology and exceptional
                fuel economy.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-blue-600">$89/day</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">$120/day</span>
                  <Badge variant="destructive" className="ml-2">
                    25% OFF
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Left and Right Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features Section */}
            <section>
              <h2 className="text-2xl font-bold mb-8">Car Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carFeatures.map((feature, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="font-semibold mb-2">{feature.label}</h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-bold mb-8">Specifications</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(specifications).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <span className="font-medium text-gray-700">
                            {key}:
                          </span>
                          <span className="text-gray-600 text-right">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section with Accordion */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Right Section - Booking Form */}
          <div>
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
                      required
                    />
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
                      required
                    />
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
                      required
                    />
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
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input
                        id="returnDate"
                        name="returnDate"
                        type="date"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                      />
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
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dropoffAddress">Drop-off Address *</Label>
                    <Input
                      id="dropoffAddress"
                      name="dropoffAddress"
                      value={formData.dropoffAddress}
                      onChange={handleInputChange}
                      placeholder="Enter drop-off location"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalRequests">
                      Additional Requests
                    </Label>
                    <Textarea
                      id="additionalRequests"
                      name="additionalRequests"
                      value={formData.additionalRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requirements or requests..."
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Daily Rate:</span>
                      <span className="text-sm font-medium">$89.00</span>
                    </div>
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
                      <span className="text-blue-600">$89.00/day</span>
                    </div>
                  </div>

                  <Button onClick={handleSubmit} className="w-full" size="lg">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Reserve Now
                  </Button>

                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <p>✓ Free cancellation up to 24 hours before pickup</p>
                    <p>✓ No hidden fees or charges</p>
                    <p>✓ Instant booking confirmation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalDetailPage;

