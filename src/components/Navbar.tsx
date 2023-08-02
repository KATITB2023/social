import { NextPage } from "next";
import { useState } from "react";
import Layout from "~/layout";
import {
  Container,
  Heading,
  theme,
  Text,
  Center,
  Box,
  Flex,
  Image,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import {
  MdPersonAddAlt,
  MdOutlineHome,
  MdNewspaper,
  MdOutlineAssignment,
  MdStarOutline,
  MdChatBubbleOutline,
  MdOutlinePersonOutline,
  MdLogout,
  MdOutlineAssignmentInd,
} from "react-icons/md";

const Navbar: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout title="Navbar">
      <Center>
        <Flex
          background="url('/navbarbg.svg')"
          w="90%"
          minHeight="60px"
          borderRadius="50px"
          position="absolute"
          top="20px"
          flexDir="row"
          alignItems="center"
          paddingY="2%"
          boxShadow="0px 0px 10px #FFFC83"
          paddingX="22px"
        >
          <Box
            backgroundColor="#0B0A0A"
            opacity="0.6"
            borderRadius="50px"
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
          ></Box>
          <Image
            src="ekor.svg"
            position="absolute"
            left="0"
            height="full"
            objectFit="cover"
            objectPosition="center"
            borderRadius="50px"
          ></Image>
          <Image
            objectFit="cover"
            objectPosition="center"
            src="/Vector.svg"
            alt="OSKM ITB"
            zIndex="2"
          />
          <Box w="20%"></Box>
          <Flex flex="1" flexDir="row" justifyContent="end" zIndex="2">
            <Icon
              color="white"
              as={MdPersonAddAlt}
              height="30px"
              width="30px"
              marginRight="10px"
            />
            <Image
              src="/hamburgermenu.svg"
              height="30px"
              width="30px"
              onClick={onOpen}
            ></Image>
          </Flex>
        </Flex>
      </Center>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex
              height="100%"
              width="100%"
              backgroundColor="#1D0263"
              position="absolute"
              top="0"
              justifyContent="space-evenly"
              right="0"
              paddingY="80px"
              paddingX="20px"
              flexDir="column"
              zIndex="3"
              opacity="1"
            >
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdOutlineHome}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="3px" size="B4" marginLeft="10px">
                  Back to Home
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdNewspaper}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="3px" size="B4" marginLeft="10px">
                  Feeds
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdOutlineAssignmentInd}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="1px" size="B4" marginLeft="10px">
                  Attendance
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdOutlineAssignment}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="1px" size="B4" marginLeft="10px">
                  Assignment
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdStarOutline}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="3px" size="B4" marginLeft="10px">
                  Showcase
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="white">
                <Icon
                  as={MdChatBubbleOutline}
                  height="20px"
                  width="20px"
                  marginLeft="11px"
                ></Icon>
                <Text marginTop="1px" size="B4" marginLeft="9px">
                  Chat
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                alignItems="center"
                color="yellow"
                borderLeft="2px"
              >
                <Icon
                  as={MdOutlinePersonOutline}
                  height="22px"
                  width="22px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="2px" size="B4" marginLeft="10px">
                  Profile
                </Text>
              </Flex>
              <Flex flexDir="row" alignItems="center" color="#E8553E">
                <Icon
                  as={MdLogout}
                  height="20px"
                  width="20px"
                  marginLeft="10px"
                ></Icon>
                <Text marginTop="3px" size="B4" marginLeft="10px">
                  Logout
                </Text>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
};

export default Navbar;