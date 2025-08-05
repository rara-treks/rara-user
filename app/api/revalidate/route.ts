import purgeCloudflare from "@/lib/utils/server/purge-cloudflare";
import uploadError from "@/lib/utils/server/upload-error";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const token = request.headers.get("api-token");
    if (token !== process.env.NEXT_API_TOKEN) {
      return NextResponse.json(
        { message: "Invalid token" },
        {
          status: 401,
        }
      );
    }
    data?.tags?.map((tag: string) => revalidateTag(tag));
    await Promise.all(
      data?.paths?.map((path: string) => {
        {
          data?.purgeEverything && revalidatePath(path, "layout");
        }
        revalidatePath(path, "page");
        purgeCloudflare([`${process.env.SITE_ORIGIN}${path}`], data?.purgeEverything);
      })
    );
    return NextResponse.json({ message: "Revalidated successfully" });
  } catch (error: any) {
    await uploadError({
      name: error?.name,
      stack: error?.stack ?? "",
      message: error?.message,
      source: "/api/revalidate",
    });
    return NextResponse.json({ message: "Revalidation failed" });
  }
}
