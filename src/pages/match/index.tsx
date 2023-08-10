/* eslint-disable react-hooks/exhaustive-deps */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useEmit from "~/hooks/useEmit";
import useSubscription from "~/hooks/useSubscription";
import { ChatTopic } from "~/server/types/message";
import Navbar from "~/components/Navbar";
import { Box, Image, VStack } from "@chakra-ui/react";
import Footer from "~/components/newchat/Footer";

import {
  FirstQuestion,
  SecondQuestion,
  ThirdQuestion,
} from "~/components/newchat/Questions";

const Match: NextPage = () => {
  const [questionPage, setQuestionPage] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [topic, setTopic] = useState<ChatTopic>(ChatTopic.ITB);
  const [isFindingFriend, setIsFindingFriend] = useState(false);
  const [needQueue, setNeedQueue] = useState<boolean>(false);
  const queued = useRef(false);
  const [foundMatch, setFoundMatch] = useState<boolean>(false);
  const router = useRouter();
  useSession({ required: true });

  const checkEmit = useEmit("checkMatch", {
    onSuccess: (data) => {
      console.log(data);
      if (data.match !== null) {
        void router.push(`/match/room`);
      } else if (data.queue !== null) {
        queued.current = true;
        setNeedQueue(false);
      } else {
        setNeedQueue(true);
      }
    },
  });
  const queueEmit = useEmit("findMatch");
  const cancelEmit = useEmit("cancelMatch");
  useEffect(() => {
    checkEmit.mutate({});
    return () => {
      if (queued.current) {
        console.log("cancelling emit");
        cancelEmit.mutate({});
      }
    };
  }, [checkEmit.mutate, cancelEmit.mutate]);

  const findMatch = () => {
    if (!queued.current && needQueue && !foundMatch) {
      console.log("request queue");
      queueEmit.mutate({
        isAnonymous: isAnonymous,
        isFindingFriend: isFindingFriend,
        topic: topic,
      });
      queued.current = true;
    }
  };

  useSubscription("match", (_) => {
    console.log("Masuk use subs");

    queued.current = false;
    setFoundMatch(true);
    void router.push(`/match/room`);
  });
  const handlePageChange = (page: number) => {
    setQuestionPage(page);
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      height="100vh"
      width="100%"
    >
      <Image
        src="/components/new-chat/background-new-chat.png"
        alt="vbg chat"
        position={"absolute"}
        height="100%"
        width="100%"
        objectFit="cover"
        zIndex={-2}
      />
      <Image
        src="/components/new-chat/bulan-new-chat.png"
        alt="Pink Decor"
        position={"absolute"}
        bottom={8}
        left={0}
        zIndex={0}
      />
      <Image
        src="/components/new-chat/smol1.png"
        alt="Komet match"
        position={"absolute"}
        bottom={10}
        left={0}
        zIndex={-1}
      />
      <Image
        src="/components/new-chat/komet.png"
        alt="Spark design"
        position={"absolute"}
        top={"10%"}
        right={0}
        zIndex={1}
      />
      <Image
        src="/components/new-chat/spark-kicik.png"
        alt="Spark Match"
        position={"absolute"}
        top={0}
        left={0}
        zIndex={-1}
      />
      <Image
        src="/components/new-chat/komet2.png"
        alt="Komet 2"
        position={"absolute"}
        top={"30%"}
        left={0}
      />
      <Navbar/>

      <VStack
        minH="60vh"
        width="100%"
        marginTop={"0px"}
        justifyContent={"center"}
        zIndex={4}
      >
        {questionPage === 1 && (
          <FirstQuestion
            handlePageChange={handlePageChange}
            setIsAnonymous={setIsAnonymous}
          />
        )}
        {questionPage === 2 && (
          <SecondQuestion
            handlePageChange={handlePageChange}
            setTopic={setTopic}
            topic={topic}
          />
        )}
        {questionPage === 3 && (
          <ThirdQuestion
            handlePageChange={handlePageChange}
            findMatch={findMatch}
            setIsFindingFriend={setIsFindingFriend}
            isFindingFriend={isFindingFriend}
          />
        )}
        <Footer />
      </VStack>
    </Box>
  );
};

export default Match;
