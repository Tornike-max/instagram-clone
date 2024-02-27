import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function FeedPost() {
  return (
    <>
      <PostHeader />
      <Box>
        <Image borderRadius={"10px"} src={"/img1.png"} alt="user image" />
      </Box>
      <PostFooter />
    </>
  );
}
