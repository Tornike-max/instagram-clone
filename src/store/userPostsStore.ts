/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CommentType, PostType } from "../types/types";

interface UserPostType {
  posts: PostType[];
  createPost: (post: PostType) => void;
  setPost: (posts: PostType[]) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, newComment: CommentType) => void;
  likePost: (postId: string, userId: string) => void;
}

export const usePostsStore = create<UserPostType>((set) => ({
  posts: [],
  setPost: (posts: PostType[]) => set({ posts }),
  createPost: (post: PostType) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  deletePost: (id: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  addComment: (postId: string, newComment: CommentType) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post?.comments ?? []), newComment],
          };
        }
        return post;
      }),
    })),

  likePost: (postId: string, userId: string) =>
    set((state) => ({
      posts: state?.posts?.map((post) => {
        if (post.id === postId) {
          if (post.likes.includes(userId)) {
            return {
              ...post,
              likes: post.likes.filter((uid) => uid !== userId),
            };
          } else {
            return {
              ...post,
              likes: [...post.likes, userId],
            };
          }
        }
        return post;
      }),
    })),
}));
