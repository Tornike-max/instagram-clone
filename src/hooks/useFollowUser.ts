/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { useShowToast } from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function useFollowUser(userId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  useEffect(() => {
    if (authUser) {
      const isUserFollowing = authUser && authUser?.following.includes(userId);
      setIsFollowing(isUserFollowing as boolean);
    }
  }, [authUser, authUser?.following, isFollowing, userId]);

  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(
        firestore,
        "users",
        (authUser && authUser.uid) || ""
      );
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser?.uid)
          : arrayUnion(authUser?.uid),
      });

      if (isFollowing) {
        authUser &&
          setAuthUser({
            ...authUser,
            following:
              authUser && authUser.following.filter((uid) => uid !== userId),
          });

        userProfile &&
          setUserProfile({
            ...userProfile,
            followers: userProfile?.followers.filter((uid) => uid !== userId),
          });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser?.following.filter((uid) => uid !== userId),
          })
        );
      } else {
        authUser &&
          setAuthUser({
            ...authUser,
            following: [...authUser?.following, userId],
          });

        userProfile &&
          setUserProfile({
            ...userProfile,
            followers: [...userProfile?.followers, userId],
          });

        authUser &&
          localStorage.setItem(
            "user-info",
            JSON.stringify({
              ...authUser,
              // eslint-disable-next-line no-unsafe-optional-chaining
              following: [...authUser?.following, userId],
            })
          );
      }
    } catch (error) {
      showToast("Error", "Error while follow", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, isFollowing, handleFollowUser };
}
