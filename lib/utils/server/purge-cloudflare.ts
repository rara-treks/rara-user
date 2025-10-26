import axios, { AxiosError } from "axios";
import uploadError from "./upload-error";

const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;
const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;

async function purgeCloudflare(paths: string[], purgeEverything = false) {
  try {
    await axios.delete(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`, {
      headers: {
        "X-Auth-Email": CLOUDFLARE_EMAIL,
        "X-Auth-Key": CLOUDFLARE_API_KEY,
      },
      data: purgeEverything ? { purge_everything: true } : { files: paths },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeBlogs",
    });
    return null;
  }
}

export default purgeCloudflare;
