"use client";
import React from "react";
import { Map } from "@vis.gl/react-google-maps";
import { Product } from "@/types/product.types";
import { nepalBounds, useMapView } from "@/lib/context/google-map-provider";
import MapProductCard from "./map-product-card";

interface Props {
  places: Product[] | undefined;
  type: string;
}

function MapView({ places, type }: Props) {
  const { updateMap } = useMapView();

  return (
    <Map
      mapId="search-map"
      gestureHandling="greedy"
      disableDefaultUI={true}
      defaultBounds={nepalBounds}
      restriction={{
        latLngBounds: nepalBounds,
      }}
      onIdle={updateMap}
      zoomControl
      zoomControlOptions={{
        position: 3,
      }}
    >
      {places?.map((place) => (
        <MapProductCard
          key={place.id}
          id={place.id}
          title={place.name}
          type={type}
          location={place.location}
          image={place.featuredImage}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          price={place.prices[0]?.discounted_price_usd ?? place.prices[0]?.original_price_usd}
          href={`/${place.type}s/${place.slug}`}
        />
      ))}
    </Map>
  );
}

export default MapView;
