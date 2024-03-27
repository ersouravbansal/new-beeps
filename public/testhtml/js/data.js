let dataLoaded =false;
document.addEventListener("DOMContentLoaded", function () {
  const slideshowContainers = document.getElementsByClassName(
    "swiper-wrapper BepSl_ul"
  );
  const slideshowContainer = slideshowContainers[0];
  const pageSize = 200;
  const pageNumber = 1;
  fetchVideos(pageSize, pageNumber).then((videos) => {
    videos.map((video) => {
      const videoUrl = video["media:filepath"];
      console.log("video url is ", video["media:filepath"]);
      const videoTitle = video.title;
      console.log("title", videoTitle);

      const slideDiv = document.createElement("div");
      slideDiv.classList.add("swiper-slide", "BepSl_li");

      const cardWrapperDiv = document.createElement("div");
      cardWrapperDiv.classList.add("BepSl_crd-wr");

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("BepSl_crd");

      const videoContainerDiv = document.createElement("div");
      videoContainerDiv.classList.add("BepSl_vdo-cn");

      const videoWrapperDiv = document.createElement("div");
      videoWrapperDiv.classList.add("BepSl_vdo-wr");

      const swipeContainerDiv = document.createElement("div");
      swipeContainerDiv.classList.add("BepSl_swp-cn");

      const swipeWrapperDiv = document.createElement("div");
      swipeWrapperDiv.classList.add("BepSl_swp-wr");

      const swipeTextDiv = document.createElement("div");
      swipeTextDiv.classList.add("BepSl_swp-tx");
      swipeTextDiv.textContent = "Swipe up for next video";

      const swipeLineDiv = document.createElement("div");
      swipeLineDiv.classList.add("BepSl_swp-ln");

      const videoElement = document.createElement("video");
      videoElement.classList.add("BepSl_vdo");
      videoElement.src = videoUrl;
      videoElement.preload = "auto";
      videoElement.width = "100%";
      videoElement.height = "100%";
      videoElement.setAttribute("playsinline", true);
      videoElement.setAttribute("muted", true);

      // Additional content sibling to video element
      const additionalContentDiv = document.createElement("div");
      additionalContentDiv.classList.add("sourav");
      additionalContentDiv.innerHTML = `
             <div class="VdEl_lod-rw">
               <div class="VdEl_lod-cl">
                 <div class="VdEl_inf-wr">
                   <div class="VdEl_inf">${videoTitle}</div>
                 </div>
                 <!-- Additional icons -->
                 <div class="VdEl_icn-wr">
                   <!-- Chat -->
                   <div class="VdEl_icn-lk">
                     <div class="VdEl_icn js-MorInf">
                       <svg class="vj_icn vj_chat">
                         <use xlink:href="#vj_chat"></use>
                       </svg>
                     </div>
                   </div>
                   <!-- Share -->
                   <div class="VdEl_icn-lk">
                     <div class="VdEl_icn">
                       <div class="SSR_drp SSR_btn-sm  SSR_drp-nav-tp VdEl_shr-pp">
                         <!-- Share options -->
                         <a class="SSR_btn-lnk" href="javascript:void(0)">
                           <svg class="SSR_icn vj_icn vj_share2">
                             <use xlink:href="#vj_share2"></use>
                           </svg>
                           <span class="SSR_btn-tx">Share</span>
                         </a>
                         <div class="SSR_drp-nav SSR_WEB">
                           <ul class="SSR_drp-nav-ul">
                             <!-- Share options list -->
                             <!-- Add your share options here -->
                           </ul>
                         </div>
                       </div>
                     </div>
                   </div>
                   <!-- More options -->
                   <div class="VdEl_icn-lk">
                     <div class="VdEl_icn VdEl_icn-mr">
                       <svg class="vj_icn vj_more">
                         <use xlink:href="#vj_more"></use>
                       </svg>
                     </div>
                   </div>
                 </div>
               </div>
               <!-- Time and Progress Bar -->
               <div class="VdEl_lod-cl">
                 <div class="VdEl_lod-cn">
                   <!-- Progress Bar -->
                   <!-- Time -->
                   <div class="VdEl_sk-tm">02:35/05:00</div>
                 </div>
               </div>
             </div>`;

      swipeWrapperDiv.appendChild(swipeTextDiv);
      swipeWrapperDiv.appendChild(swipeLineDiv);
      swipeContainerDiv.appendChild(swipeWrapperDiv);
      videoWrapperDiv.appendChild(swipeContainerDiv);
      videoWrapperDiv.appendChild(videoElement);
      videoWrapperDiv.appendChild(additionalContentDiv);
      videoContainerDiv.appendChild(videoWrapperDiv);
      cardDiv.appendChild(videoContainerDiv);
      cardWrapperDiv.appendChild(cardDiv);
      slideDiv.appendChild(cardWrapperDiv);
      slideshowContainer.appendChild(slideDiv);
    });
  });

  function fetchVideos() {
    const apiUrl =
      "https://search.ndtv.com/video/mjson/client_key/ndtv-news-2d972289359ce88a4ed1e2a3ee8fa5ae/";
    const queryParams = [
      "extra_params=ssl,show,gif,urltitle,source_id,fullimage,category,tmpcheck,newurl,ssl,sitelink,shorttitle,filepath,folder_path,preview,vertical",
      "source=1",
      "show_vertical=1",
      "pageSize=" + pageSize,
      "pageNumber=" + pageNumber,
      "video_format=allformat",
    ];

    const url = apiUrl + "?" + queryParams.join("&");

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        dataLoaded=true
        return data.results;
      });
  }
});
