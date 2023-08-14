import { Box, Spinner, VStack } from "@chakra-ui/react";
import type { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import type { NonAnonChatHeader } from "~/server/types/message";
import { api } from "~/utils/api";
import CardExistingChat from "./CardExistingChat";

interface existingChatProps {
  hidden: boolean;
  onNoChat: (status: boolean) => void;
}

const updatePaging = async (
  pagingArray: NonAnonChatHeader[],
  message: Message,
  sender: boolean,
  getUserData: (
    id: string
  ) => Promise<{ id: string; name: string; image: string | null }>
): Promise<NonAnonChatHeader[]> => {
  let unread = 0;
  let user: { id: string; name: string; image: string | null } | null = null;
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
      const currentUser = pagingArray[i]?.user;
      if (currentUser) {
        user = {
          id: currentUser.id,
          name: currentUser.name,
          image: currentUser.profileImage,
        };
      }
      break;
    }
  }
  if (!user) {
    const userData = await getUserData(
      sender ? message.receiverId : message.senderId
    );
    if (userData) {
      user = {
        id: userData.id,
        name: userData.name,
        image: userData.image,
      };
    }
  }
  if (!user) {
    throw new Error("User not found");
  }
  const newItem: NonAnonChatHeader = {
    lastMessage: message,
    user: {
      id: user.id,
      name: user.name,
      profileImage: user.image,
    },
    unreadMessageCount: unread,
  };
  pagingArray.unshift(newItem);
  return [...pagingArray];
};

const ExistingChat: React.FC<existingChatProps> = ({ hidden, onNoChat}) => {
  const { data: session } = useSession({ required: true });
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hardData, setHardData] = useState<NonAnonChatHeader[]>([]);
  const client = api.useContext();

  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } =
    api.message.chatHeader.useInfiniteQuery(
      {
        limit: 10,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );
  const today = new Date();
  useEffect(() => {
    if (!isLoading) {
      onNoChat(
        hardData.length === 0 &&
          data?.pages.length === 1 &&
          data?.pages[0]?.data.length === 0
      );
    }
  }, [isLoading, hardData.length, onNoChat, data?.pages]);

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

  useSubscription(
    "add",
    (post) => {
      if (
        (post.receiverId === session?.user.id ||
          post.senderId === session?.user.id) &&
        post.userMatchId === null
      ) {
        void updatePaging(
          hardData,
          post,
          post.senderId === session?.user.id,
          async (id) => {
            const userData = client.friend.getOtherUserProfile.getData({
              userId: id,
            });
            if (userData) {
              return userData;
            }
            const data = await client.friend.getOtherUserProfile.fetch({
              userId: id,
            });
            if (!data) {
              throw new Error("User not found");
            }
            return data;
          }
        )
          .then((newData) => {
            setHardData(newData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [session?.user.id, hardData]
  );

  return (
    <VStack
      spacing={5}
      w="100%"
      pb="6rem"
      maxH="80%"
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
            isSender={item.lastMessage.senderId === session?.user.id}
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
