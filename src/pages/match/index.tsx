import { type NextPage } from "next";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import useEmit from "~/hooks/useEmit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSubscription from "~/hooks/useSubscription";
import { ChatTopic } from "~/server/types/message";
import Navbar from "~/components/Navbar";
import {
  Box,
  ButtonGroup,
  Container,
  Button,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Footer from "~/components/newchat/Footer";
import Eclipse from "~/components/newchat/Eclipse";
import FirstNewChatButton from "~/components/newchat/Button";
import QuestionBox from "~/components/newchat/Box";
import { FirstQuestion, SecondQuestion, ThirdQuestion } from "~/components/newchat/Questions";
import Loading from "~/components/newchat/Loading";

const Match: NextPage = () => {
  const [questionPage, setQuestionPage] = useState(1);
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
  const handlePageChange = (page : number)=>{
    setQuestionPage(page)
  }
  return (
    <Box position={"relative"} minH={"100vh"} height="100%">
      <Image
        src="newchatvbg.svg"
        alt="vbg chat"
        position={"absolute"}
        height="100%"
        width="100%"
        objectFit="cover"
        zIndex={-2}
      />
      <Image
        src="bulanmatch.svg"
        alt="Pink Decor"
        position={"absolute"}
        bottom={8}
        left={0}
        zIndex={0}
      />
      <Image
        src="smol1Match.svg"
        alt="Komet match"
        position={"absolute"}
        bottom={10}
        left={0}
        zIndex={-1}
      />
      <Image
        src="kometMatch.svg"
        alt="Spark design"
        position={"absolute"}
        top={"10%"}
        right={0}
        zIndex={1}
      />
      <Image
        src="sparkMatch.svg"
        alt="Spark Match"
        position={"absolute"}
        top={0}
        left={0}
        zIndex={-1}
      />
      <Image
        src="komet2Match.svg"
        alt="Komet 2"
        position={"absolute"}
        top={"30%"}
        left={0}
      />
      <VStack height="95vh" width="100%" justifyContent={"center"} zIndex={4}>
        <Navbar />
         {questionPage === 1 && <FirstQuestion handlePageChange={handlePageChange} />}
         {questionPage === 2 && <SecondQuestion handlePageChange={handlePageChange} />}
         {questionPage === 3 && <ThirdQuestion handlePageChange={handlePageChange} />}
        <Footer />
      </VStack>
    </Box>
  );
};

export default Match;
