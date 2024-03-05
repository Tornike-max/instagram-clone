import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useGetUserProfileById = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<DocumentData>({});
  const showToast = useShowToast();

  useEffect(() => {
    const getUserById = async () => {
      setIsLoading(true);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          const userProfile = userRef.data();
          setUser(userProfile);
        } else {
          throw new Error("Error while getting user profile");
        }
      } catch (error) {
        showToast("Error", "Error while getting user profile", "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserById();
  }, [showToast, userId]);

  return { isLoading, user };
};
