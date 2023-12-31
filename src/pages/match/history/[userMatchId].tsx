import { type NextPage } from "next";
import { type Message } from "@prisma/client";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Flex } from "@chakra-ui/react";
import Header from "~/components/chat/Header";
import Divider from "~/components/chat/Divider";
import Messages from "~/components/chat/Messages";

export const getServerSideProps = withSession({ force: true });

const ChatHistory: NextPage = () => {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentlyTyping = false;

  const userMatchId = router.query.userMatchId as string;
  const messageQuery = api.messageAnonymous.infinite.useInfiniteQuery(
    { userMatchId: userMatchId },
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!userMatchId,
    }
  );

  const profileData = api.messageAnonymous.matchInfo.useQuery({
    userMatchId,
  }).data;

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = messageQuery;

  // List of messages that are rendered
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessages = useCallback((incoming?: Message[]) => {
    setMessages((current) => {
      const map: Record<Message["id"], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;

      for (const msg of incoming ?? []) map[msg.id] = msg;

      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    });
    setTimeout(() => bottomRef.current?.scrollIntoView(), 150);
  }, []);

  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

  return (
    <Layout title={"Riwayat Percakapan"}>
      <Flex
        w="100%"
        h="100vh"
        pos={"relative"}
        backgroundImage="/components/chat_page/chat_bg.png"
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        overflowY={"hidden"}
        pb={10}
      >
        <Flex
          w={"100%"}
          h="100%"
          flexDir="column"
          justifyContent={"space-between"}
        >
          <Header
            name={profileData?.name}
            image={profileData?.profileImage}
            isTyping={currentlyTyping}
            isAnon={true}
            handleClick={() => void router.push("/match/history")}
            profileClick={() => {
              if (profileData && profileData.name !== "Anonymous") {
                void router.push(`/friend-profile/${profileData.id}`);
              }
            }}
          />
          <Divider />

          <Messages
            messages={messages ?? []}
            hasNextPage={hasNextPage}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isFinished={true}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ChatHistory;
