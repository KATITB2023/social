import {
  Box,
  Button,
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

// Data Structure
interface submission {
  isSubmitted: boolean;
  filePath: string;
  submissionDate: string;
}

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

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

const SubmitPopUp = ({
  isSubmitting,
  submittingFile,
}: {
  isSubmitting: boolean;
  submittingFile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Box
      display={isSubmitting ? "block" : "none"}
      position={"absolute"}
      alignSelf={"center"}
      backgroundColor={"purple.1"}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
      >
        <Heading>SUBMIT</Heading>
        <Text>
          Apakah kamu yakin ingin melakukan submisi tugas? Tugas yang telah
          tersubmit tidak bisa diedit kembali
        </Text>
        <HStack gap="20px">
          <Box
            backgroundColor={"gray.600"}
            display="flex"
            justifyContent="center"
            verticalAlign="center"
            alignItems="center"
            textColor={"yellow.5"}
            borderColor={"yellow.5"}
            borderWidth="2px"
            width="59px"
            height="48px"
            borderRadius="10px"
            onClick={() => submittingFile(false)}
          >
            <Text size={"B5"}>Cancel</Text>
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
            width="59px"
            height="48px"
            borderRadius="10px"
            onClick={() => submittingFile(false)}
          >
            <Text size={"B5"}>Submit</Text>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

// Main Function
export default function showSubmissionPage() {
  const [isSubmitOpen, setSubmitOpen] = useState(false);

  return (
    <DefaultBackgroundAndNavigationBar>
      <Flex
        flexDirection="column"
        justifyContent="left"
        gap="2px"
        mx="24px"
        my="35px"
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
              <Text size={"B2"}>Save</Text>
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
              <Text size={"B2"}>Submit</Text>
            </Box>
          </HStack>
        )}
        <SubmitPopUp
          isSubmitting={isSubmitOpen}
          submittingFile={setSubmitOpen}
        />
      </Flex>
    </DefaultBackgroundAndNavigationBar>
  );
}

// Other Functions
function SubmissionStatus(param: submission) {
  return param.isSubmitted ? (
    <Flex>
      <Box
        backgroundColor={"green.4"}
        textColor={"green.2"}
        borderColor={"green.2"}
        borderRadius="10px"
        px="10px"
      >
        <Text size={"B5"}>Terkumpul</Text>
      </Box>
      <Spacer />
      <Text>Submitted at {param.submissionDate}</Text>
    </Flex>
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
        borderColor={"white"}
        px="10px"
        py="5px"
        borderWidth={2}
        mb="10px"
        borderRadius={5}
      >
        Upload File
      </Box>
    </Box>
  );
}

function NavigationBarAndMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const menuItems: { [key: string]: IconType } = {
    "Back to Home": MdHome,
    Feeds: MdNewspaper,
    Attendance: MdOutlineAssignmentInd,
    Assignment: MdOutlineAssignment,
    Showcase: MdStarOutline,
    Chat: MdChatBubbleOutline,
    Profile: MdPerson,
    Logout: MdLogout,
  };

  function isPageActive(item: string) {
    const pageName = item === "Back to Home" ? "home" : item.toLowerCase();
    if (router.pathname === `/${pageName}`) return true;
    else return false;
  }

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        bg="teal.500"
        color="white"
        borderRadius="4rem"
        marginX="1rem"
        marginTop="1.25rem"
      >
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button onClick={onOpen}>
          <MdMenu />
        </Button>
      </Flex>
      <Box>
        <Drawer onClose={onClose} isOpen={isOpen} size={["xs"]}>
          <DrawerOverlay />
          <DrawerContent bgColor="navy.1">
            <DrawerBody>
              <Flex
                flexDirection="column"
                justifyContent="space-evenly"
                my="40px"
              >
                {Object.entries(menuItems).map(([key, value]) =>
                  isPageActive(key) ? (
                    <Box
                      p="12px"
                      borderLeft="2px"
                      borderColor="yellow.5"
                      key={key}
                    >
                      <Flex
                        alignItems="center"
                        gap="12px"
                        m="12px"
                        color="yellow.5"
                      >
                        <Icon as={value} fontSize="24px" />{" "}
                        <Text size="B3">{key}</Text>
                      </Flex>
                    </Box>
                  ) : (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/${
                        key === "Back to Home" ? "home" : key.toLowerCase()
                      }`}
                      key={key}
                    >
                      <Box
                        p="12px"
                        borderLeft="2px"
                        borderColor="navy.1"
                        _hover={{
                          borderColor: "purple.1",
                        }}
                        key={key}
                      >
                        <Flex
                          alignItems="center"
                          gap="12px"
                          m="12px"
                          color={key === "Logout" ? "orange" : "white"}
                        >
                          <Icon as={value} fontSize="24px" />{" "}
                          <Text size="B3">{key}</Text>
                        </Flex>
                      </Box>
                    </Link>
                  )
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

function DefaultBackgroundAndNavigationBar({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="background.svg"
        alt="wheew wheew *pretend as if the background is in outer space*"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <NavigationBarAndMenu />
        {children}
      </Flex>
    </Box>
  );
}

export { DefaultBackgroundAndNavigationBar, showSubmissionPage };
