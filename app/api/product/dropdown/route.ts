import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");

    // if (!search) {
    //     return Response.json({ code: 0, data: [] });
    // }

    try {
        const endpoint = `${process.env.BASE_URL}/product/dropdown?search=${encodeURIComponent(
            search || ""
        )}`;

        const response = await axios.get(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return Response.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
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
