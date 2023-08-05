import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Link,
  Icon,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  MdHome,
  MdStarOutline,
  MdChatBubbleOutline,
  MdPerson,
  MdLogout,
  MdOutlineAssignmentInd,
  MdOutlineAssignment,
  MdNewspaper,
  MdMenu,
} from "react-icons/md";
import { type IconType } from "react-icons";
import { useRouter } from "next/router";
import Navbar from "~/components/Navbar";

const SubmitPopUp = ({
  isSubmitting,
  submittingFile,
}: {
  isSubmitting: boolean;
  submittingFile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Center
      display={isSubmitting ? "block" : "none"}
      position={"absolute"}
      alignSelf={"center"}
      backgroundColor={"purple.1"}
      alignItems={"center"}
      verticalAlign={"center"}
      justifyContent={"center"}
      minHeight="40vh"
      width="70vw"
      borderRadius="20px"
      px="4px"
      mt="30vw"
    >
      <Center
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
      >
        <Image
          src="close.svg"
          mt="40px"
          mb="20px"
          alignSelf={"right"}
          onClick={() => submittingFile(false)}
        />
        <Image src="qmark.svg" mb="20px" alignSelf={"center"} />
        <Heading mb="10px">SUBMIT</Heading>
        <Text alignSelf={"center"} textAlign={"center"} mb="20px" opacity={0.6}>
          Apakah kamu yakin ingin melakukan submisi tugas? Tugas yang telah
          tersubmit tidak bisa diedit kembali
        </Text>
        <HStack gap="20px" mb="40px">
          <Box
            backgroundColor={"gray.600"}
            display="flex"
            justifyContent="center"
            verticalAlign="center"
            alignItems="center"
            textColor={"yellow.5"}
            borderColor={"yellow.5"}
            borderWidth="2px"
            width="79px"
            height="50px"
            borderRadius="10px"
            onClick={() => submittingFile(false)}
          >
            <Text size={"B3"} fontWeight={"bold"}>
              Cancel
            </Text>
          </Box>
          <Box
            backgroundColor={"yellow.5"}
            display="flex"
            justifyContent="center"
            verticalAlign="center"
            alignItems="center"
            textColor={"gray.600"}
            borderColor={"yellow.5"}
            borderWidth="2px"
            width="79px"
            height="50px"
            borderRadius="10px"
            onClick={() => submittingFile(false)}
          >
            <Text size={"B3"} fontWeight={"bold"}>
              Submit
            </Text>
          </Box>
        </HStack>
      </Center>
    </Center>
  );
};

export default SubmitPopUp;