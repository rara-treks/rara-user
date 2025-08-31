import Breadcrumbs from "@/components/ProductDetail/Breadcrumbs";
import DepartureHero from "./Components/HeroSection";
import DepartureTable from "./Components/DepartureTable";
import { trekData } from "@/data/data";
import TourCarousel from "@/components/home/TourCarousel";


const Departures = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full flex flex-col container mx-auto">
        <Breadcrumbs data={{ type: "Departures", title: "Departures" }} />
      </div>
      <DepartureHero />

      <div className="w-full flex flex-col gap-12 md:container mx-auto">
        <DepartureTable
          title="Trek Departure Dates"
          message="Choose your preferred departure month and trek"
        />

        <DepartureTable
          title="Tour Departure Dates"
          message="Choose your preferred departure month and trek"
        />

        <TourCarousel title="Trek" data={trekData} />
      </div>
    </div>
  );
};

export default Departures;
