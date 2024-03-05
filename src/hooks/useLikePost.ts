import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { usePostsStore } from "../store/userPostsStore";
import { PostType } from "../types/types";

export const useLikePost = (post: PostType) => {
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(authUser?.uid || ""));

  const likePostHandler = usePostsStore((state) => state.likePost);

  const handleLikePost = async () => {
    await updateDoc(doc(firestore, "posts", post.id || ""), {
      likes: liked ? arrayRemove(authUser?.uid) : arrayUnion(authUser?.uid),
    });
    setLiked(!liked);
    liked ? setLikes((like) => like + 1) : setLikes((like) => like - 1);
    likePostHandler(post.id || "", authUser?.uid || "");
  };

  return { liked, likes, handleLikePost };
};
