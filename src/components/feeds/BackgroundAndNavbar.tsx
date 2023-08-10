import React, { type PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

function BackgroundAndNavbar({ children }: PropsWithChildren) {
  return (
    <>
      <Box
        position="relative"
        height="100%"
        overflow={"hidden"}
        backgroundImage={"/feeds_bg.svg"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      >
        <Flex flexDirection="column">
          <Navbar />
          {children}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}

export default BackgroundAndNavbar;
