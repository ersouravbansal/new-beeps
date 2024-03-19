import TagManager from "react-gtm-module";

//dummy event begins!
// export const trackPageView = (url) => {
//   console.log("track pageview called")
//   TagManager.dataLayer({
//     dataLayer: {
//       event: "pageview",
//       page: { url },
//     },
//   });
// };

//dummy event Ends!------

// Original Events Begins!
const updateVidType = (videoId) => {
  let tpe = "ON-DEMAND";
  if (typeof videoId !== "undefined") {
    if (String(videoId).substring(0, 4) === "LIVE") {
      tpe = "LIVE";
    }
  }
  return tpe;
};

const vidFromSource = (dataBase: any) => {
  let cat_n_vidsource = "";
  if (dataBase.video_from !== "NA") {
    cat_n_vidsource = `-${String(dataBase.video_from).toLowerCase()}`;
  }
  return cat_n_vidsource;
};

export const trackVideoPageView = (newUrl, autoStartEv, props) => {
  const pageUrl = newUrl;
  const videoId = props.videoID;
  const channel = props.channel_id;
  const show = props.show;
  const title = props.title;
  const videoCategory = props.category;
  const pubDate = props.pubDate;
  const autoStart = autoStartEv;
  // if (String(dataBase.isGap) === "true") {
  console.log("Requesting GAP tvc_vidtrack_pageview Events");
  // updateLog("Requesting GAP tvc_vidtrack_pageview Events");
  console.log();
  let pb_yr = "NA";
  let pb_mo = "NA";
  let pb_dt = "NA";
  if (pubDate !== "NA") {
    const dt = new Date(pubDate);
    pb_yr = dt.getFullYear().toString();
    pb_mo =
      dt.getMonth() + 1 < 10
        ? "0" + (dt.getMonth() + 1).toString()
        : (dt.getMonth() + 1).toString();
    pb_dt =
      dt.getDate() < 10
        ? "0" + dt.getDate().toString()
        : dt.getDate().toString();
  }

  TagManager.dataLayer({
    dataLayer: {
      event: "tvc_vidtrack_pageview",
      pageUrl: pageUrl,
      videoId: videoId,
      channel: channel,
      // videoForm: String(dataBase.content_type),
      show: show,
      // network: String(dataBase.vidsource),
      // adFormat: String(dataBase.prmadpoint),
      title: title,
      videoType: updateVidType(videoId),
      // videoCategory: String(dataBase.category) + vidFromSource(),
      videoCategory: videoCategory,
      // alias: String(dataBase.aliasInit),
      autostart: autoStart,
      // device: updateGADeviceInfo(dataBase.deviceId),
      publicationyear: pb_yr,
      publicationmonth: pb_mo,
      publicationday: pb_dt,
      publicationdate: `${pb_dt}-${pb_mo}-${pb_yr}`,
      // author: String(dataBase.author),
    },
  });
  // }
};

const updateGAPEvent = (
  evtCat: any,
  evtAct: any,
  evtLab: any,
  errStat: any,
  dataBase: any
) => {
  let pb_yr = "NA";
  let pb_mo = "NA";
  let pb_dt = "NA";

  if (dataBase.date !== "NA") {
    let dt = new Date(dataBase.date);
    pb_yr = dt.getFullYear().toString();
    pb_mo =
      dt.getMonth() + 1 < 10
        ? "0" + (dt.getMonth() + 1).toString()
        : (dt.getMonth() + 1).toString();
    pb_dt =
      dt.getDate() < 10
        ? "0" + dt.getDate().toString()
        : dt.getDate().toString();
  }

  if (String(dataBase.isGap) === "true") {
    TagManager.dataLayer({
      dataLayer: {
        event: "tvc_vidtrack_event",
        eventCategory: evtCat,
        eventAction: evtAct,
        eventLabel: evtLab,
        errorStatus: errStat,
        videoId: String(dataBase.id),
        channel: String(dataBase.channel),
        videoForm: String(dataBase.content_type),
        show: String(dataBase.show),
        network: String(dataBase.vidsource),
        adFormat: String(dataBase.prmadpoint),
        title: String(dataBase.title),
        videoType: updateVidType(dataBase),
        videoCategory: String(dataBase.category) + vidFromSource(dataBase),
        alias: String(dataBase.aliasInit),
        autostart: String(dataBase.autostart),
        device: updateGADeviceInfo(dataBase.deviceId),
        url: String(dataBase.pageurl),
        publicationyear: pb_yr,
        publicationmonth: pb_mo,
        publicationday: pb_dt,
        publicationdate: `${pb_dt}-${pb_mo}-${pb_yr}`,
        author: String(dataBase.author),
      },
    });
    console.log(`----- GAP updated successfully --- eventCategory: ${evtCat}`);
    // updateLog(`----- GAP updated successfully --- eventCategory: ${evtCat}`);
    return false;
  }
};

//Original Events ends!---
