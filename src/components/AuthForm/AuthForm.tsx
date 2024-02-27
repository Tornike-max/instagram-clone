import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={"4px"} padding={5}>
        <VStack spacing={4}>
          {isLogin ? <Login /> : <Signup />}

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            my={4}
            w="full"
          >
            <Box flex={2} h={"1px"} bg={"gray.500"} />
            <Text>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.500"} />
          </Flex>

          <GoogleAuth isLogin={isLogin} />
        </VStack>
      </Box>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        border={"1px solid gray"}
        borderRadius={"4px"}
        padding={5}
      >
        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Text
          onClick={() => setIsLogin((login) => !login)}
          cursor={"pointer"}
          textColor={"blue.500"}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Text>
      </Flex>
    </>
  );
}
