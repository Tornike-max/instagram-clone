import {
  Button,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useLogin } from "../../hooks/useLogin";

type InputTypes = {
  email: string;
  password: string;
};

export default function Login() {
  const [isShowing, setIsShowing] = useState(false);
  const { register, handleSubmit, reset } = useForm<InputTypes>();
  const { login, loading } = useLogin();

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    if (!data) return;
    login(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Image src="/logo.png" alt="logo" />
        <Input
          placeholder="Email"
          type="email"
          fontSize={14}
          size="sm"
          {...register("email", {
            required: "This Field Is Required",
          })}
        />
        <InputGroup size="sm">
          <Input
            placeholder="Password"
            type={isShowing ? "text" : "password"}
            fontSize={14}
            size="sm"
            {...register("password", {
              required: "This Field Is Required",
            })}
          />
          <InputRightAddon
            cursor={"pointer"}
            _hover={{ backgroundColor: "gray.700" }}
            onClick={() => setIsShowing((show) => !show)}
          >
            {isShowing ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
          </InputRightAddon>
        </InputGroup>
        <Button
          w={"100%"}
          colorScheme="blue"
          size={"sm"}
          fontSize={"14px"}
          px={3}
          py={2}
          type="submit"
          isLoading={loading ? true : false}
        >
          Log In
        </Button>
      </VStack>
    </form>
  );
}
