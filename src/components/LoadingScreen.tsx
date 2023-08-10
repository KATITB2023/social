import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

const LoadingScreen = ({ title }: { title?: string }) => {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      justifyContent={"center"}
      position={"relative"}
      flexDir={"column"}
      alignItems={"center"}
      bgImage={"/components/anon_chat_page/anon_match_bg.png"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      overflowY={"hidden"}
    >
      <Flex position={"absolute"} top={0}>
        <Navbar/>
      </Flex>
      <Image
        src="/components/anon_chat_page/anon_comet.png"
        w={"254px"}
        h={"254px"}
      />
      <Heading size={"H3"} fontWeight={400} color={"yellow.5"}>
        {title ?? "Loading..."}
      </Heading>
    </Flex>
  );
};

export default LoadingScreen;
