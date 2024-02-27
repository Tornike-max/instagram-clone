import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";

export default function FeedPosts() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Container maxW={"container.sm"} px={2}>
      {isLoading &&
        [1, 2, 3].map((_, i) => (
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
      {!isLoading && (
        <>
          <FeedPost />
          <FeedPost />
          <FeedPost />
        </>
      )}
    </Container>
  );
}
