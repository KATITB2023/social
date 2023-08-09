import {
  Text,
  Flex,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Link,
  Icon,
  Center,
  Box,
  Image,
} from "@chakra-ui/react";

import {
  MdHome,
  MdStarOutline,
  MdChatBubbleOutline,
  MdPerson,
  MdLogout,
  MdOutlineAssignmentInd,
  MdOutlineAssignment,
  MdNewspaper,
  MdPersonAddAlt,
} from "react-icons/md";

import { type IconType } from "react-icons";
import { useRouter } from "next/router";

export default function NavigationBar() {
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
    <Box as="header" content="" w="100%" height="60px" mb="30px">
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
            alt=""
          ></Image>
          <Image
            objectFit="cover"
            objectPosition="center"
            src="/Vector.svg"
            alt="OSKM ITB"
            zIndex="2"
            onClick={() => void router.push("/home")}
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
              alt=""
              onClick={onOpen}
            ></Image>
          </Flex>
        </Flex>
      </Center>
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
    </Box>
  );
}
