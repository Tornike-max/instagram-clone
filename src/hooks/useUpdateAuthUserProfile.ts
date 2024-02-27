import { EditAuthUserType, UserType } from "../types/types";
import { useAuthStore } from "../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useShowToast } from "./useShowToast";

export function useUpdateAuthUserProfile() {
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();
  const usersRef = doc(firestore, "users", authUser?.uid || "");
  const storageRef = ref(storage, `profilePics/${authUser?.uid}`);

  let URL = "";

  const updateUserProfile = async (
    data: EditAuthUserType,
    selectedFile: string | null
  ) => {
    if (selectedFile) {
      await uploadString(storageRef, selectedFile, "data_url");
      URL = await getDownloadURL(ref(storage, `profilePics/${authUser?.uid}`));
    }

    if (!URL) {
      showToast("Error", "Something went wrong", "error");
    }
    const newData = {
      ...authUser,
      username: data.username || authUser?.username,
      fullname: data.fullname || authUser?.fullname,
      bio: data.bio || authUser?.bio,
      profilePicURL: URL || authUser?.profilePicURL,
    };
    await updateDoc(usersRef, newData);
    localStorage.setItem("user-info", JSON.stringify({ ...authUser, newData }));
    setAuthUser(newData as UserType);
    setUserProfile(newData as UserType);
  };

  return { updateUserProfile, authUser };
}
