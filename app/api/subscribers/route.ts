import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiUrl = `${API_BASE_URL}/subscribers`;

    const apiPayload = {
      email: email,
    };

    console.log("API Request URL:", apiUrl);
    console.log("API Request Body:", apiPayload);

    const response = await axios.post(apiUrl, apiPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to subscribe to newsletter",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
