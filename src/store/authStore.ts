import { create } from "zustand";
import { UserType } from "../types/types";

interface AuthState {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
  setUser: (user: UserType) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const userInfoString = localStorage?.getItem("user-info");
  const user = userInfoString ? JSON.parse(userInfoString) : null;

  return {
    user: user,
    login: (user: UserType) => set(() => ({ user })),
    logout: () => set(() => ({ user: null })),
    setUser: (user: UserType) => set(() => ({ user })),
  };
});
