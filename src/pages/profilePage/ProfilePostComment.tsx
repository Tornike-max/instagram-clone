import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function ProfilePostComment({
  comment,
  userId,
  createdAt,
}: {
  comment: string;
  userId: string;
  createdAt: number;
}) {
  const { user, isLoading } = useGetUserProfileById(userId);

  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex w="full" alignItems={"flex-start"} gap={2} mt={4}>
      <Link to={`/${user.username}`}>
        <Avatar src={user.profilePicURL} size={"md"} />
      </Link>
      <Flex
        alignItems={"flex-start"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Link to={`/${user.username}`}>
          <Text fontWeight={"bold"}>{user.username}</Text>
        </Link>
        <Text color={"gray.400"}>{timeAgo(createdAt)}</Text>
      </Flex>
      <Text
        px={4}
        fontSize={"medium"}
        textColor={"gray.200"}
        fontWeight={"bold"}
      >
        {comment}
      </Text>
    </Flex>
  );
}

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
