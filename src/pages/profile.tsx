import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Center,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Link,
  Icon,
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
  MdPersonPin,
  MdCameraAlt,
} from "react-icons/md";
import { type IconType } from "react-icons";
import { useRouter } from "next/router";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

interface LabelValueType {
  label: string;
  value?: string;
}
interface ProfileInfoComponentType {
  info: { [key: string]: string | undefined };
  onProfileEdit: ({
    bio,
    instagram,
    email,
  }: {
    [key: string]: string | undefined;
  }) => void;
}

const defaultUserProfile: { [key: string]: string | undefined } = {
  nama: "Nyoman Ganadipa Narayana",
  nim: "19622191",
  fakultas: "STEI-K",
  gender: "Laki-laki",
  kampus: "Ganesha",
  bio: "Super tampan",
  email: "gana.dipa05@gmail.com",
  pin: "13pkI7Fr",
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(defaultUserProfile);

  function handleProfileEdit({
    bio,
    instagram,
    email,
  }: {
    [key: string]: string | undefined;
  }) {
    setUserProfile((userProfile) => ({
      ...userProfile,
      bio,
      instagram,
      email,
    }));
  }

  return (
    <Flex
      width="100%"
      height="100%"
      background="url('/images/blur-oskm.jpg')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minHeight="100vh"
      minWidth="100%"
      flexDirection="column"
    >
      <NavigationBarAndMenu />

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="20px"
        mx="24px"
        my="35px"
      >
        <Heading color="yellow.5" size="H4" alignSelf="center">
          Profile
        </Heading>
        <UserProfilePicture />
        <Flex
          alignSelf="center"
          width="140px"
          alignItems="center"
          gap="12px"
          justifyContent="space-evenly"
          color="white"
        >
          <MdPersonPin style={{ fontSize: "20px" }} />
          <Text size="B4"> PIN : {userProfile.pin}</Text>
        </Flex>
        <ProfileInfo info={userProfile} onProfileEdit={handleProfileEdit} />
      </Flex>
    </Flex>
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

function LabelValueContainer({ label, value = "-" }: LabelValueType) {
  return (
    <Box h="52px" color="white">
      <Text size="B5">{label}</Text>
      <Text size="B2">{value}</Text>
    </Box>
  );
}

function UserProfilePicture({ src }: { src?: string }) {
  return (
    <Box position="relative" alignSelf="center">
      <Image
        src={src}
        fallbackSrc="https://via.placeholder.com/150"
        alt="Ga ke load"
        borderRadius="full"
        boxSize="10.25em"
        alignSelf="center"
      />
      <IconButton
        backgroundColor="purple.1"
        aria-label="Call Segun"
        size="lg"
        icon={<MdCameraAlt />}
        borderRadius="full"
        position="absolute"
        bottom="0"
        right="0"
        color="white"
      />
    </Box>
  );
}

function ProfileInfo({ info, onProfileEdit }: ProfileInfoComponentType) {
  const [bio, setBio] = useState(info.bio || "");
  const [instagram, setInstagram] = useState(info.instagram || "");
  const [email, setEmail] = useState(info.email || "");
  const [isEditMode, setIsEditMode] = useState(false);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onProfileEdit({ bio, instagram, email });
    setIsEditMode((isEditMode) => !isEditMode);
  }

  function handleCancel() {
    setBio(info.bio ?? "");
    setInstagram(info.instagram ?? "");
    setEmail(info.email ?? "");
    setIsEditMode((isEditMode) => !isEditMode);
  }

  return isEditMode ? (
    <form onSubmit={handleSave}>
      <FormControl>
        <Box display="flex" flexDirection="column" gap="8px" mb="25px">
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Bio</Text>
            </FormLabel>
            <Input
              type="text"
              value={bio}
              placeholder={info.bio ?? ""}
              onChange={(e) => setBio(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Instagram</Text>
            </FormLabel>
            <Input
              type="text"
              value={instagram}
              placeholder={info.instagram ?? ""}
              onChange={(e) => setInstagram(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Email</Text>
            </FormLabel>
            <Input
              type="email"
              value={email}
              placeholder={info.email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
        </Box>
        <Center gap="15px">
          <Button
            paddingX="1.5em"
            paddingY="0.5em"
            backgroundColor="gray.600"
            alignSelf="center"
            onClick={handleCancel}
            borderColor="yellow.5"
            color="yellow.5"
            borderWidth="2px"
            borderRadius="0.75em"
          >
            <Text size="B5">Cancel</Text>
          </Button>
          <Button
            paddingX="1.5em"
            paddingY="0.5em"
            backgroundColor="yellow.5"
            alignSelf="center"
            type="submit"
            color="purple.2"
            borderRadius="0.75em"
          >
            <Text size="B5">Save</Text>
          </Button>
        </Center>
      </FormControl>
    </form>
  ) : (
    <>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height="85%"
        gap="16px"
      >
        {[
          "nama",
          "nim",
          "fakultas",
          "gender",
          "kampus",
          "bio",
          "instargram",
          "email",
        ].map((key) => (
          <LabelValueContainer
            label={toTitleCase(key)}
            key={key}
            value={info?.[key] || "-"}
          />
        ))}
      </Flex>
      <Button
        paddingX="1.5em"
        paddingY="0.5em"
        backgroundColor="yellow.5"
        alignSelf="center"
        onClick={() => setIsEditMode((isEditMode) => !isEditMode)}
      >
        <Text size="B5"> edit profile</Text>
      </Button>
    </>
  );
}
