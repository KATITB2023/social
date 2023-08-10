import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Feed from "~/components/feeds/Feed";
import { useInView } from "framer-motion";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";

export default function FeedsPage() {
  useSession({ required: true });
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bottomView = useInView(bottomRef);

  const { data, hasNextPage, fetchNextPage } =
    api.feed.getFeeds.useInfiniteQuery(
      {},
      {
        getNextPageParam: (d) => d.nextCursor,
        refetchInterval: false,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (bottomView && hasNextPage) {
      fetchNextPage().catch((e) => console.log(e));
    }
  }, [bottomView, hasNextPage, fetchNextPage]);

  return (
    <Layout title={"Beranda"}>
      <BackgroundAndNavbar>
        <Flex flexDirection={"column"} justifyContent={"center"}>
          {data?.pages
            .flatMap((page) => page.data)
            .map((feed) => {
              return (
                <Feed
                  key={feed.id}
                  reactions={feed.reactions}
                  attachmentUrl={feed.attachmentUrl}
                  createdAt={feed.createdAt}
                  text={feed.text}
                  id={feed.id}
                  read={feed.read}
                />
              );
            })}
          <div ref={bottomRef}></div>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
