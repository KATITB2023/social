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

const Chat: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const userPair = api.message.getUser.useQuery({ pairId }).data;

  const messageQuery = api.message.infinite.useInfiniteQuery(
    { pairId },
    {
      getPreviousPageParam: (d) => d.prevCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

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
        h="100%"
        position={"relative"}
        backgroundImage="url('/background.svg')"
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        overflowY={"hidden"}
      >
        {/* Ornaments for Backgrounds */}
        <Image
          src="/components/chat_page/chat_aura.svg"
          position={"absolute"}
          left={0}
          top={"379px"}
        />
        <Image
          src="/components/chat_page/chat_moon.svg"
          position={"absolute"}
          left={0}
          top={"549px"}
        />
        <Image
          src="/components/chat_page/chat_comet_left.svg"
          position={"absolute"}
          left={0}
          top={"303px"}
        />
        <Image
          src="/components/chat_page/chat_comet_right.svg"
          position={"absolute"}
          right={0}
          top={"116px"}
        />
        <Image
          src="/components/chat_page/chat_spark_kicik.svg"
          position={"absolute"}
          left={0}
          top={0}
        />

        {/* Room chat */}
        <Flex
          w={"100%"}
          h="100vh"
          flexDir="column"
          justifyContent={"space-between"}
          zIndex={1}
        >
          <Header
            name={userPair ? userPair.nim : ""}
            isTyping={currentlyTyping}
          />
          {/* <Divider /> */}
          <Messages
            messages={messages ?? []}
            hasPreviousPage={hasPreviousPage}
            fetchPreviousPage={() => void fetchPreviousPage()}
            isFetchingPreviousPage={isFetchingPreviousPage}
          />

          {/* <Divider /> */}
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
