// Content.tsx
import React, { useEffect, useRef, useState } from "react";
import VideoSlide from "~/components/Layout/VideoSlide";
import useStore from "~/stores/utilstore";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNav from "./SwiperNav";
let timeoutIDs: any = [];
const Content = (props: {
  videoData: any;
  ref1?: any;
  ref2?: any;
  catId?: number;
  catName?: string;
}) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const isVideoAvailable = (props.videoData?.results?.length || 0) > 0;
  const clicked = useStore((state) => state.clicked);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  // const [slides, setSlides] = useState(
  //   Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  // );
  function handleTimeout(index: any) {
    var activeSlide = document.querySelectorAll(".swiper-slide-active")[index];

    var allSlides = document.querySelectorAll(".swiper-slide");

    allSlides.forEach((slide) => {
      slide.classList.remove("js_icon-more");
    });

    activeSlide?.classList.add("js_seek-vis-sec");
    activeSlide?.classList.remove("js_swp-vis");

    if (window.innerWidth <= 560) {
      if (!clicked) {
        activeSlide.classList.add("js_seek-vis-sec");
        if (index === 0) {
          activeSlide.classList.add("js_swp-vis");
        }
        setTimeout(function () {
          activeSlide.classList.remove("js_seek-vis-sec");
          activeSlide.classList.remove("js_icon-more");
          document.body.classList.remove("VdElCht_on");
        }, 6000);
      }
    }

    if (window.innerWidth >= 560) {
      if (!clicked) {
        activeSlide?.classList.add("js_seek-vis-sec");

        setTimeout(function () {
          activeSlide?.classList.remove("js_seek-vis-sec");
          activeSlide?.classList.remove("js_icon-more");
        }, 6000);
      }
    }
  }
  useEffect(() => {
    if (clicked === true) {
      if (activeVideoIndex && timeoutIDs[activeVideoIndex]) {
        clearTimeout(timeoutIDs[activeVideoIndex]);
      }
    }
  }, [clicked]);
  return (
    <>
      {/*============== Middle with two column option ==============*/}
      <div className="VdPg-Col_Two-a-wr BepSlCol_wr">
        {/*==== column one ====*/}
        <div className="VdPg-Col_Two-a">
          {/*====== video ======*/}
          <div className="BepSl_cn">
            <div className="BepSl_wr">
              {/* <div className="swiper-container BepSl_rw"> */}
              {/* <div className="swiper-container"> */}
              {/* <div className="swiper-wrapper BepSl_ul" ref={props.ref2}> */}
              {isVideoAvailable ? (
                <Swiper
                  className="BepSl_rw"
                  modules={[Virtual]}
                  onSwiper={setSwiperRef}
                  wrapperClass="BepSl_ul"
                  direction="vertical"
                  loop={false}
                  centeredSlides={true}
                  initialSlide={0}
                  // cssMode={true}
                  slidesPerView={1}
                  mousewheel={true}
                  ref={props.ref2}
                  keyboard={true}
                  navigation={true}
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
                      speed: 1000,
                      mousewheel: true,
                      keyboard: true,
                    },
                  }}
                  onInit={(params) => {
                    var swiperSlides = params.virtual.slides;
                    for (var i = 0; i < swiperSlides.length; i++) {
                      var slide = swiperSlides[i];
                      if (timeoutIDs[i]) {
                        clearTimeout(timeoutIDs[i]);
                      }
                      timeoutIDs[i] = setTimeout(
                        (function (index) {
                          return function () {
                            handleTimeout(index);
                          };
                        })(i),
                        0
                      );
                    }
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
                  {/* {slides.map((slideContent, index) => (
                    <SwiperSlide key={slideContent} virtualIndex={index}>
                      {slideContent}
                    </SwiperSlide>
                  ))} */}
                  {props.videoData.results.map((slideContent, index, data) => {
                    const isActive = activeVideoIndex === index;
                    const d = slideContent;
                    return (
                      <SwiperSlide
                        key={d.id}
                        virtualIndex={index}
                        className="BepSl_li"
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
                        ></VideoSlide>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : null}
              {/* </div> */}
              {/* <div className="swiper-button-prev BepNv_prv"></div>
              <div className="swiper-button-next BepNv_nxt"></div> */}

              <SwiperNav />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Content;

// // Content.tsx
// import React, { useEffect, useRef, useState } from "react";
// import VideoSlide from "~/components/Layout/VideoSlide";
// import $ from "jquery";
// import Swiper from "swiper";
// import useStore from "~/stores/utilstore";
// import { useLocation } from "@remix-run/react";
// let mySwiper: any;
// let timeoutIDs: any = [];
// const Content = (props: {
//   videoData: any;
//   ref1?: any;
//   ref2?: any;
//   catId?: number;
//   catName?: string;
// }) => {
//   const location = useLocation();
//   const prevPath = useRef("");
//   const isPathChange = location.pathname !== prevPath.current;
//   const isVideoAvailable = (props.videoData?.results?.length || 0) > 0;
//   const clicked = useStore((state) => state.clicked);
//   const [activeVideoIndex, setActiveVideoIndex] = useState(0);
//   function playActiveSlideVideo(swiper) {
//     var activeSlide = swiper.slides[swiper.activeIndex];
//     var activeSlideVideo = activeSlide.querySelector("video");
//   }
//   function handleTimeout(index: any) {
//     var activeSlide = document.querySelectorAll(".swiper-slide")[index];
//     var allSlides = document.querySelectorAll(".swiper-slide");

//     allSlides.forEach((slide) => {
//       slide.classList.remove("js_icon-more");
//     });

//     activeSlide.classList.add("js_seek-vis-sec");
//     activeSlide.classList.remove("js_swp-vis");

//     if (window.innerWidth <= 560) {
//       if (!clicked) {
//         activeSlide.classList.add("js_seek-vis-sec");
//         if (index === 0) {
//           activeSlide.classList.add("js_swp-vis");
//         }
//         setTimeout(function () {
//           activeSlide.classList.remove("js_seek-vis-sec");
//           activeSlide.classList.remove("js_icon-more");
//           document.body.classList.remove("VdElCht_on");
//         }, 6000);
//       }
//     }

//     if (window.innerWidth >= 560) {
//       if (!clicked) {
//         activeSlide.classList.add("js_seek-vis-sec");

//         setTimeout(function () {
//           activeSlide.classList.remove("js_seek-vis-sec");
//           activeSlide.classList.remove("js_icon-more");
//         }, 6000);
//       }
//     }
//   }
//   useEffect(() => {
//     // const currentSlideIndex = mySwiper?.activeIndex || 0;

//     $(function () {
//       if (isPathChange && mySwiper) {
//         mySwiper.destroy();
//         mySwiper = null;
//       }
//       if (mySwiper) {
//         mySwiper.update();
//       } else {
//         mySwiper = new Swiper(".BepSl_rw", {
//           direction: "vertical" as any,
//           loop: false,
//           centeredSlides: true,
//           initialSlide: isPathChange ? 0 : activeVideoIndex,
//           cssMode: true,
//           slidesPerView: "auto",
//           mousewheel: true,
//           keyboard: true,
//           navigation: {
//             nextEl: ".BepNv_nxt",
//             prevEl: ".BepNv_prv",
//           },
//           breakpoints: {
//             768: {
//               centeredSlides: true,
//               cssMode: true,
//               direction: "horizontal",
//               loop: false,
//               slidesPerView: 1.35,
//               speed: 400,
//               mousewheel: true,
//               keyboard: true,
//             },
//             1024: {
//               centeredSlides: true,
//               cssMode: true,
//               direction: "horizontal",
//               loop: false,
//               slidesPerView: 1.6,
//               speed: 400,
//               mousewheel: true,
//               keyboard: true,
//             },
//             1200: {
//               centeredSlides: true,
//               cssMode: true,
//               direction: "horizontal",
//               loop: false,
//               slidesPerView: 2,
//               speed: 400,
//               mousewheel: true,
//               keyboard: true,
//             },
//           },
//           on: {
//             init: function () {
//               var swiperSlides =
//                 document.getElementsByClassName("swiper-slide");
//               for (var i = 0; i < swiperSlides.length; i++) {
//                 var slide = swiperSlides[i];
//                 if (timeoutIDs[i]) {
//                   clearTimeout(timeoutIDs[i]);
//                 }
//                 timeoutIDs[i] = setTimeout(
//                   (function (index) {
//                     return function () {
//                       handleTimeout(index);
//                     };
//                   })(i),
//                   0
//                 );
//               }
//               playActiveSlideVideo(this);

//             },
//             slideChange: function () {
//               setActiveVideoIndex(this.activeIndex);

//               if (timeoutIDs[this.realIndex]) {
//                 clearTimeout(timeoutIDs[this.realIndex]);
//               }
//               timeoutIDs[this.realIndex] = setTimeout(function () {
//                 handleTimeout(mySwiper.realIndex);
//               }, 0);
//               playActiveSlideVideo(this);

//             },
//           },
//         });
//         mySwiper.init();
//       }
//     });

//     return () => {};
//   }, [props.videoData, clicked, props.catName, isPathChange]);
//   useEffect(() => {
//     if (clicked === true) {
//       if (mySwiper.realIndex && timeoutIDs[mySwiper.realIndex]) {
//         clearTimeout(timeoutIDs[mySwiper.realIndex]);
//       }
//     }
//   }, [clicked]);
//   useEffect(() => {
//     prevPath.current = location.pathname;
//   }, [location.pathname]);
//   return (
//     <>
//       {/*============== Middle with two column option ==============*/}
//       <div className="VdPg-Col_Two-a-wr BepSlCol_wr">
//         {/*==== column one ====*/}
//         <div className="VdPg-Col_Two-a">
//           {/*====== video ======*/}
//           <div className="BepSl_cn">
//             <div className="BepSl_wr">
//               <div className="swiper-container BepSl_rw">
//                 <div className="swiper-wrapper BepSl_ul" ref={props.ref2}>
//                   {isVideoAvailable
//                     ? props.videoData?.results?.map(
//                         (d: any, index: any, data) => {
//                           // console.log("data(general):", d);
//                           const isActive = activeVideoIndex === index;

//                           return (
//                             <React.Fragment key={index}>
//                               <VideoSlide
//                                 vidsrc={
//                                   d["media:filepath"]
//                                     ? d["media:filepath"]
//                                     : "Video Not Available"
//                                 }
//                                 hlssrc={d["media:allfileformats"]?.ios}
//                                 imgsrc={
//                                   d["media:fullimage"]
//                                     ? d["media:fullimage"]
//                                     : d["media:thumbnail"]
//                                 }
//                                 category={d["media:category"]}
//                                 show={d["media:show"]}
//                                 title={decodeURIComponent(escape(d.title))}
//                                 videoID={d.id}
//                                 link={d.link}
//                                 urltitle={d.urltitle}
//                                 channel_id={d["media:source_id"]}
//                                 index={index}
//                                 catName={props?.catName}
//                                 catId={props?.catId}
//                                 pubDate={d.pubDate}
//                                 ref1={props.ref1}
//                                 data={data}
//                                 mySwiper={mySwiper}
//                                 isActive={isActive}
//                               ></VideoSlide>
//                             </React.Fragment>
//                           );
//                         }
//                       )
//                     : null}
//                 </div>
//                 <div
//                   className="swiper-button-prev BepNv_prv"
//                   onClick={() => {
//                     mySwiper.slidePrev();
//                   }}
//                 >
//                   {/* <svg class="vj_icn vj_arrow-up">
//                   <use xlink:href="#vj_arrow-up"></use>
//                 </svg> */}
//                 </div>
//                 <div
//                   className="swiper-button-next BepNv_nxt"
//                   onClick={() => {
//                     mySwiper.slideNext();
//                   }}
//                 >
//                   {/* <svg class="vj_icn vj_arrow-down">
//                   <use xlink:href="#vj_arrow-down"></use>
//                 </svg> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Content;
