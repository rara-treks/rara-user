import { Search, Calendar, MapPin, Camera } from "lucide-react";

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: string;
}

const HowItWorksSection = () => {
  const steps: StepItem[] = [
    {
      icon: <Search className="w-6 h-6 text-green-600" />,
      step: "01",
      title: "Choose Your Adventure",
      description:
        "Browse our curated collection of treks and adventures. Filter by difficulty, duration, or destination to find your perfect match.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      step: "02",
      title: "Plan & Prepare",
      description:
        "Work with our experts to customize your itinerary. We'll provide detailed preparation guides and equipment recommendations.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      step: "03",
      title: "Experience the Journey",
      description:
        "Meet your certified guide and embark on your adventure. Enjoy seamless logistics and expert guidance every step of the way.",
    },
    {
      icon: <Camera className="w-6 h-6 text-green-600" />,
      step: "04",
      title: "Create Lasting Memories",
      description:
        "Capture incredible moments and connect with fellow travelers. Return home with stories that will last a lifetime.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From dream to reality in four simple steps. We make adventure travel
            accessible and worry-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-x-1/2 z-0">
                  <div className="w-1/2 h-full bg-green-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
