import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Feed from "~/components/feeds/Feed";
import { useInView } from "framer-motion";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

interface Feed {
  date: string;
  caption: string;
  link: string;
}

interface FeedsPageProps {
  feeds: Feed[];
}

function BackgroundAndNavbar({ children }: childrenOnlyProps) {
  return (
    <Box
      display={"flex"}
      position="relative"
      minHeight="100vh"
      height="100%"
      maxW={375}
    >
      <Image
        src="background-feeds.svg"
        alt="background"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column" width={"100%"}>
        <Navbar currentPage="Feeds" />
        {children}
      </Flex>
    </Box>
  );
}
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
              />
            );
          })}
        <div ref={bottomRef}></div>
      </Flex>
    </BackgroundAndNavbar>
  );
}
