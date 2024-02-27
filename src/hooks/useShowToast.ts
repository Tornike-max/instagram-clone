import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export function useShowToast() {
  const toast = useToast();

  const showToast = useCallback(
    (title: string, description: string, status: "success" | "error") => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
}
