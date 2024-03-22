import { Link, Outlet, useLocation } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { CATEGORY_LIST, CATEGORY_NAME } from "./CategoryName";
import useGptSlot from "~/hooks/useGptSlot";
import useStore from "~/stores/utilstore";

const Header = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState("");
  const notificationAllowed = useStore((state) => state.notificationAllowed);
  const setNotificationAllowed = useStore(
    (state) => state.setNotificationAllowed
  );
  const gptRef = useRef();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrors(" Please enter some text to search!");
      return;
    }
    setErrors("");
    window.location.href = `/beeps/search/?q=` + query;
  };

  useGptSlot({
    path: "/6355419/Travel/Europe/France/Paris",
    size: [300, "fluid"],
    id: "gpt-ad",
  });
  return (
    <>
      {/*====== Content ( LHS, Main Content and RHS ) ======*/}
      <div className="vjl-cntr_full h-100">
        <div className="vjl-row h-100">
          {/*=== LHS ===*/}
          <div className="VdPg-Col_One VdPg-Col_P0">
            {/*====== Logo, Main Navigation & Right Icons Notification ======*/}
            <nav className="m-nv_LHS">
              <div className="vjl-cntr_full">
                <div className="vjl-row">
                  <div className="vjl-md-12">
                    {/* Button */}
                    <div className="brw-nav">
                      {/* Browse Button */}
                      <a
                        href="javascript:void(0);"
                        className="sid-nav-icn_lnk side-nav-trigger"
                        data-trigger=".nav-trigger"
                        data-class="js_sid-nav"
                      >
                        <div className="sid-nav-icn_wrp">
                          <svg className="vj_icn vj_menu">
                            <use xlinkHref="#vj_menu" />
                          </svg>
                        </div>
                      </a>
                    </div>
                    {/* Logo - Dropdown */}
                    <div className="hdr-lhs-col fleft">
                      <a className="ndtv-logo" href="home-ndtv.html">
                        <img
                          className="vj_icn vj_logo-ndtv"
                          alt=""
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzNjUgNjguOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzY1IDY4Ljk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDojRUUwMDAwO30KPC9zdHlsZT4KPGcgaWQ9IlhNTElEXzFfIj4KCTxwYXRoIGlkPSJYTUxJRF8zXyIgY2xhc3M9InN0MCIgZD0iTTAsMC4xYzguNCwwLDE2LjgtMC4xLDI1LjIsMEMzNS4yLDAuNyw0NCw3LjQsNDguOCwxNmM0LjgsOS4xLDksMTguNSwxMy45LDI3LjUKCQljMS42LDMuMiw0LjgsNS40LDguNCw1LjVDNzAuOSwzMi43LDcxLDE2LjQsNzEsMGM3LjQsMC4xLDE0LjcsMCwyMi4xLDBjMCw3LjEsMCwxNC4yLTAuMSwyMS40Yy01LjEsMi05LjQsNi41LTkuNSwxMi4yCgkJYy0wLjcsNi4yLDMuOSwxMS44LDkuNSwxMy43YzAuMSw3LjIsMCwxNC4zLDAuMSwyMS41Yy03LjMsMC4xLTE0LjcsMC0yMiwwLjFjLTguNSwwLjQtMTYuOS0zLjUtMjIuMy05LjkKCQljLTYtNy4zLTkuMS0xNi41LTEzLjYtMjQuNkMzMi4xLDI4LjYsMjkuOSwyMCwyMiwxOS43YzAsMTYuNC0wLjEsMzIuNywwLjEsNDkuMWMtNy40LDAuMS0xNC43LDAuMS0yMi4xLDBDMC4xLDQ1LjksMC4xLDIzLDAsMC4xeiIKCQkvPgoJPHBhdGggaWQ9IlhNTElEXzZfIiBjbGFzcz0ic3QwIiBkPSJNOTkuNiwwLjFjNjIuNCwwLDEyNC43LTAuMiwxODcuMSwwLjFjOS4zLDE2LjksMTguOCwzMy43LDI4LDUwLjZjOS4yLTE2LjgsMTcuNy0zNCwyNi44LTUwLjgKCQljNy44LDAuMSwxNS42LTAuMSwyMy41LDAuMmMtMS4zLDEuOS0yLjYsMy44LTMuNyw1LjhjLTExLDIxLTIyLjEsNDEuOS0zMy4yLDYyLjhjLTguOSwwLTE3LjksMC0yNi44LDAKCQljLTkuNy0xNy41LTE5LjYtMzUtMjkuMi01Mi41Yy05LjgtMC4xLTE5LjcsMC0yOS41LDBjMCwxNy41LDAuMSwzNSwwLDUyLjVjLTcuMSwwLTE0LjEsMC0yMS4yLDBjMC0xNy41LDAuMS0zNSwwLTUyLjYKCQljLTEwLjgsMC4xLTIxLjcsMC0zMi41LDAuMWMyLDcuNSwxLjgsMTUuMywxLjUsMjNjLTAuMyw3LjgtMi40LDE2LjItOC4yLDIxLjhjLTUuNiw1LjgtMTQsNy44LTIxLjgsNy43CgkJYy0yMC4yLTAuMS00MC40LDAuMS02MC41LTAuMWMwLjEtNy4yLDAtMTQuMywwLjEtMjEuNGM0LjgtMS45LDguOS01LjgsOS40LTExLjJjMS02LjUtMy41LTEyLjYtOS40LTE0LjcKCQlDOTkuNiwxNC4zLDk5LjgsNy4yLDk5LjYsMC4xIE0xMjEuMSwxNi41YzAuMiwxMiwwLjEsMjMuOSwwLjEsMzUuOWMxMi4xLDAuMiwyNC4yLDAuMSwzNi4yLDAuMWM0LjcsMC4yLDEwLjMtMi40LDExLTcuNgoJCWMwLjQtNi43LDAuMy0xMy40LDAuMS0yMC4xYy0wLjUtNS40LTYuMS04LjQtMTEuMS04LjNDMTQ1LjMsMTYuMywxMzMuMiwxNi4yLDEyMS4xLDE2LjV6Ii8+Cgk8cGF0aCBpZD0iWE1MSURfN18iIGNsYXNzPSJzdDEiIGQ9Ik04My41LDMzLjZjMC4xLTUuNyw0LjQtMTAuMyw5LjUtMTIuMmMyLjItMC4yLDQuNS0wLjIsNi43LDBjNS45LDIuMiwxMC40LDguMiw5LjQsMTQuNwoJCWMtMC40LDUuMy00LjYsOS4zLTkuNCwxMS4yYy0yLjIsMC4yLTQuNSwwLjItNi43LDBDODcuNCw0NS40LDgyLjgsMzkuOSw4My41LDMzLjZ6Ii8+CjwvZz4KPC9zdmc+Cg=="
                        />
                      </a>
                      {/*== Language dropdown icon==*/}
                      {/* <div
                        className="tp_lng side-nav-trigger"
                        data-trigger=".nav-trigger"
                        data-class="js_SchLng"
                      >
                        <div className="tp_lng-ttl Lng_swt drp-lnk">
                          <svg className="vj_icn vj_lang-toggle">
                            <use xlinkHref="#vj_lang-toggle" />
                          </svg>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="VdPg-cat_wrp">
              <div className="VdPg-LfNav">
                <div className="VdPg-LfNav_cnt">
                  <a href="video-home.html" className="VdPg-LfNav_tl">
                    Videos
                  </a>
                  <div className="VdPg-LfNav_wr">
                    <ul className="VdPg-LfNav_ul">
                      {/* <li className="VdPg-LfNav_li">
                        <a href="video-list.html" className="VdPg-LfNav_lnk">
                          <svg className="vj_icn vj_star">
                            <use xlinkHref="#vj_star" />
                          </svg>{" "}
                          Latest videos
                        </a>
                      </li> */}
                      {CATEGORY_LIST().map((category) => (
                        <li key={category.title} className="VdPg-LfNav_li">
                          <Link to={category.link} className={`VdPg-LfNav_lnk`}>
                            {/* Add any additional icons or styles as needed */}
                            {category.title}
                          </Link>
                        </li>
                      ))}
                      {/* <li className="VdPg-LfNav_li">
                        <a href="video-list.html" className="VdPg-LfNav_lnk">
                          <svg className="vj_icn vj_zap">
                            <use xlinkHref="#vj_zap" />
                          </svg>{" "}
                          Top videos
                        </a>
                      </li>
                      <li className="VdPg-LfNav_li">
                        <a
                          href="video-categories-list.html"
                          className="VdPg-LfNav_lnk VdPg-LfNav_lnk-act"
                        >
                          <svg className="vj_icn vj_grid">
                            <use xlinkHref="#vj_grid" />
                          </svg>{" "}
                          Categories
                        </a>
                      </li>
                      <li className="VdPg-LfNav_li">
                        <a
                          href="video-live-video.html"
                          className="VdPg-LfNav_lnk"
                        >
                          <svg className="vj_icn vj_tv">
                            <use xlinkHref="#vj_tv" />
                          </svg>{" "}
                          Channels
                        </a>
                      </li>
                      <li className="VdPg-LfNav_li">
                        <a
                          href="video-show-list.html"
                          className="VdPg-LfNav_lnk"
                        >
                          <svg className="vj_icn vj_youtube">
                            <use xlinkHref="#vj_youtube" />
                          </svg>{" "}
                          Shows
                        </a>
                      </li>
                      <li className="VdPg-LfNav_li">
                        <a href="video-list.html" className="VdPg-LfNav_lnk">
                          <svg className="vj_icn vj_film">
                            <use xlinkHref="#vj_film" />
                          </svg>{" "}
                          NDTV Classics
                        </a>
                      </li>
                      <li className="VdPg-LfNav_li">
                        <a href="video-list.html" className="VdPg-LfNav_lnk">
                          <svg className="vj_icn vj_video-shot">
                            <use xlinkHref="#vj_video-shot" />
                          </svg>{" "}
                          Shot on Samsung
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
                {/* placeholder image */}
              </div>
              {/*=== Advertisement ===*/}
              <a className="ads-wrp" href="#">
                <span className="ads-wrp_txt">Advertisement</span>
                <div id="gpt-ad"></div>
                {/* <img
                  src="https://s0.2mdn.net/simgad/1116328456205855164"
                  border={0}
                  width={300}
                  alt=""
                  className="img_ad"
                /> */}
              </a>
            </div>
          </div>
          {/*=== Middle ===*/}
          <div
            className="VdPg-Col_Two VdPg-Col_P0"
            style={{ position: "fixed", right: 0, top: 0 }}
          >
            {/*====== Logo, Main Navigation & Right Icons Live Tv, Notification and Search ======*/}
            <nav className="m-nv m-nv_clr m-nv_out">
              <div className="vjl-cntr_full">
                <div className="vjl-row">
                  <div className="vjl-md-12">
                    <nav className="Mb-Nav">
                      {/* Menu icon */}
                      <div className="brw-nav">
                        {/* Browse Button */}
                        <a
                          href="javascript:void(0);"
                          className="sid-nav-icn_lnk side-nav-trigger"
                          data-trigger=".nav-trigger"
                          data-class="js_sid-nav"
                        >
                          <div className="sid-nav-icn_wrp">
                            <svg className="vj_icn vj_menu">
                              <use xlinkHref="#vj_menu" />
                            </svg>
                          </div>
                        </a>
                      </div>
                      {/* Logo - Dropdown */}
                      <div className="hdr-lhs-col fleft">
                        <a className="ndtv-logo" href="home-ndtv.html">
                          <img
                            className="vj_icn vj_logo-ndtv"
                            alt=""
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzNjUgNjguOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzY1IDY4Ljk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDojRUUwMDAwO30KPC9zdHlsZT4KPGcgaWQ9IlhNTElEXzFfIj4KCTxwYXRoIGlkPSJYTUxJRF8zXyIgY2xhc3M9InN0MCIgZD0iTTAsMC4xYzguNCwwLDE2LjgtMC4xLDI1LjIsMEMzNS4yLDAuNyw0NCw3LjQsNDguOCwxNmM0LjgsOS4xLDksMTguNSwxMy45LDI3LjUKCQljMS42LDMuMiw0LjgsNS40LDguNCw1LjVDNzAuOSwzMi43LDcxLDE2LjQsNzEsMGM3LjQsMC4xLDE0LjcsMCwyMi4xLDBjMCw3LjEsMCwxNC4yLTAuMSwyMS40Yy01LjEsMi05LjQsNi41LTkuNSwxMi4yCgkJYy0wLjcsNi4yLDMuOSwxMS44LDkuNSwxMy43YzAuMSw3LjIsMCwxNC4zLDAuMSwyMS41Yy03LjMsMC4xLTE0LjcsMC0yMiwwLjFjLTguNSwwLjQtMTYuOS0zLjUtMjIuMy05LjkKCQljLTYtNy4zLTkuMS0xNi41LTEzLjYtMjQuNkMzMi4xLDI4LjYsMjkuOSwyMCwyMiwxOS43YzAsMTYuNC0wLjEsMzIuNywwLjEsNDkuMWMtNy40LDAuMS0xNC43LDAuMS0yMi4xLDBDMC4xLDQ1LjksMC4xLDIzLDAsMC4xeiIKCQkvPgoJPHBhdGggaWQ9IlhNTElEXzZfIiBjbGFzcz0ic3QwIiBkPSJNOTkuNiwwLjFjNjIuNCwwLDEyNC43LTAuMiwxODcuMSwwLjFjOS4zLDE2LjksMTguOCwzMy43LDI4LDUwLjZjOS4yLTE2LjgsMTcuNy0zNCwyNi44LTUwLjgKCQljNy44LDAuMSwxNS42LTAuMSwyMy41LDAuMmMtMS4zLDEuOS0yLjYsMy44LTMuNyw1LjhjLTExLDIxLTIyLjEsNDEuOS0zMy4yLDYyLjhjLTguOSwwLTE3LjksMC0yNi44LDAKCQljLTkuNy0xNy41LTE5LjYtMzUtMjkuMi01Mi41Yy05LjgtMC4xLTE5LjcsMC0yOS41LDBjMCwxNy41LDAuMSwzNSwwLDUyLjVjLTcuMSwwLTE0LjEsMC0yMS4yLDBjMC0xNy41LDAuMS0zNSwwLTUyLjYKCQljLTEwLjgsMC4xLTIxLjcsMC0zMi41LDAuMWMyLDcuNSwxLjgsMTUuMywxLjUsMjNjLTAuMyw3LjgtMi40LDE2LjItOC4yLDIxLjhjLTUuNiw1LjgtMTQsNy44LTIxLjgsNy43CgkJYy0yMC4yLTAuMS00MC40LDAuMS02MC41LTAuMWMwLjEtNy4yLDAtMTQuMywwLjEtMjEuNGM0LjgtMS45LDguOS01LjgsOS40LTExLjJjMS02LjUtMy41LTEyLjYtOS40LTE0LjcKCQlDOTkuNiwxNC4zLDk5LjgsNy4yLDk5LjYsMC4xIE0xMjEuMSwxNi41YzAuMiwxMiwwLjEsMjMuOSwwLjEsMzUuOWMxMi4xLDAuMiwyNC4yLDAuMSwzNi4yLDAuMWM0LjcsMC4yLDEwLjMtMi40LDExLTcuNgoJCWMwLjQtNi43LDAuMy0xMy40LDAuMS0yMC4xYy0wLjUtNS40LTYuMS04LjQtMTEuMS04LjNDMTQ1LjMsMTYuMywxMzMuMiwxNi4yLDEyMS4xLDE2LjV6Ii8+Cgk8cGF0aCBpZD0iWE1MSURfN18iIGNsYXNzPSJzdDEiIGQ9Ik04My41LDMzLjZjMC4xLTUuNyw0LjQtMTAuMyw5LjUtMTIuMmMyLjItMC4yLDQuNS0wLjIsNi43LDBjNS45LDIuMiwxMC40LDguMiw5LjQsMTQuNwoJCWMtMC40LDUuMy00LjYsOS4zLTkuNCwxMS4yYy0yLjIsMC4yLTQuNSwwLjItNi43LDBDODcuNCw0NS40LDgyLjgsMzkuOSw4My41LDMzLjZ6Ii8+CjwvZz4KPC9zdmc+Cg=="
                          />
                        </a>
                        {/*== Language dropdown icon==*/}
                        {/* <div
                          className="tp_lng side-nav-trigger"
                          data-trigger=".nav-trigger"
                          data-class="js_SchLng"
                        >
                          <div className="tp_lng-ttl Lng_swt drp-lnk">
                            <svg className="vj_icn vj_lang-toggle">
                              <use xlinkHref="#vj_lang-toggle" />
                            </svg>
                          </div>
                        </div> */}
                      </div>
                    </nav>
                    {/* Right Icons, Notification and Search */}
                    <div className="m-nv_Rt-wr">
                      {/* Login / Sign up */}
                      <div
                        className="log_btn log_btn-ac t side-nav-trigger __log_trigger"
                        data-trigger=".nav-trigger"
                        data-class="js_sid-nav-right"
                      >
                        <div className="log_btn-dt" />
                        <svg className="vj_icn vj_user">
                          <use xlinkHref="#vj_user" />
                        </svg>
                        <div className="log_btn-tx">Login</div>
                        <svg
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            width: 0,
                            height: 0,
                            overflow: "hidden",
                          }}
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <defs>
                            <symbol id="vj_user" viewBox="0 0 32 32">
                              <path d="M14.631 29.953c-0.266-0.137-0.559-0.109-0.841-0.147-1.647-0.225-3.209-0.719-4.675-1.494-2.334-1.234-4.191-2.991-5.603-5.222-0.206-0.325-0.225-0.619-0.050-0.969 1.281-2.572 3.303-4.216 6.091-4.916 0.219-0.056 0.447-0.087 0.669-0.134 0.441-0.094 0.816 0.031 1.178 0.284 1.441 1.016 3.050 1.469 4.806 1.394 1.334-0.059 2.619-0.381 3.694-1.169 0.803-0.591 1.578-0.566 2.441-0.325 2.441 0.681 4.284 2.131 5.578 4.3 0.144 0.241 0.253 0.503 0.372 0.759 0.087 0.188 0.059 0.369-0.050 0.544-2.119 3.422-5.103 5.688-9.025 6.684-0.697 0.178-1.409 0.278-2.125 0.35-0.059 0.006-0.131-0.022-0.166 0.056-0.762 0.003-1.528 0.003-2.294 0.003z"></path>
                              <path d="M15.828 16.509c-3.988-0.009-7.275-3.309-7.253-7.278 0.019-3.994 3.313-7.272 7.281-7.247 3.991 0.025 7.241 3.288 7.238 7.263 0 3.984-3.291 7.272-7.266 7.262z"></path>
                            </symbol>
                          </defs>
                        </svg>
                      </div>
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
                    {/* Top Search */}
                    <div className="TpNvSrc">
                      <form
                        className="TpNvSrc_frm"
                        name="search"
                        onSubmit={handleSearch}
                      >
                        {" "}
                        <span className="TpNvSrc_icn">
                          <svg className="vj_icn vj_search">
                            <use xlinkHref="#vj_search" />
                          </svg>
                        </span>
                        <input
                          className="TpNvSrc_inp"
                          type="text"
                          placeholder="Videos, Latest..."
                          autoComplete="off"
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          id="form-submit"
                          className="TpNvSrc_btn"
                        >
                          <svg className="vj_icn vj_arrow-next">
                            <use xlinkHref="#vj_arrow-next" />
                          </svg>
                        </button>
                        <div className="TpNvSrc_Tl-btn_cl">
                          <svg className="vj_icn vj_close">
                            <use xlinkHref="#vj_close" />
                          </svg>
                        </div>
                      </form>
                      {errors && (
                        <p
                          className="errors form_errs"
                          style={{ color: "red", fontSize: "14px" }}
                        >
                          * {errors}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            {/*====== Sub Navigation Widget ======*/}
            <div className="VdPg_sub-nav">
              <div className="vjl-cntr">
                <div className="vjl-row">
                  {/* Featured */}
                  <div className="vjl-md-12 m_pr-0">
                    <div className="VdPg_sub-nav_wr">
                      <div className="VdPg_sub-nav_lft">
                        <div className="VdPg_sub-nav_txt">वीडियो</div>
                        <div className="VdPg_sub-nav_arw" />
                      </div>
                      <div className="hr-scroll sub-nav_hr-scr">
                        <ul className="hr-scroll__content sub-nv_ul">
                          <li className="sub-nv_li m-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              <span className="LvVd_dot-blk" />
                              लाइव टीवीनया
                            </a>
                          </li>
                          <li className="sub-nv_li m-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              नवीनतम वीडियो
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              शीर्ष वीडियो
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              श्रेणियाँ
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk  VdPg_sub-nav_act"
                            >
                              Channels
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              Shows
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              NDTV Classics
                            </a>
                          </li>
                          <li className="sub-nv_li">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk"
                            >
                              Shot on Samsung
                            </a>
                          </li>
                          <li className="sub-nv_li m-nv_li dd-nav_one dd-nav_hvr res">
                            <a
                              href="javascript:void(0)"
                              className="VdPg_sub-nav_lnk res_sub-nav_pop"
                            >
                              जिला{" "}
                              <svg className="VdPg_sub-nav_drp-icn vj_icn vj_arrow-down">
                                <use xlinkHref="#vj_arrow-down" />
                              </svg>
                            </a>
                            <div className="dd-nav">
                              <div className="dd-nav_in dd-nav_in-two">
                                <ul className="dd-nav_ul">
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk dd-nav_ttl"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news"
                                    >
                                      मध्य प्रदेश{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/bhopal"
                                    >
                                      भोपाल{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/ujjain"
                                    >
                                      उज्जैन{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/indore"
                                    >
                                      इंदौर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/jabalpur"
                                    >
                                      जबलपुर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/gwalior"
                                    >
                                      ग्वालियर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/jabalpur"
                                    >
                                      जबलपुर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/chhindwara"
                                    >
                                      छिंदवाड़ा
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/ratlam"
                                    >
                                      रतलाम{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/khargone"
                                    >
                                      खरगौन{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/madhya-pradesh-news/guna"
                                    >
                                      गुना{" "}
                                    </a>
                                  </li>
                                </ul>
                                <ul className="dd-nav_ul">
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk dd-nav_ttl"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news"
                                    >
                                      छत्तीसगढ़
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/raipur"
                                    >
                                      रायपुर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/bilaspur"
                                    >
                                      बिलासपुर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/rajnandgaon"
                                    >
                                      राजनंदगांव{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/bastar"
                                    >
                                      बस्तर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/dantewada"
                                    >
                                      दंतेवाड़ा
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/mahasamund"
                                    >
                                      महासमुंद{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/sukma"
                                    >
                                      सुकमा{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/balrampur"
                                    >
                                      बलरामपुर{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/durg"
                                    >
                                      दुर्ग{" "}
                                    </a>
                                  </li>
                                  <li className="dd-nav_li">
                                    <a
                                      className="m-nv_lnk side-nav-trigger"
                                      href="https://mpcg.ndtv.in/chhattisgarh-news/surguja"
                                    >
                                      सरगुजा{" "}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
