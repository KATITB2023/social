import { Flex, Text, Box, Center, Card, Image } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  Name: string;
  Nim: number;
  image: string;
  ranking: number;
  points: string;
}

const CardLeaderboardParticipant = ({
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
    <Flex
      w="327px"
      h="61px"
      position="relative"
      borderRadius="12px"
      flexDirection="row"
      margin="20px"
    >
      <Card
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        opacity="50%"
        borderRadius="12px"
        bgGradient="linear(to-l,rgba(43, 7, 146, 0.9),rgba(221, 179, 248, 0.71),rgba(234, 191, 255, 0.6))"
      ></Card>
      <Flex
        position="relative"
        w="24px"
        h="61px"
        alignItems="center"
        justifyContent="center"
        marginLeft="12px"
      >
        <Text size="B2" color="white" fontWeight="600">
          #{ranking}
        </Text>
      </Flex>
      <Box
        position="relative"
        w="45px"
        h="45px"
        margin="auto 15px"
        bgColor="yellow.5"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
        boxShadow="0px 0px 8px rgba(77, 52, 138, 0.90)"
      >
        <Image
          w="45px"
          h="45px"
          borderRadius="full"
          objectPosition="center"
          objectFit="cover"
          top="0"
          src={image}
        ></Image>
      </Box>
      <Box
        position="relative"
        margin="auto 0px"
        maxWidth="100px"
        maxHeight="45px"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Text fontWeight="600" size="B3" color="white">
          {isOverflowing(Name)}
        </Text>
        <Text size="B5" marginTop="-5px" color="white">
          {Nim}
        </Text>
      </Box>
      <Flex
        w="73px"
        h="28px"
        position="absolute"
        left="240px"
        top="16px"
        borderRadius="12px"
        bgColor="purple.1"
        alignItems="center"
        justifyContent="center"
        marginTop="2px"
      >
        <Flex
          position="relative"
          w="70px"
          h="25px"
          borderRadius="11px"
          bgColor="yellow.5"
          alignItems="center"
          justifyContent="center"
        >
          <Text size="B4" color="purple.1" fontWeight="700">
            {points}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardLeaderboardParticipant;
