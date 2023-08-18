import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";
import BackgroundAndNavbar from "./BackgroundAndNavbar";

const LoadingScreen = ({ title }: { title?: string }) => {
  return (
    <BackgroundAndNavbar bg="/background.png">
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
