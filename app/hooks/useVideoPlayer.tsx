import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import useStore from "~/stores/utilstore";
const useVideoPlayer = (
  videoElemRef: any,
  seekBarRef: any,
  progressBarRef: any,
  seekThumbRef: any
) => {
  const silent = useStore((state) => state.silent);
  const setSilent = useStore((state) => state.setSilent);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isMetaLoaded: false,
    hoverTime: 0,
  });
  const formatTime = (value: any) => {
    var time = "";
    if (value > 0 && value != "Infinity") {
      var hours = Math.floor(((value / 86400) % 1) * 24);
      var minutes = Math.floor(((value / 3600) % 1) * 60);
      var seconds = Math.floor(((value / 60) % 1) * 60);
      if (hours > 0) {
        time += (hours < 10 ? "0" + hours : hours) + ":";
      }
      time += (minutes < 10 ? "0" + minutes : minutes) + ":";
      time += seconds < 10 ? "0" + seconds : seconds;
    } else {
      time = "00:00";
    }
    return time;
  };

  const playVideo = useCallback(() => {
    videoElemRef.current.play();
  }, [videoElemRef]);

  const pauseVideo = useCallback(() => {
    videoElemRef.current.pause();
  }, [videoElemRef]);

  const muteVideo = useCallback(() => {
    setPlayerState((previousplayerState) => {
      previousplayerState.isMuted = true;
      return { ...previousplayerState };
    });
    videoElemRef.current.muted = true;
    if (silent !== true) {
      setSilent(true);
    }
  }, [silent]);

  const unMuteVideo = useCallback(() => {
    setPlayerState((previousplayerState) => {
      previousplayerState.isMuted = false;
      return { ...previousplayerState };
    });
    videoElemRef.current.muted = false;
    if (silent !== false) {
      setSilent(false);
    }
  }, [silent]);

  const togglePlay = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
    if (playerState.isPlaying === true) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [playerState.isPlaying]);

  const toggleMute = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMuted: !prevState.isMuted,
    }));
    if (playerState.isMuted === true) {
      unMuteVideo();
    } else {
      muteVideo();
    }
  }, [playerState.isMuted]);

  const handleOnMetaLoaded = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMetaLoaded: true,
    }));
  }, [playerState.isMetaLoaded]);

  const handleVideoProgress = useCallback((event: any) => {
    const clickX =
      event.clientX - seekBarRef.current.getBoundingClientRect().left;
    const seekBarWidth = seekBarRef.current.offsetWidth;

    const progress = (clickX / seekBarWidth) * 100; // Calculate progress in percentage
    setPlayerState((prevState) => ({
      ...prevState,
      progress,
    }));

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }

    // Calculate the new time based on the click position
    const newTime = (clickX / seekBarWidth) * videoElemRef.current.duration;
    videoElemRef.current.currentTime = newTime;
  }, []);
  const onSliderMove = (e: any) => {
    const seekBarRect = seekBarRef.current.getBoundingClientRect();
    const clickX = isMobile ? e.touches[0].clientX : e.clientX;
    const relativeX = clickX - seekBarRect.left;
    const seekBarWidth = seekBarRect.width;
  
    const videoDuration = videoElemRef.current?.duration || 0;
    let newHoverTime = (relativeX / seekBarWidth) * videoDuration;
  
    if (newHoverTime < 0) {
      newHoverTime = 0;
    } else if (newHoverTime > videoDuration) {
      newHoverTime = videoDuration;
    }
  
    setPlayerState((previousplayerState) => ({
      ...previousplayerState,
      hoverTime: newHoverTime,
    }));
  };
  
  // const onSliderMove = (e: any) => {
  //   let hoverTime =
  //     (e.clientX - seekBarRef.current.getBoundingClientRect().left) /
  //     e.currentTarget.clientWidth *
  //     videoElemRef.current?.duration;

  //   if (hoverTime < 0) {
  //     hoverTime = 0;
  //   }

  //   setPlayerState((previousplayerState) => ({
  //     ...previousplayerState,
  //     hoverTime,
  //   }));
  // };

  const handleOnTimeUpdate = useCallback(() => {
    const progress =
      (videoElemRef.current.currentTime / videoElemRef.current.duration) * 100;
    setPlayerState((prevState) => ({
      ...prevState,
      progress,
    }));

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, []);

  return {
    togglePlay,
    toggleMute,
    handleOnMetaLoaded,
    handleOnTimeUpdate,
    handleVideoProgress,
    formatTime,
    playerState,
    playVideo,
    pauseVideo,
    muteVideo,
    unMuteVideo,
    onSliderMove,
  };
};

export default useVideoPlayer;
