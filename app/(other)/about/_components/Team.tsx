"use client";
import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  linkedin_link: string;
  whyUsImage: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: TeamMember[];
}

const Team = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/page/team");

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const result: ApiResponse = await response.json();

        if (result.code === 0 && result.data) {
          setTeamMembers(result.data);
        } else {
          throw new Error(result.message || "Failed to load team data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(index)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div className="bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-gray-100 rounded-t-3xl">
                  <img
                    src={member.whyUsImage}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredId === index
                        ? "scale-110 rotate-2"
                        : "scale-100 rotate-0"
                    }`}
                  />

                  {/* Overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-all duration-500 ${
                      hoveredId === index ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Description on hover */}
                  <div
                    className={`absolute inset-0 flex items-end p-8 transition-all duration-500 ${
                      hoveredId === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <p className="text-white text-sm leading-relaxed font-light">
                      {member.bio}
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
                    href={member.linkedin_link}
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
                  hoveredId === index
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
