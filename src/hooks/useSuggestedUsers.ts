import { SetStateAction, useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function useSuggestedUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUser] = useState<DocumentData | null>(
    null
  );
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        setIsLoading(true);

        if (authUser?.following) {
          const usersRef = collection(firestore, "users");
          const q = query(
            usersRef,
            where("uid", "not-in", [authUser.uid, ...authUser.following]),
            orderBy("uid"),
            limit(3)
          );
          const querySnapshot = await getDocs(q);
          const users: SetStateAction<DocumentData | null> | { id: string }[] =
            [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          setSuggestedUser(users);
        }
      } catch (error) {
        showToast("Error", "Can't get suggested users", "error");
      } finally {
        setIsLoading(false);
      }
    };

    getSuggestedUsers();
  }, [authUser?.following, authUser?.uid, showToast]);

  return { isLoading, suggestedUsers };
}
