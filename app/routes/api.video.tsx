import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import axios from "axios";
    const pageSize = 15;
    let single_vid_search_api_url = process.env.REMIX_APP_SINGLE_VID_SEARCH_API_BASE_URL || "";
    let single_vid_search_api_key = process.env.REMIX_APP_SINGLE_VID_SEARCH_API_KEY || "";

export const loader: LoaderFunction = async ({ request }) => {
  try {

    const url1 = new URL(request.url);
    const pageNumber = url1.searchParams.get("pageNumber");
    const video_id = url1.searchParams.get("video_id");
    
    const BASE_URL = `https://${single_vid_search_api_url}/apis/search/mjson/client_key/${single_vid_search_api_key}/`;
    const url = new URL(BASE_URL);
    url.searchParams.append(
      "extra_params",
      "ssl,show,gif,urltitle,source_id,fullimage,tmpcheck,newurl,ssl,sitelink,shorttitle,filepath,folder_path,preview,vertical"
    );
    url.searchParams.append("video_id", video_id);
    url.searchParams.append("pageSize", pageSize + "");
    url.searchParams.append("video_format", "allformat");
    const fetchController = new AbortController();

    const response = await axios.get(url.href);
    return json(response.data);
  } catch (error) {
    return json({ status: error });
  }
};

