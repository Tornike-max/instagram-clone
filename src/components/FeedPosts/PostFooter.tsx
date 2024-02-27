import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

export default function PostFooter({
  activeProfile,
}: {
  activeProfile?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((like) => like - 1);
    } else {
      setLiked(true);
      setLikes((like) => like + 1);
    }
  };
  return (
    <Box mb={10} w={"full"}>
      <Flex justifyContent={"start"} alignItems={"center"} gap={2} p={2}>
        <button
          onClick={() => handleLike()}
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
      {!activeProfile && (
        <Flex
          alignItems={"center"}
          width={"full"}
          justifyContent={"start"}
          gap={2}
          px={2}
        >
          <Text pb={2}>Tornike</Text>
          <Text pb={2} textColor={"gray.400"} fontSize={"small"}>
            Feeling good
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
        {!activeProfile && (
          <Text cursor={"pointer"} fontSize={"medium"} textColor={"gray.500"}>
            View all 1,000 comments
          </Text>
        )}

        <InputGroup>
          <Input variant="flushed" placeholder="Add a comment..." />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}
