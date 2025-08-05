import uploadError from "@/lib/utils/upload-error";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  endpoint: string[];
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const searchParams = getSearchParamsAsObject(request.nextUrl.searchParams);

  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/${params.endpoint.join("/")}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: searchParams,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return handleError(error, params);
  }
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const payload = await request.json();
    const searchParams = getSearchParamsAsObject(request.nextUrl.searchParams);

    const { data } = await axios.post(`${process.env.BASE_URL}/${params.endpoint.join("/")}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: searchParams,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return handleError(error, params);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const payload = await request.json();
    const searchParams = getSearchParamsAsObject(request.nextUrl.searchParams);

    const { data } = await axios.post(`${process.env.BASE_URL}/${params.endpoint.join("/")}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: searchParams,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return handleError(error, params);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const searchParams = getSearchParamsAsObject(request.nextUrl.searchParams);

    const { data } = await axios.delete(`${process.env.BASE_URL}/${params.endpoint.join("/")}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: searchParams,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return handleError(error, params);
  }
}

function getSearchParamsAsObject(params: URLSearchParams) {
  const paramsObject: any = {};

  for (const [key, value] of params.entries()) {
    paramsObject[key] = value;
  }

  return paramsObject;
}

async function handleError(error: any, params: Params) {
  await uploadError({
    name: error?.name,
    stack: error?.stack ?? "",
    message: error?.message,
    source: params.endpoint.join("/"),
  });

  return NextResponse.json(
    { name: error?.name, message: error?.response?.data?.error ?? error?.message },
    { status: error?.status ?? 500 }
  );
}
