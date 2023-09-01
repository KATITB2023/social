import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface CoinCardProps {
  coin: number;
}
const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <Flex
      width={"full"}
      paddingX={"4px"}
      paddingY={"8px"}
      marginX={"2rem"}
      bgColor={"#1D0263"}
      h={"69px"}
      flexDir={"row"}
      borderRadius={"16px"}
      gap={"8px"}
      boxShadow={"0px 0px 15px 0px #FFFC83"}
    >
      <Flex>
        <Image
          src={"/request-merchandise/blan 1.svg"}
          width={60}
          height={60}
          alt="Hiasan"
        />
      </Flex>
      <Flex flexDir={"column"} justifyContent={"center"} gap={"4px"}>
        <Text
          color={"yellow.5"}
          fontFamily={"Bodwars"}
          lineHeight={"13px"}
          textShadow={"0px 0px 22px #2B0792"}
        >
          Your Coins
        </Text>
        <Text>{coin}</Text>
      </Flex>
    </Flex>
  );
};

export default CoinCard;
