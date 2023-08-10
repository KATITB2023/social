import React, { type PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

function BackgroundAndNavbar({ children }: PropsWithChildren) {
  return (
    <>
      <Box
        position="relative"
        height="100vh"
        overflow={"hidden"}
        backgroundImage={"/background.png"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      >
        <Flex flexDirection="column">
          <Navbar currentPage={"Error"} />
          {children}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}

export default BackgroundAndNavbar;
