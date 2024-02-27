"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { EditAuthUserType } from "../../types/types";
import { useUpdateAuthUserProfile } from "../../hooks/useUpdateAuthUserProfile";
import { useShowToast } from "../../hooks/useShowToast";

export default function EditProfile({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { updateUserProfile, authUser } = useUpdateAuthUserProfile();

  const { register, handleSubmit } = useForm<EditAuthUserType>({
    defaultValues: {
      username: authUser ? authUser.username : "",
      fullname: authUser ? authUser?.fullname : "",
      bio: authUser ? authUser?.bio : "",
    },
  });
  const showToast = useShowToast();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { handleImageChange, selectedFile } = usePreviewImg();

  const onSubmit: SubmitHandler<EditAuthUserType> = (data) => {
    console.log({ ...data, profilePicURL: selectedFile });
    if (!data.bio && !data.fullname && !data.username && !selectedFile) {
      showToast("Error", "There is no data to update", "error");
    }
    updateUserProfile(data, selectedFile);
    onClose();
  };
  console.log(authUser);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={"black"}
        boxShadow={"xl"}
        border={"1px solid gray"}
        mx={3}
      >
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex bg={"black"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                rounded={"xl"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  User Profile Edit
                </Heading>
                <FormControl id="userName">
                  <FormLabel>User Icon</FormLabel>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile || authUser?.profilePicURL}
                      >
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button
                        onClick={() => imageRef?.current?.click()}
                        w="full"
                      >
                        Change Image
                      </Button>
                    </Center>
                    <Input
                      hidden
                      type="file"
                      ref={imageRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>
                <FormControl id="fullname" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Full Name"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    {...register("fullname")}
                  />
                </FormControl>
                <FormControl id="userName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    placeholder="UserName"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    {...register("username")}
                  />
                </FormControl>
                <FormControl id="bio" isRequired>
                  <FormLabel>Bio</FormLabel>
                  <Input
                    placeholder="Bio"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    {...register("bio")}
                  />
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
