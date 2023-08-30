import { Flex, Image, Text, border } from "@chakra-ui/react";
import React from "react";
import { Merchandise } from "~/server/types/merchandise";

interface MerchandiseRequestedProps {
  merch: Merchandise;
  status: boolean;
  quantity : number;
}
const MerchandiseRequested = ({ merch, status, quantity }: MerchandiseRequestedProps) => {
  return (
    <Flex
      flexDir={"row"}
      // bgGradient={"linear(to-b,#7660B7 ,#CD62CF, #3A313D)"}
      background={"radial-gradient(151.92% 127.02% at 15.32% 21.04%, rgba(165, 239, 255, 0.20) 0%, rgba(110, 191, 244, 0.04) 77.08%, rgba(70, 144, 212, 0.00) 100%), linear-gradient(224deg, rgba(118, 96, 183, 0.93) 0%, rgba(205, 98, 207, 0.93) 46.35%, rgba(58, 49, 61, 0.93) 100%)"}
      w={"90%"}
      h={"94px"}
      paddingY={"8px"}
      paddingX={"16px"}
      borderRadius={"12px"}
      gap={"8px"}
      marginRight={"8px"}
      alignSelf={"center"}
    >
      <Flex w={"50%"} justifyContent={"center"}>
        <Image src={merch.image} alt={merch.name} maxW={"full"} maxH={"full"} />
      </Flex>
      <Flex w="50%" flexDir={"column"}>
        {/* Kolom untuk nama item dan stock */}
        <Flex w={"full"} flexDir={"row"} justifyContent={"space-between"}>
          <Text
            fontFamily={"SomarRounded-Bold"}
            fontSize={"16px"}
            textAlign={"center"}
          >
            {merch.name}
          </Text>
          <Text fontFamily={"SomarRounded-Regular"} fontSize={"12px"}>
            {quantity}
          </Text>
        </Flex>
        {/* Kolom untuk jumlah coins */}
        <Flex w={"full"} flexDirection={"row"} alignItems={"center"}>
          <Image
            src="/request-merchandise/blan 1.svg"
            width={"30px"}
            height={"30px"}
            alt="Koin"
          />
          <Text>{merch.price} Coins</Text>
        </Flex>
        <Flex>
          {/* Kalau sudah diapproved */}
          {status && (
            <Flex
              width={"156px"}
              h={"23px"}
              background={
                "linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF"
              }
              border={"1px solid rgba(232,85,62,1)"}
              borderRadius={"12px"}
              paddingY={"4px"}
              paddingX={"16px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                fontFamily={"SomarRounded-Bold"}
                fontSize={"10px"}
                color={"#E8553E"}
              >
                Belum Disetujui
              </Text>
            </Flex>
          )}
          {!status && (
            <Flex
              width={"156px"}
              h={"23px"}
              border={"1px solid rgba(28, 147, 154, 1)"}
              borderRadius={"12px"}
              paddingY={"4px"}
              background={
                "linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF;"
              }
              paddingX={"16px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                fontFamily={"SomarRounded-Bold"}
                fontSize={"10px"}
                color={"#1C939A"}
              >
                Sudah Disetujui
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MerchandiseRequested;
