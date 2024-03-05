import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthStore } from "../../store/authStore";
import { UserType } from "../../types/types";
import { useShowToast } from "../../hooks/useShowToast";

export default function GoogleAuth({ isLogin }: { isLogin: boolean }) {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const activeUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();

  const handleGoogleAction = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", "Something went wrong!", "error");
      }

      const docRef = newUser && doc(firestore, "users", newUser.user.uid);

      if (docRef === undefined) {
        throw new Error("Error while getting data");
      }

      const docSnap = await getDoc(docRef);

      if (!newUser) {
        showToast("Error", "No user!", "error");
      }

      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userData));
        activeUser(userData as UserType);
      } else {
        const userDoc = {
          uid: newUser?.user.uid,
          username: newUser?.user.email?.split("@")[0],
          email: newUser?.user.email,
          fullname: newUser?.user.displayName,
          profilePicURL: newUser?.user.displayName,
          bio: "",
          createdAt: Date.now(),
          followers: [],
          following: [],
          posts: [],
        };
        await setDoc(
          doc(firestore, "users", newUser?.user?.uid || ""),
          userDoc
        );
        localStorage.setItem("user-info", JSON.stringify(newUser));
        activeUser(userDoc as UserType);
      }
    } catch (error) {
      showToast("Error", "Can't login new user", "error");
    }
  };

  return (
    <Flex
      cursor={"pointer"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      onClick={handleGoogleAction}
    >
      <Image src="/google.png" alt="google" w={5} />
      <Text textColor={"blue.500"} mx={2}>
        {isLogin ? "Log in with Google" : "Sign up with Google"}
      </Text>
    </Flex>
  );
}
