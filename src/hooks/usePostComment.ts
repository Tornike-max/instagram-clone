import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { usePostsStore } from "../store/userPostsStore";

export const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostsStore((state) => state.addComment);

  const handleCommentPost = async (postId: string, comment: string) => {
    if (isCommenting) return;
    setIsCommenting(true);
    const newComment = {
      comment: comment,
      createdAt: Date.now(),
      createdBy: authUser?.uid,
      postId: postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error) {
      showToast("Error", "Error while create comment", "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { handleCommentPost, isCommenting };
};
