import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { type Message, type UserMatch } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "~/components/Image";
import Navbar from "~/components/Navbar";
import Divider from "~/components/chat/Divider";
import Footer from "~/components/chat/Footer";
import Header from "~/components/chat/Header";
import Messages from "~/components/chat/Messages";
import useEmit from "~/hooks/useEmit";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { api } from "~/utils/api";

const Room: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession({ required: true });
  const [match, setMatch] = useState<UserMatch | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const client = api.useContext();

  const checkMatch = useEmit("checkMatch", {
    onSuccess: (data) => {
      if (data.match !== null) {
        setMatch(data.match);
      } else {
        void router.push("/match");
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
    setTimeout(() => bottomRef.current?.scrollIntoView(), 150);
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
      void client.messageAnonymous.chatHeader.invalidate();
      if (match) {
        if (data.endedAt !== null) {
          setMatch(null);
          void router.push("/");
        }
      }
    },
    [match, messageQuery]
  );

  const askReveal = useEmit("askReveal");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useSubscription(
    "askReveal",
    (data, askReveal) => {
      if (match) {
        if (askReveal) {
          if (data.isRevealed) {
            toast({
              title: "Yay temenmu uda reveal profil nih!",
            });
          } else {
            onOpen();
          }
        } else {
          toast({
            title: "Temanmu menolak reveal profil :(",
          });
        }
      }
    },
    [match, messageQuery]
  );

  const handleAskReveal = (choice: boolean) => {
    onClose();
    if (match) {
      askReveal.mutate({ agree: choice });
    }
  };

  const messageEmit = useEmit("anonymousMessage");

  return (
    <Layout title="Chat">
      {match === null ? (
        <Flex
          w={"full"}
          h={"100vh"}
          justifyContent={"center"}
          position={"relative"}
          flexDir={"column"}
          alignItems={"center"}
          bgImage={"/components/anon_chat_page/anon_match_bg.png"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          overflowY={"hidden"}
        >
          <Flex position={"absolute"} top={0}>
            <Navbar currentPage={"Chat"} />
          </Flex>
          <Image
            src="/components/anon_chat_page/anon_comet.png"
            width={254}
            height={254}
            alt="comet"
          />
          <Heading size={"H3"} fontWeight={400} color={"yellow.5"}>
            {" "}
            MATCHING UP{" "}
          </Heading>
        </Flex>
      ) : (
        <>
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="black">
                Kamu direquest untuk reveal profil nih!
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleAskReveal(true)}
                >
                  Yes
                </Button>
                <Button variant="ghost" onClick={() => handleAskReveal(false)}>
                  No
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Flex
            w="100%"
            h="100vh"
            pos={"relative"}
            backgroundImage="/components/chat_page/chat_bg.png"
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
            overflowY={"hidden"}
          >
            <Flex
              w={"100%"}
              h="100%"
              flexDir="column"
              justifyContent={"space-between"}
            >
              <Header
                name="Anonymous"
                image={undefined}
                isTyping={currentlyTyping}
                isAnon={true}
                handleClick={() => router.back()}
              />
              <Divider />

              <Messages
                messages={messages ?? []}
                hasPreviousPage={hasPreviousPage}
                fetchPreviousPage={() => void fetchPreviousPage()}
                isFetchingPreviousPage={isFetchingPreviousPage}
                bottomRef={bottomRef}
              />

              <Divider />
              <Flex>
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
    </Layout>
  );
};

export default Room;
