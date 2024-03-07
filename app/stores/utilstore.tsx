import { create } from "zustand";

const useStore = create((set, get) => ({
  sidenavtoggle: false,
  // expscreen: false,
  urlupdate: true,
  cmnt_Title: null,
  cmnt_Link: null,
  cmnt_VideoId: null,
  allowNotification: false,
  silent: false,
  muteAdButton: false,
  imaError: false,
  newTitle:
    "Food News, Health News, Indian Recipes, Healthy Recipes, Vegetarian Recipes, Indian Food recipes – NDTV Food",
  // vindex: null,
  setSidenavtoggle: (newValue: boolean) => set({ sidenavtoggle: newValue }),
  setSilent: (newValue: boolean) => set({ silent: newValue }),
  setMuteAdButton: (newValue: boolean) => set({ muteAdButton: newValue }),
  // setExpscreen: (newValue:boolean) => set({ expscreen: newValue }),
  setUrlupdate: (newValue: boolean) => set({ urlupdate: newValue }),
  setImaError: (newValue: boolean) => set({ imaError: newValue }),
  setNewTitle: (newValue: string) => set({ newTitle: newValue }),
  setAllowNotification: (newValue: boolean) =>
    set({ allowNotification: newValue }),
  setCmntInfo: (cmnt_VideoId, cmnt_Title, cmnt_Link) =>
    set({ cmnt_VideoId, cmnt_Title, cmnt_Link }),
  // setVindex: (newValuefn) => {
  //   let newValue = newValuefn;
  //   if (typeof newValuefn === "function") {
  //     newValue = newValuefn(get().vindex);
  //   }
  //   set({ vindex: newValue });
  // },
}));

export default useStore;
