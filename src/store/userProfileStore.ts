import { create } from "zustand";
import { UserType } from "../types/types";

interface ProfileTypes {
  userProfile: UserType | null;
  setUserProfile: (userProfile: UserType) => void;
}

const useUserProfileStore = create<ProfileTypes>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
}));

export default useUserProfileStore;
