import { useState } from "react";
import { useShowToast } from "./useShowToast";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<DocumentData | null>(null);
  const showToast = useShowToast();

  async function handleGetUser(username: string) {
    try {
      setIsLoading(true);
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      if (!q) return showToast("Error", "Something went wrong", "error");
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showToast("Error", "User not found", "error");
        setUser(null);
        return;
      }

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", "Error while getting user", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return { handleGetUser, user, isLoading, setUser };
}
