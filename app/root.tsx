import { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { version } from "package.json";
import atfStyleUrl from "../public/remix-beeps/styles/atf.css";
import atfBeepsDetailUrl from "../public/remix-beeps/styles/atfBeepsDetail.css";
import Header from "./components/Layout/Header";
import SideNavigation from "./components/Layout/SideNavigation";
import SvgIcons from "./components/Layout/SvgIcons";
import Login from "./components/Layout/Login";
import LanguageSwitch from "./components/Layout/LanguageSwitch";
import MoreSwipe from "./components/Layout/MoreSwipe";

export const meta: MetaFunction = () => ({
  title: "NDTV Video Listing page",
  viewport:
    "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black-translucent",
  "msapplication-tap-highlight": "no",
  "google-site-verification": "yThRoDT_1iDUIum7IPIGT96Y-8rpvmFwlYBBK9EMGXM",
  "Content-Type": "text/html; charset=UTF-8",
  "content-language": "en",
  "X-UA-Compatible": "IE=edge",
  "x-web-version": "v" + version,
  "og:image": "https://cdn.ndtv.com/common/images/ogndtv.png",
  "og:title": "NDTV Video Listing page",
});

export function Layout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <head>
        <link rel="stylesheet" href={`/remix-beeps/styles/atf.css`} />
        <link
          rel="stylesheet"
          href={`/remix-beeps/styles/atfBeepsDetail.css`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/*   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/jkd2jqy.css" />
      </head>
      <body className="nav-trigger Vd-list Vd-Lst-pg">
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
        <script src={`/remix-beeps/js/jquery-min.js`} />
        <script src={`/remix-beeps/js/beep-element.js`} />
        <script src={`/remix-beeps/js/beep-video.js`} />
        <script src={`/remix-beeps/js/custom.js`} />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js" />
        <script src={`/remix-beeps/js/videoEvent.js`} />

        {/* <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
*/}
      </body>
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
