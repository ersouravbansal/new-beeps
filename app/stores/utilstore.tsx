import { create } from "zustand";

const useStore = create((set, get) => ({
  sidenavtoggle: false,
  urlupdate: true,
  cmnt_Title: null,
  cmnt_Link: null,
  cmnt_VideoId: null,
  allowNotification: false,
  silent: true,
  muteAdButton: false,
  imaError: false,
  clicked: false,
  notificationAllowed: false,
  elementsVisible:false,
  categoryToggle: false,
  newTitle:
    "Food News, Health News, Indian Recipes, Healthy Recipes, Vegetarian Recipes, Indian Food recipes – NDTV Food",
  isVideoPlaying: true,
  categoryWapToggle: false,
  videoWapToggle: false,
  activeVideoIndex:0,
  isVideoOverlayVisible:false,
  setIsVideoOverlayVisible: (newValue: boolean) => set({ isVideoOverlayVisible: newValue }),
  setActiveVideoIndex:(newValue)=>set({activeVideoIndex:newValue}),
  setElementsVisible: (newValue: boolean) => set({ moreInfoVisible: newValue }),
  setCategoryWapToggle: (newValue: boolean) => set({ categoryWapToggle: newValue }),
  setVideoWapToggle: (newValue: boolean) => set({ videoWapToggle: newValue }),
  setCategoryToggle: (newValue: boolean) => set({ categoryToggle: newValue }),
  setSidenavtoggle: (newValue: boolean) => set({ sidenavtoggle: newValue }),
  setIsVideoPlaying: (newValue: boolean) => set({ isVideoPlaying: newValue }),
  setClicked: (newValue: boolean) => set({ clicked: newValue }),
  setSilent: (newValue: boolean) => set({ silent: newValue }),
  setMuteAdButton: (newValue: boolean) => set({ muteAdButton: newValue }),
  setNotificationAllowed:(newValue: boolean) => set({notificationAllowed: newValue }),

  setUrlupdate: (newValue: boolean) => set({ urlupdate: newValue }),
  setImaError: (newValue: boolean) => set({ imaError: newValue }),
  setNewTitle: (newValue: string) => set({ newTitle: newValue }),
  setAllowNotification: (newValue: boolean) =>
    set({ allowNotification: newValue }),
  setCmntInfo: (cmnt_VideoId, cmnt_Title, cmnt_Link) =>
    set({ cmnt_VideoId, cmnt_Title, cmnt_Link }),
}));

export default useStore;

