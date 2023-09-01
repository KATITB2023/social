import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Navbar from "./Navbar";

import Layout from "~/layout";

const LoadingScreen = ({ title }: { title?: string }) => {
  return (
    <Box
      position="relative"
      w={"full"}
      minH={"100vh"}
      overflow={"hidden"}
      backgroundImage={"/background.png"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      pb={10}
    >
      <Flex flexDirection="column" w={"full"} h={"full"}>
        <Navbar />
        <Flex
          flexDirection="column"
          my={"auto"}
          mx={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src="/components/anon_chat_page/anon_comet.png"
            alt="Loading"
            position="relative"
            objectFit="cover"
            width={"254px"}
            height={"254px"}
          />
          <Heading size={"H3"} fontWeight={400} color={"yellow.5"}>
            {title ?? "Loading..."}
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoadingScreen;
