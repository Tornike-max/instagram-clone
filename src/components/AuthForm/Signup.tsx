import {
  VStack,
  Input,
  Button,
  Image,
  InputGroup,
  InputRightAddon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useSignUpWithEmailAndPassword } from "../../hooks/useSignUpWithEmailAndPassword";

type InputTypes = {
  email: string;
  password: string;
  username: string;
  fullname: string;
};

export default function Signup() {
  const [isShowing, setIsShowing] = useState(false);
  const { signUp, error, loading } = useSignUpWithEmailAndPassword();
  const { register, handleSubmit, reset } = useForm<InputTypes>();

  const onSubmit: SubmitHandler<InputTypes> = async (data) => {
    if (!data) return;
    await signUp(data);
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
        <Input
          placeholder="Username"
          type="text"
          fontSize={14}
          size="sm"
          {...register("username", {
            required: "This Field Is Required",
          })}
        />
        <Input
          placeholder="Full Name"
          type="text"
          fontSize={14}
          size="sm"
          {...register("fullname", {
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

        {error && (
          <Alert status="error" fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
          </Alert>
        )}

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
          Sign up
        </Button>
      </VStack>
    </form>
  );
}
