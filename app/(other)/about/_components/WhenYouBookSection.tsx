import { Shield, HeadphonesIcon, FileCheck, Gift } from "lucide-react";
import Link from "next/link";

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhenYouBookSection = () => {
  const benefits: BenefitItem[] = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Comprehensive Insurance",
      description:
        "Full travel and medical insurance coverage for peace of mind during your adventure.",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-green-600" />,
      title: "24/7 Support Team",
      description:
        "Round-the-clock assistance from our dedicated support team, before, during, and after your trip.",
    },
    {
      icon: <FileCheck className="w-8 h-8 text-green-600" />,
      title: "Flexible Booking",
      description:
        "Easy modification and cancellation policies. Change dates up to 30 days before departure.",
    },
    {
      icon: <Gift className="w-8 h-8 text-green-600" />,
      title: "Exclusive Perks",
      description:
        "Complimentary gear check, group discounts, and access to our exclusive traveler community.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            When You Book With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Booking your adventure is just the beginning. Here's what you get
            when you choose us as your travel partner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Ready to Start Planning?
          </h3>
          <p className="text-gray-600 mb-6">
            Get in touch with our travel experts for a personalized consultation
            and let us help you plan the perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-sm text-gray-700">
                  📞 Free Consultation Call
                </span>
              </div>
            </Link>
            <Link href="mailto:info@raratreks.com">
              <div className="bg-white px-6 py-3 rounded-full shadow-sm cursor-pointer hover:shadow-md transition">
                <span className="text-sm text-gray-700">
                  📧 Email Response in 2hrs
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhenYouBookSection;
