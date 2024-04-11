// Content.tsx
import React, { useEffect, useRef, useState } from "react";
import VideoSlide from "~/components/Layout/VideoSlide";
import useStore from "~/stores/utilstore";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNav from "~/components/Layout/SwiperNav";
import LeftPanel from "~/components/Layout/LeftPanel";
import Footer from "~/components/Layout/Footer";
import { useLocation } from "@remix-run/react";
let timeoutIDs: any = [];
const videoOverlayTimeoutIds = { current: null };
const Content = (props: {
  videoData: any;
  ref1?: any;
  ref2?: any;
  catId?: number;
  catName?: string;
}) => {
  const location = useLocation();
  const prevPath = useRef("");
  const isPathChange = location.pathname !== prevPath.current;
  const [swiperRef, setSwiperRef] = useState(null);
  const swipeRef = useRef(null);
  const isVideoAvailable = (props.videoData?.results?.length || 0) > 0;
  const clicked = useStore((state) => state.clicked);
  const activeVideoIndex = useStore((state) => state.activeVideoIndex);
  const setActiveVideoIndex = useStore((state) => state.setActiveVideoIndex);
  const isVideoOverlayVisible = useStore(
    (state) => state.isVideoOverlayVisible
  );
  function handleTimeout(index: any) {
    var activeSlide = document.querySelectorAll(".swiper-slide-active")[0];
    if (videoOverlayTimeoutIds.current) {
      clearTimeout(videoOverlayTimeoutIds.current);
    }
    var allSlides = document.querySelectorAll(".swiper-slide");
    allSlides.forEach((slide) => {
      slide.classList.remove("js_icon-more");
    });
    activeSlide?.classList.add("js_seek-vis-sec");
    activeSlide?.classList.remove("js_swp-vis");
    if (window.innerWidth <= 560) {
      if (!clicked) {
        activeSlide?.classList.add("js_seek-vis-sec");
        if (index === 0) {
          activeSlide?.classList.add("js_swp-vis");
        }
        videoOverlayTimeoutIds.current = setTimeout(function () {
          activeSlide?.classList.remove("js_seek-vis-sec");
          activeSlide?.classList.remove("js_icon-more");
          document.body.classList.remove("VdElCht_on");
        }, 6000);
      }
    }
    if (window.innerWidth >= 560) {
      if (!clicked) {
        activeSlide?.classList.add("js_seek-vis-sec");
        videoOverlayTimeoutIds.current = setTimeout(function () {
          activeSlide?.classList.remove("js_seek-vis-sec");
          activeSlide?.classList.remove("js_icon-more");
        }, 6000);
      }
    }
  }

  useEffect(() => {
    prevPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (isPathChange === true) {
      swipeRef.current.swiper.slideTo(0, 0);
      setActiveVideoIndex(0);
    }
  }, [isPathChange]);
  useEffect(() => {
    if (clicked === true) {
      if (activeVideoIndex && timeoutIDs[activeVideoIndex]) {
        clearTimeout(timeoutIDs[activeVideoIndex]);
      }
    }
  }, [clicked]);
  useEffect(() => {
    if (isVideoOverlayVisible) {
      if (videoOverlayTimeoutIds.current) {
        clearTimeout(videoOverlayTimeoutIds.current);
      }
    }else{
      handleTimeout(activeVideoIndex)
    }
  }, [isVideoOverlayVisible]);
  return (
    <>
      {/*============== Middle with two column option ==============*/}
      <div className="VdPg-Col_Two-a-wr BepSlCol_1">
        {/*==== column one ====*/}
        <div className="VdPg-Col_Two-a BepSlCol_rw">
          {/*====== video ======*/}
          <div className="BepSl_cn">
            <div className="BepSl_wr" ref={props.ref2}>
              {isVideoAvailable ? (
                <Swiper
                  className="BepSl_rw"
                  modules={[Virtual]}
                  onSwiper={setSwiperRef}
                  ref={swipeRef}
                  wrapperClass="BepSl_ul"
                  direction="vertical"
                  loop={false}
                  centeredSlides={true}
                  initialSlide={0}
                  // cssMode={true}
                  slidesPerView={1}
                  mousewheel={true}
                  keyboard={true}
                  navigation={{
                    prevEl: ".BepNv_prv",
                    nextEl: ".BepNv_nxt",
                  }}
                  breakpoints={{
                    768: {
                      centeredSlides: true,
                      // cssMode: true,
                      direction: "horizontal",
                      loop: false,
                      slidesPerView: 1.35,
                      speed: 400,
                      mousewheel: true,
                      keyboard: true,
                    },
                    1024: {
                      centeredSlides: true,
                      // cssMode: true,
                      direction: "horizontal",
                      loop: false,
                      slidesPerView: 1.6,
                      speed: 400,
                      mousewheel: true,
                      keyboard: true,
                    },
                    1200: {
                      centeredSlides: true,
                      // cssMode: true,
                      direction: "horizontal",
                      loop: false,
                      slidesPerView: 2,
                      speed: 400,
                      mousewheel: true,
                      keyboard: true,
                    },
                  }}
                  onInit={(params) => {
                    setTimeout(() => {
                      handleTimeout(0);
                    }, 1000);
                  }}
                  onSlideChange={(params) => {
                    setActiveVideoIndex(params.activeIndex);
                    if (timeoutIDs[params.realIndex]) {
                      clearTimeout(timeoutIDs[params.realIndex]);
                    }
                    timeoutIDs[params.realIndex] = setTimeout(function () {
                      handleTimeout(params.realIndex);
                    }, 0);
                  }}
                  virtual
                >
                  <LeftPanel />
                  {props.videoData.results.map((slideContent, index, data) => {
                    const isActive = activeVideoIndex === index;
                    const d = slideContent;
                    return (
                      <SwiperSlide
                        key={d.id}
                        virtualIndex={index}
                        className={`BepSl_li Sv_trs js_seek-vis-sec ${
                          index == 0 ? "js_swp-vis" : ""
                        }`}
                      >
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
                          ref1={props.ref1}
                          data={data}
                          isActive={isActive}
                          isPathChange={isPathChange}
                        ></VideoSlide>
                      </SwiperSlide>
                    );
                  })}
                  <Footer />
                  <SwiperNav />
                </Swiper>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
