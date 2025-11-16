import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !latitude || !longitude) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(
        [latitude, longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Fix for default Leaflet marker icon
      const defaultIcon = L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Add marker at location with custom icon
      L.marker([latitude, longitude], { icon: defaultIcon }).addTo(map.current);
    }

    return () => {
      // Cleanup map on unmount
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
