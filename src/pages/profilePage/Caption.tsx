import { Flex, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { PostType } from "../../types/types";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ post }: { post: PostType }) => {
  const user = useUserProfileStore((state) => state.userProfile);
  return (
    <Flex w="full" alignItems={"flex-start"} gap={2} mt={4}>
      <Link to={`/${user?.username}`}>
        <Avatar src={user?.profilePicURL} size={"md"} />
      </Link>
      <Flex
        alignItems={"flex-start"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Link to={`/${user?.username}`}>
          <Text fontWeight={"bold"}>{user?.username}</Text>
        </Link>
        <Text color={"gray.400"}>{timeAgo(post.createdAt)}</Text>
      </Flex>
      <Text
        px={4}
        fontSize={"medium"}
        textColor={"gray.200"}
        fontWeight={"bold"}
      >
        {post.caption}
      </Text>
    </Flex>
  );
};

export default Caption;
