import React, { type PropsWithChildren } from "react";
import { Box, Flex, Heading, Image} from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

function BackgroundAndNavbar({ children }: PropsWithChildren) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="/components/anon_chat_page/anon_match_bg.png"
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
const LoadingScreen = ({ title }: { title?: string }) => {
  return (
    <BackgroundAndNavbar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="14px"
        mx="40px"
        my="140px"
        alignItems={"center"}
      >
        <Image
          src="/components/anon_chat_page/anon_comet.png"
          alt="Loading"
          zIndex="-1"
          position="relative"
          objectFit="cover"
          width={"254px"}
          height={"254px"}
        />
        <Heading size={"H3"} fontWeight={400} color={"yellow.5"}>
          {title ?? "Loading..."}
        </Heading>
      </Flex>
    </BackgroundAndNavbar>
  );
};

export default LoadingScreen;
