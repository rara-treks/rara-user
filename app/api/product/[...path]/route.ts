import axios, { AxiosResponse, AxiosError } from "axios";
import { NextRequest } from "next/server";

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const endpoint = `/${params.path.join("/")}`;
    console.log(`GET request for endpoint: ${endpoint}`);

    const response = await apiClient.get(endpoint);

    console.log(`Successfully fetched data for ${endpoint}`);
    return Response.json(response.data);
  } catch (error: any) {
    const axiosError = error as AxiosError;
    console.error(`Error fetching endpoint:`, axiosError.message);

    return Response.json(
      {
        error:
          (axiosError.response?.data as any)?.message ||
          axiosError.message ||
          "Something went wrong",
        success: false,
      },
      { status: axiosError.response?.status || 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const endpoint = `/${params.path.join("/")}`;
    const body = await request.json();

    console.log(`POST request for endpoint: ${endpoint}`);
    console.log("Request body:", body);

    const response = await apiClient.post(endpoint, body);

    console.log(`Successfully posted data to ${endpoint}`);
    return Response.json(response.data);
  } catch (error: any) {
    const axiosError = error as AxiosError;
    console.error(`Error posting to endpoint:`, axiosError.message);

    return Response.json(
      {
        error:
          (axiosError.response?.data as any)?.message ||
          axiosError.message ||
          "Something went wrong",
        success: false,
      },
      { status: axiosError.response?.status || 500 }
    );
  }
}
