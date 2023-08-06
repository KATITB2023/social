import { Box, Spinner, VStack } from "@chakra-ui/react";
import CardExistingChat from "./CardExistingChat";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";

interface existingChatProps {
  hidden: boolean;
  onNoChat: (status: boolean) => void;
}

const ExistingChat: React.FC<existingChatProps> = ({ hidden, onNoChat }) => {
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } =
    api.message.chatHeader.useInfiniteQuery(
      {
        limit: 10,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const today = new Date();
  useEffect(() => {
    today.setHours(0, 0, 0, 0);
    onNoChat(data?.pages[0]?.data.length === 0);
  }, []);

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
      spacing={5}
      w="100%"
      pt="3vh"
      pb="13vh"
      mt="7rem"
      maxH="70%"
      overflowY="auto"
      hidden={hidden}
      ref={vStackRef}
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
            <CardExistingChat
              path={`chat/${item.user.id}`}
              key={`${idx1}-${idx2}`}
              name={item.user.name}
              src={item.user.profileImage == null ? "" : item.user.profileImage}
              text={item.lastMessage.message}
              count={item.unreadMessageCount}
              now={today}
              time={item.lastMessage.createdAt}
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

export default ExistingChat;
