import React from "react";
import { Flex, Image, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const ViewCard = ({
  image,
  title,
  route,
}: {
  image: string;
  title: string;
  route: string;
}) => {
  return (
    <Flex
      w={"45%"}
      maxW={"200px"}
      borderRadius={"26px"}
      aspectRatio={3 / 4}
      position={"relative"}
      overflow={"hidden"}
      border={"1px white solid"}
    >
      <Link href={route}>
        <Image
          src={image}
          position="absolute"
          objectFit="cover"
          objectPosition="center"
          alt=""
        />
      </Link>

      <Flex
        bgColor={"#1D0263"}
        w={"full"}
        h={"35%"}
        pos={"absolute"}
        bottom={0}
        borderRadius={"26px"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        border={"1px white solid"}
      >
        <Heading
          color={"white"}
          fontSize={"1rem"}
          noOfLines={1}
          textAlign={"center"}
        >
          {title}
        </Heading>

        <Link href={route}>
          <Flex aspectRatio={2 / 1} borderRadius={"8px"} w={"full"}>
            <Text bg={"yellow.5"} color={"purple.2"} fontSize={"12px"}>
              Explore
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};
