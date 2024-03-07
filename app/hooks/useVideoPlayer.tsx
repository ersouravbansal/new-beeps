import { useCallback, useEffect, useState } from "react";

const useVideoPlayer = (
  videoElemRef:any,
  seekBarRef:any,
  progressBarRef:any,
  seekThumbRef:any,
) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isMetaLoaded: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (value) => {
    if (value > 0 && value !== "Infinity") {
      const hours = Math.floor(((value / 86400) % 1) * 24);
      const minutes = Math.floor(((value / 3600) % 1) * 60);
      const seconds = Math.floor(((value / 60) % 1) * 60);
      return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    } else {
      return "00:00";
    }
  };

  const playVideo = useCallback(() => {
    videoElemRef.current.play();
  }, [videoElemRef]);

  const pauseVideo = useCallback(() => {
    videoElemRef.current.pause();
  }, [videoElemRef]);

  const muteVideo = useCallback(() => {
    videoElemRef.current.muted = true;
  }, [videoElemRef]);

  const unMuteVideo = useCallback(() => {
    videoElemRef.current.muted = false;
  }, [videoElemRef]);

  const togglePlay = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
    if(playerState.isPlaying=== true){
        playVideo();
    }else{
        pauseVideo()
    }
  }, [playerState.isPlaying]);

  const toggleMute = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMuted: !prevState.isMuted,
    }));
    if(playerState.isMuted===true){
        unMuteVideo()
    }else{
        muteVideo()
    }
  }, [playerState.isMuted]);

  const handleOnMetaLoaded = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMetaLoaded: true,
    }));
  }, [playerState.isMetaLoaded]);

  const handleOnTimeUpdate = useCallback(() => {
    const progress = (videoElemRef.current.currentTime / videoElemRef.current.duration) * 100;
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
    formatTime,
    playerState,
  };
};

export default useVideoPlayer;
