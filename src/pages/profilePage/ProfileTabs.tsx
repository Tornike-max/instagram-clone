import { Box, Flex, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function ProfileTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getActiveTab = searchParams.get("active") || "posts";

  const handleChangeTab = (value: string) => {
    searchParams.set("active", value);
    setSearchParams(searchParams);
  };
  return (
    <Flex
      mt={16}
      borderTop={"1px"}
      borderColor={"gray.800"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={10}
      fontSize={"larger"}
      textColor={"gray.300"}
    >
      <Box
        _hover={{ textColor: "white" }}
        cursor={"pointer"}
        onClick={() => handleChangeTab("posts")}
        borderTop={getActiveTab === "posts" ? "2px solid white" : ""}
      >
        <Text>POSTS</Text>
      </Box>
      <Box
        _hover={{ textColor: "white" }}
        cursor={"pointer"}
        onClick={() => handleChangeTab("saved")}
        borderTop={getActiveTab === "saved" ? "2px solid white" : ""}
      >
        <Text>SAVED</Text>
      </Box>
      <Box
        _hover={{ textColor: "white" }}
        cursor={"pointer"}
        onClick={() => handleChangeTab("likes")}
        borderTop={getActiveTab === "likes" ? "2px solid white" : ""}
      >
        <Text>LIKES</Text>
      </Box>
    </Flex>
  );
}
