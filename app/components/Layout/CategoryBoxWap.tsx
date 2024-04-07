import React from "react";
import { CATEGORY_LIST } from "./CategoryName";
import { Link } from "@remix-run/react";
import useStore from "~/stores/utilstore";
function CategoryBoxWap() {
  const setCategoryWapToggle = useStore((state) => state.setCategoryWapToggle);
  return (
    <>
      <div className="VdElCtgr_wdg">
        <div
          className="VdElCtgr_ovrly"
          onClick={(e) => {
            e.stopPropagation();
            document.body.classList.remove("VdElCtg_on");
            setCategoryWapToggle(false);
          }}
        />
        <div className="VdElCtgr_wr ">
          <div className="VdElCtgr_cn">
            {/* <div class=""> */}
            <div className="BepDrp_rw">
              <div className="BepDrp_col">
                <div className="BepDrp_tl-lk">
                  <a className="BepDrp_tl" href="#">
                    Choose the News Category
                  </a>
                  <div
                    className="VdElCtgr_cls"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.body.classList.remove("VdElCtg_on");
                      setCategoryWapToggle(false);
                    }}
                  >
                    <svg className="vj_icn vj_close">
                      <use xlinkHref="#vj_close" />
                    </svg>
                  </div>
                </div>
                <div className="BepDrpNv_ul BepDrpNv_ul-mob hr-scroll">
                  {/* <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx">Education</div>
                    </a>
                  </div> */}
                  {CATEGORY_LIST().map((category) => (
                    <div className="BepDrpNv_li-lk" key={category.title} onClick={()=>{
                      setCategoryWapToggle(false);
                    }}>
                      <Link className="BepDrpNv_li" to={category.link}>
                        <div className="BepDrpNv_tx">{category.title}</div>
                      </Link>
                    </div>
                  ))}
                  {/* <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Business</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Cricket</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Health</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Food</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Movies</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Tech</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Auto</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx">Train</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Apps</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx">Shopping</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Swasth</div>
                    </a>
                  </div>
                  <div className="BepDrpNv_li-lk">
                    <a className="BepDrpNv_li" href="#">
                      <div className="BepDrpNv_tx"> Games</div>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryBoxWap;
