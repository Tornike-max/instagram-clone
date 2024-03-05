import { create } from "zustand";
import { UserType, PostType } from "../types/types";

interface ProfileTypes {
  userProfile: UserType | null;
  setUserProfile: (userProfile: UserType) => void;
  addPost: (post: PostType) => void;
  deletePost: (postId: string) => void;
}

const useUserProfileStore = create<ProfileTypes>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  addPost: (post) =>
    set(
      (state: ProfileTypes): ProfileTypes => ({
        ...state,
        userProfile: {
          ...state.userProfile!,
          posts: [post?.id || "", ...(state.userProfile?.posts || [])],
        },
      })
    ),
  deletePost: (postId: string) =>
    set(
      (state: ProfileTypes): ProfileTypes => ({
        ...state,
        userProfile: {
          ...state.userProfile!,
          posts:
            state.userProfile?.posts.filter((id: string) => id !== postId) ||
            [],
        },
      })
    ),
}));

export default useUserProfileStore;
