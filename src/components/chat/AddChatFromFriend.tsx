import { Box, Spinner, VStack } from "@chakra-ui/react";
import CardAddChatFromFriend from "./CardAddChatFromFriend";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "~/server/types/user-profile";
import { api } from "~/utils/api";

interface AddChatFromFriendProps {
  hidden: boolean;
}

const AddChatFromFriend: React.FC<AddChatFromFriendProps> = ({ hidden }) => {
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } =
    api.friend.friendList.useInfiniteQuery(
      {
        status: "FRIEND",
        limit: 10,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  // console.log(data);

  useEffect(() => {
    const vStackElement = vStackRef.current;

    const handleScroll = () => {
      if (
        vStackElement &&
        hasNextPage &&
        vStackElement.scrollHeight -
          vStackElement.scrollTop -
          vStackElement.clientHeight <
          75
      ) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          void fetchNextPage();
        }, 250);
      }
    };

    if (vStackElement) {
      // Attach the scroll event listener to the VStack element
      vStackElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener and timeout on component unmount
    return () => {
      if (vStackElement) {
        vStackElement.removeEventListener("scroll", handleScroll);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasNextPage]);

  return (
    <VStack
      ref={vStackRef}
      spacing={5}
      w="100%"
      mt="9rem"
      maxH="80%"
      overflowY="auto"
      pb="15vh"
      pt="3vh"
      hidden={hidden}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px", // Set the width of the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent", // Customize the track color
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#FFFC83", // Customize the thumb color
          borderRadius: "9999px", // Make the thumb rounded
        },
      }}
    >
      {data?.pages.map((page, idx1) => {
        return page.data.map((item, idx2) => {
          return (
            <CardAddChatFromFriend
              key={`${idx1}-${idx2}`}
              name={item.name}
              src={item.image == null ? "" : item.image}
              path={`chat/${item.id}`}
            />
          );
        });
      })}

      {isLoading && (
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="white"
            color="yellow.4"
            size="lg"
          />
        </Box>
      )}
    </VStack>
  );
};

export default AddChatFromFriend;
