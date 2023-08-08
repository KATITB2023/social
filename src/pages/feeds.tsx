import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    Center,
    Container,
    Spacer
} from "@chakra-ui/react";
import React, { useState, useLayoutEffect, useRef } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

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

const getFeedPostedMessage = (feedDate: any) => {
    dayjs.extend(utc);
    dayjs.extend(relativeTime);
    const now = dayjs();
    const postDate = dayjs.utc(feedDate);
    const diffInMinutes = now.diff(postDate, 'minute');
    const diffInDays = now.diff(postDate, 'day');
    const diffInHours = now.diff(postDate, 'hour');

    if (diffInMinutes < 60) {
        return 'Baru diunggah';
    } else if (diffInHours < 24) { 
        return `Diunggah ${diffInHours} jam yang lalu`;
    } else{
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

export default function FeedsPage() {
    const isVideoLink = (link: string) => /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/.test(link);
    const isImageLink = (link: string) => /\.(jpeg|jpg|png|gif)$/i.test(link);

    const feedsApi = api.feed.getFeeds.useInfiniteQuery(
        {
            limit: 10,
        },
        {
            getNextPageParam: (d) => d.nextCursor,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    )
    // const tes = feedsApi.data;
    // console.log(tes);
    const feeds = [
        {
            id: '1',
            date: '2023-08-08T00:50:56Z',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
            link: 'https://cdn.oskmitb.com/foto-ganteng-gagas.jpg'
        },
        {
            id: '2',
            date: '2023-08-01T08:15:00Z',
            caption: 'Feeds Caption 2 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
            link: 'https://www.youtube.com/embed/TQ8WlA2GXbk'
        },
    ];
    return (
        <BackgroundAndNavbar>
            <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                mt={10}
            >
                {feeds.map((feed) => (
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
                                {getFeedPostedMessage(feed.date)}
                            </Text>
                            <Box>

                            </Box>
                        </Flex>

                        {/* Feeds Image or Video */}
                        {isImageLink(feed.link) ? (
                            <Image
                                crossOrigin="anonymous"
                                src={feed.link}
                                alt="feeds"
                                alignSelf="center"
                            ></Image>
                        ) : isVideoLink(feed.link) ? (
                            <iframe
                                src={feed.link}
                                title='YouTube video player'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            />
                        ) : null
                        }

                        {/* Feeds Content */}
                        <Flex
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                            gap={5}
                            my={"25px"}
                            px={"50px"}
                        >
                            <Text
                                textAlign="justify"
                                color="white"
                                fontSize={9.25}
                                fontFamily="SomarRounded-Regular"
                                fontWeight="500"
                                lineHeight="12px"
                                word-wrap="break-word"
                            >
                                {feed.caption}
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
                )
                )}

            </Flex>

        </BackgroundAndNavbar>
    );
}