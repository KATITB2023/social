import React, { PropsWithChildren } from "react";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import Footer from "~/components/Footer";

const BackgroundAndNavbar = ({ children }: PropsWithChildren) => {
  return (
    <Box
      position="relative"
      height="1720px"
      overflow="hidden"
    >
      <Image
        src="bg.png"
        alt="background"
        height="100%"
        zIndex="-2"
        position="absolute"
        objectFit="none"
        width="375px"
        top="-33px"
      />
      <Image 
        src="komet4.png"
        position="absolute"
        zIndex="-1"
        top="190px"
      />

      <Image 
        src="sparkle telanjang 2.png"
        position="absolute"
        right="75px"
        top="340px"
        zIndex="-1"
      />
      
      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
};

const NotFound = () => {
  return (
    <Layout title={"Not found"}>
      <BackgroundAndNavbar>
        <Flex
          flexDirection="column"
          gap="14px"
          mx="40px"
          mt="54px"
          h="1131px"
        >
          <Image
            src="/404.png"
            alt="404"
            height="100%"
            position="relative"
            minWidth="100%"
            h="211px"
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
            Jangan khawatir, Spacefarers! Kalian bisa kembali ke{" "}
            <Link color="#FE06BE" href="/">
              home
            </Link>{" "}
            atau kunjungi fitur menarik lainnya di bawah ini.
          </Text>
        </Flex>
        <Footer />
      </BackgroundAndNavbar>
    </Layout>
  );
};

export default NotFound;
