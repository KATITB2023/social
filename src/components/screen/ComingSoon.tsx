import React, { type PropsWithChildren } from "react";
import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

function BackgroundAndNavbar({ children }: PropsWithChildren) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="/background.png"
        alt="background"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <Navbar currentPage={"Error"} />
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
          src="maintenance.svg"
          alt="404"
          height="100%"
          zIndex="-1"
          position="relative"
          objectFit="cover"
          minWidth="100%"
          width="100%"
        />
        <Heading size="H3" alignSelf="center">
            UNDER MAINTENANCE
        </Heading>
        <Text
          fontFamily="body"
          fontSize="14px"
          marginBottom="8px"
          align="center"
        >
          Bersiaplah Spacefarers! Sesuatu yang menakjubkan sedang dipersiapkan!
        </Text>
      </Flex>
    </BackgroundAndNavbar>
  );
};

export default ComingSoon;
