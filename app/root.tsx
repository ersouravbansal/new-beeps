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
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";
import { version } from "package.json";
import Header from "./components/Layout/Header";
import SideNavigation from "./components/Layout/SideNavigation";
import SvgIcons from "./components/Layout/SvgIcons";
import Login from "./components/Layout/Login";
// import LanguageSwitch from "./components/Layout/LanguageSwitch";
import MoreSwipe from "./components/Layout/MoreSwipe";
import $ from "jquery";
import { LinksFunction, json } from "@remix-run/node";
import atf from "./styles/atf.css";
import atfVod from "./styles/atfVod.css";
import atfBeepDetails from "./styles/atfBeepsDetail.css";
import beepVideo from "./styles/beepVideo.css";
import beepVideoElements from "./styles/beepVideoElements.css";
import beepComments from "./styles/beepComments.css";
import videoShareDropDown from "./styles/videoShareDropDown.css";
import beepColumn from "./styles/beep-column.css";
import beepHeader from "./styles/beep-header.css";
import categoryDropDown from "./styles/categories-dropdown.css";
import videoDropDown from "./styles/video-dropdown.css";
import categoryMainNav from "./styles/category-mainnav.css";
import customCSS from "./styles/custom.css";
import useEnvStore from "./stores/env_variables";
import TagManager from "react-gtm-module";
import { isMobile } from "react-device-detect";
import { register } from "swiper/element/bundle";
import CategoryBoxWap from "./components/Layout/CategoryBoxWap";
import VideoBoxWap from "./components/Layout/VideoBoxWap";
import useStore from "~/stores/utilstore";
export const loader = async () => {
  const envStore = useEnvStore.getState();
  await envStore.setBasePath(process.env.REMIX_BASEPATH);
  await envStore.setClientUrl(process.env.REMIX_API_URL);
  return json({
    GTM_ID: process.env.GTM_ID,
    APP_ENV: process.env.REMIX_APP_ENV,
    REMIX_BASEPATH: process.env.REMIX_BASEPATH,
    REMIX_API_URL: process.env.REMIX_API_URL,
  });
};

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: atf },
  { rel: "stylesheet", href: atfBeepDetails },
  // { rel: "stylesheet", href: atfVod },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper@11.0.7/swiper-bundle.min.css",
  },
  { rel: "stylesheet", href: beepVideo },
  { rel: "stylesheet", href: beepColumn },
  { rel: "stylesheet", href: beepVideoElements },
  { rel: "stylesheet", href: beepComments },
  { rel: "stylesheet", href: videoShareDropDown },
  { rel: "stylesheet", href: categoryMainNav },
  { rel: "stylesheet", href: beepHeader },
  { rel: "stylesheet", href: categoryDropDown },
  { rel: "stylesheet", href: videoDropDown },
  { rel: "stylesheet", href: customCSS },
];
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
  const sidenavtoggle = useStore((state) => state.sidenavtoggle);
  const categoryWapToggle = useStore((state) => state.categoryWapToggle);
  const videoWapToggle = useStore((state) => state.videoWapToggle);
  const activeVideoIndex = useStore((state) => state.activeVideoIndex);
  const categoryToggle = useStore((state) => state.categoryToggle);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        {/* <link
          rel="stylesheet"
          href={`/beeps/styles/atfBeepsDetail.css`}
        /> */}
        {/* <link rel="stylesheet" href="https://use.typekit.net/jkd2jqy.css" /> */}
      </head>
      <body
        className={
          `nav-trigger Vd-list Vd-Lst-pg ` +
          (sidenavtoggle ? "js_sid-nav " : "") +
          (categoryWapToggle ? "VdElCtg_on " : "") +
          (videoWapToggle ? "VdElVdCtg_on " : "") +
          (activeVideoIndex == 0 ? "BepSlDsp_lft " : "") +
          (categoryToggle ? "Js-BepDrp_ovr " : "")
        }
        onClick={() => {
          document.body.classList.remove("Js-BepDrp_ovr");
        }}
      >
        {children}
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
        <script src={`/beeps/js/jquery-min.js`}></script>
        <script src={`/beeps/js/custom.js`}></script>
        <script src={`/beeps/js/beep-element.js`}></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
        {/* <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script> */}
        <script src={`/beeps/js/beep-video.js`}></script>
        <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"></script>
        {/* <script src={`/beeps/js/world-fcm.js`}></script> */}
        {/* <script
          async
          src="https://www.googletagservices.com/tag/js/gpt.js"
        ></script> */}
        {/* <script src={`/beeps/js/login.js`}></script> */}
      </body>
    </html>
  );
}

export default function App() {
  const { GTM_ID, APP_ENV, REMIX_BASEPATH, REMIX_API_URL, ENV } =
    useLoaderData<typeof loader>();
  const envStore = useEnvStore.getState();
  const setSidenavtoggle = useStore((state) => state.setSidenavtoggle);

  useEffect(() => {
    const updateHeight = () => {
      const ht = window.innerHeight;
      const svVertical2 = document.querySelector(".BepSl_cn");
      svVertical2.style.height = `${ht - 71}px`;

      if (window.innerWidth <= 560) {
        svVertical2.style.height = `${ht}px`;
      }
      console.log("updateHeight",svVertical2.style.height)
    };

    if (window.innerWidth <= 767) {
      updateHeight();
      window.addEventListener("resize", updateHeight, true);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateHeight, true);
    };
  }, []);
  useEffect(() => {
    console.log("environment:", APP_ENV);
    envStore.setBasePath(REMIX_BASEPATH);
    envStore.setClientUrl(REMIX_API_URL);
  }, [REMIX_BASEPATH, REMIX_API_URL, APP_ENV]);

  useEffect(() => {
    if (GTM_ID?.length) {
      const tagManagerArgs = { gtmId: GTM_ID };
      TagManager.initialize(tagManagerArgs);
    }
  }, [GTM_ID]);

  useEffect(() => {
    const ENVURL = REMIX_API_URL;
    window.ENVURL = ENVURL;

    const loadScriptlogin = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.id = "__loginScript";
        script.src =
          "https://stage-auth.ndtv.com/w/js/config.js?v=2023-10-27-01&site=swirlster&nocss=1";
        // script.src =
        // "https://stage-auth.ndtv.com/w/js/config.js?v=2023-10-27-01&site=beeps&nocss=1";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };
    const loadScriptnotification = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        // script.id = "__loginScript";
        script.src = "/beeps/js/world-fcm.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };
    loadScriptlogin()
      // loadScriptnotification()
      .then(() => {
        const logTriggerElements = document.querySelectorAll(".__log_trigger");
        logTriggerElements.forEach((element) => {
          element.addEventListener("click", function () {
            console.log("log set__");
            if (!parent_c_islogin()) {
              let __rurl = window.location.href;
              window.location.href =
                "https://stage-auth.ndtv.com/w/sso.html?siteurl=" +
                encodeURIComponent(__rurl);
            } else {
              const toggleClass = element.getAttribute("data-class");
              document.body.classList.toggle(toggleClass);
            }
          });
        });

        const overlaySideNav = document.querySelector(".overlay__side-nav");
        const logSdCls = document.querySelector(".LogSd-cls");
        overlaySideNav?.addEventListener("click", removeJsSideNavClass);
        logSdCls?.addEventListener("click", removeJsSideNavClass);

        function removeJsSideNavClass() {
          document.body.classList.remove("js_sid-nav-right");
        }
      })
      .catch((error) => {
        console.log("Error loading login script:", error);
      });
  }, []);
  useEffect(() => {
    register();
  }, []);
  return (
    <>
      <SvgIcons />
      <div id="___ndtvpushdiv" className="npop_wrp t-center"></div>
      <div className="__nlogin" id="__nlogin"></div>
      <Header />
      {/* {!isMobile ? <SideNavigation /> : null} */}
      <SideNavigation />
      {/* <Login /> */}
      {/* <LanguageSwitch /> */}
      <MoreSwipe />
      <CategoryBoxWap />
      <VideoBoxWap />
      <div>
        {/*======[ Side nav Overlay ]======*/}
        <a
          href="#0"
          className="overlay__side-nav"
          onClick={() => {
            setSidenavtoggle(false);
          }}
        />
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
