import { Flex, Heading } from "@chakra-ui/react";
import { type Message, type UserMatch } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "~/components/Image";
import Navbar from "~/components/Navbar";
import KamuDirequest from "~/components/PopupChat/KamuDirequest";
import TemanmuMenolak from "~/components/PopupChat/TemanmuMenolak";
import YahTemanmu from "~/components/PopupChat/YahTemanmu";
import YayTemanmu from "~/components/PopupChat/YayTemenmu";
import Divider from "~/components/chat/Divider";
import Footer from "~/components/chat/Footer";
import Header from "~/components/chat/Header";
import Messages from "~/components/chat/Messages";
import ComingSoon from "~/components/screen/ComingSoon";
import { FUTUREFLAG } from "~/constant";
import useEmit from "~/hooks/useEmit";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

const Room: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const [match, setMatch] = useState<UserMatch | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const client = api.useContext();
  const [currentlyTyping, setCurrentlyTyping] = useState<boolean>(false);

  const [isSender, setSender] = useState(false);
  const [isYahTemanmu, setYahTemanmu] = useState(false);
  const [isYayTemanmu, setYayTemanmu] = useState(false);
  const [isTemanmuMenolak, setTemanmuMenolak] = useState(false);
  const [isKamuDirequest, setKamuDirequest] = useState(false);

  const closeAll = () => {
    setYahTemanmu(false);
    setYayTemanmu(false);
    setTemanmuMenolak(false);
    setKamuDirequest(false);
  };

  const updateMessageIsRead = api.message.updateIsReadByMatchId.useMutation();
  const updateOneMessageIsRead = api.message.updateOneIsRead.useMutation();
  const { data: profileData, refetch } =
    api.friend.getOtherUserProfile.useQuery(
      {
        userId:
          match === null
            ? ""
            : match.firstUserId === session?.user.id
            ? match.secondUserId
            : match.firstUserId,
      },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    if (profileData === undefined && match !== null && match.isRevealed) {
      void refetch();
    }
  }, [match, profileData, refetch]);

  const checkMatch = useEmit("checkMatch", {
    onSuccess: (resData) => {
      const match = resData.match;
      if (match !== null) {
        setMatch(match);
      } else {
        void router.push("/match");
      }
    },
  });

  useEffect(() => {
    checkMatch.mutate({});
  }, []);

  const messageQuery = api.messageAnonymous.infinite.useInfiniteQuery(
    { userMatchId: match?.id ?? "" }, // to fix
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!match?.id,
    }
  );

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = messageQuery;

  useEffect(() => {
    if (match && session?.user?.id) {
      try {
        updateMessageIsRead.mutate({
          userMatchId: match.id,
          receiverId: session.user.id,
        });
      } catch (err) {}
    }
  }, [session?.user?.id, match, updateMessageIsRead.mutate]);

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

  // Subscribe to new posts and add
  useSubscription(
    "add",
    (post) => {
      if (
        match !== null &&
        post.userMatchId !== null &&
        post.userMatchId === match.id
      ) {
        addMessages([post]);
        setCurrentlyTyping(false);
        if (match && session && post.receiverId === session.user.id) {
          try {
            updateOneMessageIsRead.mutate({ messageId: post.id });
          } catch (err) {}
        }
      }
    },
    [match, messageQuery]
  );

  useSubscription(
    "anonIsTyping",
    (data) => {
      if (match) {
        if (data === match.firstUserId || data === match.secondUserId) {
          setCurrentlyTyping(true);
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(
            () => setCurrentlyTyping(false),
            1000
          );
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
          if (!isSender) {
            setYahTemanmu(true);
          } else {
            setMatch(null);
            void router.push("/chat");
          }
          setSender(false);
        }
      }
    },
    [match, messageQuery]
  );

  useSubscription(
    "askReveal",
    (data, askReveal) => {
      if (match) {
        if (askReveal) {
          setMatch(data);
          if (data.isRevealed) {
            setYayTemanmu(true);
          } else {
            setKamuDirequest(true);
          }
        } else {
          setTemanmuMenolak(true);
        }
      }
    },
    [match, messageQuery]
  );

  const messageEmit = useEmit("anonymousMessage");

  if (!FUTUREFLAG) {
    return <ComingSoon />;
  }

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
            <Navbar />
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
                name={
                  profileData !== undefined && match.isRevealed
                    ? profileData.name
                    : "Anonymous"
                }
                image={
                  profileData !== undefined && match.isRevealed
                    ? profileData.image
                    : undefined
                }
                isTyping={currentlyTyping}
                isAnon={true}
                handleClick={() => void router.push("/chat")}
              />
              <Divider />

              <Messages
                messages={messages ?? []}
                hasNextPage={hasNextPage}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />

              <Divider />
              <Flex>
                <Footer
                  onSubmit={(text) => {
                    messageEmit.mutate({ message: text });
                  }}
                  receiverId={match.id}
                  isAnon={true}
                  isAnonRevealed={
                    !!(profileData !== undefined && match.isRevealed)
                  }
                  setSender={setSender}
                />
              </Flex>
            </Flex>
          </Flex>

          {/* For Popup */}
          <Flex
            position={"fixed"}
            display={
              isYahTemanmu ||
              isYayTemanmu ||
              isTemanmuMenolak ||
              isKamuDirequest
                ? "block"
                : "none"
            }
            w={"100vw"}
            h={"100vh"}
            top={0}
            left={0}
            zIndex={3}
          >
            <Flex
              position={"relative"}
              w={"full"}
              h={"full"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {/* Black overlay */}
              <Flex
                position={"absolute"}
                w={"100vw"}
                h={"100vh"}
                bg={"black"}
                opacity={0.7}
                onClick={() => closeAll}
              />

              <Flex zIndex={4}>
                {isYahTemanmu && <YahTemanmu setMatch={setMatch} />}
                {isYayTemanmu && <YayTemanmu setOpen={setYayTemanmu} />}
                {isTemanmuMenolak && (
                  <TemanmuMenolak setOpen={setTemanmuMenolak} />
                )}
                {isKamuDirequest && (
                  <KamuDirequest setOpen={setKamuDirequest} match={match} />
                )}
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Layout>
  );
};

export default Room;
