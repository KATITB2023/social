import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

function BackgroundAndNavbar({
  children,
  bg,
}: {
  children: string | JSX.Element | JSX.Element[];
  bg: string;
}) {
  return (
    <>
      <Box
        position="relative"
        height="100%"
        minH={"100vh"}
        overflow={"hidden"}
        backgroundImage={bg}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        pb={10}
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
