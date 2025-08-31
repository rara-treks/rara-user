import { Mountain, Users, Award, MapPin, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const StatsSection = () => {
  const stats: StatItem[] = [
    { icon: Mountain, value: "500+", label: "Treks Completed" },
    { icon: Users, value: "2,500+", label: "Happy Travelers" },
    { icon: Award, value: "10", label: "Years Experience" },
    { icon: MapPin, value: "50+", label: "Destinations" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
