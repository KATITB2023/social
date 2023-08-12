import { Flex, Text, Box, Card, Image } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  name: string;
  nim: string;
  image: string | null;
  ranking: number;
  points: number;
}

const CardLeaderboardParticipant = ({
  name,
  nim,
  image,
  ranking,
  points,
}: CardProps) => {
  const isOverflowing = (name: string) => {
    let tes = "";
    for (let i = 0; i < name.length; i++) {
      if (i > 8) {
        tes += "...";
        break;
      } else {
        tes += name[i];
      }
    }
    return tes;
  };

  return (
    <Flex
      w="80%"
      h="61px"
      position="relative"
      borderRadius="12px"
      flexDirection="row"
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"12px"}
    >
      {/* Background Color */}
      <Card
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        opacity="70%"
        borderRadius="12px"
        bgGradient="linear-gradient(340deg, #2B0792 0%, rgba(221, 179, 248, 0.71) 93.23%, rgba(234, 191, 255, 0.60) 100%);"
      />

      <Flex
        zIndex={0}
        w={"70%"}
        flexDir={"row"}
        alignItems={"center"}
        gap={3}
      >
        <Text size="B2" color="white" fontWeight="600">
          #{ranking}
        </Text>

        <Box
          minW={"45px"}
          minH={"45px"}
          maxW={"45px"}
          maxH={"45px"}
          backgroundImage={image ? image : undefined}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          borderRadius={"full"}
        />

        <Box
          position="relative"
          margin="auto 0px"
          maxHeight="45px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Text fontWeight="600" size="B3" color="white">
            {name}
          </Text>
          <Text size="B5" marginTop="-5px" color="white">
            {nim}
          </Text>
        </Box>
      </Flex>

      {/* Point Display */}
      <Flex
        w="73px"
        h="28px"
        left="240px"
        top="16px"
        borderRadius="12px"
        bgColor="purple.1"
        alignItems="center"
        justifyContent="center"
        marginTop="2px"
        zIndex={0}
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
            {points} PT
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardLeaderboardParticipant;
