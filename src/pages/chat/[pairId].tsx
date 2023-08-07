import { type Message } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { api } from "~/utils/api";
import { Container, Flex, Image, Box } from "@chakra-ui/react";
import Header from "~/components/chat/Header";
import Divider from "~/components/chat/Divider";
import Messages from "~/components/chat/Messages";
import Footer from "~/components/chat/Footer";
import useEmit from "~/hooks/useEmit";
import Navbar from "~/components/Navbar";

// const userPair = api.message.getUser.useQuery({ pairId }).data;

const Chat: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const userPair = api.friend.getOtherUserProfile.useQuery({ userId: pairId }).data;


  const messageQuery = api.message.infinite.useInfiniteQuery(
    { pairId },
    {
      getPreviousPageParam: (d) => d.prevCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const updateMessageIsRead = api.message.updateIsRead.useMutation();
  const updateOneMessageIsRead = api.message.updateOneIsRead.useMutation();

  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    messageQuery;

  // List of messages that are rendered
  const [messages, setMessages] = useState<Message[]>([]);

  const [currentlyTyping, setCurrentlyTyping] = useState<boolean>(false);

  // Function to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Message[]) => {
    setMessages((current) => {
      const map: Record<Message["id"], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;

      for (const msg of incoming ?? []) map[msg.id] = msg;

      return Object.values(map).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    });
    // --------
  }, []);

  useEffect(() => {
    if (session) {
      try {
        updateMessageIsRead.mutate({
          receiverId: session.user.id,
          senderId: pairId,
        });
      } catch (err) {}
    }
  }, []);

  // When new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

  // Subscribe to new posts and add
  useSubscription(
    "add",
    (post) => {
      if (
        ((post.receiverId === session?.user.id && post.senderId === pairId) ||
          (post.senderId === session?.user.id && post.receiverId === pairId)) &&
        post.userMatchId === null
      ) {
        addMessages([post]);
        if (
          session &&
          post.receiverId === session.user.id &&
          post.senderId === pairId
        ) {
          try {
            updateOneMessageIsRead.mutate({
              messageId: post.id,
            });
          } catch (err) {}
        }
      }
    },
    [session, messageQuery]
  );

  useSubscription(
    "whoIsTyping",
    (data) => {
      if (data.includes(pairId)) {
        setCurrentlyTyping(true);
      } else {
        setCurrentlyTyping(false);
      }
    },
    [session, messageQuery]
  );

  const messageEmit = useEmit("message");

  return (
    <Layout title="Chat">
      <Flex
        w="100%"
        h="100vh"
        pos={"relative"}
        backgroundImage="/components/chat_page/chat_bg.png"
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        overflowY={"hidden"}
      >

        {/* Room chat */}
        <Flex
          w={"100%"}
          h="100%"
          flexDir="column"
          justifyContent={"space-between"}
          zIndex={1}
        >
          <Header
            name={userPair ? userPair.name : ""}
            isTyping={currentlyTyping}
          />
          <Divider />

          <Messages
            messages={messages ?? []}
            hasPreviousPage={hasPreviousPage}
            fetchPreviousPage={() => void fetchPreviousPage()}
            isFetchingPreviousPage={isFetchingPreviousPage}
          />

          <Divider />
          <Footer
            onSubmit={(text) => {
              messageEmit.mutate({ message: text, receiverId: pairId });
            }}
            receiverId={pairId}
            isAnon={false}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Chat;
