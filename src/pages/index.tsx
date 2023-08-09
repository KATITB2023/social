import { Box, Flex, Image, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import ReactionButton from "~/components/feeds/ReactionButton";

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

const getFeedPostedMessage = (feedDate: Date) => {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);

  const now = dayjs();
  const postDate = dayjs.utc(feedDate);
  const diffInMinutes = now.diff(postDate, "minute");
  const diffInDays = now.diff(postDate, "day");
  const diffInHours = now.diff(postDate, "hour");

  if (diffInMinutes < 60) {
    return "Baru diunggah";
  } else if (diffInHours < 24) {
    return `Diunggah ${diffInHours} jam yang lalu`;
  } else {
    return `Diunggah ${diffInDays} hari yang lalu`;
  }
};

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

type InfiniteFeeds = {
  data: {
    reactions: {
      [k: string]: {
        count: number;
        reacted: boolean;
      };
    };
    read: boolean;
    id: number;
    text: string;
    attachmentUrl: string | null;
    createdAt: Date;
  };
  nextCursor: number | undefined;
};
export default function FeedsPage() {
  useSession({ required: true });
  const isVideoLink = (link: string) =>
    /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/.test(link);
  const isImageLink = (link: string) => /\.(jpeg|jpg|png|gif)$/i.test(link);

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
      <Flex flexDirection={"column"} justifyContent={"center"} mt={10}>
        {feedsApi?.data?.pages
          .flatMap((page) => page.data)
          .map((feed) => (
            <Flex
              key={feed.id}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              {/* Feeds Header */}
              <Flex
                w={"100%"}
                h={"5vh"}
                position="relative"
                justifyContent="space-between"
                alignItems="center"
                gap={21}
                display="inline-flex"
                boxShadow="0px 0px 7px #FFFC83"
                py={"25px"}
                px={5}
              >
                <Image
                  src={"oskm-profile.svg"}
                  alt="OSKM Profile"
                  alignSelf={"center"}
                  borderRadius={"full"}
                />
                <Text
                  color="#FFFC83"
                  fontSize={16}
                  fontFamily="SomarRounded-Bold"
                  fontWeight="700"
                  lineHeight="20px"
                >
                  OSKM2023
                </Text>
                <Spacer />
                <Text
                  textAlign="right"
                  color="white"
                  fontSize={10}
                  fontFamily="SomarRounded-Regular"
                  fontStyle="italic"
                  fontWeight="400"
                  lineHeight="13px"
                >
                  {getFeedPostedMessage(feed.createdAt)}
                </Text>
              </Flex>

              {/* Feeds Image or Video */}
              {feed.attachmentUrl == null ? null : isImageLink(
                  feed.attachmentUrl
                ) ? (
                <Image
                  crossOrigin="anonymous"
                  src={feed.attachmentUrl}
                  alt="feeds"
                  alignSelf="center"
                ></Image>
              ) : isVideoLink(feed.attachmentUrl) ? (
                <iframe
                  src={feed.attachmentUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}

              {/* Feeds Content */}
              <Flex
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={5}
                my={"25px"}
                px={"50px"}
              >
                {/* Feeds Reaction */}
                <ReactionButton />
                <Text
                  textAlign="justify"
                  color="white"
                  fontSize={9.25}
                  fontFamily="SomarRounded-Regular"
                  fontWeight="500"
                  lineHeight="12px"
                  word-wrap="break-word"
                >
                  {feed.text}
                </Text>

                {/* Post yang belom dilihat */}
                {/* <Box
                                w="100%"
                                h="100%"
                                bg="#C0EACA"
                                boxShadow="0px 0px 10px #FFFC83"
                                borderRadius={10}
                                border="0.25px #C0EACA solid"
                                justifyContent="center"
                                alignItems="center"
                                gap={10}
                                display="inline-flex"
                            >
                                <Text
                                    textAlign="center"
                                    color="#4909B3"
                                    fontSize={9.25}
                                    fontFamily="Inter"
                                    fontWeight="700"
                                    lineHeight="12.02px"
                                >
                                    Post yang Belum Dilihat
                                </Text>
                            </Box> */}
              </Flex>
            </Flex>
          ))}
      </Flex>
    </BackgroundAndNavbar>
  );
}
