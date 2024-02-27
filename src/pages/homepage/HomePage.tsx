import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

export default function HomePage() {
  return (
    <Container maxW={"container.xl"}>
      <Flex gap={10}>
        <Box flex={2} py={10} my={4}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={20}
          my={4}
          height={"400px"}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
}
