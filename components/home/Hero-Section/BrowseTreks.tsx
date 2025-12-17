import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

interface Departure {
  id: number;
  departure_from: string;
  departure_to: string;
  departure_per_price: string;
  product_id: number;
  max_team_members?: any;
  [key: string]: any;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  departures: Departure[];
  max_occupant: string;
  prices: any[];
  tags: any[];
  wishlist: number;
}

interface DepartureData {
  trek: Product[];
  tour: Product[];
  activities: Product[];
}

const BrowseTreks = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departureData, setDepartureData] = useState<DepartureData>({
    trek: [],
    tour: [],
    activities: [],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"trek" | "tour" | "activities">(
    "trek"
  );
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  const fetchDepartures = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/product/product/departure/lists");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 0 && data.data) {
        const departureList: DepartureData = {
          trek: (data.data.trek || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            type: product.type,
            departures: product.departures || [],
            max_occupant: product.max_occupant,
            prices: product.prices || [],
            tags: product.tags || [],
            wishlist: product.wishlist,
          })),
          tour: (data.data.tour || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            type: product.type,
            departures: product.departures || [],
            max_occupant: product.max_occupant,
            prices: product.prices || [],
            tags: product.tags || [],
            wishlist: product.wishlist,
          })),
          activities: (data.data.activities || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            type: product.type,
            departures: product.departures || [],
            max_occupant: product.max_occupant,
            prices: product.prices || [],
            tags: product.tags || [],
            wishlist: product.wishlist,
          })),
        };

        setDepartureData(departureList);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch departures";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = async () => {
    setOpen(true);
    setDisplayMonth(new Date());
    if (departureData.trek.length === 0 && departureData.tour.length === 0) {
      await fetchDepartures();
    }
  };

  const getAvailableDatesForTab = (tabName: "trek" | "tour" | "activities") => {
    const products = departureData[tabName] || [];
    const dates = new Set<string>();

    products.forEach((product: Product) => {
      product.departures?.forEach((dep: Departure) => {
        if (dep.departure_from) {
          dates.add(dep.departure_from);
        }
      });
    });

    return dates;
  };

  const getProductsForDate = (date: Date | undefined) => {
    if (!date) return [];

    const dateStr = date.toISOString().split("T")[0];
    const products = departureData[activeTab] || [];

    return products.filter((product) =>
      product.departures?.some(
        (dep: Departure) => dep.departure_from === dateStr
      )
    );
  };

  const getDeparturesForDate = (product: Product, date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return (
      product.departures?.filter(
        (dep: Departure) => dep.departure_from === dateStr
      ) || []
    );
  };

  const handleSelectDeparture = (product: Product) => {
    router.push(`/${product.type}/${product.slug}`);
    setOpen(false);
  };

  const CalendarView = ({
    tabName,
  }: {
    tabName: "trek" | "tour" | "activities";
  }) => {
    const dates = getAvailableDatesForTab(tabName);

    return (
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date);
          if (date) {
            setDisplayMonth(date);
          }
        }}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        disabled={(date) => {
          const dateStr = date.toISOString().split("T")[0];
          return (
            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
            !dates.has(dateStr)
          );
        }}
        modifiers={{
          highlighted: (date) => {
            const dateStr = date.toISOString().split("T")[0];
            return dates.has(dateStr);
          },
        }}
        modifiersClassNames={{
          highlighted: "bg-[#086032] text-white font-bold hover:bg-[#5fa035]",
        }}
        className="rounded-md border"
      />
    );
  };

  const matchingProducts = getProductsForDate(selectedDate);

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        className="rounded-[22px] bg-[#f2a135] flex flex-row items-center justify-center py-2 px-4 gap-2 text-white font-inter transition-colors duration-200 cursor-pointer shadow-lg"
      >
        <CalendarDays
          className="text-white font-bold"
          size={16}
          aria-hidden="true"
        />

        <span className="leading-[150%]">Next Departure</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Departure Date & Trek</DialogTitle>
            <DialogDescription>
              Choose a date with available departures, then select your trek or
              tour
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading departures...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Tabs
                value={activeTab}
                onValueChange={(val: any) => setActiveTab(val)}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trek">Treks</TabsTrigger>
                  <TabsTrigger value="tour">Tours</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="trek" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <CalendarView tabName="trek" />
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[400px]">
                      {selectedDate ? (
                        matchingProducts.length > 0 ? (
                          matchingProducts.map((product) => (
                            <div
                              key={product.id}
                              className="border rounded-lg p-3"
                            >
                              <h3 className="font-semibold text-sm mb-2">
                                {product.name}
                              </h3>
                              <div className="space-y-2">
                                {getDeparturesForDate(
                                  product,
                                  selectedDate
                                ).map((dep, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs text-gray-600 mb-2"
                                  >
                                    <p>
                                      Start:{" "}
                                      {new Date(
                                        dep.departure_from
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      End:{" "}
                                      {new Date(
                                        dep.departure_to
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>Price: ${dep.departure_per_price}</p>
                                  </div>
                                ))}
                              </div>
                              <Button
                                onClick={() => handleSelectDeparture(product)}
                                className="w-full mt-2 bg-[#086032] hover:bg-[#5fa035] text-white text-xs"
                              >
                                View Details
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No departures available for this date.
                          </p>
                        )
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Select a date to view available departures
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tour" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <CalendarView tabName="tour" />
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[400px]">
                      {selectedDate ? (
                        matchingProducts.length > 0 ? (
                          matchingProducts.map((product) => (
                            <div
                              key={product.id}
                              className="border rounded-lg p-3"
                            >
                              <h3 className="font-semibold text-sm mb-2">
                                {product.name}
                              </h3>
                              <div className="space-y-2">
                                {getDeparturesForDate(
                                  product,
                                  selectedDate
                                ).map((dep, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs text-gray-600 mb-2"
                                  >
                                    <p>
                                      Start:{" "}
                                      {new Date(
                                        dep.departure_from
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      End:{" "}
                                      {new Date(
                                        dep.departure_to
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>Price: ${dep.departure_per_price}</p>
                                  </div>
                                ))}
                              </div>
                              <Button
                                onClick={() => handleSelectDeparture(product)}
                                className="w-full mt-2 bg-[#086032] hover:bg-[#5fa035] text-white text-xs"
                              >
                                View Details
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No departures available for this date.
                          </p>
                        )
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Select a date to view available departures
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <CalendarView tabName="activities" />
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[400px]">
                      {selectedDate ? (
                        matchingProducts.length > 0 ? (
                          matchingProducts.map((product) => (
                            <div
                              key={product.id}
                              className="border rounded-lg p-3"
                            >
                              <h3 className="font-semibold text-sm mb-2">
                                {product.name}
                              </h3>
                              <div className="space-y-2">
                                {getDeparturesForDate(
                                  product,
                                  selectedDate
                                ).map((dep, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs text-gray-600 mb-2"
                                  >
                                    <p>
                                      Start:{" "}
                                      {new Date(
                                        dep.departure_from
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      End:{" "}
                                      {new Date(
                                        dep.departure_to
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>Price: ${dep.departure_per_price}</p>
                                  </div>
                                ))}
                              </div>
                              <Button
                                onClick={() => handleSelectDeparture(product)}
                                className="w-full mt-2 bg-[#086032] hover:bg-[#5fa035] text-white text-xs"
                              >
                                View Details
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No departures available for this date.
                          </p>
                        )
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Select a date to view available departures
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrowseTreks;
