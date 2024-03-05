import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useShowToast } from "../../hooks/useShowToast";
import { useAuthStore } from "../../store/authStore";
import { usePostsStore } from "../../store/userPostsStore";
import useUserProfileStore from "../../store/userProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();
  const { createUserPost, isLoading } = useCreatePost();

  async function handlePostCreation() {
    if (isLoading) return;
    if (!selectedFile || !caption)
      throw new Error("You can't create post without image");
    await createUserPost(caption, selectedFile || "");
    setSelectedFile(null);
    setCaption("");
    onClose();
  }

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />

          <ModalContent bg={"black"} border={"1px solid gray"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                placeholder="Post caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                onClick={() => imageRef?.current?.click()}
                style={{
                  marginTop: "15px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                size={16}
              />
              {selectedFile && (
                <Flex
                  mt={5}
                  w={"full"}
                  position={"relative"}
                  justifyContent={"center"}
                >
                  <Image src={selectedFile} alt="Selected img" />
                  <CloseButton
                    position={"absolute"}
                    top={2}
                    right={2}
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                  />
                </Flex>
              )}
            </ModalBody>

            <ModalFooter>
              <Button isLoading={isLoading} mr={3} onClick={handlePostCreation}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostsStore((state) => state?.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);

  const createUserPost = async (caption: string, selectedFile: string) => {
    if (!selectedFile) throw new Error("You can't create post without image ");
    try {
      setIsLoading(true);
      const newPost = {
        caption: caption,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: authUser ? authUser.uid : "",
        imageURL: "",
      };
      const postRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = authUser && doc(firestore, "users", authUser?.uid);
      const imageRef = ref(storage, `posts/${postRef.id}`);

      userDocRef &&
        (await updateDoc(userDocRef, {
          posts: arrayUnion(postRef?.id),
        }));

      imageRef && (await uploadString(imageRef, selectedFile, "data_url"));
      const downloadURL = await getDownloadURL(imageRef);

      const newImage = (newPost.imageURL = downloadURL);
      if (!newImage) throw new Error("no image");

      postRef && (await updateDoc(postRef, { imageURL: newImage }));

      createPost({ ...newPost, id: postRef.id });

      addPost({ ...newPost, id: postRef.id });

      showToast("Success", "Post Created Successfully", "success");
    } catch (error) {
      showToast("Error", "Error while creating post", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { createUserPost, isLoading };
}
