# Product List API Documentation

## Endpoint

`GET /api/products`

## Description

This API returns a list of available treks, tours, or activities. Each product includes detailed information such as duration, pricing, dates, and other metadata.

---

## Response Format

````ts
[
  {
    id: string;
    type: "Trek" | "Tour" | "Activity";
    title: string;
    startDate: string;         // Format: "Month DD, YYYY"
    endDate: string;           // Format: "Month DD, YYYY"
    duration: string;          // Example: "15 Days"
    groupSize: number;
    difficulty: "Easy" | "Moderate" | "Challenging" | "Difficult";
    originalPrice: number;
    discountedPrice: number;
    image: string;             // Path or URL to image
    currency: string;          // Example: "USD"
    created_at: string;        // ISO 8601 Format: "YYYY-MM-DDTHH:mm:ssZ"
    updated_at: string;        // ISO 8601 Format: "YYYY-MM-DDTHH:mm:ssZ"
    deleted_at?: string | null; // Nullable, present only if soft-deleted
  }
]

````

# Product List API Documentation

## Endpoint
`GET /api/products`

---

## Description

This API returns a list of available **treks**, **tours**, or **activities**.
Each product includes details like duration, group size, price (original & discounted), dates, difficulty level, and image.
The response also includes timestamps to manage lifecycle states such as creation, updates, and soft deletion.

---

## Response Format

````ts
[
  {
    id: string;
    type: "Trek" | "Tour" | "Activity";
    title: string;
    startDate: string;         // Format: "Month DD, YYYY"
    endDate: string;           // Format: "Month DD, YYYY"
    duration: string;          // Example: "15 Days"
    groupSize: number;
    difficulty: "Easy" | "Moderate" | "Challenging" | "Difficult";
    originalPrice: number;
    discountedPrice: number;
    image: string;             // Path or full URL to image
    currency: string;          // Example: "USD"
    created_at: string;        // ISO 8601 Format: "YYYY-MM-DDTHH:mm:ssZ"
    updated_at: string;        // ISO 8601 Format: "YYYY-MM-DDTHH:mm:ssZ"
    deleted_at?: string | null;// Nullable, only present if soft-deleted
  }
]
````

---

## Example Response

````ts
[
  {
    "id": "1",
    "type": "Trek",
    "title": "Annapurna Base Camp Trek",
    "startDate": "July 30, 2025",
    "endDate": "August 15, 2025",
    "duration": "15 Days",
    "groupSize": 10,
    "difficulty": "Moderate",
    "originalPrice": 1500,
    "discountedPrice": 1200,
    "image": "/assets/1.png",
    "currency": "USD",
    "created_at": "2025-06-01T10:00:00Z",
    "updated_at": "2025-08-15T09:30:00Z",
    "deleted_at": null
  }
]
````

---

## Optional Query Parameters

| Parameter     | Type   | Description                                         |
| ------------- | ------ | --------------------------------------------------- |
| `type`        | string | Filter by type: `"Trek"`, `"Tour"`, or `"Activity"` |
| `difficulty`  | string | Filter by difficulty: `"Easy"`, `"Moderate"`, etc.  |
| `start_after` | string | Filter by products starting after given date        |
| `limit`       | number | Number of results per page                          |
| `page`        | number | Page number for paginated response                  |

---

## Status Codes

| Code | Description             |
| ---- | ----------------------- |
| 200  | OK — Request successful |
| 400  | Bad Request             |
| 404  | Not Found               |
| 500  | Internal Server Error   |

---

## Notes

- `created_at`, `updated_at`, and `deleted_at` follow ISO 8601 format.
- If `deleted_at` is not `null`, the product is considered soft-deleted and should not be shown on the frontend.
- Use query parameters to narrow down results for better performance and usability.
- Recommended to cache the response for better performance in high-traffic applications.

##Example Response
````ts
[
{
"id": "1",
"type": "Trek",
"title": "Annapurna Base Camp Trek",
"startDate": "July 30, 2025",
"endDate": "August 15, 2025",
"duration": "15 Days",
"groupSize": 10,
"difficulty": "Moderate",
"originalPrice": 1500,
"discountedPrice": 1200,
"image": "/assets/1.png",
"currency": "USD",
"created_at": "2025-06-01T10:00:00Z",
"updated_at": "2025-08-15T09:30:00Z",
"deleted_at": null
}
]
````
