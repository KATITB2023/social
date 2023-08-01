import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  Name: string;
  Nim: number;
  image: string;
  ranking: number;
  points: string;
}

const CardLeaderboardTop3 = ({
  Name,
  Nim,
  image,
  ranking,
  points,
}: CardProps) => {
  const isOverflowing = (Name: string) => {
    let tes: string = "";
    for (let i = 0; i < Name.length; i++) {
      if (i > 12) {
        tes += "...";
        break;
      } else {
        tes += Name[i];
      }
    }
    return tes;
  };
  return (
    <Box
      position="relative"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="100px"
      h="150px"
      borderRadius="12px"
      margin="20px"
    >
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        opacity="66%"
        borderRadius="12px"
        background="linear-gradient(317deg, rgba(43, 7, 146, 0.66) 0%, rgba(234, 191, 255, 0.60) 100%)"
      ></Box>
      <Flex
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        w="100px"
        h="150px"
        borderRadius="12px"
      >
        <Flex
          w="59px"
          h="59px"
          borderRadius="full"
          bgColor="#FFFC83"
          opacity="100%"
        >
          <Image
            w="59px"
            h="59px"
            borderRadius="full"
            objectPosition="center"
            objectFit="cover"
            top="0"
            src={image}
          ></Image>
          <Flex
            position="absolute"
            top="6px"
            left="11px"
            w="26px"
            h="26px"
            borderRadius="full"
            bgColor="#340C8F"
            alignItems="center"
            justifyContent="center"
          >
            <Text size="B3" fontWeight="600" textAlign="center">
              #{ranking}
            </Text>
          </Flex>
        </Flex>
        <Box
          position="relative"
          marginTop="8px"
          maxWidth="90px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Text fontWeight="600" size="B3">
            {isOverflowing(Name)}
          </Text>
          <Text size="B5" textAlign="center" marginTop="-5px">
            {Nim}
          </Text>
        </Box>
        <Flex
          w="73px"
          h="28px"
          borderRadius="12px"
          bgColor="#340C8F"
          alignItems="center"
          justifyContent="center"
          marginTop="2px"
        >
          <Flex
            w="70px"
            h="25px"
            borderRadius="11px"
            bgColor="#FFFC83"
            alignItems="center"
            justifyContent="center"
          >
            <Text size="B4" color="#340C8F" fontWeight="700">
              {points}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardLeaderboardTop3;
