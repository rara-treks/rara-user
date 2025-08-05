import GoogleMapProvider from "@/lib/context/google-map-provider";
import SearchPage from "../page.client";
import { Metadata } from "next";
import { validProductTypes } from "@/lib/data/product";
import { notFound } from "next/navigation";

interface Props {
  params: {
    type: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const keywords = ["homestay", "community", "chn community", "chn", "community homestay network", "homestay network"];
  if (params.type === "homestays") {
    return {
      title: "Places to stay in Nepal. Book your Ideal community homestay",
      description:
        "Rich community experiences & activities at homestays in Nepal. Learn while cooking, hiking, dancing, cycling and more while you get closer to the local people and nature.",
      keywords,
    };
  } else if (params.type === "experiences") {
    return {
      title: "Things to do in community homestays Nepal",
      description:
        "Community Homestays in Nepal offer a unique experience to learn about the rich local traditions and daily lives of various ethnic communities, mostly run by women.",
      keywords,
    };
  } else if (params.type === "circuits") {
    return {
      title: "Explore community homestay Nepal with multiday itinerary",
      description:
        "Discover the best community homestays & experiences during a customized package in Nepal, from 2 days short tours to multi week trekking or road trips.",
      keywords,
    };
  } else if (params.type === "packages") {
    return {
      title: "Explore community homestay Nepal with multiday itinerary",
      description:
        "Discover the best community homestays & experiences during a customized package in Nepal, from 2 days short tours to multi week trekking or road trips.",
      keywords,
    };
  }
  return {
    title: "Search Community Homestay Network in Nepal",
    description: "Explore the best community homestays & experiences in Nepal.",
    keywords,
  };
}

async function Search({ params }: Props) {
  if (!validProductTypes.includes(params.type)) {
    notFound();
  }

  return (
    <GoogleMapProvider>
      <SearchPage />
    </GoogleMapProvider>
  );
}

export default Search;
