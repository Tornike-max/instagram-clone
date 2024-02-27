import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import { useSignOutUser } from "../../hooks/useSignOutUser";
import SidebarItems from "./Sidebaritems";

export default function SideBar() {
  const { loading, signout } = useSignOutUser();

  async function handleLogout() {
    await signout();
  }
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position="sticky"
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex flexDirection={"column"} gap={10} w={"full"} height={"full"}>
        <Link
          to="/"
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          to="/"
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} cursor={"pointer"} gap={4}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          openDelay={200}
          display={{ base: "block", md: "none" }}
          gap={4}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
            display={"flex"}
            cursor={"pointer"}
          >
            <BiLogOut size={25} />
            <Button
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              display={{ base: "none", md: "block" }}
              isLoading={loading ? true : false}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
}
