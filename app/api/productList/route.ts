import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "15";

    if (!type) {
      return NextResponse.json(
        { error: "Type parameter is required" },
        { status: 400 }
      );
    }

    // Build URL with page query parameter
    const apiUrl = `${API_BASE_URL}/product/list?page=${page}&per_page=${per_page}`;

    // Send type in body
    const apiPayload = {
      filters: {
        type: type,
      },
    };

   
    const response = await axios.post(apiUrl, apiPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });


    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}
