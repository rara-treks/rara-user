"use client";
import { useState } from "react";
import { Linkedin } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  linkedin: string;
}

const Team = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Suman Pradhan",
      position: "Chief Executive Officer",
      description:
        "Visionary leader with 15+ years driving innovation in tech. Passionate about building products that make a difference in Nepal's digital landscape.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/sumanpradhan",
    },
    {
      id: 2,
      name: "Rajesh Shrestha",
      position: "Head of Engineering",
      description:
        "Full-stack architect specializing in scalable systems. Leads our technical vision with creativity and precision to build world-class solutions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/rajeshshrestha",
    },
    {
      id: 3,
      name: "Anita Gurung",
      position: "Design Director",
      description:
        "Award-winning designer crafting beautiful, intuitive experiences. Believes great design is invisible yet impactful and user-centered.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/anitagurung",
    },
    {
      id: 4,
      name: "Bikash Tamang",
      position: "Product Manager",
      description:
        "Customer-focused strategist turning insights into action. Bridges the gap between vision and execution seamlessly with data-driven decisions.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/bikashtamang",
    },
    {
      id: 5,
      name: "Priya Khatri",
      position: "Marketing Lead",
      description:
        "Growth expert with a data-driven mindset. Crafts compelling narratives that resonate with diverse audiences across digital platforms.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/priyakhatri",
    },
    {
      id: 6,
      name: "Aakash Thapa",
      position: "Operations Manager",
      description:
        "Process optimizer ensuring smooth daily operations. Transforms complexity into clarity with systematic thinking and innovative approaches.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      linkedin: "https://www.linkedin.com/in/aakashthapa",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Meet Our Team
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Talented individuals working together to create exceptional
            experiences
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div className="bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-gray-100 rounded-t-3xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredId === member.id
                        ? "scale-110 rotate-2"
                        : "scale-100 rotate-0"
                    }`}
                  />

                  {/* Overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-all duration-500 ${
                      hoveredId === member.id ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Description on hover */}
                  <div
                    className={`absolute inset-0 flex items-end p-8 transition-all duration-500 ${
                      hoveredId === member.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <p className="text-white text-sm leading-relaxed font-light">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-normal text-gray-900 mb-2 transition-colors duration-300 group-hover:text-black">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-light mb-4">
                    {member.position}
                  </p>

                  {/* LinkedIn Icon */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>

              {/* Decorative element */}
              <div
                className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gray-100 rounded-full -z-10 transition-all duration-500 ${
                  hoveredId === member.id
                    ? "scale-150 opacity-50"
                    : "scale-100 opacity-100"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
