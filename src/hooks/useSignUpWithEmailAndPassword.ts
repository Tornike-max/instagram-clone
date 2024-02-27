import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";

export function useSignUpWithEmailAndPassword() {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();

  const signUp = async (data: {
    email: string;
    password: string;
    username: string;
    fullname: string;
  }) => {
    if (!data.email || !data.fullname || !data.username || !data.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    const usersRef = collection(firestore, "users");

    const q = query(usersRef, where("username", "==", data.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "username already exists", "error");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      if (!newUser) return;

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          username: data.username,
          email: data.email,
          fullname: data.fullname,
          profilePicURL: "",
          bio: "",
          createdAt: Date.now(),
          followers: [],
          following: [],
          posts: [],
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(newUser));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error as string, "error");
      console.error(error);
    }
  };

  return { signUp, loading, error };
}
