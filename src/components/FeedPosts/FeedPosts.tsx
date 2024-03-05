import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { useGetFeedPosts } from "../../hooks/useGetFeedPosts";

export default function FeedPosts() {
  const { posts, loading } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} px={2}>
      {loading &&
        [0, 1, 2].map((_, i) => (
          <VStack w={"full"} key={i} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w="200px" />
                <Skeleton height="10px" w="200px" />
              </VStack>
            </Flex>
            <Skeleton w="full">
              <Box height={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!loading && posts.length > 0 && (
        <>
          {posts.map((post) => (
            <FeedPost post={post} />
          ))}
        </>
      )}
      {!loading && posts.length === 0 && (
        <>
          <Text fontSize={"medium"} color="red.400">
            It Looks like you don't have any friend
          </Text>
        </>
      )}
    </Container>
  );
}
