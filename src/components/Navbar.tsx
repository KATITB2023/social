import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type IconType } from "react-icons";
import {
  MdChatBubbleOutline,
  MdErrorOutline,
  MdLeaderboard,
  MdLogout,
  MdNewspaper,
  MdOutlineAssignment,
  MdOutlineAssignmentInd,
  MdOutlinePersonOutline,
  MdPersonAddAlt,
} from "react-icons/md";
import { FUTUREFLAG } from "~/constant";
import { api } from "~/utils/api";

type PairDrawerButton = {
  icon: IconType;
  text: string;
  route: string;
};

const DrawerButton = ({
  data,
  type,
}: {
  data: PairDrawerButton;
  type: number;
}) => {
  // Type 0 = default
  // Type 1 = current
  // Type 2 = special for logout
  if (type === 2) {
    return (
      <Flex
        flexDir="row"
        alignItems="center"
        color="#E8553E"
        py={3}
        as="button"
        borderRadius={2}
        cursor={"pointer"}
        _hover={{ bg: "#3D2283" }}
        onClick={() => void signOut({ callbackUrl: "/login" })}
      >
        <Icon
          as={data.icon}
          height="20px"
          width="20px"
          marginLeft="10px"
        ></Icon>
        <Text marginTop="3px" size="B4" marginLeft="10px">
          {data.text}
        </Text>
      </Flex>
    );
  }
  return (
    <Link href={data.route}>
      <Flex
        flexDir="row"
        alignItems="center"
        color={type == 2 ? "#E8553E" : type == 1 ? "yellow.5" : "white"}
        py={3}
        borderRadius={2}
        cursor={"pointer"}
        borderLeft={type == 1 ? "2px" : "0"}
        _hover={{ bg: "#3D2283" }}
      >
        <Icon
          as={data.icon}
          height="20px"
          width="20px"
          marginLeft="10px"
        ></Icon>
        <Text marginTop="3px" size="B4" marginLeft="10px">
          {data.text}
        </Text>
      </Flex>
    </Link>
  );
};

const Navbar = () => {
  const { data: selfProfile } = api.profile.getUserProfile.useQuery();
  const [navbarPos, setNavbarPos] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useRouter();
  const currentPage = pathname.split("/")[1];

  const DrawerArray: PairDrawerButton[] = [
    { icon: MdNewspaper, text: "Feeds", route: "/" },
    {
      icon: MdOutlineAssignmentInd,
      text: "Attendance",
      route: "/attendance",
    },
    {
      icon: MdOutlineAssignment,
      text: "Assignment",
      route: "/assignment",
    },
    {
      icon: MdLeaderboard,
      text: "Leaderboard",
      route: "/leaderboard",
    },
    // { icon: MdStarOutline, text: "Showcase", route: "/showcase" },
    // { icon: MdShoppingBasket, text: "Merchandise", route: "/merchandise" },
    {
      icon: MdChatBubbleOutline,
      text: "Chat",
      route: "/chat",
    },
    {
      icon: MdOutlinePersonOutline,
      text: "Profile",
      route: "/profile",
    },
    {
      icon: MdErrorOutline,
      text: "Rules",
      route: "https://go.oskmitb.com/SOPPesertaOSKMITB23",
    },
  ];

  const LogoutButtonData: PairDrawerButton = {
    icon: MdLogout,
    text: "Logout",
    route: "/",
  };

  //   Scroll mechanism algorithm
  useEffect(() => {
    let prevScrollPosY = window.scrollY;

    const detectScrollY = () => {
      if (window.scrollY <= prevScrollPosY) {
        setNavbarPos(0);
      } else {
        setNavbarPos(-100);
      }
      prevScrollPosY = window.scrollY;
    };

    window.addEventListener("scroll", detectScrollY);
    return () => {
      window.removeEventListener("scroll", detectScrollY);
    };
  });

  return (
    <>
      <Flex
        position={"relative"}
        display={"block"}
        backgroundColor={"transparent"}
        h={"60px"}
        my={"20px"}
      />

      <Flex
        my={"20px"}
        mx={"auto"}
        top={navbarPos}
        position={"fixed"}
        insetX={0}
        zIndex={1}
        background="url('/navbarbg.png')"
        maxWidth={"450px"}
        w={"90%"}
        h="60px"
        borderRadius="50px"
        flexDir="row"
        alignItems="center"
        paddingY="2%"
        paddingX="22px"
        boxShadow="0px 0px 20px 0px #FFFC8366"
        transitionDuration={"0.3s"}
        transitionTimingFunction={"ease-in-out"}
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
        />

        <Image
          alt="Ekor"
          src="/ekor.png"
          position="absolute"
          left="0"
          height="full"
          objectFit="cover"
          objectPosition="center"
          borderRadius="50px"
        />

        <Box zIndex="2">
          <Link href={"/"}>
            <Image
              objectFit="cover"
              objectPosition="center"
              src="/Vector.svg"
              alt="OSKM ITB"
            />
          </Link>
        </Box>

        <Flex
          flex="1"
          flexDir="row"
          justifyContent="end"
          zIndex="2"
          alignItems={"center"}
        >
          {FUTUREFLAG && (
            <Icon
              cursor={"pointer"}
              color="white"
              as={MdPersonAddAlt}
              height="30px"
              width="30px"
              marginRight="10px"
            />
          )}
          <Button variant={"unstyled"} onClick={onOpen}>
            <Image
              alt="Hamburger menu"
              cursor={"pointer"}
              src="/hamburgermenu.svg"
              height="30px"
              width="30px"
            />
          </Button>
        </Flex>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex
              height="100%"
              width="100%"
              backgroundColor="navy.1"
              position="absolute"
              top="0"
              justifyContent="space-evenly"
              right="0"
              paddingY="40px"
              paddingX="20px"
              flexDir="column"
              zIndex="3"
            >
              {selfProfile && (
                <Flex
                  flexDir={"row"}
                  gap={3}
                  alignItems={"center"}
                  mb={5}
                  w={"full"}
                >
                  <Box
                    minW={"60px"}
                    minH={"60px"}
                    backgroundImage={
                      selfProfile.image
                        ? selfProfile.image
                        : "/defaultprofpict.svg"
                    }
                    backgroundPosition={"center"}
                    backgroundSize={"cover"}
                    borderRadius={"full"}
                    border={"2px white solid"}
                  />
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    color={"yellow.5"}
                    noOfLines={2}
                  >
                    {selfProfile.name}
                  </Text>
                </Flex>
              )}

              {DrawerArray.map((tuple: PairDrawerButton, idx: number) => {
                return (
                  <DrawerButton
                    key={idx}
                    data={tuple}
                    type={
                      currentPage?.length === 0 && tuple.text === "Feeds"
                        ? 1
                        : tuple.text.toUpperCase() ===
                          currentPage?.toUpperCase()
                        ? 1
                        : 0
                    }
                  />
                );
              })}
              {selfProfile && <DrawerButton data={LogoutButtonData} type={2} />}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
