import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"containter.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* left side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={"650px"} alt="phone image" />
          </Box>

          {/* right side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get The App.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={10} alt="playstore timage" />
              <Image src="/microsoft.png" h={10} alt="microsoft timage" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}
