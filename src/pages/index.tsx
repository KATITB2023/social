import { Box, Flex } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import BackgroundAndNavbar from "~/components/feeds/BackgroundAndNavbar";
import Feed from "~/components/feeds/Feed";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

export default function FeedsPage() {
  useSession({ required: true });
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bottomView = useInView(bottomRef);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.feed.getFeeds.useInfiniteQuery(
      {},
      {
        getNextPageParam: (d) => d.nextCursor,
        refetchInterval: false,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (bottomView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((e) => console.log(e));
    }
  }, [bottomView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Layout title={"Beranda"}>
      <BackgroundAndNavbar>
        <Box>
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
        </Box>
      </BackgroundAndNavbar>
    </Layout>
  );
}
