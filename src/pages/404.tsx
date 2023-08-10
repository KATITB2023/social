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
const NotFound = () => {
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
          src="404.svg"
          alt="404"
          height="100%"
          zIndex="-1"
          position="relative"
          objectFit="cover"
          minWidth="100%"
          width="100%"
        />
        <Heading size="H3" alignSelf="center">
          Ups!
        </Heading>
        <Heading size="SH4" alignSelf="center">
          Sepertinya kamu tersesat!
        </Heading>
        <Text
          fontFamily="body"
          fontSize="14px"
          marginBottom="8px"
          align="center"
        >
          Jangan khawatir, Voyagers! Kalian bisa kembali ke{" "}
          <Link color="#FE06BE" href="/">
            home
          </Link>{" "}
          atau kunjungi fitur menarik lainnya di bawah ini.
        </Text>
      </Flex>
    </BackgroundAndNavbar>
  );
};

export default NotFound;
