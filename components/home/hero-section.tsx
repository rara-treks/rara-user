"use client";
import {
  ChevronRightIcon,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Star,
  Linkedin,
  Github,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

// TypeScript interfaces
interface SocialMedia {
  icon:
    | "Facebook"
    | "Instagram"
    | "Twitter"
    | "Youtube"
    | "Linkedin"
    | "Github";
  url: string;
  hoverColor: string;
}

interface Rating {
  score: number;
  maxStars: number;
  googleIcon: string;
}

interface Trip {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
}

interface Hero {
  title: string;
  buttonText: string;
  backgroundImage: string;
}

interface HeroData {
  hero: Hero;
  socialMedia: SocialMedia[];
  rating: Rating;
  trips: Trip[];
}

const heroData: HeroData = {
  hero: {
    title: "DISCOVER YOUR ADVENTURE",
    buttonText: "View all Trips",
    backgroundImage: "/assets/bg.png",
  },
  socialMedia: [
    {
      icon: "Facebook",
      url: "https://facebook.com",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: "Instagram",
      url: "https://instagram.com",
      hoverColor: "hover:text-pink-400",
    },
    {
      icon: "Twitter",
      url: "https://twitter.com",
      hoverColor: "hover:text-blue-300",
    },
    {
      icon: "Youtube",
      url: "https://youtube.com",
      hoverColor: "hover:text-red-400",
    },
  ],
  rating: {
    score: 4.0,
    maxStars: 5,
    googleIcon: "/assets/google.svg",
  },
  trips: [
    {
      id: 1,
      title: "White Water Rafting in Trishuli River",
      price: 200,
      currency: "USD",
      image: "/assets/1.png",
    },
    {
      id: 2,
      title: "Summiting Peaks of the Himalayas",
      price: 500,
      currency: "USD",
      image: "/assets/2.png",
    },
    {
      id: 3,
      title: "Hiking in the Himalayan Wilderness",
      price: 300,
      currency: "USD",
      image: "/assets/3.png",
    },
    {
      id: 4,
      title: "Cultural Tour of Ancient Temples",
      price: 150,
      currency: "USD",
      image: "/assets/2.png",
    },
  ],
};

interface IconProps {
  className: string;
  size: number;
}

function HeroSection(): JSX.Element {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Simulate API delay
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        setData(heroData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dynamic icon component
  const getSocialIcon = (iconName: SocialMedia["icon"]): JSX.Element => {
    const iconProps: IconProps = {
      className: "w-6 h-6 cursor-pointer transition-colors",
      size: 24,
    };

    switch (iconName) {
      case "Facebook":
        return (
          <Facebook
            {...iconProps}
            className={`${iconProps.className} hover:text-blue-400`}
          />
        );
      case "Instagram":
        return (
          <Instagram
            {...iconProps}
            className={`${iconProps.className} hover:text-pink-400`}
          />
        );
      case "Twitter":
        return (
          <Twitter
            {...iconProps}
            className={`${iconProps.className} hover:text-blue-300`}
          />
        );
      case "Youtube":
        return (
          <Youtube
            {...iconProps}
            className={`${iconProps.className} hover:text-red-400`}
          />
        );
      case "Linkedin":
        return (
          <Linkedin
            {...iconProps}
            className={`${iconProps.className} hover:text-blue-600`}
          />
        );
      case "Github":
        return (
          <Github
            {...iconProps}
            className={`${iconProps.className} hover:text-gray-400`}
          />
        );
      default:
        return <Facebook {...iconProps} />;
    }
  };

  // Render star rating
  const renderStars = (rating: number, maxStars: number): JSX.Element[] => {
    return Array.from({ length: maxStars }, (_, index: number) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-black fill-black"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (!data) {
    return (
      <section className="relative w-full h-[80vh] rounded-[20px] xl:h-screen justify-center overflow-hidden flex items-center">
        <div className="text-center text-red-500">
          <p>Error loading data</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full  rounded-[20px] min-h-screen justify-center overflow-hidden *:select-none">
      <div className="w-full relative flex flex-col items-center justify-start py-0 box-border text-left text-[64px] min-h-screen font-sen">
        <div
          className="self-stretch rounded-[20px] h-[541px] overflow-hidden shrink-0 flex flex-col items-center justify-start pt-[90px] px-2 md:px-5 pb-[68px] box-border relative gap-4 bg-cover bg-no-repeat bg-[top]"
          style={{ backgroundImage: `url('${data.hero.backgroundImage}')` }}
        >
          <div className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center mb-2 lg:mb-6 relative leading-[150%] font-extrabold inline-block z-[0]">
            {data.hero.title}
          </div>
          <Button className="rounded-[22px] bg-[#71B344] flex flex-row items-center justify-start py-2 px-4 gap-2 z-[1] text-base text-whitesmoke font-inter hover:bg-opacity-90 transition-all cursor-pointer">
            <div className="relative leading-[150%]">
              {data.hero.buttonText}
            </div>
            <ChevronRightIcon className="text-black" size={16} />
          </Button>

          {/* Dynamic Social media */}
          <div className="w-[24.4px] !!m-[0 important] absolute top-[calc(50%_-_36px)] left-[40px] hidden md:flex flex-col items-center justify-center gap-[18px] z-[2]">
            {data.socialMedia.map((social: SocialMedia, index: number) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform"
                aria-label={`Visit our ${social.icon} page`}
              >
                {getSocialIcon(social.icon)}
              </Link>
            ))}
          </div>

          {/* Dynamic Google rating */}
          <div className="w-[24.4px] !!m-[0 important] absolute top-[calc(50%_-_36px)] right-[40px] hidden md:flex flex-col items-center justify-center gap-2.5 z-[3] text-xs text-black font-mulish">
            <Image
              className="w-[22px] relative max-h-full overflow-hidden"
              width={22}
              height={22}
              sizes="100vw"
              alt="Google"
              src={data.rating.googleIcon}
            />
            <div className="self-stretch overflow-hidden flex flex-col items-center justify-end gap-1">
              {renderStars(data.rating.score, data.rating.maxStars)}
            </div>
            <div className="relative leading-[150%] font-medium">
              {data.rating.score}
            </div>
          </div>
        </div>

        {/* Dynamic Trip Cards */}
        <div className="flex flex-row items-start justify-start gap-10 mt-[-250px] relative text-center text-sm text-whitesmoke">
          {data.trips.map((trip: Trip) => (
            <div
              key={trip.id}
              className="flex flex-col items-center justify-center p-0 gap-2 overflow-hidden"
            >
              <div className="relative w-[231px] h-[332px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform cursor-pointer">
                <Image
                  src={trip.image}
                  alt="Overlay"
                  layout="fill"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 py-1 bg-[#71B344] left-0 right-0 flex flex-row items-center justify-center py-[1px] px-0 bg-opacity-90">
                  <div className="w-[231px] relative leading-[150%] text-white inline-block shrink-0">
                    <span>{`Starting at `}</span>
                    <b>
                      {trip.currency} {trip.price}
                    </b>
                    <span> only</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start text-lg text-darkslategray">
                <b className="w-[231px] relative leading-[150%] inline-block hover:text-olivedrab transition-colors cursor-pointer">
                  {trip.title}
                </b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
