import GoogleMapProvider from "@/lib/context/google-map-provider";
import SearchPage from "../page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Community Homestay Network in Nepal",
  description: "Explore the best community homestays & experiences in Nepal.",
  keywords: ["homestay", "community", "chn community", "chn", "community homestay network", "homestay network"],
};

async function Search() {
  return (
    <GoogleMapProvider>
      <SearchPage />
    </GoogleMapProvider>
  );
}

export default Search;
