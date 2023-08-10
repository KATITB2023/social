import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import ReactionButton from "./ReactionButton";

type Reaction = {
  count: number;
  reacted: boolean;
};

type FeedProps = {
  reactions: {
    [k: string]: Reaction;
  };
  attachmentUrl: string | null;
  createdAt: Date;
  text: string;
  id: number;
  read: boolean;
};

type Reactions = {
  [k: string]: Reaction;
};

const Feed: React.FC<FeedProps> = ({
  reactions,
  attachmentUrl,
  createdAt,
  text,
  id,
  read,
}) => {
  const [isSeen, setIsSeen] = useState(read);

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
  const isVideoLink = (link: string) =>
    /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/.test(link);
  const isImageLink = (link: string) => /\.(jpeg|jpg|png|gif)$/i.test(link);
  const feedRef = useRef(null);
  const readMutation = api.feed.readFeed.useMutation({
    onSuccess() {
      setIsSeen(true);
    },
  });
  const isInView = useInView(feedRef);
  useEffect(() => {
    if (!isSeen && isInView) {
      readMutation.mutate({
        feedId: id,
      });
    }
  }, [isInView, id, isSeen]);

  return (
    <Flex flexDirection={"column"} justifyContent={"center"} ref={feedRef}>
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
          {getFeedPostedMessage(createdAt)}
        </Text>
      </Flex>

      {/* Feeds Image or Video */}
      {attachmentUrl == null ? null : isImageLink(attachmentUrl) ? (
        <Image
          crossOrigin="anonymous"
          src={attachmentUrl}
          alt="feeds"
          alignSelf="center"
        ></Image>
      ) : isVideoLink(attachmentUrl) ? (
        <iframe
          src={attachmentUrl}
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
        <ReactionButton reactions={reactions} id={id} />
        <Text
          textAlign="justify"
          color="white"
          fontSize={9.25}
          fontFamily="SomarRounded-Regular"
          fontWeight="500"
          lineHeight="12px"
          word-wrap="break-word"
        >
          {text}
        </Text>

        {/* Post yang belom dilihat */}
        {!isSeen && (
          <Box
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
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Feed;
