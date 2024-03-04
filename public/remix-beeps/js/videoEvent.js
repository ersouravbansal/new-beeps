$(document).ready(function () {
  //--====== Autoplay option
  $(".VdPg_swp-rhs1, .VdPg_swp-rhs2").each(function (elem, target) {
    var swp = target.swiper;
    $(this).hover(
      function () {
        swp.autoplay.stop();
      },
      function () {
        swp.autoplay.start();
      }
    );
  });
  //<!--====== Video player focus viewport ======-->
  $('.Vdplyer_fcs-bt, .Vdplyer_fcs-bt3').click(function () {
    $('body').toggleClass("VdPlyFc");

});
//Focus add class when out from Iframe
var stk = {};

window.StartHeader = function () {
    stk.contPanle = $(".vdprs");
    stk.playerTop = -1;
    window.addEventListener("scroll", windowScroll, false);
}

window.windowScroll = function (e) {
    e.preventDefault();
    updateDivSticky($(".vdprs"), "VdPlyFc-out") > 200;
    return false;
}

window.updateDivSticky = function (base, addRemClass) {
    var contPanel = base; // ;
    var totalTop = contPanel.offset().top - pageYOffset;
    //    updateLog("=====top pos: " + " ;  totalTop: " + totalTop + " ;  height:  " + contPanel.height());
    if ((totalTop) < 0) {
        var maxReach = Math.abs(totalTop);
        //        updateLog("maxReach:  " + maxReach)
        if (maxReach >= contPanel.height()) {
            $("body").addClass(addRemClass)
        } else {
            $("body").removeClass(addRemClass)
        }
    } else {
        $("body").removeClass(addRemClass);
    }
    return false;
}
StartHeader();
$(document).ready(function () { $(".VdArt_cmt_bx-tgl ").off("click").on("click", function () { $(this).parent().toggleClass("VdArt_cmt_bx-act"); if ($(this).parent().hasClass("active")) SI_NS.loadSticky(); }); });
//<!--=========== Video Auto ( play class to use Vd-AutPly ) =========== -->
window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

    if (document.querySelectorAll('.Vd-AutPly[autoplay]').length > 0) {
        var windowHeight = window.innerHeight,
            videoEl = document.querySelectorAll('.Vd-AutPly[autoplay]');

        for (var i = 0; i < videoEl.length; i++) {

            var thisVideoEl = videoEl[i],
                videoHeight = thisVideoEl.clientHeight,
                videoClientRect = thisVideoEl.getBoundingClientRect().top;

            if (videoClientRect <= ((windowHeight) - (videoHeight * .5)) && videoClientRect >= (0 - (videoHeight * .5))) {
                thisVideoEl.play();
            } else {
                thisVideoEl.pause();
            }

        }
    }

}
//<!--=========== Video on hover play =========== -->

var figure = $(".Vod-hvr").hover(hoverVideo, hideVideo);

function hoverVideo(e) {
    $('video', this).get(0).play();
}

function hideVideo(e) {
    $('video', this).get(0).pause();
}

});
