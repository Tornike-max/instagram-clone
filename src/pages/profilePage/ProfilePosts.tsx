import { Box, Grid, Skeleton } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import { useGetUserPosts } from "../../hooks/useGetUserPosts";

export default function ProfilePosts() {
  const { isLoading, posts } = useGetUserPosts();

  return (
    <>
      <Grid
        w="full"
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={4}
        columnGap={4}
        my={4}
      >
        {isLoading ? (
          [0, 1, 2].map((_, indx) => (
            <Skeleton key={indx} height={"300px"}>
              <div>contents wrapped</div>
            </Skeleton>
          ))
        ) : (
          <>
            {!isLoading &&
              posts.map((post) => <ProfilePost key={post.id} post={post} />)}
          </>
        )}
      </Grid>
      {!isLoading && posts.length === 0 && (
        <Box
          w="full"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"large"}
        >
          No Posts Found 😥
        </Box>
      )}
    </>
  );
}
