import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import { version } from "package.json";
import Header from "./components/Layout/Header";
import SideNavigation from "./components/Layout/SideNavigation";
import SvgIcons from "./components/Layout/SvgIcons";
import Login from "./components/Layout/Login";
import LanguageSwitch from "./components/Layout/LanguageSwitch";
import MoreSwipe from "./components/Layout/MoreSwipe";
import $ from "jquery";

export const meta: MetaFunction = () => [
  { name: "title", content: "NDTV Video Listing page" },
  {
    name: "viewport",
    content:
      "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
  },
  { name: "apple-mobile-web-app-capable", content: "yes" },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent",
  },
  { name: "msapplication-tap-highlight", content: "no" },
  {
    name: "google-site-verification",
    content: "yThRoDT_1iDUIum7IPIGT96Y-8rpvmFwlYBBK9EMGXM",
  },
  { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" },
  { name: "content-language", content: "en" },
  { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
  { name: "x-web-version", content: "v" + version },
  {
    property: "og:image",
    content: "https://cdn.ndtv.com/common/images/ogndtv.png",
  },
  { property: "og:title", content: "NDTV Video Listing page" },
];

export function Layout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/jkd2jqy.css" />
        <link rel="stylesheet" href={`/remix-beeps/styles/atf.css`} />
        <link
          rel="stylesheet"
          href={`/remix-beeps/styles/atfBeepsDetail.css`}
        />
      </head>
      <body className="nav-trigger Vd-list Vd-Lst-pg">
        {children}
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
        <script src={`/remix-beeps/js/jquery-min.js`}></script>
        <script src={`/remix-beeps/js/custom.js`}></script>
        <script src={`/remix-beeps/js/beep-element.js`}></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
        {/* <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script> */}
        <script src={`/remix-beeps/js/beep-video.js`}></script>
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    $(document).ready(function () {
      function updateHeight() {
        const ht = window.innerHeight;
        const svVertical2 = document.querySelector(".BepSl_cn");
        if (svVertical2) {
        svVertical2.style.height = `${ht - 71}px`;

        if ($(window).width() <= 560) {
          svVertical2.style.height = `${ht}px`;
        }
      }
    }

      if ($(window).width() <= 767) {
        updateHeight();
        window.addEventListener("resize", updateHeight, true);
      }
    });
  }, []);
  return (
    <>
      <SvgIcons />
      <Header />
      <SideNavigation />
      <Login />
      <LanguageSwitch />
      <MoreSwipe />
      <div>
        {/*======[ Side nav Overlay ]======*/}
        <a href="#0" className="overlay__side-nav" />
        {/*====== Back to top ======*/}
        <div className="back-to-top">
          <svg className="vj_icn vj_arrow-up">
            <use xlinkHref="#vj_arrow-up" />
          </svg>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as any;

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
