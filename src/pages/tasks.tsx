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
import SubmitPopUp from "~/components/assignment/SubmitPopUp";

// Data Structure
interface submission {
  isSubmitted: boolean;
  filePath: string;
  submissionDate: string;
}

// Data Input
const inputAssignmentData: { [key: string]: string | undefined } = {
  title: "Contoh Judul",
  kodesoal: "Soal 01",
  deskripsi:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  deadline: "00/00/00 00.00",
};

const inputSubmissionData: submission = {
  isSubmitted: true,
  filePath: "lorem.pdf",
  submissionDate: "00/00/00 00.00",
};

// Main Function
export default function showSubmissionPage() {
  const [isSubmitOpen, setSubmitOpen] = useState(false);

  return (
    <Flex minHeight="100vh" minWidth="100vw">
      <Image
        src="background.svg"
        alt="wheew wheew *pretend as if the background is in outer space*"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        minHeight="100%"
      />
      <Flex flexDirection="column">
        <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="left"
          gap="2px"
          mx="24px"
          mt="120px"
        >
          <HStack>
            <Text fontWeight={"bold"}>Deadline</Text>
            <Text> : </Text>
            <Text>{inputAssignmentData.deadline}</Text>
          </HStack>
          <Heading color="yellow.5" size="H4" alignSelf="left">
            {inputAssignmentData.title}
          </Heading>
          <Flex
            alignSelf="center"
            width="140px"
            alignItems="center"
            gap="12px"
            justifyContent="space-evenly"
            color="white"
          ></Flex>
          <SubmissionStatus {...inputSubmissionData} />
          <Text
            color="white"
            fontWeight={"bold"}
            size="B1"
            alignSelf="left"
            mt="20px"
            mb="5px"
          >
            {inputAssignmentData.kodesoal}
          </Text>
          <Text textAlign={"left"}>{inputAssignmentData.deskripsi}</Text>
          <FileUpload {...inputSubmissionData} />
          {inputSubmissionData.isSubmitted ? (
            <div />
          ) : (
            <HStack gap="20px" position="absolute" bottom="30px">
              <Box
                backgroundColor={"gray.600"}
                display="flex"
                justifyContent="center"
                verticalAlign="center"
                alignItems="center"
                textColor={"yellow.5"}
                borderColor={"yellow.5"}
                borderWidth="2px"
                width="155px"
                height="48px"
                borderRadius="10px"
              >
                <Text size={"B2"} fontWeight={"bold"}>
                  Save
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
                width="155px"
                height="48px"
                borderRadius="10px"
                onClick={() => setSubmitOpen(true)}
              >
                <Text size={"B2"} fontWeight={"bold"}>
                  Submit
                </Text>
              </Box>
            </HStack>
          )}
          <SubmitPopUp
            isSubmitting={isSubmitOpen}
            submittingFile={setSubmitOpen}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

// Other Functions
function SubmissionStatus(param: submission) {
  return param.isSubmitted ? (
    <Center>
      <Box
        backgroundColor={"green.4"}
        textColor={"green.2"}
        borderColor={"green.2"}
        borderRadius="10px"
        px="10px"
        verticalAlign={"center"}
      >
        <Text size={"B5"}>Terkumpul</Text>
      </Box>
      <Spacer />
      <Text>Submitted at {param.submissionDate}</Text>
    </Center>
  ) : (
    <Flex>
      <Box
        backgroundColor={"orange"}
        textColor={"white"}
        borderColor={"green.2"}
        borderRadius="10px"
        px="10px"
      >
        <Text size={"B5"}>Belum Terkumpul</Text>
      </Box>
    </Flex>
  );
}

function FileUpload(param: submission) {
  return param.isSubmitted ? (
    <Box
      borderColor={"white"}
      height="184px"
      justifyContent={"center"}
      alignItems="center"
      borderWidth="2px"
      display="flex"
      verticalAlign={"center"}
      mt={10}
      borderRadius="10px"
      flexDirection="column"
    >
      {param.filePath}
    </Box>
  ) : (
    <Box
      borderColor={"white"}
      height="230px"
      justifyContent={"center"}
      alignItems="center"
      borderWidth="2px"
      display="flex"
      verticalAlign={"center"}
      mt={10}
      borderRadius="10px"
      flexDirection="column"
      py="10px"
    >
      <Image src="/komethello.svg" />
      <Box
        borderColor={"yellow.4"}
        px="10px"
        py="5px"
        borderWidth={2}
        mb="10px"
        borderRadius={5}
        textColor={"yellow.4"}
      >
        Upload File
      </Box>
    </Box>
  );
}

export { showSubmissionPage };
