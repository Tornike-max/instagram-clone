import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import ProfilePostComment from "./ProfilePostComment";
import PostFooter from "../../components/FeedPosts/PostFooter";

export default function ProfilePost({ img }: { img: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                120{" "}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                63{" "}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={img}
          alt={"profile post"}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={5} backgroundColor={"black"}>
            <Flex
              gap={2}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex flex={1.5}>
                <Image
                  src={img}
                  alt={"profile post"}
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </Flex>
              <Flex
                flex={1}
                alignItems={"stretch"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                px={4}
                w="full"
                display={{ base: "none", md: "flex" }}
              >
                <VStack>
                  <Flex
                    w="full"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex alignItems={"center"} gap={3}>
                      <Avatar src={"https://bit.ly/dan-abramov"} size="md" />
                      <Text fontWeight={"bold"}>Tornike Ozbetelashvili</Text>
                    </Flex>
                    <Flex alignItems={"flex-start"} pr={2}>
                      <Button _hover={{ color: "red" }}>
                        <HiOutlineTrash />
                      </Button>
                    </Flex>
                  </Flex>

                  <Divider my={4} bg={"gray.8000"} />

                  <Flex
                    w={"full"}
                    gap={4}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    maxH={"370px"}
                    overflowY={"auto"}
                  >
                    <ProfilePostComment src={"https://bit.ly/dan-abramov"} />
                    <ProfilePostComment
                      src={"https://bit.ly/tioluwani-kolawole"}
                    />
                    <ProfilePostComment src={"https://bit.ly/kent-c-dodds"} />
                    <ProfilePostComment src={"https://bit.ly/ryan-florence"} />
                    <ProfilePostComment src={"https://bit.ly/ryan-florence"} />
                    <ProfilePostComment src={"https://bit.ly/ryan-florence"} />
                    <ProfilePostComment src={"https://bit.ly/ryan-florence"} />
                    <ProfilePostComment src={"https://bit.ly/ryan-florence"} />
                  </Flex>
                </VStack>
                <Divider my={4} bg={"gray.8000"} />

                <Flex w={"full"} mt="auto" height={"100%"}>
                  <PostFooter activeProfile={true} />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
