// Content.tsx

import React from "react";
 import VideoSlide from "~/components/Layout/VideoSlide";

const Content = ({ videoData }: any) => {
  return (
    <>
          {/*============== Middle with two column option ==============*/}
    <div className="VdPg-Col_Two-a-wr BepSlCol_wr">
      {/*==== column one ====*/}
      <div className="VdPg-Col_Two-a">
        {/*====== video ======*/}
        <div className="BepSl_cn">
          <div className="BepSl_wr">
            <div className="swiper-container BepSl_rw">
              <div className="swiper-wrapper BepSl_ul">
                {videoData.map((videoData:any) => (
                  <VideoSlide
                    key={videoData.id}
                    videourl={videoData.videoUrl}
                    title={videoData.title}
                  />
                ))}
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

