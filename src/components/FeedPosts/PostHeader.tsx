import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function PostHeader() {
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
        <Avatar cursor={"pointer"} src="/img1.png" size={"sm"} />
        <Text>Tornike</Text>
        <Box height={"1px"} bg={"gray.500"} width={"5px"}></Box>
        <Text textColor={"gray.400"}>1w</Text>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Text
          textColor={"blue.400"}
          _hover={{ color: "white" }}
          cursor={"pointer"}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
}
