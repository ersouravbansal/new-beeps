import React, { useEffect } from "react";
import useStore from "~/stores/utilstore";
import { CATEGORY_LIST } from "./CategoryName";
import { Link } from "@remix-run/react";
function Footer() {
  const categoryToggle = useStore((state) => state.categoryToggle);
  const setCategoryToggle = useStore((state) => state.setCategoryToggle);

  useEffect(() => {
    if (categoryToggle == true) {
      document.body.classList.add("Js-BepDrp_ovr");
    } else {
      document.body.classList.remove("Js-BepDrp_ovr");
    }
  }, [categoryToggle]);
  return (
    <>
      <div className="BepDrp_ovrly" />
      <div className="BepBtm_cn">
        <div className="BepBtm_wr">
          {/*====== Bottom Sticky Nav Widget ======*/}
          <div className="BepDrp_cn">
            <div
              className="BepDrp_cls"
              onClick={() => {
                setCategoryToggle(!categoryToggle);
              }}
            >
              <svg className="vj_icn vj_close">
                <use xlinkHref="#vj_close" />
              </svg>
            </div>
            <div className="BepDrp_wr">
              <div className="BepDrp_rw">
                <div className="BepDrp_col BepDrp_col9">
                  <div className="BepDrp_tl-lk">
                    <a className="BepDrp_tl" href="#">
                      Choose the News Category
                    </a>
                  </div>
                  <div className="BepDrpNv_ul hr-scroll">
                    {/* <div className="BepDrpNv_li-lk">
                      <a className="BepDrpNv_li" href="#">
                        <div className="BepDrpNv_tx">Education</div>
                      </a>
                    </div> */}
                    {CATEGORY_LIST().map((category) => (
                      <div className="BepDrpNv_li-lk" key={category.title} onClick={()=>{
                        setCategoryToggle(false)
                      }}>
                        <Link className="BepDrpNv_li" to={category.link}>
                          <div className="BepDrpNv_tx">{category.title}</div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="BepBtmNv_cn">
            <div className="BepBtmNv_wr">
              <div
                className="BepBtmNv_Ctgr-lk"
                onClick={() => {
                  setCategoryToggle(!categoryToggle);
                }}
              >
                <div className="BepBtmNv_Ctgr">
                  <div className="BepBtmNv_Ctgr-icn">
                    <svg className="vj_icn vj_category">
                      <use xlinkHref="#vj_category" />
                    </svg>
                  </div>
                  Category
                  <div className="BepBtmNv_Arw-icn">
                    <svg className="m-nv_drp-icn vj_icn vj_arrow-up">
                      <use xlinkHref="#vj_arrow-up" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="BepBtmNv_ul-wr">
                <ul className="BepBtmNv_ul">
                  <li className="BepBtmNv_li">
                    <a
                      href="#"
                      className="swiper-button-prev BepNv_prv BepBtmNv_lk"
                    >
                      <svg className="vj_icn vj_arrow-up BepBtmNv_svg">
                        <use xlinkHref="#vj_arrow-up" />
                      </svg>
                    </a>
                  </li>
                  <li className="BepBtmNv_li">
                    <a
                      href="#"
                      className="swiper-button-next BepNv_nxt BepBtmNv_lk"
                    >
                      <svg className="vj_icn vj_arrow-down BepBtmNv_svg">
                        <use xlinkHref="#vj_arrow-down" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Footer;
