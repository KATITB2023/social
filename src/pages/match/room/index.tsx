import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { type Message, type UserMatch } from "@prisma/client";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { Container, Flex } from "@chakra-ui/react";
import Header from "~/components/chat/Header";
import Divider from "~/components/chat/Divider";
import Messages from "~/components/chat/Messages";
import Footer from "~/components/chat/Footer";
import useEmit from "~/hooks/useEmit";
import { api } from "~/utils/api";
import AnonFooterMenu from "~/components/chat/AnonFooterMenu";

const Room: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const [match, setMatch] = useState<UserMatch | null>(null);

  const checkMatch = useEmit("checkMatch", {
    onSuccess: (data) => {
      if (data !== null) {
        setMatch(data);
      }
    },
  });

  const updateMessageIsRead = api.message.updateIsReadByMatchId.useMutation();
  const updateOneMessageIsRead = api.message.updateOneIsRead.useMutation();

  useEffect(() => {
    checkMatch.mutate({});
  }, []);

  const messageQuery = api.messageAnonymous.infinite.useInfiniteQuery(
    { userMatchId: match !== null ? match.id : "" }, // to fix
    {
      getPreviousPageParam: (d) => d.prevCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    messageQuery;

  useEffect(() => {
    if (match && session) {
      try {
        updateMessageIsRead.mutate({
          userMatchId: match.id,
          receiverId: session.user.id,
        });
      } catch (err) {}
    }
  }, []);

  // List of messages that are rendered
  const [messages, setMessages] = useState<Message[]>([]);

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

  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

  // Subscribe to new posts and add
  useSubscription(
    "add",
    (post) => {
      if (
        match !== null &&
        post.userMatchId !== null &&
        post.userMatchId === match.id
      ) {
        setMessages((prev) => [...prev, post]);
        if (match && session && post.receiverId === session.user.id) {
          try {
            updateOneMessageIsRead.mutate({ messageId: post.id });
          } catch (err) {}
        }
      }
    },
    [match, messageQuery]
  );

  const [currentlyTyping, setCurrentlyTyping] = useState<boolean>(false);

  useSubscription(
    "anonIsTyping",
    (data) => {
      if (match) {
        if (
          data.includes(match.firstUserId) ||
          data.includes(match.secondUserId)
        ) {
          setCurrentlyTyping(true);
        } else {
          setCurrentlyTyping(false);
        }
      }
    },
    [match, messageQuery]
  );

  useSubscription(
    "endMatch",
    (data) => {
      if (match) {
        if (data.endedAt !== null) {
          setMatch(null);
          router.push("/");
        }
      }
    },
    [match, messageQuery]
  );

  const messageEmit = useEmit("anonymousMessage");

  return (
    <Layout title="Chat">
      <Container>
        {match === null ? (
          "Loading"
        ) : (
          <>
            <Flex
              w="100%"
              h="100vh"
              justify="center"
              align="center"
              backgroundColor={"gray.50"}
            >
              <Flex w={"100%"} h="90%" flexDir="column">
                <Header name="Anonymous" isTyping={currentlyTyping} />
                <Divider />
                <Messages
                  messages={messages ?? []}
                  hasPreviousPage={hasPreviousPage}
                  fetchPreviousPage={() => void fetchPreviousPage()}
                  isFetchingPreviousPage={isFetchingPreviousPage}
                />
                <Divider />
                <Flex>
                  <AnonFooterMenu />
                  <Footer
                    onSubmit={(text) => messageEmit.mutate({ message: text })}
                    receiverId={match.id}
                    isAnon={true}
                  />
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Room;
