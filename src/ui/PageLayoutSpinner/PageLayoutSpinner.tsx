import { Box, Spinner } from "@chakra-ui/react";

export default function PageLayoutSpinner() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      m={"auto"}
    >
      <Spinner size="xl" />
    </Box>
  );
}
