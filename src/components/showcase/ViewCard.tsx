import React from "react";
import { Flex, Image, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export const ViewCard = ({
  image,
  title,
  route,
  width = "45%",
}: {
  image: string;
  title: string;
  route: string;
  width?: string | number;
}) => {
  return (
    <Flex
      w={width}
      minW={"100px"}
      maxW={"200px"}
      borderRadius={"26px"}
      aspectRatio={3 / 4}
      position={"relative"}
      overflow={"hidden"}
      border={"1px white solid"}
    >
      {/* <Link href={route}> */}
      <Flex>
        <Image
          w={"full"}
          src={image || "/base.png"}
          position="absolute"
          objectFit="cover"
          objectPosition="center"
          alt=""
        />
      </Flex>
      {/* </Link> */}

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
          fontSize={"14px"}
          noOfLines={1}
          textAlign={"center"}
        >
          {title}
        </Heading>

        <Link href={route}>
          <Button
            display={"flex"}
            borderRadius={"8px"}
            bg={"yellow.5"}
            w={"full"}
            h={"full"}
            py={1}
          >
            <Text color={"purple.2"} fontSize={"12px"}>
              Explore
            </Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
