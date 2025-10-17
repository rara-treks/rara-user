"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface TabItem {
  id: string;
  label: string;
}

const TabbedContentSection = () => {
  const [activeTab, setActiveTab] = useState<string>("story");

  const tabs: TabItem[] = [
    { id: "story", label: "Our Story" },
    { id: "values", label: "Our Values" },
  ];

  const values: ValueItem[] = [
    {
      title: "Safety First",
      description:
        "Your safety is our top priority. We maintain the highest safety standards with experienced guides and quality equipment.",
      icon: "🛡️",
    },
    {
      title: "Authentic Experiences",
      description:
        "We provide genuine cultural experiences that connect you with local communities and traditions.",
      icon: "🏔️",
    },
    {
      title: "Sustainable Tourism",
      description:
        "We're committed to responsible travel that preserves the environment and benefits local communities.",
      icon: "🌱",
    },
    {
      title: "Expert Guidance",
      description:
        "Our certified guides have extensive knowledge of local terrain, culture, and wildlife.",
      icon: "🧭",
    },
  ];

  return (
    <div>
      {/* Navigation Tabs */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="w-full mx-auto px-6">
          <nav className="flex space-x-8 py-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="w-full mx-auto px-6">
          {/* Our Story */}
          {activeTab === "story" && (
            <div className="transition-all duration-500 opacity-100">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      What started as a passion for exploration has grown into a
                      trusted name in adventure travel. Ten years ago, we began
                      with a simple mission: to share the transformative power
                      of travel with fellow adventurers.
                    </p>
                    <p>
                      From humble beginnings organizing local treks, we've
                      expanded our reach across continents, always maintaining
                      our commitment to authentic experiences and responsible
                      tourism. Every journey we craft is designed to create
                      lasting memories while respecting the places we visit.
                    </p>
                    <p>
                      Today, we're proud to have facilitated over 500 treks and
                      welcomed more than 2,500 travelers from around the world.
                      Our success is measured not just in numbers, but in the
                      smiles, friendships, and life-changing moments our
                      adventures create.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      Rated 4.6/5 by our travelers
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-green-100 rounded-2xl p-4 h-80 flex items-center justify-center">
                    <Image
                      src="/assets/2.png"
                      alt="Our Story"
                      width={400}
                      height={300}
                      className="rounded-xl object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Values */}
          {activeTab === "values" && (
            <div className="transition-all duration-500 opacity-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  Our Values
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These core principles guide every adventure we create and
                  every relationship we build.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                  >
                    <div className="text-3xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TabbedContentSection;
