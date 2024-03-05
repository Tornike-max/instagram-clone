import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { timeAgo } from "../../utils/timeAgo";
import { Link as RouterLink } from "react-router-dom";
import { useFollowUser } from "../../hooks/useFollowUser";

export default function PostHeader({
  user,
  createdAt,
}: {
  user: DocumentData;
  createdAt: number;
}) {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(user.uid);
  return (
    <Flex
      width={"full"}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={2}
      px={2}
      border={"1px solid gray"}
      borderBottom={"none"}
      borderRadius={"10px"}
    >
      <Box fontSize={12} display={"flex"} alignItems={"center"} gap={2}>
        <Link
          display={"flex"}
          alignItems={"center"}
          gap={2}
          as={RouterLink}
          to={`/${user?.username}`}
        >
          <Avatar cursor={"pointer"} src={user?.profilePicURL} size={"sm"} />
          <Text>{user?.fullname}</Text>
        </Link>
        <Box height={"1px"} bg={"gray.500"} width={"5px"}></Box>
        <Text textColor={"gray.400"}>{timeAgo(createdAt)}</Text>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Button
          textColor={"blue.400"}
          _hover={{ color: "white" }}
          cursor={"pointer"}
          background={"none"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
}
