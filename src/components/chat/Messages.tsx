import React, { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useInView } from "framer-motion";
import * as dayjs from "dayjs";

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
  const dayjs = require("dayjs");
  const timezone = require("dayjs/plugin/timezone");
  const utc = require("dayjs/plugin/utc");
  dayjs.extend(timezone);
  dayjs.extend(utc)
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
      w={"full"}
      h={"full"}
      flexDir={"column"}
      overflowY={"scroll"}
      p="3"
      sx={{
        "::-webkit-scrollbar": {
          width: "3px",
        },
        "::-webkit-scrollbar-track": {
          display: "none",
          background: "rgb(68,70,84)",
        },
        "::-webkit-scrollbar-thumb": {
          background: "rgba(217,217,227,.8)",
        },
      }}
    >
      <div ref={infinityRef} />
      {messages.map((item) => {
        if (item.senderId === session?.user.id) {
          var date = dayjs(item.createdAt).tz("Asia/Jakarta");
          var hh = date.hour();
          var mm = date.minute();
          var DD = date.date();
          var MM = date.month() + 1;
          var local = dayjs().tz("Asia/Jakarta");
          console.log(local.month(), date.month())
          return (
            <Flex key={item.id} w="100%" justify="flex-end">
              <Flex
                bg="green.5"
                color="#2D3648"
                minW="100px"
                maxW="268px"
                my="1"
                p="3"
                borderRadius={"6px"}
                flexDir={"column"}
                gap={"10px"}
              >
                <Text fontSize={"16px"} fontWeight={400}>
                  {item.message}
                </Text>
                <Flex flexDir={"row"} justify={"end"} gap={2} >
                  {
                    DD === local.date() && MM === local.month() + 1 
                    ? <Text fontSize={"12px"}> Today </Text>
                    : <Text fontSize={"12px"}> {("0" + DD ).slice(-2)}/{("0" + MM).slice(-2)} </Text>
                  }
                  <Text fontSize={"12px"}> {("0" + hh ).slice(-2)}.{("0" + mm).slice(-2)} </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        } else {
          var date = dayjs(item.createdAt).tz("Asia/Jakarta");
          var hh = date.hour();
          var mm = date.minute();
          var DD = date.date();
          var MM = date.month() + 1;
          var local = dayjs().tz("Asia/Jakarta");
          return (
            <Flex key={item.id} w="100%">
              <Flex
                bg="yellow.5"
                color="#2D3648"
                minW="100px"
                maxW="268px"
                my="1"
                p="3"
                borderRadius={"6px"}
                flexDir={"column"}
                gap={"10px"}
              >
                <Text fontSize={"16px"} fontWeight={400}>
                  {item.message}
                </Text>
                <Flex flexDir={"row"} gap={2} >
                  {
                    DD === local.date() && MM === local.month() 
                    ? <Text fontSize={"12px"}> Today </Text>
                    : <Text fontSize={"12px"}> {("0" + DD ).slice(-2)}/{("0" + MM).slice(-2)} </Text>
                  }
                  <Text fontSize={"12px"}> {("0" + hh ).slice(-2)}.{("0" + mm).slice(-2)} </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        }
      })}
      {/* <div ref={bottomRef} /> */}
    </Flex>
  );
};

export default Messages;
