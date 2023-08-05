import React, { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useInView } from "framer-motion";

interface MessagesProps {
  messages: Message[];
  hasPreviousPage?: boolean;
  isFetchingPreviousPage: boolean;
  fetchPreviousPage: () => void;
}

const Messages = ({
  messages,
  hasPreviousPage,
  isFetchingPreviousPage,
  fetchPreviousPage,
}: MessagesProps) => {
  const { data: session } = useSession({ required: true });
  const infinityRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(infinityRef);
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);

  useEffect(() => {
    if (!shouldScroll && hasPreviousPage && inView && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  }, [
    inView,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    shouldScroll,
  ]);

  useEffect(() => {
    if (shouldScroll && messages.length !== 0) {
      bottomRef.current?.scrollIntoView();
      setShouldScroll(false);
    }
  }, [shouldScroll, messages.length]);

  return (
    <Flex
      w="100%"
      overflowY="auto"
      flexDirection="column"
      p="3"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <div ref={infinityRef} />
      {messages.map((item) => {
        if (item.senderId === session?.user.id) {
          return (
            <Flex key={item.id} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={item.id} w="100%">
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <div ref={bottomRef} />
    </Flex>
  );
};

export default Messages;
