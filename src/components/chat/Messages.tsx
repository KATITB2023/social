import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useInView } from "framer-motion";
import dayjs from "dayjs";

interface MessagesProps {
  messages: Message[];
  hasPreviousPage?: boolean;
  isFetchingPreviousPage: boolean;
  fetchPreviousPage: () => void;
  bottomRef: React.RefObject<HTMLDivElement>;
}

const Messages = ({
  messages,
  hasPreviousPage,
  isFetchingPreviousPage,
  fetchPreviousPage,
  bottomRef,
}: MessagesProps) => {
  const { data: session } = useSession({ required: true });
  const infinityRef = useRef<HTMLDivElement>(null);
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
      w={"full"}
      h={"full"}
      flexDir={"column"}
      overflowY={"scroll"}
      p="3"
      sx={{
        "::-webkit-scrollbar": {
          width: "11px",
        },
        "::-webkit-scrollbar-track": {
          display: "none",
          background: "rgb(68,70,84)",
        },
        "::-webkit-scrollbar-thumb": {
          background: "rgba(217,217,227,.8)",
          borderRadius: "full",
        },
      }}
    >
      <div ref={infinityRef} />
      {messages.map((item) => {
        if (item.senderId === session?.user.id) {
          const date = dayjs(item.createdAt).tz("Asia/Jakarta");
          const local = dayjs().tz("Asia/Jakarta");
          const messageArr = item.message.split("\n");
          return (
            <Flex key={item.id} w="100%" justify="flex-end">
              <Flex
                bg="green.5"
                position={"relative"}
                color="#2D3648"
                minW="100px"
                maxW="268px"
                my="1"
                mr="3"
                py="1"
                px="3"
                borderRadius={"6px"}
                flexDir={"column"}
                boxShadow={"0px 4px 20px 0px #00000080"}
              >
                <Image
                  pos={"absolute"}
                  top={1.5}
                  right={-2}
                  src="/components/chat_page/chat_self_ornament.svg"
                />
                {messageArr.map((m) => {
                  return (
                    <>
                      <Text fontWeight={400} fontSize={"16px"}>
                        {" "}
                        {m}{" "}
                      </Text>
                    </>
                  );
                })}
                <Flex flexDir={"row"} justify={"end"} gap={2}>
                  {date.isSame(local, "day") ? (
                    <Text fontSize={"12px"}> Today </Text>
                  ) : (
                    <Text fontSize={"12px"}>{` ${date.format("DD/MM")} `}</Text>
                  )}
                  <Text fontSize={"12px"}>{` ${date.format("HH/mm")} `}</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        } else {
          const date = dayjs(item.createdAt).tz("Asia/Jakarta");
          const local = dayjs().tz("Asia/Jakarta");
          const messageArr = item.message.split("\n");
          return (
            <Flex key={item.id} w="100%">
              <Flex
                bg="yellow.5"
                pos={"relative"}
                color="#2D3648"
                minW="100px"
                maxW="268px"
                my="1"
                ml="3"
                py="1"
                px="3"
                borderRadius={"6px"}
                flexDir={"column"}
                boxShadow={"0px 4px 20px 0px #00000080"}
              >
                <Image
                  pos={"absolute"}
                  top={1.5}
                  left={-2}
                  src="/components/chat_page/chat_partner_ornament.svg"
                />
                {messageArr.map((m) => {
                  return (
                    <>
                      <Text fontWeight={400} fontSize={"16px"}>
                        {" "}
                        {m}{" "}
                      </Text>
                    </>
                  );
                })}
                <Flex flexDir={"row"} gap={2}>
                  {date.isSame(local, "day") ? (
                    <Text fontSize={"12px"}> Today </Text>
                  ) : (
                    <Text fontSize={"12px"}>{` ${date.format("DD/MM")} `}</Text>
                  )}
                  <Text fontSize={"12px"}>{` ${date.format("HH/mm")} `}</Text>
                </Flex>
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
