import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Flex, Image, Heading, Text } from "@chakra-ui/react";

export const RequestBerhasilPopup = ({
  open,
  setClose,
  coinDecreased,
}: {
  open: boolean;
  setClose: () => void;
  coinDecreased: number;
}) => {
  return (
    <PopupWithBlackOverlay open={open} setClose={setClose}>
      <Flex
        gap={"15px"}
        flexDir={"column"}
        bg={"purple.1"}
        w={"90%"}
        mx={"auto"}
        maxW={"350px"}
        position={"relative"}
        p={10}
        borderRadius={"24px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          cursor={"pointer"}
          src={"/close.png"}
          position={"absolute"}
          top={5}
          right={5}
          onClick={setClose}
        />

        <Image
          src={"/check.svg"}
          mt={"20px"}
          bg={"green.3"}
          w={"20%"}
          aspectRatio={1 / 1}
          padding={3}
          borderRadius={"full"}
        />
        <Heading textAlign={"center"}> Request Berhasil!</Heading>
        <Text textAlign={"center"} opacity={"0.6"}>
          {" "}
          Koinmu berkurang sebanyak {coinDecreased}. Silakan kunjungi booth
          merchandise untuk pengambilan <br /> (ﾉ◕ヮ◕)ﾉ*:･ﾟ
        </Text>
      </Flex>
    </PopupWithBlackOverlay>
  );
};
