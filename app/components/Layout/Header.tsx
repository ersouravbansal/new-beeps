import { Link, Outlet, useLocation } from "@remix-run/react";
import React, { useState } from "react";
import CatNav from "./CatNav";
import { isMobile } from "react-device-detect";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import MainNavigation from "./MainNavigation";
const Header = () => {
  return (
    <>
      {/*====== Content ( LHS, Main Content and RHS ) ======*/}
      <div className="vjl-cntr_full h-100">
        <div className="vjl-row h-100">
          {/*=== LHS ===*/}
          {/* {!isMobile ? <CatNav /> : null} */}

          {/*=== Middle ===*/}
          <div
            className="VdPg-Col_Two VdPg-Col_P0 BepSlCol"
            // style={{ position: "fixed", right: 0, top: 0 }}
          >
            {/*====== Logo, Main Navigation & Right Icons Live Tv, Notification and Search ======*/}
            {/* {!isMobile ? <MainNav /> : null} */}
            <MainNavigation />

            {/*====== Sub Navigation Widget ======*/}
            {/* <SecondaryNav /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
