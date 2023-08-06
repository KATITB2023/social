/* eslint-disable react-hooks/exhaustive-deps */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useEmit from "~/hooks/useEmit";
import useSubscription from "~/hooks/useSubscription";
import Layout from "~/layout";
import { ChatTopic } from "~/server/types/message";

const Match: NextPage = () => {
  const router = useRouter();
  useSession({ required: true });

  const [needQueue, setNeedQueue] = useState<boolean>(false);
  const queued = useRef(false);
  const [foundMatch, setFoundMatch] = useState<boolean>(false);

  const checkEmit = useEmit("checkMatch", {
    onSuccess: (data) => {
      if (data !== null) {
        void router.push(`/match/room`);
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

  useEffect(() => {
    if (!queued.current && needQueue && !foundMatch) {
      console.log("request queue");
      queueEmit.mutate({
        isAnonymous: true,
        isFindingFriend: true,
        topic: ChatTopic.ITB,
      });
      queued.current = true;
    }
  }, [needQueue, queueEmit.mutate, foundMatch]);

  useSubscription("match", (match) => {
    queued.current = false;
    setFoundMatch(true);
    void router.push(`/match/room`);
  });

  return <Layout title={"Match"}>Loading...</Layout>;
};

export default Match;
