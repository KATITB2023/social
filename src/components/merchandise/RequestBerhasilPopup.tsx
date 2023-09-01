import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Flex, Image, Heading, Text, Box } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md";

export const RequestBerhasilPopup = ({
  open,
  setClose,
  coinDecreased,
  onClearCart,
}: {
  open: boolean;
  setClose: () => void;
  coinDecreased: number;
  onClearCart: () => void;
}) => {
  const handleClose = () => {
    setClose();
    onClearCart();
  };

  return (
    <PopupWithBlackOverlay open={open} setClose={handleClose}>
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
          onClick={handleClose}
          alt="close"
        />
        <Box
          borderRadius="36px"
          background="green.3"
          width="60px"
          height="60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="20px auto"
        >
          <MdCheck size={36} color="#000000" opacity="50%" />
        </Box>
        <Heading textAlign={"center"}> Request Berhasil!</Heading>
        <Text textAlign={"center"} opacity={"0.6"}>
          {" "}
          Koinmu berkurang sebanyak {coinDecreased}. Silakan kunjungi booth
          merchandise untuk pengambilan! <br /> (ﾉ◕ヮ◕)ﾉ*:･ﾟ
        </Text>
      </Flex>
    </PopupWithBlackOverlay>
  );
};
