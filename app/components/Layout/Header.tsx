import { Link, Outlet, useLocation } from "@remix-run/react";
import React, { useState } from "react";
import CatNav from "./CatNav";
import { isMobile } from "react-device-detect";
import MainNav from "./MainNav";
const Header = () => {
  return (
    <>
      {/*====== Content ( LHS, Main Content and RHS ) ======*/}
      <div className="vjl-cntr_full h-100">
        <div className="vjl-row h-100">
          {/*=== LHS ===*/}
          {!isMobile ? <CatNav /> : null}

          {/*=== Middle ===*/}
          <div
            className="VdPg-Col_Two VdPg-Col_P0"
            style={{ position: "fixed", right: 0, top: 0 }}
          >
            {/*====== Logo, Main Navigation & Right Icons Live Tv, Notification and Search ======*/}
            {!isMobile ? <MainNav /> : null}

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
