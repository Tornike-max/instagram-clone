import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useShowToast } from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../types/types";

export function useLogin() {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (data: { email: string; password: string }) => {
    if (!data) return;

    try {
      const userCred = await signInWithEmailAndPassword(
        data.email,
        data.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            localStorage.setItem("user-info", JSON.stringify(userData));
            loginUser(userData as UserType);
          }
        } else {
          showToast("Error", "User data not found", "error");
        }
      }
    } catch (error) {
      showToast("Error", "Incorrect credentials", "error");
    }
  };

  return { login, loading, error };
}
