document.addEventListener("DOMContentLoaded", function () {
  const slideshowContainer = document.getElementById("swiper-wrapper BepSl_ul");

  fetchVideos().then((videos) => {
    videos.map((video) => {
      const videoUrl = video.url;
      const videoTitle = video.title;

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
      videoElement.muted = true;
      videoElement.preload = "auto";
      videoElement.width = "100%";
      videoElement.height = "100%";
      videoElement.playsinline = true;

      swipeWrapperDiv.appendChild(swipeTextDiv);
      swipeWrapperDiv.appendChild(swipeLineDiv);
      swipeContainerDiv.appendChild(swipeWrapperDiv);
      videoWrapperDiv.appendChild(swipeContainerDiv);
      videoWrapperDiv.appendChild(videoElement);
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
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.videos);
        return data.videos;
      });
  }
});

//   return fetch(apiUrl,
//     {
//     mode: "no-cors",
//   }
//   )
