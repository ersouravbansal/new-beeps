// ------------------------------------Category Route Videos API--------------------------------------
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import axios from "axios";

import { CATEGORY_NAME } from "~/components/Layout/CategoryName";
const pageSize = 15;
let search_api_url = "";
if (typeof process !== "undefined") {
  search_api_url = process.env.REMIX_APP_BEEPS_SEARCH_API_BASE_URL || "";
}
let search_api_key = "";
if (typeof process !== "undefined") {
  search_api_key = process.env.REMIX_APP_BEEPS_SEARCH_API || "";
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("Loader category is running...")
    const url1 = new URL(request.url);
    console.log(request.url,"category console categories")
    const pageNumber = url1.searchParams.get("pageNumber");
    const catName=url1.searchParams.get("catname");
    const catId = CATEGORY_NAME[catName];
     
    // const language = url1.searchParams.get('language')
    // console.log("sourav category", catId);
    // console.log("sourav pageNumber", pageNumber);
    const BASE_URL = `https://${search_api_url}/video/mjson/client_key/${search_api_key}/`;
    const url = new URL(BASE_URL);
    url.searchParams.append(
      "extra_params",
      "ssl,show,gif,urltitle,source_id,fullimage,category,tmpcheck,newurl,ssl,sitelink,shorttitle,filepath,folder_path,preview,vertical"
    );
    url.searchParams.append("source", "1");
    url.searchParams.append("show_vertical", "1");
    url.searchParams.append("pageSize", pageSize + "");
    url.searchParams.append("pageNumber", pageNumber);
    url.searchParams.append("category", catId);
    if (catName == "khabar") {
      url.searchParams.append("language", "2");
    } else if (catName == "news") {
      url.searchParams.append("language", "1");
    }
    const response = await axios.get(url.href);
    return json(response.data);
  } catch (error) {
  console.log(error,"catch error")
    return json({ status: error?.message ||"Dont know",isError:true });
  }
};

