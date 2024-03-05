import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { PostType } from "../types/types";
import { useShowToast } from "./useShowToast";
import { usePostsStore } from "../store/userPostsStore";
import { useAuthStore } from "../store/authStore";

export const useGetFeedPosts = () => {
  const [loading, setLoading] = useState(false);
  const setPosts = usePostsStore((state) => state.setPost);
  const posts = usePostsStore((state) => state.posts);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      if (authUser?.following.length === 0) {
        setPosts([]);
        return;
      }
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser?.following)
      );

      try {
        const querySnapshot = await getDocs(q);
        const feedPosts: PostType[] | { id: string }[] = [];

        querySnapshot.forEach((post) => {
          feedPosts.push({ id: post.id, ...post.data() });
        });
        feedPosts.sort((a, b) => a.id - b.id);

        setPosts(feedPosts as PostType[]);
      } catch (error) {
        showToast("Error", "Error while getting posts", "error");
      } finally {
        setLoading(false);
      }
    };
    if (authUser) getPosts();
  }, [authUser, setPosts, showToast]);

  return { posts, loading };
};
