import React from 'react'

const VideoSlide = ({ videourl, title }: any) => {
  return (
    <>
                      <div className="swiper-slide BepSl_li">
                    <div className="BepSl_crd-wr">
                      <div className="BepSl_crd">
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
                              <div className="SSR_drp SSR_btn-sm  SSR_drp-nav-tp VdEl_shr-pp">
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
                                        href="javascript:void(0)"
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
                                        href="javascript:void(0)"
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
                                        href="javascript:void(0)"
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
                                        href="javascript:void(0)"
                                      >
                                        <svg className="vj_icn vj_reddit-fill vj_ss-icn">
                                          <use xlinkHref="#vj_reddit-fill"></use>
                                        </svg>
                                        Reddit
                                      </a>
                                    </li>
                                    <li className="SSR_drp-nav-li">
                                      <a
                                        className="SSR_drp-nav-lnk"
                                        href="javascript:void(0)"
                                      >
                                        <svg className="vj_icn vj_email-fill vj_ss-icn">
                                          <use xlinkHref="#vj_email-fill"></use>
                                        </svg>
                                        Email
                                      </a>
                                    </li>
                                    <li className="SSR_drp-nav-li">
                                      <a
                                        className="SSR_drp-nav-lnk"
                                        href="javascript:void(0)"
                                      >
                                        <svg className="vj_icn vj_copy-link vj_ss-icn">
                                          <use xlinkHref="#vj_copy-link"></use>
                                        </svg>
                                        Copy Link
                                      </a>
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
                            <div className="VdElMr_wr VdElMr_wr1">
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
                                <div className="BepSl_swp-tx">
                                  Swipe up for next video
                                </div>
                                <div className="BepSl_swp-ln" />
                              </div>
                            </div>
                            {/* <div> */}
                            <video
                              className="BepSl_vdo"
                              src= {videourl}
                              muted
                              preload="auto"
                              width="100%"
                              height="100%"
                              playsInline
                            />
                            {/*====== Seek bar ( Play / Pause, Time, Next Prev, Progress Bar, Related Button ) ======*/}
                            <div className="VdEl_cn">
                              {/* back and volume */}
                              <div className="VdEl_top-wr">
                                <div className="VdEl_top-bck">
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
                                    <div className="VdEl_icn1 VdEl_icn-vol">
                                      <div className="VdEl_icn-vol-full">
                                        <svg className="vj_icn vj_volume">
                                          <use xlinkHref="#vj_volume"></use>
                                        </svg>
                                      </div>
                                      <div className="VdEl_icn-mute">
                                        <svg className="vj_icn vj_mute">
                                          <use xlinkHref="#vj_mute"></use>
                                        </svg>
                                      </div>
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
                                  <div className="VdEl_sk_pp-btn">
                                    <div className="VdEl_sk_pp VdEl_ripl-lgt">
                                      <svg className="VdEl_sk_pp-ic1 vj_icn vj_play">
                                        <use xlinkHref="#vj_play1" />
                                      </svg>
                                      <svg className="VdEl_sk_pp-ic2 vj_icn vj_pause">
                                        <use xlinkHref="#vj_pause1" />
                                      </svg>
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
                                      {title}
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
                                        <div className="SSR_drp SSR_btn-sm  SSR_drp-nav-tp VdEl_shr-pp">
                                          <a
                                            className="SSR_btn-lnk"
                                            href="javascript:void(0)"
                                          >
                                            <svg className="SSR_icn vj_icn vj_share2">
                                              <use xlinkHref="#vj_share2"></use>
                                            </svg>
                                            <span className="SSR_btn-tx">
                                              Share
                                            </span>
                                          </a>
                                          <div className="SSR_drp-nav SSR_WEB">
                                            <ul className="SSR_drp-nav-ul">
                                              <li className="SSR_drp-nav-li">
                                                <a
                                                  className="SSR_drp-nav-lnk"
                                                  href="javascript:void(0)"
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
                                                  href="javascript:void(0)"
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
                                                  href="javascript:void(0)"
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
                                                  href="javascript:void(0)"
                                                >
                                                  <svg className="vj_icn vj_reddit-fill vj_ss-icn">
                                                    <use xlinkHref="#vj_reddit-fill"></use>
                                                  </svg>
                                                  Reddit
                                                </a>
                                              </li>
                                              <li className="SSR_drp-nav-li">
                                                <a
                                                  className="SSR_drp-nav-lnk"
                                                  href="javascript:void(0)"
                                                >
                                                  <svg className="vj_icn vj_email-fill vj_ss-icn">
                                                    <use xlinkHref="#vj_email-fill"></use>
                                                  </svg>
                                                  Email
                                                </a>
                                              </li>
                                              <li className="SSR_drp-nav-li">
                                                <a
                                                  className="SSR_drp-nav-lnk"
                                                  href="javascript:void(0)"
                                                >
                                                  <svg className="vj_icn vj_copy-link vj_ss-icn">
                                                    <use xlinkHref="#vj_copy-link"></use>
                                                  </svg>
                                                  Copy Link
                                                </a>
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
                                      {/* Progress Bar */}
                                      <div className="VdEl_lod">
                                        <div className="VdEl_lod-br">
                                          <div className="VdEl_dot">
                                            {/* Seek thumbnails pointer events */}
                                            <div
                                              className="VdEl_tmb-cn"
                                              style={{ display: "none" }}
                                            >
                                              <span className="VdEl_tmb-wr">
                                                <span className="VdEl_tmb-in">
                                                  <span className="VdEl_tmb-im" />
                                                </span>
                                              </span>
                                              <span className="VdEl_tmb-tm">
                                                01:11
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Time */}
                                      <div className="VdEl_sk-tm">
                                        02:35/05:00
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
                              <div className="VdElMr_wr">
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
  )
}

export default VideoSlide


