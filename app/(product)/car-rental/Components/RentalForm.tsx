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
} from "@/components/ui/dialog";

interface FormData {
  userName: string;
  maxPeople: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupTime: string;
  carType: string;
  message: string;
}

const RentalForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    maxPeople: "",
    pickupAddress: "",
    destinationAddress: "",
    pickupTime: "",
    carType: "",
    message: "",
  });

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Rental request submitted successfully!");
    setOpen(false);
  };

  return (
    <div className="flex ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#71B344] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Book Your Ride
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in your details and we'll get you moving
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="maxPeople"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Passengers
                </label>
                <div className="relative">
                  <Users className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    id="maxPeople"
                    name="maxPeople"
                    value={formData.maxPeople}
                    onChange={handleChange}
                    required
                    min="1"
                    max="12"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900"
                    placeholder="4"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="carType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Vehicle Type
              </label>
              <div className="relative">
                <Car className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900 appearance-none cursor-pointer"
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
                  htmlFor="pickupAddress"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900"
                    placeholder="Enter pickup address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="destinationAddress"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-[#71B344] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="destinationAddress"
                    name="destinationAddress"
                    value={formData.destinationAddress}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900"
                    placeholder="Enter destination"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="pickupTime"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Pickup Date & Time
              </label>
              <div className="relative">
                <Clock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="datetime-local"
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition text-gray-900"
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
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#71B344] focus:border-transparent focus:bg-white outline-none transition resize-none text-gray-900"
                  placeholder="Any special requests?"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-[#71B344] hover:bg-[#5f9639] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentalForm;
