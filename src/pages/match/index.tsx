import { type NextPage } from "next";
import Layout from "~/layout";
import { useSession } from "next-auth/react";
import useEmit from "~/hooks/useEmit";
import { useRouter } from "next/router";

const Match: NextPage = () => {
  const router = useRouter();
  useSession({ required: true });
  useEmit("checkMatch", {
    onSuccess: (data) => {
      if (data !== null) {
        void router.push(`/match/room/${data.id}`);
      }
    },
  });

  return <Layout title={"Match"}></Layout>;
};

export default Match;
