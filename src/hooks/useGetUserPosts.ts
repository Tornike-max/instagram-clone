import { useEffect, useState } from "react";
import { usePostsStore } from "../store/userPostsStore";
import { useShowToast } from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { PostType } from "../types/types";

export function useGetUserPosts() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setPost, posts } = usePostsStore();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getUserPosts = async () => {
      if (!userProfile) return;
      setPost([]);
      try {
        setIsLoading(true);
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile && userProfile?.uid)
        );

        const postSnapshot = await getDocs(q);

        const posts: PostType[] = [];

        postSnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setPost(posts);
      } catch (error) {
        showToast("Error", "Error while getting posts", "error");
        setPost([]);
      } finally {
        setIsLoading(false);
      }
    };
    getUserPosts();
  }, [setPost, showToast, userProfile]);

  return { isLoading, posts };
}
