import { Grid, Skeleton } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import { useEffect, useState } from "react";

export default function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Grid
      w="full"
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={4}
      columnGap={4}
      my={4}
    >
      {isLoading ? (
        [1, 2, 3, 4].map((_, indx) => (
          <Skeleton key={indx} height={"310px"}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
            <div>won't be visible</div>
            <div>won't be visible</div>
            <div>won't be visible</div>
          </Skeleton>
        ))
      ) : (
        <>
          <ProfilePost img="/img1.png" />
          <ProfilePost img="/img2.png" />
          <ProfilePost img="/img3.png" />
        </>
      )}
    </Grid>
  );
}
