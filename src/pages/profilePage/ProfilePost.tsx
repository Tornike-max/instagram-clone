import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import ProfilePostComment from "./ProfilePostComment";
import PostFooter from "../../components/FeedPosts/PostFooter";
import { CommentType, PostType } from "../../types/types";
import useUserProfileStore from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";
import { useShowToast } from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { usePostsStore } from "../../store/userPostsStore";
import { useState } from "react";
import Caption from "./Caption";

export default function ProfilePost({ post }: { post: PostType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const deletePost = usePostsStore((state) => state.deletePost);
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const showToast = useShowToast();
  const deleteUserProfilePost = useUserProfileStore(
    (state) => state.deletePost
  );

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      const userRef = authUser && doc(firestore, "users", authUser?.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      userRef &&
        (await updateDoc(userRef, {
          posts: arrayRemove(post.id),
        }));

      deletePost(post.id || "");
      deleteUserProfilePost(post.id || "");
      showToast("Success", "Post Deleted Successfully", "success");
      onClose();
    } catch (error) {
      showToast("Error", "Error while deleting post", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt={"profile post"}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={5} backgroundColor={"black"}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                flex={1.5}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={post.imageURL}
                  alt={"profile post"}
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </Flex>
              <Flex
                flex={1}
                alignItems={"stretch"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                px={4}
                w="full"
                display={{ base: "none", md: "flex" }}
              >
                <VStack>
                  <Flex
                    w="full"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex alignItems={"center"} gap={3}>
                      <Avatar src={userProfile?.profilePicURL} size="md" />
                      <Text fontWeight={"bold"}>{userProfile?.fullname}</Text>
                    </Flex>
                    <Flex alignItems={"flex-start"} pr={2}>
                      {authUser?.uid === userProfile?.uid && (
                        <Button
                          onClick={handleDeletePost}
                          _hover={{ color: "red" }}
                        >
                          <HiOutlineTrash />
                        </Button>
                      )}
                    </Flex>
                  </Flex>

                  <Divider my={4} bg={"gray.8000"} />

                  <Flex
                    w={"full"}
                    gap={4}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    maxH={"370px"}
                    overflowY={"auto"}
                  >
                    <Caption post={post} />
                    <Divider />
                    {post.comments.map((comment: CommentType) => (
                      <ProfilePostComment
                        key={comment?.createdAt}
                        comment={comment.comment}
                        userId={comment.createdBy || ""}
                        createdAt={comment.createdAt}
                      />
                    ))}
                  </Flex>
                </VStack>
                <Divider my={4} bg={"gray.8000"} />

                <Flex
                  w={"full"}
                  mb="auto"
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"end"}
                >
                  <PostFooter post={post} activeProfile={true} />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
