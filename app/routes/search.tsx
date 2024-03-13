import { MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import useInfiniteScroll from "~/hooks/useInfiniteScrollCustom";
import usePrevious from "~/hooks/usePreviousCustom";

import Content from "~/components/Layout/Content";
import useStore from "~/stores/utilstore";
const pageSize = 10;

async function fetchVideos({ pageNumber, query }: any = {}) {
  let api_url = "";
  if (typeof process !== "undefined") {
    api_url = process.env.REMIX_API_URL || "";
  }
  const fetchController = new AbortController();

  const response = await axios.get(
    `${api_url}/api/search/?pageNumber=${pageNumber || 1}&q=${query}`,
    { signal: fetchController.signal }
  );
  return response;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const response = await fetchVideos({ query });
    if (!response.data || !response.data.results) {
      throw new Response("Not Found", {
        status: 404,
      });
    }

    return response.data;
  } catch (err) {
    console.log("err:", err);
    return {
      total: "0",
      results: [],
    };
  }
};

const SearchIdComponent = () => {
  const urlupdate = useStore((state) => state.urlupdate);
  const setUrlupdate = useStore((state) => state.setUrlupdate);

  useEffect(() => {
    if (urlupdate !== true) {
      setUrlupdate(true);
    }
  }, [urlupdate]);
  const { results: defaultVideos } = useLoaderData();
  const [videos, setVideos] = useState(defaultVideos);
  useEffect(() => {
    console.log("defaultVideos search:", defaultVideos);
  }, [defaultVideos]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>();
  const [page, setPage] = useState(2);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const previousQuery = usePrevious(query);
  useEffect(() => {
    if (query != previousQuery) {
      setVideos(defaultVideos);
      setLoading(false);
      setHasNextPage(true);
      setError(null);
      setPage(2);
    }
  }, [defaultVideos, query, previousQuery]);

  async function loadMore() {
    setLoading(true);
    try {
      const response = await fetchVideos({ pageNumber: page, query });
      if (!response.data || !response.data.results) {
        throw new Response("Not Found", {
          status: 404,
        });
      }
      setVideos((current: any) => [...current, ...response.data.results]);
      setPage((page) => page + 1);
      setHasNextPage(response.data.results.length === pageSize);
    } catch (err) {
      setError(err);
      console.log("error", err);
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
      ></Content>
    </>
  );
};

export default SearchIdComponent;
