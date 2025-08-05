import React, { useCallback } from "react";
import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { Badge } from "@/components/ui/badge";

type TreeMarkerProps = {
  position: google.maps.LatLngLiteral;
  featureId: string;
  onMarkerClick?: (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => void;
};

function PlaceMarker({ position, featureId, onMarkerClick }: TreeMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, featureId),
    [onMarkerClick, marker, featureId]
  );

  return (
    <AdvancedMarker ref={markerRef} position={position} onClick={handleClick} className={"marker feature"}>
      <Badge className="text-base">$40</Badge>
    </AdvancedMarker>
  );
}

export default PlaceMarker;
