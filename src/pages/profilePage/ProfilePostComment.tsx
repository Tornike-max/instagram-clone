import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function ProfilePostComment({ src }: { src: string }) {
  return (
    <Flex w="full" alignItems={"flex-start"} gap={2} mt={4}>
      <Avatar src={src} size={"md"} />
      <Flex
        alignItems={"flex-start"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Text fontWeight={"bold"}>Tornike</Text>
        <Text color={"gray.400"}>1d agp</Text>
      </Flex>
      <Text
        px={4}
        fontSize={"medium"}
        textColor={"gray.200"}
        fontWeight={"bold"}
      >
        nice images from unsplash
      </Text>
    </Flex>
  );
}
