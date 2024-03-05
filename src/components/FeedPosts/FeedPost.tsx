import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { PostType } from "../../types/types";
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";

export default function FeedPost({ post }: { post: PostType }) {
  const { user } = useGetUserProfileById(post.createdBy || "");
  return (
    <>
      <PostHeader user={user} createdAt={post.createdAt} />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Image borderRadius={"10px"} src={post.imageURL} alt="user image" />
      </Box>
      <PostFooter post={post} creatorProfile={user} />
    </>
  );
}
