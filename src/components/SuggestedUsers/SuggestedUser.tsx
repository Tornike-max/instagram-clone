import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useAuthStore } from "../../store/authStore";
import { UserType } from "../../types/types";

export default function SuggestedUser({
  user,
  setUser,
}: {
  user: DocumentData | null;
  setUser: React.Dispatch<React.SetStateAction<DocumentData | UserType>>;
}) {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    user?.uid
  );

  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();

    user &&
      setUser({
        ...user,
        followers: isFollowing
          ? user.followers.filter(
              (follower: { uid: string | undefined }) =>
                follower.uid !== authUser?.uid
            )
          : [...user.followers, authUser],
      });
  };
  return (
    <Flex width="full" justifyContent={"space-between"} alignItems={"center"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar cursor={"pointer"} size="md" src={user?.profilePicURL} />
        <Box
          alignItems={"start"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={1}
        >
          <Text fontSize={"bold"}>{user?.username}</Text>
          <Text fontSize={13} color="gray.400">
            {user?.followers.length} Followers
          </Text>
        </Box>
      </Flex>

      {authUser?.uid !== user?.uid && (
        <Button
          fontSize={13}
          bg="transparent"
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
}
