import React, { type PropsWithChildren } from "react";
import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

function BackgroundAndNavbar({ children }: PropsWithChildren) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="/coming_soon_bg.png"
        alt="background"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
}
const ComingSoon = () => {
  return (
    <BackgroundAndNavbar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="14px"
        mx="40px"
        my="140px"
      >
        <Image
          src="coming_soon.png"
          alt="404"
          height="100%"
          zIndex="-1"
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
