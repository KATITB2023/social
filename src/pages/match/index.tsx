import { type NextPage } from "next";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import useEmit from "~/hooks/useEmit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import { ChatTopic } from "~/server/types/message";
import Navbar from "~/components/Navbar";
import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Footer from "~/components/newchat/Footer";

const Match: NextPage = () => {
  const router = useRouter();
  // useSession({ required: true });

  // const [needQueue, setNeedQueue] = useState<boolean>(false);
  // const [queued, setQueued] = useState<boolean>(false);
  // const [foundMatch, setFoundMatch] = useState<boolean>(false);

  // const checkEmit = useEmit("checkMatch", {
  //   onSuccess: (data) => {
  //     if (data !== null) {
  //       void router.push(`/match/room`);
  //     } else {
  //       setNeedQueue(true);
  //     }
  //   },
  // });

  // const queueEmit = useEmit("findMatch");
  // const cancelEmit = useEmit("cancelMatch");

  // useEffect(() => {
  //   checkEmit.mutate({});

  //   return () => {
  //     if (queued) {
  //       console.log("cancelling emit");
  //       cancelEmit.mutate({});
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!queued && needQueue && !foundMatch) {
  //     console.log("request queue");
  //     queueEmit.mutate({
  //       isAnonymous: true,
  //       isFindingFriend: true,
  //       topic: ChatTopic.ITB,
  //     });
  //     setQueued(true);
  //   }
  // }, [queued, needQueue, queueEmit, foundMatch]);

  // useSubscription("match", (match) => {
  //   setFoundMatch(true);
  //   void router.push(`/match/room`);
  // });
  return (
    <Box position={"relative"} minH={"100vh"} height="100%">
      <Image
        src="newchatvbg.svg"
        alt="vbg chat"
        position={"absolute"}
        height="100%"
        width="100%"
        objectFit="cover"
      />
      <VStack height="100vh" width="100%">
        <Navbar />
        <Footer />
      </VStack>
    </Box>
  );
};

export default Match;
