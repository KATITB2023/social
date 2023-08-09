import { Box, Flex, Image, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ReactionButton from "~/components/feeds/ReactionButton";
import Feed from "~/components/feeds/Feed";

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
    <Box position="relative" minHeight="100vh" height="100%" maxW={375}>
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
      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
}
export default function FeedsPage() {
  useSession({ required: true });

  const feedsApi = api.feed.getFeeds.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <BackgroundAndNavbar>
      <Flex flexDirection={"column"} justifyContent={"center"}>
        {feedsApi?.data?.pages
          .flatMap((page) => page.data)
          .map((feed) => {
            return (
              <Feed
                key={feed.id}
                reactions={feed.reactions}
                attachmentUrl={feed.attachmentUrl}
                createdAt={feed.createdAt}
                text={feed.text}
                id = {feed.id}
              />
            );
          })}
      </Flex>
    </BackgroundAndNavbar>
  );
}
