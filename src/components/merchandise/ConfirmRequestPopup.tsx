import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Flex, Image, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Merchandise } from "@prisma/client";

type CartData = {
  merchRequested: Merchandise;
  requestAmount: number;
};

export const ConfirmRequestPopup = ({
  open,
  merch,
  itemAmount,
  sumCoinPrice,
  setCloseWindow,
  onSubmit,
}: {
  open: boolean;
    merch: CartData[];
    itemAmount: number;
    sumCoinPrice: number;
  setCloseWindow: () => void;
  onSubmit: () => void;
}) => {

  return (
    <PopupWithBlackOverlay open={open} setClose={setCloseWindow}>
      <Flex
        gap="15px"
        flexDir="column"
        bg="purple.1"
        w="90%"
        mx="auto"
        maxW="350px"
        position="relative"
        p={10}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          cursor="pointer"
          src="/close.png"
          position="absolute"
          top={5}
          right={5}
          onClick={setCloseWindow}
          alt="close"
        />
        <Flex
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="/warning.svg"
            mt="20px"
            maxW="50%"
            aspectRatio={1}
            padding={3}
            borderRadius="full"
            alt="check"
          />
          <Text
            textAlign={"center"}
            color="#FFFC83"
            fontFamily="SomarRounded-Bold"
            fontWeight="700"
            fontSize={"14px"}
          >
            Cek kembali pesananmu!
          </Text>
          <Text
            textAlign={"center"}
            fontFamily="SomarRounded-Regular"
            fontWeight="400"
            fontSize={"12px"}
          >
            {" "}
            Barang yang telah di-request akan langsung mengurangi jumlah koin
            dan tidak dapat dibatalkan
          </Text>
        </Flex>
        <Flex
        w={"full"}
        justify={"space-between"}
        flexDirection={"column"}
        maxH={"35vh"}
        gap={"12px"}
        overflowY={"auto"}
        sx={{
          "::-webkit-scrollbar": {
            width: "11px",
          },
          "::-webkit-scrollbar-track": {
            background: "#2F2E2E",
            borderRadius: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "5px",
          },
        }}>
        {merch.map((each, idx) => {
          if (each.requestAmount > 0) {
            return (
              <Flex
                w={"100%"}
                flexDirection={"row"}
                alignItems={"center"}
                gap={"8px"}
                key={idx}
              >
                <Flex
                  maxW={"30%"}
                  maxH={"20vh"}
                  justifyContent={"center"}
                  background="#FFFC83"
                  borderRadius={12}
                  px={"7.5px"}
                >
                  <Image
                    src={each.merchRequested.image ? each.merchRequested.image : "/logo_showcase.png"}
                    maxW={"full"}
                    maxH={"full"}
                  />
                </Flex>

                {/* Item Request */}
                <Flex w="65%" flexDir={"column"}>
                  <Flex w={"full"} flexDir={"row"} justifyContent={"space-between"}>
                    <Text
                      fontFamily={"SomarRounded-Bold"}
                      fontSize={"16px"}
                      textAlign={"center"}
                    >
                      {each.merchRequested.name}
                    </Text>
                    <Text fontFamily={"SomarRounded-Regular"} fontSize={"12px"}>
                      {each.requestAmount} pcs
                    </Text>
                  </Flex>
                  <Flex w={"full"} flexDirection={"row"} alignItems={"center"}>
                    <Image
                      src="/components/merch/coin.png"
                      width={"30px"}
                      height={"30px"}
                      alt="Koin"
                    />
                    <Text>{each.merchRequested.price} Coins</Text>
                  </Flex>
                </Flex>
              </Flex>
            )
          }
          
        })}
          </Flex>

        {/* Request Button */}
        <Flex
          w={"100%"}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="space-between"
          gap={2}
        >
          <Flex justifyContent="space-between" alignItems="flex-start" gap={4}>
            <Text
              color="white"
              fontSize={16}
              fontFamily="SomarRounded-Regular"
              fontWeight="700"
            >
              {itemAmount} Barang
            </Text>
            <Text
              color={"#C0EACA"}
              fontSize={16}
              fontFamily="SomarRounded-Regular"
              fontWeight="700"
              wordBreak="break-word"
            >
              {sumCoinPrice} Coins
            </Text>
          </Flex>
          <Button
            alignSelf="stretch"
            padding={2}
            background="#FFFC83"
            borderRadius={12}
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            gap={12}
            onClick={() => onSubmit()}
          >
            <Text
              color="#4909B3"
              fontSize={12}
              fontFamily="SomarRounded-Regular"
              fontWeight="700"
            >
              Request
            </Text>
          </Button>
        </Flex>
      </Flex>
    </PopupWithBlackOverlay>
  );
};
