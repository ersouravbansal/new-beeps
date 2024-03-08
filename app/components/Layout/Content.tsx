// Content.tsx

import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import VideoSlide from "~/components/Layout/VideoSlide";
import $ from "jquery";
import Swiper from "swiper";

const Content = (props: {
  videoData: any;
  ref1?: any;
  ref2?: any;
  catId?: number;
  catName?: string;
}) => {
  const isVideoAvailable = (props.videoData?.results?.length || 0) > 0;
  let mySwiper: any;
  let timeoutIDs: any = [];
  let direction: any;
  let loop,
    centeredSlides,
    cssMode,
    slidesPerView,
    mousewheel,
    keyboard: any;
  const [clicked, setClicked] = useState(false);

  function playActiveSlideVideo(swiper: any) {
    var activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      var activeSlideVideo = activeSlide.querySelector("video");
      if (activeSlideVideo) {
        activeSlideVideo.play();
      }
    }
  }

  function handleTimeout(index: any) {
    var activeSlide = $(".swiper-slide").eq(index);
    $(".swiper-slide").removeClass("js_icon-more");

    activeSlide.addClass("js_seek-vis-sec");
    activeSlide.removeClass("js_swp-vis");
    if ($(window).width() <= 560) {
      if (!clicked) {
        activeSlide.addClass("js_seek-vis-sec");
        activeSlide.addClass("js_swp-vis");

        setTimeout(function () {
          activeSlide.removeClass("js_seek-vis-sec");
          activeSlide.removeClass("js_icon-more");
          $("body").removeClass("VdElCht_on");
        }, 6000);
      }
    }
    if ($(window).width() >= 560) {
      if (!clicked) {
        activeSlide.addClass("js_seek-vis-sec");
        //  activeSlide.addClass('js_swp-vis');

        setTimeout(function () {
          activeSlide.removeClass("js_seek-vis-sec");
          activeSlide.removeClass("js_icon-more");
        }, 6000);
      }
    }
  }
  const swiperOptions = {
    direction: "vertical",
    loop: false,
    centeredSlides: true,
    cssMode: true,
    slidesPerView: "auto",
    mousewheel: true,
    keyboard: true,
    navigation: {
      nextEl: ".BepNv_nxt",
      prevEl: ".BepNv_prv",
    },
    breakpoints: {
      768: {
        centeredSlides: true,
        cssMode: true,
        direction: "horizontal",
        loop: false,
        slidesPerView: 1.35,
        speed: 400,
        mousewheel: true,
        keyboard: true,
      },
      1024: {
        centeredSlides: true,
        cssMode: true,
        direction: "horizontal",
        loop: false,
        slidesPerView: 1.6,
        speed: 400,
        mousewheel: true,
        keyboard: true,
      },
      1200: {
        centeredSlides: true,
        cssMode: true,
        direction: "horizontal",
        loop: false,
        slidesPerView: 2,
        speed: 400,
        mousewheel: true,
        keyboard: true,
      },
    },
    on: {
      init: function () {
        $(".swiper-slide").each(function (index) {
          timeoutIDs[index] = setTimeout(function () {
            handleTimeout(index);
          }, 0);
        });
        playActiveSlideVideo(this);
      },
      slideChange: function () {
        clearTimeout(timeoutIDs[this.realIndex]);
        timeoutIDs[this.realIndex] = setTimeout(function () {
          handleTimeout(mySwiper.realIndex);
        }, 0);
        playActiveSlideVideo(this);
      },
    },
  };
  function handleCardClick(event: React.MouseEvent<HTMLDivElement>) {
    setClicked(true);
    event.stopPropagation();

    const clickedCard = event.currentTarget;
    const activeSlide = clickedCard.closest(".swiper-slide-active");

    if (activeSlide) {
      activeSlide.classList.toggle("js_seek-vis-sec");

      const parentLi = clickedCard.closest(".BepSl_li");
      if (parentLi && parentLi.classList.contains("js_seek-vis-sec")) {
        parentLi.classList.add("js_swp-vis");
        parentLi.classList.remove("js_seek-vis-sec");
      } else {
        activeSlide.classList.remove("js_swp-vis");
      }

      if (parentLi && parentLi.classList.contains("js_swp-vis")) {
        parentLi.classList.toggle("js_seek-vis");
      } else {
        // parentLi?.classList.remove('js_seek-vis');
      }
    }
  }
  useEffect(() => {
    $(function () {
      if (mySwiper) {
        mySwiper.destroy();
      }
      mySwiper = new Swiper(".BepSl_rw", swiperOptions);
      // if ($(window).width() >= 560) {
      // $('.VdEl_ovl').click(function (event) {
      //     event.stopPropagation();
      //     $(this).parents('.BepSl_li').toggleClass('js_seek-vis');
      //     $(this).parents('.BepSl_li').removeClass('js_seek-vis-sec');
      //     console.log("hi");
      //     if ($(window).width() <= 560) {
      //         $(this).parents('.BepSl_li').toggleClass('js_swp-vis');
      //     }
      // });
      // }
      if (window.innerWidth <= 560) {
        document.querySelectorAll(".BepSl_crd").forEach((card) => {
          card.addEventListener("click", handleCardClick);
        });
      }
    });
    return () => {
      if (mySwiper) {
        mySwiper.destroy();
      }
    };
  }, [props.videoData]);
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
                  {isVideoAvailable
                    ? props.videoData?.results?.map(
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
                    : null}
                  <div ref={props.ref1}></div>
                </div>
                <div
                  className="swiper-button-prev BepNv_prv"
                  onClick={()=>{
                    mySwiper.slidePrev();
                  }}
                >
                  {/* <svg class="vj_icn vj_arrow-up">
                  <use xlink:href="#vj_arrow-up"></use>
                </svg> */}
                </div>
                <div
                  className="swiper-button-next BepNv_nxt"
                  onClick={()=>{
                    mySwiper.slideNext();}}
                >
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
