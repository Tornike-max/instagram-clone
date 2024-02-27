import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { UserType } from "../types/types";

export function useGetUserProfileByUsername(username: string) {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          showToast("Error", "User Not Found", "error");
        }
        querySnapshot.forEach((doc) => {
          setUserProfile(doc.data() as UserType);
        });
      } catch (error) {
        console.error(error);
        showToast("Error", "Somethign went wrong!", "error");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [setUserProfile, showToast, username]);

  return { userProfile, isLoading };
}
