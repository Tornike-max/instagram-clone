import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useSignOutUser } from "../../hooks/useSignOutUser";

export default function SuggestedHeader() {
  const authUser = useAuthStore((state) => state.user);
  const activeUser = useUserProfileStore((store) => store.userProfile);
  const { loading, signout } = useSignOutUser();
  return (
    <Flex
      w="full"
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={3}
    >
      <Flex alignItems={"center"} gap={1}>
        <Link
          as={RouterLink}
          to={`${authUser?.username || activeUser?.username}`}
        >
          <Avatar name="Tornike" size="lg" src={authUser?.profilePicURL} />
        </Link>
        <Link
          as={RouterLink}
          to={`${authUser?.username || activeUser?.username}`}
        >
          <Text fontSize={13} fontWeight={"bold"}>
            {authUser?.username}
          </Text>
        </Link>
      </Flex>

      <Button
        fontSize={14}
        fontWeight={"medium"}
        color="blue.400"
        _hover={{ color: "white" }}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
        isLoading={loading}
        onClick={() => signout()}
      >
        Log out
      </Button>
    </Flex>
  );
}
