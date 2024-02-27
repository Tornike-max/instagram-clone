import { Avatar, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";
import EditProfile from "../../components/Profile/EditProfile";
import { useFollowUser } from "../../hooks/useFollowUser";

export default function ProfileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid || ""
  );

  const isUserVisitingOwnProfile =
    authUser && authUser.uid === userProfile?.uid;

  const isUserVisitingOtherProfile =
    authUser && authUser.uid !== userProfile?.uid;

  return (
    <Flex
      w={"full"}
      mt="50px"
      justifyContent={"flex-start"}
      alignItems={"center"}
      px={2}
      py={2}
      gap={2}
    >
      <Avatar
        name="Tornike"
        size={{ base: "xl", md: "2xl" }}
        src={userProfile?.profilePicURL}
      />
      <Flex px={2} flexDirection={"column"} alignItems={"center"} gap={1}>
        <Flex
          w={"full"}
          gap={3}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Text fontSize={"larger"} fontWeight={"bold"}>
            {userProfile?.fullname}
          </Text>
          {isUserVisitingOwnProfile && (
            <Button
              fontSize={"large"}
              fontWeight={"bold"}
              backgroundColor={"gray.200"}
              textColor={"gray.700"}
              onClick={onOpen}
              _hover={{ textColor: "gray.800", backgroundColor: "gray.100" }}
            >
              Edit Profile
            </Button>
          )}

          {isUserVisitingOtherProfile && (
            <Button
              fontSize={"large"}
              fontWeight={"bold"}
              backgroundColor={"blue.500"}
              textColor={"white"}
              _hover={{ backgroundColor: "blue.600" }}
              onClick={handleFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Flex>

        <Flex
          w={"full"}
          gap={3}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text fontSize={"medium"}>{userProfile?.posts.length} Posts</Text>
          <Text fontSize={"medium"}>
            {userProfile?.followers.length} Followers
          </Text>
          <Text fontSize={"medium"}>
            {userProfile?.following.length} Following
          </Text>
        </Flex>

        <Flex
          w={"full"}
          gap={3}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text fontSize={"medium"} fontWeight={"bold"}>
            {userProfile?.username}
          </Text>
        </Flex>

        <Flex
          w={"full"}
          gap={3}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text fontSize={"medium"}>{userProfile?.bio || "No Bio"}</Text>
        </Flex>
      </Flex>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}
