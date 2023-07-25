import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { type Message, type UserMatch } from "@prisma/client";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { Container, Flex } from "@chakra-ui/react";
import Header from "~/components/chat/Header";
import Divider from "~/components/chat/Divider";
import Messages from "~/components/chat/Messages";
import Footer from "~/components/chat/Footer";
import useEmit from "~/hooks/useEmit";

const Room: NextPage = () => {
  useSession({ required: true });
  const [match, setMatch] = useState<UserMatch | null>(null);

  useEmit("checkMatch", {
    onSuccess: (data) => {
      if (data !== null) {
        setMatch(data);
      }
    },
  });

  // List of messages that are rendered
  const [messages, setMessages] = useState<Message[]>([]);

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
      }
    },
    [match]
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
                <Header name="Anonymous" isTyping={true} />
                <Divider />
                <Messages messages={messages ?? []} />
                <Divider />
                <Footer
                  onSubmit={(text) => messageEmit.mutate({ message: text })}
                />
              </Flex>
            </Flex>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Room;
