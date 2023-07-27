import { type NextPage } from "next";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import useEmit from "~/hooks/useEmit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSubscription from "~/hooks/useSubscription";

const Match: NextPage = () => {
  const router = useRouter();
  useSession({ required: true });

  const [needQueue, setNeedQueue] = useState<boolean>(false);
  const [queued, setQueued] = useState<boolean>(false);
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
      if (queued) {
        console.log("cancelling emit");
        cancelEmit.mutate({});
      }
    };
  }, []);

  useEffect(() => {
    if (!queued && needQueue && !foundMatch) {
      console.log("request queue");
      queueEmit.mutate({ baka: "yayaya" });
      setQueued(true);
    }
  }, [queued, needQueue, queueEmit, foundMatch]);

  useSubscription("match", (match) => {
    setFoundMatch(true);
    void router.push(`/match/room`);
  });

  return <Layout title={"Match"}>Loading...</Layout>;
};

export default Match;
