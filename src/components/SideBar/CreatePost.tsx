import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CreatePostLogo } from "../../assets/constants";

export default function CreatePost() {
  return (
    <Tooltip
      hasArrow
      label={"Create"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/createPost"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create</Box>
      </Link>
    </Tooltip>
  );
}
