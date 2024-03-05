import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
      if (!authUser || authUser?.following.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser?.following)
      );

      try {
        const querySnapshot = await getDocs(q);
        const feedPosts: PostType[] = [];

        querySnapshot.forEach(
          (post: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            feedPosts.push({ id: post.id, ...post.data() } as PostType);
          }
        );
        feedPosts.sort((a, b) => {
          if (a.id && b.id) {
            return a.id.localeCompare(b.id);
          }
          return 0;
        });

        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", "Error while getting posts", "error");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [authUser, setPosts, showToast]);

  return { posts, loading };
};
