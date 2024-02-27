import {
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfilePosts from "./ProfilePosts";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGetUserProfileByUsername } from "../../hooks/useGetUserProfileByUsername";

export default function ProfilePage() {
  const { username } = useParams();
  const { userProfile, isLoading } = useGetUserProfileByUsername(
    username || ""
  );

  return (
    <Container maxW="container.lg">
      {isLoading && !userProfile && <ProfileHeaderSkeleton />}
      {!isLoading && userProfile && <ProfileHeader />}
      <ProfileTabs />
      <ProfilePosts />
    </Container>
  );
}

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};
