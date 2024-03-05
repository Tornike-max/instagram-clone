import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { usePostComment } from "../../hooks/usePostComment";
import { PostType } from "../../types/types";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useLikePost } from "../../hooks/useLikePost";
import { DocumentData } from "firebase/firestore";
import PostCommentModal from "./PostCommentModal";

export default function PostFooter({
  creatorProfile,
  isProfilePage = false,
  post,
}: {
  creatorProfile?: DocumentData;
  isProfilePage?: boolean;
  post: PostType;
}) {
  const navigate = useNavigate();
  const { handleCommentPost, isCommenting } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const { liked, likes, handleLikePost } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleComment = async () => {
    if (!authUser) {
      navigate("/auth");
      return;
    }
    handleCommentPost(post.id || "", comment);
    setComment("");
  };

  return (
    <Box mb={10} w={"full"}>
      <Flex justifyContent={"start"} alignItems={"center"} gap={2} p={2}>
        <button
          onClick={() => handleLikePost()}
          style={{ fontSize: "30px", cursor: "pointer" }}
        >
          {liked ? <HiHeart style={{ color: "red" }} /> : <HiOutlineHeart />}
        </button>
        <span style={{ fontSize: "30px" }}>
          <HiOutlineChatBubbleOvalLeft />
        </span>
      </Flex>
      <Text px={2} pb={2}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <Flex
          alignItems={"center"}
          width={"full"}
          justifyContent={"start"}
          gap={2}
          px={2}
        >
          <Text pb={2}>{creatorProfile?.username}</Text>
          <Text pb={2} textColor={"gray.400"} fontSize={"small"}>
            {post.caption}
          </Text>
        </Flex>
      )}

      <Flex
        alignItems={"Start"}
        w={"full"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={2}
        px={2}
        pb={4}
      >
        {!isProfilePage && post.comments.length > 0 && (
          <Text
            onClick={onOpen}
            cursor={"pointer"}
            fontSize={"medium"}
            textColor={"gray.500"}
          >
            View all {creatorProfile?.comments?.length} comments
          </Text>
        )}
        <PostCommentModal isOpen={isOpen} onClose={onClose} post={post} />

        <InputGroup>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="flushed"
            placeholder="Add a comment..."
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              isLoading={isCommenting}
              onClick={handleComment}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}
