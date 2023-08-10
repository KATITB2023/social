import { useEffect, useState } from "react";

import {
  Box,
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
  MdShoppingBasket,
  MdStarOutline,
} from "react-icons/md";
import { type IconType } from "react-icons";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

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
  const router = useRouter();
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
    <Flex
      flexDir="row"
      alignItems="center"
      color={type == 2 ? "#E8553E" : type == 1 ? "yellow.5" : "white"}
      py={3}
      borderRadius={2}
      cursor={"pointer"}
      borderLeft={type == 1 ? "2px" : "0"}
      _hover={{ bg: "#3D2283" }}
      onClick={() => void router.push(data.route)}
    >
      <Icon as={data.icon} height="20px" width="20px" marginLeft="10px"></Icon>
      <Text marginTop="3px" size="B4" marginLeft="10px">
        {data.text}
      </Text>
    </Flex>
  );
};

const Navbar = ({ currentPage }: { currentPage: string }) => {
  const [navbarPos, setNavbarPos] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const DrawerArray: PairDrawerButton[] = [
    { icon: MdNewspaper, text: "Feeds", route: "/" },
    {
      icon: MdOutlineAssignmentInd,
      text: "Attendance",
      route: "/attendance-list",
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
    { icon: MdStarOutline, text: "Showcase", route: "/showcase" },
    { icon: MdShoppingBasket, text: "Merchandise", route: "/merchandise" },
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
      route: "/",
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
        background="url('/navbarbg.svg')"
        maxWidth={"343px"}
        w={"full"}
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
          src="/ekor.svg"
          position="absolute"
          left="0"
          height="full"
          objectFit="cover"
          objectPosition="center"
          borderRadius="50px"
        />

        <Image
          objectFit="cover"
          objectPosition="center"
          src="/Vector.svg"
          alt="OSKM ITB"
          zIndex="2"
        />

        <Flex flex="1" flexDir="row" justifyContent="end" zIndex="2">
          <Icon
            cursor={"pointer"}
            color="white"
            as={MdPersonAddAlt}
            height="30px"
            width="30px"
            marginRight="10px"
          />
          <Image
            alt="Hamburger menu"
            cursor={"pointer"}
            src="/hamburgermenu.svg"
            height="30px"
            width="30px"
            onClick={onOpen}
          />
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
              {DrawerArray.map((tuple: PairDrawerButton, idx: number) => {
                return (
                  <DrawerButton
                    key={idx}
                    data={tuple}
                    type={tuple.text === currentPage ? 1 : 0}
                  />
                );
              })}
              <DrawerButton data={LogoutButtonData} type={2} />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
