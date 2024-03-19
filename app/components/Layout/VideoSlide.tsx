import { Link } from "@remix-run/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoPlayer from "~/hooks/useVideoPlayer";
import useStore from "~/stores/utilstore";
import { isMobile } from "react-device-detect";
import { trackVideoPageView } from "~/stores/eventTracker";
import { BASEPATH } from "~/constants";
const VideoSlide = (props: any) => {
  const [getUrl, setGetUrl] = useState("None");
  const silent = useStore((state) => state.silent);
  const setSilent = useStore((state) => state.setSilent);
  const clicked = useStore((state) => state.clicked);
  const urlupdate = useStore((state) => state.urlupdate);
  const setClicked = useStore((state) => state.setClicked);
  const isVideoPlaying = useStore((state) => state.isVideoPlaying);
  const videoElement = useRef<HTMLVideoElement>(null);
  const seekBar = useRef(null);
  const progressBar = useRef(null);
  const seekThumb = useRef(null);
  const mySwiper = props.mySwiper;
  const [isDragging, setIsDragging] = useState(false);
  const {
    toggleMute,
    togglePlay,
    handleOnMetaLoaded,
    handleOnTimeUpdate,
    formatTime,
    playVideo,
    pauseVideo,
    muteVideo,
    unMuteVideo,
    playerState,
    handleVideoProgress,
    onSliderMove,
  } = VideoPlayer(videoElement, seekBar, progressBar, seekThumb);

  const autoPlayVideo = useCallback(() => {
    if (videoElement.current && silent) {
      videoElement.current.muted = true;
    }
    if (!isVideoPlaying) {
      pauseVideo();
      return;
    }
    let playPromise = videoElement.current?.play();
    if (playPromise != null) {
      playPromise
        .then(() => {
          if (videoElement.current?.muted === false) {
            unMuteVideo();
          } else if (videoElement.current?.muted === true) {
            muteVideo();
          }
          playVideo();
        })
        .catch(() => {
          if (videoElement.current) {
            videoElement.current.poster = props.imgsrc;
          }
        });
    }
  }, [muteVideo, unMuteVideo, playVideo, silent, isVideoPlaying, pauseVideo]);

  const cleanUp = (st: any) => {
    return st
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };
  const handleShareClick = (title, url) => {
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((error) => console.error("Error sharing:", error));
    }
  };
  const parseHTML = (htmlString: any) => {
    const tagMap = {
      i: "italic",
      b: "bold",
      u: "underline",
      strong: "bold",
      em: "italic",
    };
    const regex = /<([^>\s]+)[^>]*>(.*?)<\/\1>/g;
    const elements = [];
    let lastIndex = 0;
    htmlString.replace(
      regex,
      (match: any, tag: any, content: any, offset: any) => {
        elements.push(htmlString.substring(lastIndex, offset));

        if (tagMap[tag]) {
          elements.push(
            <span style={{ fontStyle: tagMap[tag] }}>{content}</span>
          );
        } else {
          elements.push(content);
        }
        lastIndex = offset + match.length;
        return match;
      }
    );
    if (lastIndex < htmlString.length) {
      elements.push(htmlString.substring(lastIndex));
    }
    return elements;
  };
  const handleCardClick = (event) => {
    if (window.innerWidth <= 560) {
      setClicked(true);
      event.stopPropagation();

      const swiperSlideActive = event.target.closest(".swiper-slide-active");
      if (swiperSlideActive) {
        swiperSlideActive.classList.toggle("js_seek-vis-sec");
        const bepSlLi = swiperSlideActive.querySelector(".BepSl_li");
        if (bepSlLi && bepSlLi.classList.contains("js_seek-vis-sec")) {
          bepSlLi.classList.add("js_swp-vis");
          bepSlLi.classList.remove("js_seek-vis-sec");
        } else {
          swiperSlideActive.classList.remove("js_swp-vis");
        }

        if (bepSlLi && bepSlLi.classList.contains("js_swp-vis")) {
          bepSlLi.classList.toggle("js_seek-vis");
        } else {
          //   swiperSlideActive.classList.remove('js_seek-vis');
        }
      }
    }
  };

  const CopyLink = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {})
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };
  const onEmailShare = () => {
    const emailSubject = encodeURIComponent(props.title);
    const emailBody = getUrl;

    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };
  const sendToBeeps = () => {
    window.location.href = "https://www.ndtv.com/video/list/category/beeps";
  };
  useEffect(() => {
    const originUrl = window.location.origin;
    const dynamicPart = `${cleanUp(props.urltitle).toLowerCase()}-${
      props.videoID
    }`;
    const encodedDynamicPart = encodeURIComponent(dynamicPart);
    const currentUrl = `${originUrl}/videos/${encodedDynamicPart}`;
    setGetUrl(currentUrl);
  }, [props.urltitle, props.videoID]);

  useEffect(() => {
    if (mySwiper) {
      if (mySwiper.realIndex === 0 && mySwiper.realIndex === props.index) {
        if (urlupdate) {
          let newUrl: string;
          const autoStartEv = "true";
          document.title = props.title;
          const urltitle = cleanUp(props.urltitle).toLowerCase();
          const videoID = props.videoID;
          const catName = props?.catName;
          autoPlayVideo();
          if (catName) {
            newUrl = `${BASEPATH}/videos/${catName}/${urltitle}-${videoID}`;
            window.history.pushState({}, "", newUrl);
          } else {
            newUrl = `${BASEPATH}/videos/${urltitle}-${videoID}`;
            window.history.pushState({}, "", newUrl);
          }
          // trackPageView(newUrl)
          trackVideoPageView(newUrl, autoStartEv, props);
        }
      }
    }
  }, [
    mySwiper,
    props.index,
    urlupdate,
    autoPlayVideo,
    props.urltitle,
    props.videoID,
    props.catName,
    props.title,
  ]);
  const handleSlide = useCallback(() => {
    if (urlupdate) {
      let newUrl: string;
      const autoStartEv = "true";
      if (silent) {
        muteVideo();
        playVideo();
      } else {
        unMuteVideo();
        playVideo();
      }
      document.title = props.title;
      const urltitle = cleanUp(props.urltitle).toLowerCase();
      const videoID = props.videoID;
      const catName = props?.catName;
      if (catName) {
        newUrl = `${BASEPATH}/videos/${catName}/${urltitle}-${videoID}`;
        window.history.pushState({}, "", newUrl);
      } else {
        newUrl = `${BASEPATH}/videos/${urltitle}-${videoID}`;
        window.history.pushState({}, "", newUrl);
      }
      trackVideoPageView(newUrl, autoStartEv, props);
    }
  }, [
    playVideo,
    props.videoID,
    urlupdate,
    props.title,
    props.catName,
    props.urltitle,
    silent,
    muteVideo,
    unMuteVideo,
  ]);
  useEffect(() => {
    if (mySwiper) {
      mySwiper.on("slideChange", () => {
        if (mySwiper.realIndex === props.index) {
          handleSlide();
        } else {
          pauseVideo();
        }
      });
    }
  }, [mySwiper, props.index, handleSlide, pauseVideo]);
  return (
    <>
      <div
        className="swiper-slide BepSl_li"
        ref={props.index === props.data.length - 4 ? props.ref1 : null}
      >
        <div className="BepSl_crd-wr">
          <div className="BepSl_crd" onClick={handleCardClick}>
            <div className="VdEl_icn-wr1">
              {/* chat */}
              <div className="VdEl_icn-lk">
                <div className="VdEl_icn js-MorInf">
                  <svg className="vj_icn vj_chat">
                    <use xlinkHref="#vj_chat" />
                  </svg>
                </div>
              </div>
              {/* Share */}
              <div className="VdEl_icn-lk">
                <div className="VdEl_icn">
                  {/* Share */}
                  <div
                    className="SSR_drp SSR_btn-sm  SSR_drp-nav-tp VdEl_shr-pp crsr_ptr"
                    onClick={(e) => {
                      if (isMobile) {
                        e.stopPropagation();
                        handleShareClick(props.title, getUrl);
                      }
                    }}
                  >
                    <a className="SSR_btn-lnk" href="javascript:void(0)">
                      <svg className="SSR_icn vj_icn vj_share2">
                        <use xlinkHref="#vj_share2"></use>
                      </svg>
                      <span className="SSR_btn-tx">Share</span>
                    </a>
                    <div className="SSR_drp-nav SSR_WEB">
                      <ul className="SSR_drp-nav-ul">
                        <li className="SSR_drp-nav-li">
                          <a
                            className="SSR_drp-nav-lnk"
                            href={`https://www.facebook.com/sharer.php?u=${getUrl}&amp;&text=${props.title}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            data-platform="facebook"
                          >
                            <svg className="vj_icn vj_facebook-fill vj_ss-icn">
                              <use xlinkHref="#vj_facebook-fill"></use>
                            </svg>
                            Facebook
                          </a>
                        </li>
                        <li className="SSR_drp-nav-li">
                          <a
                            className="SSR_drp-nav-lnk"
                            href={`https://twitter.com/intent/tweet?url=${getUrl}&amp;&text=${props.title}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            data-platform="twitter"
                          >
                            <svg className="vj_icn vj_twitter-fill vj_ss-icn">
                              <use xlinkHref="#vj_twitter-fill"></use>
                            </svg>
                            Twitter
                          </a>
                        </li>
                        <li className="SSR_drp-nav-li">
                          <a
                            className="SSR_drp-nav-lnk"
                            href={`https://api.whatsapp.com/send?text=${props.title} - ${getUrl}?via=whatsapp`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            data-platform="whatsapp"
                          >
                            <svg className="vj_icn vj_whatsapp-fill vj_ss-icn">
                              <use xlinkHref="#vj_whatsapp-fill"></use>
                            </svg>
                            Whatsapp
                          </a>
                        </li>
                        <li className="SSR_drp-nav-li">
                          <a
                            className="SSR_drp-nav-lnk"
                            href={`https://www.reddit.com/r/technology/submit?url=${getUrl}&title=${props.title}`}
                            target="_blank"
                          >
                            <svg className="vj_icn vj_reddit-fill vj_ss-icn">
                              <use xlinkHref="#vj_reddit-fill"></use>
                            </svg>
                            Reddit
                          </a>
                        </li>
                        <li className="SSR_drp-nav-li">
                          <div
                            className="SSR_drp-nav-lnk"
                            onClick={onEmailShare}
                          >
                            <svg className="vj_icn vj_email-fill vj_ss-icn">
                              <use xlinkHref="#vj_email-fill"></use>
                            </svg>
                            Email
                          </div>
                        </li>
                        <li className="SSR_drp-nav-li">
                          <div className="SSR_drp-nav-lnk" onClick={CopyLink}>
                            <svg className="vj_icn vj_copy-link vj_ss-icn">
                              <use xlinkHref="#vj_copy-link"></use>
                            </svg>
                            Copy Link
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* chat */}
              <div className="VdEl_icn-lk VdEl_icn-mr1">
                <div className="VdEl_icn ">
                  <svg className="vj_icn vj_more">
                    <use xlinkHref="#vj_more" />
                  </svg>
                </div>
                <div
                  className="VdElMr_wr VdElMr_wr1"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ul className="VdElMr_ul">
                    <li className="VdElMr_li-lk">
                      <a href="#" className="VdElMr_li">
                        Login
                      </a>
                    </li>
                    <li className="VdElMr_li-lk">
                      <a href="#" className="VdElMr_li">
                        Notification
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="BepSl_vdo-cn ">
              <div className="BepSl_vdo-wr">
                <div className="BepSl_swp-cn">
                  <div className="BepSl_swp-wr">
                    <div className="BepSl_swp-tx">Swipe up for next video</div>
                    <div className="BepSl_swp-ln" />
                  </div>
                </div>
                {/* <div> */}
                <video
                  className="BepSl_vdo"
                  src={props.vidsrc}
                  ref={videoElement}
                  onTimeUpdate={() => {
                    handleOnTimeUpdate();
                  }}
                  onLoadedMetadata={handleOnMetaLoaded}
                  muted={silent}
                  preload="auto"
                  width="100%"
                  height="100%"
                  loop
                  playsInline
                />
                {/*====== Seek bar ( Play / Pause, Time, Next Prev, Progress Bar, Related Button ) ======*/}
                <div className="VdEl_cn">
                  {/* back and volume */}
                  <div className="VdEl_top-wr">
                    <div className="VdEl_top-bck" onClick={sendToBeeps}>
                      <div className="VdEl_icn-lk">
                        <div className="VdEl_icn1">
                          <svg className="vj_icn vj_back2">
                            <use xlinkHref="#vj_back2"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="VdEl_top-vol">
                      <div className="VdEl_icn-lk">
                        <div
                          className="VdEl_icn1 VdEl_icn-vol"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {!silent && !playerState.isMuted ? (
                            <div className="VdEl_icn-vol-full">
                              <svg className="vj_icn vj_volume">
                                <use xlinkHref="#vj_volume"></use>
                              </svg>
                            </div>
                          ) : (
                            <div className="VdEl_icn-mute">
                              <svg className="vj_icn vj_mute">
                                <use xlinkHref="#vj_mute"></use>
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="VdEl_mid-wr">
                    {/*== Next Prev, Related Button ==*/}
                    <div className="VdEl_btn-wr">
                      {/* Next */}
                      <div className="VdEl_nx-pr vj-icn vj-vod-prev VdEl_ripl VdEl_ripl-lgt">
                        <svg className="vj_icn vj_re-10">
                          <use xlinkHref="#vj_re-10" />
                        </svg>
                      </div>
                      {/* Play / Pause */}
                      <div
                        className="VdEl_sk_pp-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          // console.log("toggle play exec------->");
                          togglePlay();
                        }}
                      >
                        <div className="VdEl_sk_pp VdEl_ripl-lgt">
                          {!playerState.isPlaying ? (
                            <svg className="VdEl_sk_pp-ic1 vj_icn vj_play">
                              <use xlinkHref="#vj_play1" />
                            </svg>
                          ) : (
                            <svg className="VdEl_sk_pp-ic2 vj_icn vj_pause">
                              <use xlinkHref="#vj_pause1" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {/* Prev */}
                      <div className="VdEl_nx-pr vj-icn vj-vod-next VdEl_ripl VdEl_ripl-lgt">
                        <svg className="vj_icn vj_fw-10">
                          <use xlinkHref="#vj_fw-10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="VdEl_lod-rw">
                    <div className="VdEl_lod-cl">
                      <div className="VdEl_inf-wr">
                        <div className="VdEl_inf">
                          {/* {props.title} */}
                          {parseHTML(props.title)}
                        </div>
                        {/* <div class="VdEl_inf-mr">more</div> */}
                      </div>
                      <div className="VdEl_icn-wr">
                        {/* chat */}
                        <div className="VdEl_icn-lk">
                          <div className="VdEl_icn js-MorInf">
                            <svg className="vj_icn vj_chat">
                              <use xlinkHref="#vj_chat"></use>
                            </svg>
                          </div>
                        </div>
                        {/* Share */}
                        <div className="VdEl_icn-lk">
                          <div className="VdEl_icn">
                            {/* Share */}
                            <div
                              className="SSR_drp SSR_btn-sm  SSR_drp-nav-tp VdEl_shr-pp crsr_ptr"
                              onClick={(e) => {
                                if (isMobile) {
                                  e.stopPropagation();
                                  handleShareClick(props.title, getUrl);
                                }
                              }}
                            >
                              <a
                                className="SSR_btn-lnk"
                                href="javascript:void(0)"
                              >
                                <svg className="SSR_icn vj_icn vj_share2">
                                  <use xlinkHref="#vj_share2"></use>
                                </svg>
                                <span className="SSR_btn-tx">Share</span>
                              </a>
                              <div className="SSR_drp-nav SSR_WEB">
                                <ul className="SSR_drp-nav-ul">
                                  <li className="SSR_drp-nav-li">
                                    <a
                                      className="SSR_drp-nav-lnk"
                                      href={`https://www.facebook.com/sharer.php?u=${getUrl}&amp;&text=${props.title}`}
                                      target="_blank"
                                      rel="noopener noreferrer nofollow"
                                      data-platform="facebook"
                                    >
                                      <svg className="vj_icn vj_facebook-fill vj_ss-icn">
                                        <use xlinkHref="#vj_facebook-fill"></use>
                                      </svg>
                                      Facebook
                                    </a>
                                  </li>
                                  <li className="SSR_drp-nav-li">
                                    <a
                                      className="SSR_drp-nav-lnk"
                                      href={`https://twitter.com/intent/tweet?url=${getUrl}&amp;&text=${props.title}`}
                                      target="_blank"
                                      rel="noopener noreferrer nofollow"
                                      data-platform="twitter"
                                    >
                                      <svg className="vj_icn vj_twitter-fill vj_ss-icn">
                                        <use xlinkHref="#vj_twitter-fill"></use>
                                      </svg>
                                      Twitter
                                    </a>
                                  </li>
                                  <li className="SSR_drp-nav-li">
                                    <a
                                      className="SSR_drp-nav-lnk"
                                      href={`https://api.whatsapp.com/send?text=${props.title} - ${getUrl}?via=whatsapp`}
                                      target="_blank"
                                      rel="noopener noreferrer nofollow"
                                      data-platform="whatsapp"
                                    >
                                      <svg className="vj_icn vj_whatsapp-fill vj_ss-icn">
                                        <use xlinkHref="#vj_whatsapp-fill"></use>
                                      </svg>
                                      Whatsapp
                                    </a>
                                  </li>
                                  <li className="SSR_drp-nav-li">
                                    <a
                                      className="SSR_drp-nav-lnk"
                                      href={`https://www.reddit.com/r/technology/submit?url=${getUrl}&title=${props.title}`}
                                    >
                                      <svg className="vj_icn vj_reddit-fill vj_ss-icn">
                                        <use xlinkHref="#vj_reddit-fill"></use>
                                      </svg>
                                      Reddit
                                    </a>
                                  </li>
                                  <li className="SSR_drp-nav-li">
                                    <div
                                      className="SSR_drp-nav-lnk"
                                      onClick={onEmailShare}
                                    >
                                      <svg className="vj_icn vj_email-fill vj_ss-icn">
                                        <use xlinkHref="#vj_email-fill"></use>
                                      </svg>
                                      Email
                                    </div>
                                  </li>
                                  <li className="SSR_drp-nav-li">
                                    <div
                                      className="SSR_drp-nav-lnk"
                                      onClick={CopyLink}
                                    >
                                      <svg className="vj_icn vj_copy-link vj_ss-icn">
                                        <use xlinkHref="#vj_copy-link"></use>
                                      </svg>
                                      Copy Link
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* chat */}
                        <div className="VdEl_icn-lk">
                          <div className="VdEl_icn VdEl_icn-mr">
                            <svg className="vj_icn vj_more">
                              <use xlinkHref="#vj_more"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="VdEl_lod-cl">
                      {/*==  Time, Progress Bar  ==*/}
                      <div className="VdEl_lod-cn">
                        {/* Progress Bar */}
                        <div className="VdEl_lod-wrp">
                          <div
                            style={{ padding: "4px 0", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoProgress(e);
                              handleOnTimeUpdate();
                            }}
                            {...(isMobile
                              ? {
                                  onTouchStart: (e) => {
                                    setIsDragging(true);
                                  },
                                  onTouchMove: (e) => {
                                    if (isDragging == true) {
                                      onSliderMove(e);
                                      handleVideoProgress(e);
                                    }
                                  },
                                  onTouchEnd: (e) => {
                                    setIsDragging(false);
                                  },
                                }
                              : {
                                  onMouseDown: (e) => {
                                    setIsDragging(true);
                                  },

                                  onMouseMove: (e) => {
                                    if (isDragging == true) {
                                      onSliderMove(e);
                                      handleVideoProgress(e);
                                    }
                                  },
                                  onMouseUp: (e) => {
                                    setIsDragging(false);
                                  },
                                })}
                          >
                            <div className="VdEl_lod crsr_ptr" ref={seekBar}>
                              <div
                                className="VdEl_lod-br"
                                ref={progressBar}
                                onMouseDown={() => {}}
                                onMouseUp={() => {}}
                              >
                                <div className="VdEl_dot" ref={seekThumb}></div>
                              </div>
                            </div>
                          </div>
                          {/* Time */}
                          <div className="VdEl_sk-tm">
                            {formatTime(videoElement.current?.currentTime)} /
                            {formatTime(videoElement.current?.duration)}
                          </div>
                        </div>
                        {/* ! Play / Pause */}
                        {/* <div class="VdEl_ic-exp-cn">
                                                                                <div class="VdEl_ic-exp-wr">
                                                                                    <svg
                                                                                        class="VdEl_ic-exp VdEl_ic-exp1 vj_icn vj_vod-vr-full">
                                                                                        <use xlink:href="#vj_vod-vr-full">
                                                                                        </use>
                                                                                    </svg>
                                                                                    <svg
                                                                                        class="VdEl_ic-exp VdEl_ic-exp2 vj_icn vj_vod-vr-fsc">
                                                                                        <use xlink:href="#vj_vod-vr-fsc">
                                                                                        </use>
                                                                                    </svg>
                                                                                </div>
                                                                            </div> */}
                      </div>
                    </div>
                  </div>
                  {/* VOD More Overlay and  */}
                  <div
                    className="VdElMr_wr"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ul className="VdElMr_ul">
                      <li className="VdElMr_li-lk">
                        <a href="#" className="VdElMr_li">
                          Login
                        </a>
                      </li>
                      <li className="VdElMr_li-lk">
                        <a href="#" className="VdElMr_li">
                          Notification
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="VdElMr_ovrly" />
                  {/* VOD Share Overlay */}
                  <div className="VdEl_ovl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSlide;
