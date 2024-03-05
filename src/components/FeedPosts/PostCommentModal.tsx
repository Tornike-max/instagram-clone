import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CommentType, PostType } from "../../types/types";
import { useAuthStore } from "../../store/authStore";
import React, { useEffect, useRef, useState } from "react";
import { usePostComment } from "../../hooks/usePostComment";

export default function PostCommentModal({
  isOpen,
  onClose,
  post,
}: {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
}) {
  const authUser = useAuthStore((state) => state.user);
  const [comment, setComment] = useState("");
  const { handleCommentPost, isCommenting } = usePostComment();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (!scrollContainerRef.current) return;

      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    };

    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      console.log("first");
      handleCommentPost(post.id || "", comment);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flexDirection={"column"}
          gap={"2px"}
        >
          <Flex
            w="full"
            flexDir={"column"}
            justifyContent={"start"}
            maxHeight={"250px"}
            overflowY={"auto"}
            ref={scrollContainerRef}
          >
            {post.comments
              ? post.comments.map((comment: CommentType) => (
                  <Box
                    width={"full"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    key={comment?.createdAt}
                    borderBottom={"1px solid"}
                    borderColor={"gray.800"}
                    gap={2}
                    py={2}
                    px={3}
                  >
                    <Flex
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Avatar src={authUser?.profilePicURL} size="sm" />
                    </Flex>
                    <Text>{comment?.comment}</Text>
                  </Box>
                ))
              : "No Comments"}
          </Flex>
        </ModalBody>

        <form onSubmit={(e) => handleSubmitComment(e)}>
          <ModalFooter
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            gap={2}
            py={2}
          >
            <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
              <Input
                placeholder="Add Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Flex>
            <Flex w={"full"} justifyContent={"end"} alignItems={"center"}>
              <Button type="button" colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" isLoading={isCommenting} variant="ghost">
                Comment
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
