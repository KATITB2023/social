import { Box, Spinner, VStack } from "@chakra-ui/react";
import CardExistingChat from "./CardExistingChat";
import { api } from "~/utils/api";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import useSubscription from "~/hooks/useSubscription";
import type { NonAnonChatHeader } from "~/server/types/message";
import type { Message, Profile } from "@prisma/client";

interface existingChatProps {
  hidden: boolean;
  onNoChat: (status: boolean) => void;
}

const updatePaging = (
  pagingArray: NonAnonChatHeader[],
  message: Message,
  id: string,
  name: string,
  image: string | null,
  sender: boolean
): NonAnonChatHeader[] => {
  let unread = 0;
  for (let i = 0; i < pagingArray.length; i++) {
    if (
      (pagingArray[i]?.lastMessage.senderId === message.senderId &&
        pagingArray[i]?.lastMessage.receiverId === message.receiverId) ||
      (pagingArray[i]?.lastMessage.senderId === message.receiverId &&
        pagingArray[i]?.lastMessage.receiverId === message.senderId)
    ) {
      if (!sender) {
        unread = pagingArray[i]?.unreadMessageCount ?? 0;
        unread += 1;
      }
      pagingArray.splice(i, 1);
      break;
    }
  }
  const newItem: NonAnonChatHeader = {
    lastMessage: message,
    user: {
      id: id,
      name: name,
      profileImage: image,
    },
    unreadMessageCount: unread,
  };
  // console.log('test')
  // console.log(unread)
  pagingArray.unshift(newItem);
  return pagingArray;
};

const ExistingChat: React.FC<existingChatProps> = ({ hidden, onNoChat }) => {
  const { data: session } = useSession({ required: true });
  // const utils = createTRPCContext();
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hardData, setHardData] = useState<NonAnonChatHeader[]>([]);
  

  const { data, isFetching, isError, fetchNextPage, hasNextPage, refetch } =
    api.message.chatHeader.useInfiniteQuery(
      {
        limit: 10,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );
  const [userIdFetched, setUserIdFetched] = useState<string>("");
  const getUserProfile = api.friend.getOtherUserProfile.useQuery(
    {
      userId: userIdFetched,
    },
    {
      enabled: userIdFetched !== "",
    }
  );

  const [newMessage, setNewMessage] = useState<Message>();

  const today = new Date();
  useEffect(() => {
    today.setHours(0, 0, 0, 0);
    onNoChat(data?.pages[0]?.data.length === 0);
    void refetch();
    // console.log('refetch when moundted again')
  }, []);

  useEffect(() => {
    let newHardData: NonAnonChatHeader[] = [];
    const numPages = data?.pages?.length ?? 0;
    for (let i = 0; i < numPages; i++) {
      const eachData = data?.pages[i]?.data;
      if (eachData) {
        newHardData = newHardData.concat(eachData);
      }
    }
    setHardData(newHardData);
    // console.log('refetch when data changed')
  }, [data]);

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

  useEffect(() => {
    // let ignore = false;

    if (getUserProfile.data && newMessage ) {
      setHardData((prevData) => {
        const updatedPage = updatePaging(
          prevData,
          newMessage,
          getUserProfile.data?.id ?? "",
          getUserProfile.data?.name ?? "",
          getUserProfile.data?.image ?? null,
          newMessage.senderId === session?.user.id
        );
        console.log("masuk");
        return updatedPage;
      });
    }
    // return () => {ignore = true};
  }, [newMessage, getUserProfile.data]);

  useSubscription(
    "add",
    (post) => {
      if (
        (post.receiverId === session?.user.id ||
          post.senderId === session?.user.id) &&
        post.userMatchId === null
      ) {
        setUserIdFetched(
          post.receiverId === session?.user.id ? post.senderId : post.receiverId
        );
        setNewMessage(post);
      }
    },
    [session]
  );

  return (
    <VStack
      spacing={5}
      w="100%"
      pt="3vh"
      pb="18vh"
      // mt="7rem"
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
      {hardData?.map((item, idx) => {
        return (
          <CardExistingChat
            path={`chat/${item.user.id}`}
            key={idx}
            name={item.user.name}
            src={item.user.profileImage == null ? "" : item.user.profileImage}
            text={item.lastMessage.message}
            count={item.unreadMessageCount}
            now={today}
            time={item.lastMessage.createdAt}
          />
        );
      })}
      {isFetching && hasNextPage && (
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
