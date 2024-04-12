// Mix videos api
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import axios from "axios";
const pageSize = 10;

let mix_video_api_url = "";
if (typeof process !== "undefined") {
    mix_video_api_url = process.env.REMIX_MIX_VIDEO_API_BASE_URL || "";
}
let mix_video_api_key = "";
if (typeof process !== "undefined") {
    mix_video_api_key = process.env.REMIX_MIX_VIDEO_API_KEY || "";
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url1 = new URL(request.url);
    const pageNumber = url1.searchParams.get("pageNumber");
    const BASE_URL = `https://${mix_video_api_url}/video/mjson/client_key/${mix_video_api_key}/`;
    const url = new URL(BASE_URL);
    url.searchParams.append("extra_params", "vertical,content_ids,entities_id,gatype,category,filepath,ads,keywords,description,fullimage");
    url.searchParams.append("language", "1");
    url.searchParams.append("pagesize", pageSize +"");
    url.searchParams.append("pageNumber", pageNumber);
    url.searchParams.append("minh", "0");
    url.searchParams.append("minm", "0");
    url.searchParams.append("mins", "1");
    url.searchParams.append("maxh", "0");
    url.searchParams.append("maxm", "0");
    url.searchParams.append("maxs", "30");
    url.searchParams.append("category", "1");
    const response = await axios.get(url.href);

    return json(response.data);
  } catch (error) {
    return json({ status: error });
  }
};

