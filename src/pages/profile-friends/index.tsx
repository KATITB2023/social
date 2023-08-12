import { NextPage } from "next";
import React from "react";
import Navbar from "~/components/Navbar";
import { Box, Image, Flex, Input, Text } from "@chakra-ui/react";
import TextInput from "./components/TextInput";
import Menu from "./components/Menu";
import Friends from "./components/Friends";
import Request from "./components/Request";

function BackgroundAndNavbar({ children }: { children: React.ReactNode }) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="blur.svg"
        alt="background2"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Image
        src="kumpulankomet.svg"
        alt="background1"
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

const ProfileFriends: NextPage = () => {
    const [state, setState] = React.useState<string>('myfriends')
  return (
    <BackgroundAndNavbar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="24px"
        mx="40px"
        my="120px"
      >
        <TextInput />
        <Flex flexDirection="row" justifyContent="center" alignItems='center' gap="40px">
          <Menu>My Friends</Menu>
          <Menu>Request</Menu>
        </Flex>
        {
            state === 'myfriends' ? (
                <Friends/>
            ) : (
                <Request/>
            )
        }
      </Flex>
    </BackgroundAndNavbar>
  );
};

export default ProfileFriends;
