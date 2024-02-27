import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";

export function useSignOutUser() {
  const [signOut, loading, error] = useSignOut(auth);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useShowToast();

  async function signout() {
    const action = await signOut();
    if (action) {
      localStorage.removeItem("user-info");
      logout();
      showToast("Log Out", "user Successfully log out", "success");
    }
  }

  return { loading, error, signout };
}
