// import type { MetaFunction } from "@remix-run/node";
import React from "react";
import Content from "~/components/Layout/Content";
import VideoData from "~/components/Layout/VideoData";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };
export default function Index() {
  return (
    <>

      <Content videoData={VideoData} />
    </>
  );
}
