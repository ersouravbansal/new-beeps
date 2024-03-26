import React, { useEffect, useState } from "react";
import { MetaFunction, json } from "@remix-run/node";
import Content from "~/components/Layout/Content";
import VideoData from "~/components/Layout/VideoData";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import useStore from "~/stores/utilstore";
import useInfiniteScroll from "~/hooks/useInfiniteScrollCustom";
import { BASEPATH } from "~/constants";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };
const pageSize = 40;
async function fetchVideos(pageNumber = 1) {
  const api_url =
    typeof process !== "undefined" ? process.env.REMIX_API_URL || "" : "";
  const basepath =
    typeof process !== "undefined" ? process.env.REMIX_BASEPATH || "" : "";
  const response = await axios.get(
    `${api_url}${BASEPATH}/api/index1?pageNumber=${pageNumber}`
  );
  return response.data || { total: "0", results: [] };
}

export const loader = async (params) => {
  try {
    // const video_id = params.videoId?.split("-").pop();
    const response = await fetchVideos();
    if (!response.results) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(response);
  } catch (err) {
    console.error("Error:", err);
    return json({ total: "0", results: [] });
  }
};
export default function Index() {
  const urlupdate = useStore((state) => state.urlupdate);
  const setUrlupdate = useStore((state) => state.setUrlupdate);
  const { results: defaultVideos } = useLoaderData();
  const [videos, setVideos] = useState(defaultVideos);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState(2);
  useEffect(() => {
    if (urlupdate !== true) {
      setUrlupdate((prev) => !prev);
    }
  }, [urlupdate]);

  async function loadMore() {
    setLoading(true);
    try {
      console.log("calling load more");
      const response = await fetchVideos(page);
      if (!response.results) {
        throw new Response("Not Found", { status: 404 });
      }
      setVideos((current) => [...current, ...response.results]);
      setPage((page) => page + 1);
      setHasNextPage(response.results.length === pageSize);
    } catch (err) {
      setError(err);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }
  // const [infiniteRef] = useInfiniteScroll({
  //   loading,
  //   onLoadMore: loadMore,
  //   hasNextPage,
  //   disabled: !!error,
  //   rootMargin: "0px 0px 400px 0px",
  // });
  // console.log("Sourav Bansal",useInfiniteScroll)
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 400px 0px 400px",
  });

  return (
    <>
      <Content
        videoData={{ results: videos }}
        ref1={infiniteRef}
        ref2={rootRef}
      />
    </>
  );
}
