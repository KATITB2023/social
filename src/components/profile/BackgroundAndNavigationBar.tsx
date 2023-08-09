import { Box, Image, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import NavigationBar from "./NavigationBar";

export default function BackgroundAndNavigationBar({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="\background.png"
        alt="wheew wheew *pretend as if the background is in outer space*"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <NavigationBar />
        {children}
      </Flex>
    </Box>
  );
}
