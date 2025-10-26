import { GooglePlacesResponse, GooglePlaceDetails } from "@/types/google.types";
import { getCached, setCache } from "./cache";

export class GooglePlacesError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "GooglePlacesError";
  }
}

export async function fetchGooglePlaceDetails(
  placeId: string,
  fields: string = "name,rating,user_ratings_total,reviews"
): Promise<GooglePlaceDetails> {
  const cacheKey = `google_place_${placeId}_${fields}`;

  // Check cache first
  const cached = getCached<GooglePlaceDetails>(cacheKey);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new GooglePlacesError("Google Places API key is not configured", 500);
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.append("place_id", placeId);
  url.searchParams.append("fields", fields);
  url.searchParams.append("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new GooglePlacesError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== "OK") {
      throw new GooglePlacesError(
        data.error_message || `Google Places API error: ${data.status}`,
        400
      );
    }

    // Cache the successful result
    setCache(cacheKey, data.result);

    return data.result;
  } catch (error) {
    if (error instanceof GooglePlacesError) {
      throw error;
    }

    throw new GooglePlacesError(
      "Failed to fetch place details from Google Places API",
      500
    );
  }
}

export async function searchPlaceByText(
  query: string,
  fields: string = "place_id,name,rating"
): Promise<GooglePlaceDetails[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new GooglePlacesError("Google Places API key is not configured", 500);
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  url.searchParams.append("input", query);
  url.searchParams.append("inputtype", "textquery");
  url.searchParams.append("fields", fields);
  url.searchParams.append("key", apiKey);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new GooglePlacesError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new GooglePlacesError(
        data.error_message || `Google Places API error: ${data.status}`,
        400
      );
    }

    return data.candidates || [];
  } catch (error) {
    if (error instanceof GooglePlacesError) {
      throw error;
    }

    throw new GooglePlacesError(
      "Failed to search places from Google Places API",
      500
    );
  }
}

export function formatRating(rating: number): string {
  return rating % 1 === 0 ? rating.toString() : rating.toFixed(1);
}

export function getRatingText(rating: number): string {
  const formattedRating = formatRating(rating);
  return `${formattedRating} star rating`;
}
