/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { PostType } from "../types/types";

interface UserPostType {
  posts: PostType[];
  createPost: (post: PostType) => void;
  setPost: (posts: PostType[]) => void;
  deletePost: (id: string) => void;
}

export const usePostsStore = create<UserPostType>((set) => ({
  posts: [],
  setPost: (posts: PostType[]) => set({ posts }), // Corrected parameter type
  createPost: (post: PostType) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  deletePost: (id: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
}));
