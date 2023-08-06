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
  const [isMax, setIsMax] = useState(false);
  const [data, setData] = useState<UserProfile[] | undefined>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  const availFriend = api.friend.friendList.useQuery({
    status: "FRIEND",
    limit: 10,
    page: currPage,
  });

  useEffect(() => {
    if (availFriend.data && data && !isMax) {
      console.log(availFriend.data);
      setData((d) => {
        if (d) {
          if (availFriend.data.length === 0) {
            setIsMax(true);
          }
          const newData = [...d, ...availFriend.data];
          return newData;
        }
      });
    }
  }, [availFriend.data]);

  useEffect(() => {
    const vStackElement = vStackRef.current;

    const handleScroll = () => {
      if (
        vStackElement &&
        !isMax &&
        vStackElement.scrollHeight -
          vStackElement.scrollTop -
          vStackElement.clientHeight <
          75
      ) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setCurrPage((page) => page + 1);
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
  }, [isMax, currPage]);

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
      {data?.map((item, idx) => {
        return (
          <CardAddChatFromFriend
            key={idx}
            name={item.name}
            src={item.image == null ? "" : item.image}
            path={`chat/${item.id}`}
          />
        );
      })}
      {availFriend.isLoading && (
        <Box >
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
