import { Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import { useSuggestedUsers } from "../../hooks/useSuggestedUsers";
import SuggestedUser from "./SuggestedUser";
import { DocumentData } from "firebase/firestore";
import useUserProfileStore from "../../store/userProfileStore";

export default function SuggestedUsers() {
  const { isLoading, suggestedUsers } = useSuggestedUsers();
  const setUser = useUserProfileStore((state) => state.setUserProfile);

  if (isLoading) return null;

  return (
    <VStack py={8} px={2} gap={4}>
      <SuggestedHeader />
      <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
        <Text fontSize={14} fontWeight={"bold"} color="gray.500">
          Suggestet for you
        </Text>
        <Text
          fontSize={13}
          fontWeight={"bold"}
          _hover={{ color: "gray.500" }}
          cursor={"pointer"}
        >
          See all
        </Text>
      </Flex>
      {suggestedUsers &&
        suggestedUsers.map((user: DocumentData | null) => (
          <SuggestedUser user={user} setUser={setUser} key={user?.uid} />
        ))}

      <Flex w="full" justifyContent={"center"} alignItems={"center"} gap={1}>
        <Text>@2024 Build by</Text>
        <Text color={"blue.500"}>Tornike</Text>
      </Flex>
    </VStack>
  );
}
