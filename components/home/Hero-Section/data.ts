import { HeroData } from "./types";

export const heroData: HeroData = {
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
  ],
  rating: {
    score: 4.6,
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
      slug: "/trek",
    },
    {
      id: 2,
      title: "Summiting Peaks of the Himalayas",
      price: 500,
      currency: "USD",
      image: "/assets/2.png",
      slug: "/tour",
    },
    {
      id: 3,
      title: "Hiking in the Himalayan Wilderness",
      price: 300,
      currency: "USD",
      image: "/assets/3.png",
      slug: "/activities",
    },
    {
      id: 4,
      title: "Cultural Tour of Ancient Temples",
      price: 150,
      currency: "USD",
      image: "/assets/2.png",
      slug: "/car-rental",
    },
  ],
};
