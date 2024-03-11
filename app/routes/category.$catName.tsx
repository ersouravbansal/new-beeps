import { json, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import axios from "axios";
import useInfiniteScroll from "~/hooks/useInfiniteScrollCustom";
import  usePrevious  from "~/hooks/usePreviousCustom";

import { CATEGORY_NAME } from "~/components/Layout/CategoryName";
import Content from "~/components/Layout/Content";
// import LoadingVideos from "~/components/LoadingVideos";
import useStore from "~/stores/utilstore";

const pageSize = 15;

async function fetchVideos({ pageNumber = 1, catName } = {}) {
  const api_url = typeof process !== "undefined" ? process.env.REMIX_API_URL || "" : "";
  const response = await axios.get(`${api_url}/api/categories/category/?pageNumber=${pageNumber}&catname=${catName}`);
  return response.data || { total: "0", results: [] };
}

export const loader = async ({ params }) => {
  try {
    const catName = params.catName?.toLowerCase();
    const catId = CATEGORY_NAME[catName];
    const response = await fetchVideos({ catId, catName });
    if (!response.results) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(response);
  } catch (err) {
    console.error("Error:", err);
    return json({ total: "0", results: [] });
  }
};

const CategoryIdComponent = () => {
  const urlupdate = useStore((state) => state.urlupdate);
  const setUrlupdate = useStore((state) => state.setUrlupdate);
  const { results: defaultVideos } = useLoaderData();
  const [videos, setVideos] = useState(defaultVideos);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState(2);
  const params = useParams();
  const catName = params.catName?.toLowerCase();
  const catId = CATEGORY_NAME[catName];
  const previousCatId = usePrevious(catId);
  const previousCatName = usePrevious(catName);

  useEffect(() => {
    if (urlupdate !== true) {
      setUrlupdate(true);
    }
  }, [urlupdate]);

  useEffect(() => {
    document.title= "NDTV " + catName?.toUpperCase() + " Videos"
    // console.log("defaultVideos category:", defaultVideos);
  }, [catName]);

  async function loadMore() {
    setLoading(true);
    try {
      const response = await fetchVideos({ pageNumber: page, catId, catName });
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

  const [infiniteRef, { rootRef }]= useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 400px 0px 0px',
  });
//   const [infiniteRef] = useInfiniteScroll({
//     loading,
//     onLoadMore: loadMore,
//     hasNextPage,
//     disabled: !!error,
//     rootMargin: "0px 0px 400px 0px",
//   });

//   const LoadMoreElement = (hasNextPage || loading) && <LoadingVideos onLoadMore={loadMore} loading error />;

  useEffect(() => {
    if (catId !== previousCatId || catName !== previousCatName) {
      setVideos(defaultVideos);
      setLoading(false);
      setHasNextPage(true);
      setError(null);
      setPage(2);
    }
  }, [defaultVideos, catId, previousCatId, catName, previousCatName]);

  return (
    <>
      <Content videoData={{ results: videos }} ref1={infiniteRef} ref2={rootRef} catId={catId} catName={catName} />
    </>
  );
};

export default CategoryIdComponent;
