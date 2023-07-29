import { type NextPage } from "next";
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
} from "react-icons/md";

const Navbar: NextPage = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  return (
    <Layout title="Navbar">
      <Center>
        <Flex
          background="url('/navbarbg.svg')"
          w="90%"
          minHeight="60px"
          color="white"
          borderRadius="50px"
          position="fixed"
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
              as={MdPersonAddAlt}
              height="30px"
              width="30px"
              marginRight="10px"
            />
            <Image
              src="/hamburgermenu.svg"
              height="30px"
              width="30px"
              onClick={() => setSidebarStatus(true)}
            ></Image>
          </Flex>
        </Flex>
      </Center>
      {sidebarStatus === true ? (
        <Box
          position="relative"
          top="0"
          bottom="0"
          left="0"
          right="0"
          minH="100vh"
          w="full"
          backgroundColor="rgba(0, 0, 0, 0.9)"
          zIndex="3"
          onClick={() => setSidebarStatus(false)}
        >
          <Flex
            height="100vh"
            width="70%"
            backgroundColor="#1D0263"
            position="absolute"
            justifyContent="space-evenly"
            right="0"
            paddingY="80px"
            paddingX="30px"
            flexDir="column"
            zIndex="3"
            opacity="1"
          >
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdPersonAddAlt}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Back to Home
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdOutlineHome}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Feeds
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdNewspaper}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Attendance
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdOutlineAssignment}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Assignment
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdStarOutline}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Showcase
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdChatBubbleOutline}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Chat
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdOutlinePersonOutline}
                height="17px"
                width="17px"
                color="white"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="white"
              >
                Profile
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon
                as={MdLogout}
                height="17px"
                width="17px"
                color="#E8553E"
              ></Icon>
              <Text
                verticalAlign="middle"
                size="B5"
                marginLeft="10px"
                color="#E8553E"
              >
                Logout
              </Text>
            </Flex>
          </Flex>
        </Box>
      ) : null}
    </Layout>
  );
};

export default Navbar;
