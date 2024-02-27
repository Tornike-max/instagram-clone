import { Flex, Text, VStack } from "@chakra-ui/react";
// import SuggestedUser from "./SuggestedUser";
import SuggestedHeader from "./SuggestedHeader";

export default function SuggestedUsers() {
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
      {/* <SuggestedUser
        name="Ozbeta"
        followers={1392}
        avatar={"https://bit.ly/dan-abramov"}
      /> */}

      <Flex w="full" justifyContent={"center"} alignItems={"center"} gap={1}>
        <Text>@2024 Build by</Text>
        <Text color={"blue.500"}>Tornike</Text>
      </Flex>
    </VStack>
  );
}
