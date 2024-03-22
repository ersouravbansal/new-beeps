import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { BASEPATH } from "~/constants";
import useEnvStore from "~/stores/env_variables";
import useStore from "~/stores/utilstore";

const SideNavigation = () => {
  const basepath = useEnvStore((state) => state.basePath);
  const notificationAllowed = useStore((state) => state.notificationAllowed);
  const setNotificationAllowed = useStore(
    (state) => state.setNotificationAllowed
  );
  const khabarlink = `${BASEPATH}/category/khabar`;
  const khabarlinkEnglish = `${BASEPATH}/category/news`;
  const [isEng, setIsEng] = useState(true);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrors(" Please enter some text to search!");
      return;
    }
    setErrors("");
    window.location.href = `${basepath}/search/?q=` + query;
  };

  return (
    <>
      {/*======[ Side Navigation ]======*/}
      <div className="sid-nav">
        <div className="sid-nav-wrp">
          <div className="m-nv m-nv_clr snv_cn-hed">
            {" "}
            <a className="sid-nav-cls" href="javascript:void(0);">
              <svg className="snv_cn-icn  vj_icn vj_close">
                <use xlinkHref="#vj_close" />
              </svg>
            </a>
            {/* Right Icons Live Tv, Notification and Search */}
            <div className="fleft">
              {/*== Language dropdown icon==*/}
              <div className="tp_lng drp-trigger dd-nav_two">
                <div className="tp_lng-ttl drp-lnk">
                  <span className="brw-nav_wrp">
                    {isEng ? "English" : "हिंदी"}
                    <svg className="sub-nav_drp-icn vj_icn vj_arrow-down">
                      <use xlinkHref="#vj_arrow-down" />
                    </svg>
                  </span>
                </div>
                {/* Language dropdown content */}
                <div className="dd-nav">
                  <ul className="dd-nav_ul vjl-md-12">
                    <li className="drp_mnu-li drp_mnu-ttl">Select Languages</li>
                    {isEng ? (
                      <li className="dd-nav_li">
                        <Link
                          className="m-nv_lnk"
                          to={khabarlink}
                          onClick={() => {
                            setIsEng(false);
                            document.body.classList.remove("js_sid-nav");
                          }}
                        >
                          हिंदी | Hindi
                        </Link>
                      </li>
                    ) : (
                      <li className="dd-nav_li">
                        <Link
                          className="m-nv_lnk"
                          to={khabarlinkEnglish}
                          onClick={() => {
                            setIsEng(true);
                            document.body.classList.remove("js_sid-nav");
                          }}
                        >
                          English
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {/* Bookmark */}
              <span className="t-icn-nv ttp">
                <svg className="vj_icn vj_bookmark-outline">
                  <use xlinkHref="#vj_bookmark-outline" />
                </svg>
                <div className="tip on-bottom">
                  <div className="tip_wrp">Bookmark</div>
                </div>
              </span>
              {/* Login / Signup */}
              <span className="t-icn-nv ttp __log_trigger">
                <svg className="vj_icn vj_login">
                  <use xlinkHref="#vj_login" />
                </svg>
                <div className="tip on-bottom">
                  <div className="tip_wrp">Login/Signup</div>
                </div>
              </span>
              {/* Notification Icon */}
              <span className="t-icn-nv t-icn-nt ttp">
                <svg className="vj_icn vj_bell bell">
                  <use xlinkHref="#vj_bell" />
                </svg>
                <div className="tip on-bottom">
                  {!notificationAllowed ? (
                    <div className="tip_wrp crsr_ptr">
                      News alerts are turned off.{" "}
                      <div
                        className="ttp-lnk"
                        onClick={() => {
                          setNotificationAllowed(true);
                          window.__showSubscribePopup();
                        }}
                      >
                        Click here to turn on.
                      </div>
                    </div>
                  ) : (
                    <div className="tip_wrp crsr_ptr">
                      You Have Subscribed To Our News Updates.
                      <div
                        className="ttp-lnk"
                        onClick={() => {
                          setNotificationAllowed(false);
                          window.__alw(0);
                        }}
                      >
                        To Unsubscribe
                      </div>
                    </div>
                  )}
                </div>
              </span>
            </div>
          </div>
          <div className="sid-nav_wrp">
            {/* Search Tittle */}
            <div className="sid-nav_li sid-nav_li-ttl">Search</div>
            {/* Search Field */}
            <form className="srh_inp-wrp" name="search" onSubmit={handleSearch}>
              {" "}
              <span className="srh_inp-icn">
                <svg className="vj_icn vj_search">
                  <use xlinkHref="#vj_search" />
                </svg>
              </span>
              <input
                className="srh_inp"
                type="text"
                placeholder="Videos, Latest..."
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
              />
              {errors && (
                <p
                  className="errors form_errs"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  * {errors}
                </p>
              )}
              <button
                type="submit"
                id="form-submit"
                className="srh_inp-btn"
                style={{ bottom: "40px" }}
              >
                <svg className="vj_icn vj_arrow-next">
                  <use xlinkHref="#vj_arrow-next" />
                </svg>
              </button>
            </form>
            {/* Main Nav */}
            <ul className="sid-nav_ul">
              <li className="snv-two">
                <div className="sid-nav_li sid-nav_li-ttl">News Updates </div>
                <ul className="snv_cn-ul">
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/coronavirus#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_coronavirus">
                          <use xlinkHref="#vj_coronavirus" />
                        </svg>
                      </div>{" "}
                      Coronavirus
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/video/live/channel/ndtv24x7#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_live-tv">
                          <use xlinkHref="#vj_live-tv" />
                        </svg>
                      </div>{" "}
                      Live TV
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/latest#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_latest">
                          <use xlinkHref="#vj_latest" />
                        </svg>
                      </div>{" "}
                      Latest
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/india#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_india">
                          <use xlinkHref="#vj_india" />
                        </svg>
                      </div>{" "}
                      India
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/entertainment#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_movies">
                          <use xlinkHref="#vj_movies" />
                        </svg>
                      </div>{" "}
                      Movies
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/offbeat#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_offbeat">
                          <use xlinkHref="#vj_offbeat" />
                        </svg>
                      </div>{" "}
                      Offbeat
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://www.ndtv.com/video#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_videos">
                          <use xlinkHref="#vj_videos" />
                        </svg>
                      </div>{" "}
                      Video
                    </a>{" "}
                  </li>
                  <li className="snv_cn-li">
                    {" "}
                    <a
                      className="snv_cn-lnk ripple"
                      href="https://sports.ndtv.com/cricket#pfrom=home-ndtv_nav"
                    >
                      <div className="snv_ic-wrp">
                        <svg className="vj_icn vj_cricket">
                          <use xlinkHref="#vj_cricket" />
                        </svg>
                      </div>{" "}
                      Cricket
                    </a>{" "}
                  </li>
                </ul>
              </li>
              <li className="snv-two">
                <div className="sid-nav_li sid-nav_li-ttl">Featured</div>{" "}
                {/* Sub Nav */}
                <div className="snv_cn-ul">
                  <ul className="sid-nav_sub">
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://gadgets360.com#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_gadgets">
                            <use xlinkHref="#vj_gadgets" />
                          </svg>
                        </div>{" "}
                        Gadgets{/*span class="snv_cn-tg">Sale</span*/}
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/shopping#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_shopping-icon">
                            <use xlinkHref="#vj_shopping-icon" />
                          </svg>
                        </div>{" "}
                        Shopping{/*<span class="snv_cn-tg">Sale</span>*/}
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/webstories#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_amp-stories">
                            <use xlinkHref="#vj_amp-stories" />
                          </svg>
                        </div>{" "}
                        Web Stories {/*<span class="snv_cn-tg">NEW</span>*/}
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/business/cryptocurrency#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_crypto">
                            <use xlinkHref="#vj_crypto" />
                          </svg>
                        </div>{" "}
                        Crypto <span className="snv_cn-tg">NEW</span>
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </li>
              <li className="snv-two">
                <div className="sid-nav_li sid-nav_li-ttl"> More Links </div>
                <div className="snv-hrsrl">
                  <ul className="snv_cn-ul">
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.carandbike.com#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_auto">
                            <use xlinkHref="#vj_auto" />
                          </svg>
                        </div>{" "}
                        Auto
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/world-news#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_world_web">
                            <use xlinkHref="#vj_world_web" />
                          </svg>
                        </div>{" "}
                        World
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/cities#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_cities">
                            <use xlinkHref="#vj_cities" />
                          </svg>
                        </div>{" "}
                        Cities
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/south#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_south">
                            <use xlinkHref="#vj_south" />
                          </svg>
                        </div>{" "}
                        South
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/opinion#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_opinion">
                            <use xlinkHref="#vj_opinion" />
                          </svg>
                        </div>{" "}
                        Opinion
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/notifications#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_notification">
                            <use xlinkHref="#vj_notification" />
                          </svg>
                        </div>{" "}
                        Notification
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/business#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_business">
                            <use xlinkHref="#vj_business" />
                          </svg>
                        </div>{" "}
                        Business
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://food.ndtv.com#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_food">
                            <use xlinkHref="#vj_food" />
                          </svg>
                        </div>{" "}
                        Food
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://doctor.ndtv.com/#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_doctor">
                            <use xlinkHref="#vj_doctor" />
                          </svg>
                        </div>{" "}
                        Doctor NDTV
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/education#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_study">
                            <use xlinkHref="#vj_study" />
                          </svg>
                        </div>{" "}
                        Education
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/science#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_earth">
                            <use xlinkHref="#vj_earth" />
                          </svg>
                        </div>{" "}
                        Science
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://swirlster.ndtv.com/#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_swirlster">
                            <use xlinkHref="#vj_swirlster" />
                          </svg>
                        </div>{" "}
                        Swirlster
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/photos#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_photos">
                            <use xlinkHref="#vj_photos" />
                          </svg>
                        </div>{" "}
                        Photos
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://sports.ndtv.com#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_sports">
                            <use xlinkHref="#vj_sports" />
                          </svg>
                        </div>{" "}
                        Sports
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/people#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_people">
                            <use xlinkHref="#vj_people" />
                          </svg>
                        </div>{" "}
                        People
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://social.ndtv.com/static/Weather/report#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_weather">
                            <use xlinkHref="#vj_weather" />
                          </svg>
                        </div>{" "}
                        Weather
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/tv-schedule#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_tv-schedule">
                            <use xlinkHref="#vj_tv-schedule" />
                          </svg>
                        </div>{" "}
                        TV Schedule
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.ndtv.com/indian-railway#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_trains">
                            <use xlinkHref="#vj_trains" />
                          </svg>
                        </div>{" "}
                        Trains
                      </a>{" "}
                    </li>
                    <li className="snv_cn-li">
                      {" "}
                      <a
                        className="snv_cn-lnk ripple"
                        href="https://www.mojarto.com#pfrom=home-ndtv_nav"
                      >
                        <div className="snv_ic-wrp">
                          <svg className="vj_icn vj_art">
                            <use xlinkHref="#vj_art" />
                          </svg>
                        </div>{" "}
                        Art
                      </a>{" "}
                    </li>
                    <li className="snv-two">
                      <div className="sid-nav_li sid-nav_li-ttl">
                        Follow Us On
                      </div>
                      <ul className="snv_cn-ul">
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://www.facebook.com/ndtv"
                            target="_blank"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-facebook">
                                <use xlinkHref="#vj_SN-facebook" />
                              </svg>
                            </div>{" "}
                            Facebook
                          </a>
                        </li>
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://twitter.com/ndtv"
                            target="_blank"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-twitter">
                                <use xlinkHref="#vj_SN-twitter" />
                              </svg>
                            </div>{" "}
                            Twitter
                          </a>
                        </li>
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://www.instagram.com/ndtv/?hl=en"
                            target="_blank"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-insta">
                                <use xlinkHref="#vj_SN-insta" />
                              </svg>
                            </div>{" "}
                            Instagram
                          </a>
                        </li>
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://www.linkedin.com/company/ndtv"
                            target="_blank"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-linkedin">
                                <use xlinkHref="#vj_SN-linkedin" />
                              </svg>
                            </div>{" "}
                            Linkedin
                          </a>
                        </li>
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://www.youtube.com/user/ndtv"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-youtube">
                                <use xlinkHref="#vj_SN-youtube" />
                              </svg>
                            </div>{" "}
                            Youtube
                          </a>
                        </li>
                        <li className="snv_cn-li">
                          <a
                            className="snv_cn-lnk ripple"
                            href="https://www.kooapp.com/profile/ndtv"
                            target="_blank"
                          >
                            <div className="snv_ic-wrp">
                              <svg className="vj_icn vj_SN-koos">
                                <use xlinkHref="#vj_SN-koos" />
                              </svg>
                            </div>{" "}
                            Koo
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
