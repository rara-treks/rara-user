"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
import { useDebounce } from "@uidotdev/usehooks";

interface Props {
  children: React.ReactNode;
}

export const defaultBounds = {
  south: 27.23736450482621,
  west: 84.89197734027346,
  north: 28.186862546184024,
  east: 85.63492777972658,
};

export const defaultCenter = {
  lat: 27.71314672,
  lng: 85.26345256,
};

export const nepalBounds = {
  east: 88.26757100621639,
  north: 28.94805495147807,
  south: 25.153865820217018,
  west: 80.35741475621639,
};

interface ContextType {
  bounds: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
  zoomLevel: number | undefined;
  map: google.maps.Map | null;
  reset: () => void;
  updateMap: () => void;
}

const GoogleMapContext = createContext<ContextType>({
  bounds: nepalBounds,
  zoomLevel: undefined,
  map: null,
  reset: () => {},
  updateMap: () => {},
});

export const useMapView = () => useContext(GoogleMapContext);

function GoogleMapContextProvider({ children }: Props) {
  const mapLoadCount = useRef(0);
  const [bounds, setBounds] = useState(nepalBounds);
  const debouncedBounds = useDebounce(bounds, 500);
  const [zoomLevel, setZoomLevel] = useState<undefined | number>(undefined);
  const map = useMap();

  function reset() {
    map?.setCenter(defaultCenter);
    map?.setZoom(1);
  }

  function updateMap() {
    if (mapLoadCount.current === 0) {
      mapLoadCount.current += 1;
      return;
    }
    const boundsRes = map?.getBounds();
    const northEast = boundsRes?.getNorthEast();
    const southWest = boundsRes?.getSouthWest();
    setBounds({
      east: northEast?.lng() ?? defaultBounds.east,
      north: northEast?.lat() ?? defaultBounds.north,
      south: southWest?.lat() ?? defaultBounds.south,
      west: southWest?.lng() ?? defaultBounds.west,
    });
    setZoomLevel(map?.getZoom());
  }

  return (
    <GoogleMapContext.Provider
      value={{
        map,
        bounds: debouncedBounds,
        zoomLevel: zoomLevel,
        reset,
        updateMap,
      }}
    >
      {children}
    </GoogleMapContext.Provider>
  );
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

function GoogleMapProvider({ children }: Props) {
  return (
    <APIProvider apiKey={API_KEY}>
      <GoogleMapContextProvider>{children}</GoogleMapContextProvider>
    </APIProvider>
  );
}

export default GoogleMapProvider;
