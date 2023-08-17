import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";
import BackgroundAndNavbar from "../BackgroundAndNavbar";

const ComingSoon = () => {
  return (
    <BackgroundAndNavbar bg="/coming_soon_bg.png">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="14px"
        mx="40px"
        my="140px"
      >
        <Image
          src="/coming_soon.png"
          alt="404"
          height="100%"
          zIndex="0"
          position="relative"
          objectFit="cover"
          minWidth="100%"
          width="100%"
        />
        <Heading marginTop="5%" size="SH5" textAlign="center" alignSelf="center">
          Roket kami sedang mencari tujuan selanjutnya...
        </Heading>
      </Flex>
    </BackgroundAndNavbar>
  );
};

export default ComingSoon;
