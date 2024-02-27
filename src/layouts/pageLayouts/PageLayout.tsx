import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import PageLayoutSpinner from "../../ui/PageLayoutSpinner/PageLayoutSpinner";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !loading && !user && pathname !== "/auth";

  if (!user && loading) return <PageLayoutSpinner />;

  return (
    <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
      {/* sidebar */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}
      {canRenderNavbar && <Navbar />}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
}
