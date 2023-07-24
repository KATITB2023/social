import { type Message } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { api } from "~/utils/api";
import { Container, Flex } from "@chakra-ui/react";
import Header from "~/components/chat/Header";
import Divider from "~/components/chat/Divider";
import Messages from "~/components/chat/Messages";
import Footer from "~/components/chat/Footer";

const Chat: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const userPair = api.message.getUser.useQuery({ pairId }).data;

  const messageQuery = api.message.infinite.useInfiniteQuery(
    { pairId },
    {
      getPreviousPageParam: (d) => d.prevCursor,
      refetchInterval: false,
    }
  );

  // const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
  //   messageQuery;

  // List of messages that are rendered
  const [messages, setMessages] = useState(() => {
    return messageQuery.data?.pages.map((page) => page.items).flat();
  });

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
        post.receiverId === session?.user.id ||
        post.senderId === session?.user.id
      ) {
        addMessages([post]);
      }
    },
    [session]
  );

  return (
    <Layout title="Chat">
      <Container>
        <Flex
          w="100%"
          h="100vh"
          justify="center"
          align="center"
          backgroundColor={"gray.50"}
        >
          <Flex w={"100%"} h="90%" flexDir="column">
            <Header name={userPair ? userPair.nim : ""} />
            <Divider />
            <Messages messages={messages ?? []} />
            <Divider />
            <Footer />
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Chat;
