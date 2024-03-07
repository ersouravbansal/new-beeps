// Content.tsx

import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import VideoSlide from "~/components/Layout/VideoSlide";

const Content = (props: {
  videoData: any;
  ref1?: any;
  ref2?: any;
  catId?: number;
  catName?: string;
}) => {
  const isVideoAvailable = (props.videoData?.results?.length || 0) > 0;
  return (
    <>
      {/*============== Middle with two column option ==============*/}
      <div className="VdPg-Col_Two-a-wr BepSlCol_wr">
        {/*==== column one ====*/}
        <div className="VdPg-Col_Two-a">
          {/*====== video ======*/}
          <div className="BepSl_cn">
            <div className="BepSl_wr" ref={props.ref2}>
              <div className="swiper-container BepSl_rw">
                <div className="swiper-wrapper BepSl_ul">
                  {isVideoAvailable ? (
                    props.videoData?.results?.map(
                      (d: any, index: any, data) => {
                        // console.log("data(general):", d);

                        return (
                          <React.Fragment key={index}>
                            <VideoSlide
                              vidsrc={
                                d["media:filepath"]
                                  ? d["media:filepath"]
                                  : "Video Not Available"
                              }
                              hlssrc={d["media:allfileformats"]?.ios}
                              imgsrc={
                                d["media:fullimage"]
                                  ? d["media:fullimage"]
                                  : d["media:thumbnail"]
                              }
                              category={d["media:category"]}
                              show={d["media:show"]}
                              title={decodeURIComponent(escape(d.title))}
                              videoID={d.id}
                              link={d.link}
                              urltitle={d.urltitle}
                              channel_id={d["media:source_id"]}
                              index={index}
                              catName={props?.catName}
                              catId={props?.catId}
                              pubDate={d.pubDate}
                            ></VideoSlide>
                          </React.Fragment>
                        );
                      }
                    )
                  ) : (
                    <>
                      (
                      <div className="PgNtFund_wr">
                        <div className="PgNtFund_ttl">No Videos Found!</div>
                        <p className="PgNtFund_tx">
                          {" "}
                          Stay Tuned for Further updates...
                        </p>
                        <Link to="/" className="PgNtFund_lk">
                          {" "}
                          Back To Home{" "}
                        </Link>
                      </div>
                      )
                    </>
                  )}
                  <div ref={props.ref1}></div>
                  {/* {videoData.map((videoData:any) => (
                  <VideoSlide
                    key={videoData.id}
                    videourl={videoData.videoUrl}
                    title={videoData.title}
                  />
                ))} */}
                </div>
                <div className="swiper-button-prev BepNv_prv">
                  {/* <svg class="vj_icn vj_arrow-up">
                  <use xlink:href="#vj_arrow-up"></use>
                </svg> */}
                </div>
                <div className="swiper-button-next BepNv_nxt">
                  {/* <svg class="vj_icn vj_arrow-down">
                  <use xlink:href="#vj_arrow-down"></use>
                </svg> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
