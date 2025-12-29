import { useState } from "react";
import { Car, Users, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface FormData {
  user_name: string;
  email: string;
  contact: string;
  max_people: string;
  pickup_address: string;
  destination_address: string;
  pickup_time: string;
  car_type: string;
  message: string;
}

const RentalForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    email: "",
    contact: "",
    max_people: "",
    pickup_address: "",
    destination_address: "",
    pickup_time: "",
    car_type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const carOptions = [
    { value: "sedan", label: "Sedan", capacity: "4 seats" },
    { value: "suv", label: "SUV", capacity: "7 seats" },
    { value: "van", label: "Van", capacity: "12 seats" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/product/car-rental/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccess(false);
    setFormData({
      user_name: "",
      email: "",
      contact: "",
      max_people: "",
      pickup_address: "",
      destination_address: "",
      pickup_time: "",
      car_type: "",
      message: "",
    });
    setError("");
  };

  const isFormValid =
    formData.user_name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.contact.trim() !== "" &&
    formData.max_people.trim() !== "" &&
    formData.pickup_address.trim() !== "" &&
    formData.destination_address.trim() !== "" &&
    formData.pickup_time.trim() !== "" &&
    formData.car_type.trim() !== "";

  return (
    <div className="flex">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#086032] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-green-600">
                  Booking Confirmed!
                </DialogTitle>
                <DialogDescription className="text-center text-gray-600">
                  Your ride has been successfully booked
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 mb-2">
                  Thank you for booking with us!
                </p>
                <p className="text-gray-600 text-sm">
                  We'll contact you shortly to confirm your booking details.
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    handleCloseDialog();
                    setOpen(false);
                  }}
                  className="w-full bg-[#086032] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-4xl font-bold text-gray-900">
                  Book Your Ride
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Fill in your details and we'll get you moving
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                      placeholder="+977 9812345678"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="max_people"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Passengers *
                    </label>
                    <div className="relative">
                      <Users className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        id="max_people"
                        name="max_people"
                        value={formData.max_people}
                        onChange={handleChange}
                        required
                        min="1"
                        max="12"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                        placeholder="4"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="car_type"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Vehicle Type *
                  </label>
                  <div className="relative">
                    <Car className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="car_type"
                      name="car_type"
                      value={formData.car_type}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="">Select vehicle</option>
                      {carOptions.map((car) => (
                        <option key={car.value} value={car.value}>
                          {car.label} • {car.capacity}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="pickup_address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Pickup Location *
                    </label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        id="pickup_address"
                        name="pickup_address"
                        value={formData.pickup_address}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                        placeholder="Enter pickup address"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="destination_address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Destination *
                    </label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 text-[#086032] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        id="destination_address"
                        name="destination_address"
                        value={formData.destination_address}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                        placeholder="Enter destination"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pickup_time"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Pickup Date & Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="datetime-local"
                      id="pickup_time"
                      name="pickup_time"
                      value={formData.pickup_time}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition text-base md:text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Additional Notes
                    <span className="text-gray-400 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#086032] focus:border-transparent focus:bg-white outline-none transition resize-none text-base md:text-sm text-gray-900"
                      placeholder="Any special requests?"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg ${isFormValid && !isSubmitting
                    ? "bg-[#086032] hover:bg-[#5f9639] text-white hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentalForm;
