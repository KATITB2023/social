import React, { useEffect, useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { useSession } from "next-auth/react";

interface MessagesProps {
  messages: Message[];
}

const Messages = ({ messages }: MessagesProps) => {
  const { data: session } = useSession({ required: true });

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
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
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
