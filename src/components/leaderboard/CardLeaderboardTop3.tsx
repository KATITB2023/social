import { Box, Flex, Text } from "@chakra-ui/react";
import ProfilePicture from "../profile/ProfilePicture";

interface CardProps {
  name: string;
  nim: string;
  image: string | null;
  ranking: number;
  points: number;
  marginTop1: string;
}

const CardLeaderboardTop3 = ({
  name,
  nim,
  image,
  ranking,
  points,
  marginTop1,
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
    <Box
      marginTop={marginTop1}
      position="relative"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="100px"
      h="150px"
      borderRadius="12px"
    >
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        opacity="90%"
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
          bgColor="yellow.5"
          opacity="100%"
        >
          <ProfilePicture
            src={image != null ? image : undefined}
            size={59}
            disableBorder
          />
          <Flex
            position="absolute"
            top="6px"
            left="11px"
            w="26px"
            h="26px"
            borderRadius="full"
            bgColor="purple.1"
            alignItems="center"
            justifyContent="center"
          >
            <Text size="B3" fontWeight="600" textAlign="center" color="white">
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
          <Text fontWeight="600" size="B3" color="white">
            {isOverflowing(name)}
          </Text>
          <Text size="B5" textAlign="center" marginTop="-5px" color="white">
            {nim}
          </Text>
        </Box>
        <Flex
          w="73px"
          h="28px"
          borderRadius="12px"
          bgColor="purple.1"
          alignItems="center"
          justifyContent="center"
          marginTop="2px"
        >
          <Flex
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
    </Box>
  );
};

export default CardLeaderboardTop3;
