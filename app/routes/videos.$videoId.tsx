import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import axios from "axios";
import { useEffect, useState, version } from "react";
import useInfiniteScroll from "~/hooks/useInfiniteScrollCustom";

import Content from "~/components/Layout/Content";
import useStore from "~/stores/utilstore";
import { BASEPATH } from "~/constants";

const pageSize = 10;
const cleanUp = (st: string | undefined) => {
  if (st) {
    return st
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
  return "";
};

async function fetchVideos({ pageNumber, video_id }: any = {}) {
  try {
    pageNumber = pageNumber || 1;

    const api_url = process.env.REMIX_API_URL || "";
    const response = await axios.get(`${api_url}${BASEPATH}/api/video/?pageNumber=${pageNumber}&video_id=${video_id}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

async function fetchMoreVideos({ pageNumber }: any = {}) {
  let api_url = "";
  if (typeof process !== "undefined") {
    api_url = process.env.REMIX_API_URL || "";
  }

  const response1 = await axios.get(
    `${api_url}${BASEPATH}/api/videos/video/?pageNumber=${pageNumber || 1}`
  );

  return response1.data.results;
}
export const meta: MetaFunction = ({ data, params }) => {
  if (data.results && data.results.length > 0) {
    const videoIndex = params.video_id || 0;
    if (data.results[videoIndex]) {
      const currentVideo = data.results[videoIndex];

      return [
        { title: cleanUp(currentVideo?.urltitle).toLowerCase() },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "msapplication-tap-highlight", content: "no" },
        {
          name: "google-site-verification",
          content: "yThRoDT_1iDUIum7IPIGT96Y-8rpvmFwlYBBK9EMGXM",
        },
        { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" },
        { name: "content-language", content: "en" },
        { httpEquiv: "X-UA-Compatible", content: "IE=edge" },

        { "og:title": cleanUp(currentVideo.urltitle).toLowerCase() },
        // { "og:image": currentVideo["media:fullimage"] },
        { "og:image": currentVideo["media:thumbnail"] },
      ];
    }
  }
  return [
    {
      title: "NDTV Video Listing Page",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "msapplication-tap-highlight", content: "no" },
    {
      name: "google-site-verification",
      content: "yThRoDT_1iDUIum7IPIGT96Y-8rpvmFwlYBBK9EMGXM",
    },
    { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" },
    { name: "content-language", content: "en" },
    { httpEquiv: "X-UA-Compatible", content: "IE=edge" },

    { "og:title": "NDTV Video Listing Page" },
    { "og:image": "https://cdn.ndtv.com/common/images/ogndtv.png" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const video_id = params.videoId?.split("-").pop();
    const [videos, moreVideos] = await Promise.all([
      fetchVideos({ video_id: video_id }),
      fetchMoreVideos({ pageNumber: 1 }),
    ]);

    const mergedVideos = Array.isArray(videos)
      ? [...videos, ...moreVideos]
      : [videos, ...moreVideos];
    return json({ results: mergedVideos });
  } catch (err) {
    console.log("err:", err);
    return json({
      total: "0",
      results: [],
    });
  }
};

const SingleVideoComponent = () => {
  const urlupdate = useStore((state) => state.urlupdate);
  const setUrlupdate = useStore((state) => state.setUrlupdate);

  useEffect(() => {
    if (urlupdate !== true) {
      setUrlupdate((prev) => !prev);
    }
  }, [urlupdate]);

  const { results: defaultVideos } = useLoaderData();
  const [videos, setVideos] = useState(
    Array.isArray(defaultVideos) ? defaultVideos : []
  );
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(2);

  async function loadMore() {
    setLoading(true);
    try {
      const moreVideos = await fetchMoreVideos({ pageNumber: page });

      setHasNextPage(moreVideos.length === pageSize);
      setPage((prevPage) => prevPage + 1);
      setVideos((prevVideos) => {
        return Array.isArray(prevVideos)
          ? [...prevVideos, ...moreVideos]
          : moreVideos;
      });
    } catch (err) {
      setError(err);
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 400px 0px 0px",
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
};

export default SingleVideoComponent;
