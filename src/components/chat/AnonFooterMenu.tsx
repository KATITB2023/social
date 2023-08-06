import React from "react";
import { useState } from "react";
import useEmit from "~/hooks/useEmit";
import { Text, Flex, Image, SlideFade } from "@chakra-ui/react";

const AnonFooterMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const endMatch = useEmit("endMatch");

  const handleEndMatch = () => {
    endMatch.mutate(undefined);
  };

  return (
    <>
      <Flex
        w={"full"}
        maxW={"25%"}
        cursor={"pointer"}
        bgColor={"white"}
        minH={"39px"}
        maxH={"166px"}
        border="none"
        borderRadius="10px"
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
        px={"10px"}
        py={"5px"}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <Image src="/components/anon_chat_page/anon_menu.svg" />
        <Text color={"black"} size={"B4"} fontWeight={400}>
          {" "}
          Menu{" "}
        </Text>
      </Flex>
    </>
  );
};

export default AnonFooterMenu;
