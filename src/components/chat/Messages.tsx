import { Flex, Image, Text } from "@chakra-ui/react";
import { type Message } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface MessagesProps {
  messages: Message[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isFinished: boolean;
}

const Messages = ({
  messages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isFinished,
}: MessagesProps) => {
  const { data: session } = useSession({ required: true });
  const [lastMessageRef, setLastMessageRef] = useState<HTMLDivElement | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingUp = useRef(false);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const container = containerRef.current;
    function listener() {
      if (container) {
        // check if containerRef scrolled max to the top in flex column reverse
        if (
          Math.abs(
            container.scrollTop -
              container.clientHeight +
              container.scrollHeight
          ) < 3
        ) {
          fetchNextPage();
        }
      }
    }

    container?.addEventListener("scroll", listener);
    return () => container?.removeEventListener("scroll", listener);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    function listener() {
      if (container) {
        isScrollingUp.current = container.scrollTop < 0;
      }
    }
    container?.addEventListener("scroll", listener);
    return () => container?.removeEventListener("scroll", listener);
  }, []);

  useEffect(() => {
    if (
      lastMessageRef &&
      (!isScrollingUp.current || messages[0]?.senderId === session?.user.id)
    ) {
      lastMessageRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMessageRef, messages[0]?.senderId, session?.user.id]);

  const lastMessageDate = messages[messages.length - 1]?.createdAt
    .getDate()
    .toString();
  const lastMessageMonth = messages[messages.length - 1]
    ? (messages[messages.length - 1]!.createdAt.getMonth() + 1).toString()
    : "0";

  return (
    <Flex
      w={"full"}
      h={"full"}
      flexDir={"column-reverse"}
      overflowY={"auto"}
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
      ref={containerRef}
    >
      {/* Description for chat history */}
      {isFinished && messages.length > 0 && (
        <Flex
          maxW={"75%"}
          bgColor={"whiteAlpha.400"}
          mx={"auto"}
          px={4}
          py={1}
          borderRadius={"full"}
          mt={4}
        >
          {messages[messages.length - 1] && (
            <Text textAlign={"center"}>
              Pembicaraan berakhir pada {dayjs(messages[messages.length - 1]?.createdAt).format("DD/MM/YYYY")}
            </Text>
          )}
        </Flex>
      )}

      {isFinished && messages.length === 0 && (
        <Flex
          maxW={"75%"}
          bgColor={"whiteAlpha.400"}
          mx={"auto"}
          px={4}
          py={1}
          borderRadius={"full"}
          mt={4}
        >
          <Text textAlign={"center"}>
            {" "}
            Tidak ada pembicaraan pada ruangan ini.{" "}
          </Text>
        </Flex>
      )}

      {messages.map((item, idx) => {
        if (item.senderId === session?.user.id) {
          const date = dayjs(item.createdAt).tz("Asia/Jakarta");
          const local = dayjs().tz("Asia/Jakarta");
          return (
            <Flex
              key={item.id}
              w="100%"
              justify="flex-end"
              ref={idx === 0 ? setLastMessageRef : null}
            >
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
                  alt="Chat ornament"
                  pos={"absolute"}
                  top={1.5}
                  right={-2}
                  src="/components/chat_page/chat_self_ornament.svg"
                />
                <Text
                  fontWeight={400}
                  fontSize={"16px"}
                  whiteSpace={"pre-line"}
                >
                  {item.message}
                </Text>
                <Flex flexDir={"row"} justify={"end"} gap={2}>
                  {date.isSame(local, "day") ? (
                    <Text fontSize={"12px"}> Today </Text>
                  ) : (
                    <Text fontSize={"12px"}>{` ${date.format("DD/MM")} `}</Text>
                  )}
                  <Text fontSize={"12px"}>{` ${date.format("HH:mm")} `}</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        } else {
          const date = dayjs(item.createdAt).tz("Asia/Jakarta");
          const local = dayjs().tz("Asia/Jakarta");
          return (
            <Flex
              key={item.id}
              w="100%"
              ref={idx === 0 ? setLastMessageRef : null}
            >
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
                  alt="Chat partner ornament"
                  pos={"absolute"}
                  top={1.5}
                  left={-2}
                  src="/components/chat_page/chat_partner_ornament.svg"
                />
                <Text
                  fontWeight={400}
                  fontSize={"16px"}
                  whiteSpace={"pre-line"}
                >
                  {item.message}
                </Text>
                <Flex flexDir={"row"} gap={2}>
                  {date.isSame(local, "day") ? (
                    <Text fontSize={"12px"}> Today </Text>
                  ) : (
                    <Text fontSize={"12px"}>{` ${date.format("DD/MM")} `}</Text>
                  )}
                  <Text fontSize={"12px"}>{` ${date.format("HH:mm")} `}</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        }
      })}
    </Flex>
  );
};

export default Messages;
