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
  type ResponsiveValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
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
import { ProfilePhotoSelectImage } from "~/components/ProfilePhotoSelectImage";

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
  Nama: "Nyoman Ganadipa Narayana",
  NIM: "19622191",
  Fakultas: "STEI-K",
  Gender: "Laki-laki",
  Kampus: "Ganesha",
  Bio: "Super tampan",
  Email: "gana.dipa05@gmail.com",
  PIN: "13pkI7Fr",
};

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(defaultUserProfile);
  const [openSelectImage, setOpenSelectImage] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(undefined);

  function handleProfileEdit({
    bio: Bio,
    instagram: Instagram,
    email: Email,
  }: {
    bio?: string;
    instagram?: string;
    email?: string;
  }) {
    setUserProfile((userProfile) => ({
      ...userProfile,
      Bio,
      Instagram,
      Email,
    }));
  }

  return (
    <DefaultBackgroundAndNavigationBar>
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
        <UserProfilePicture
          src={ profileImage? profileImage : userProfile.src}
          setOpen={setOpenSelectImage}
        />
        <Flex
          alignSelf="center"
          width="140px"
          alignItems="center"
          gap="12px"
          justifyContent="space-evenly"
          color="white"
        >
          <MdPersonPin style={{ fontSize: "20px" }} />
          <Text size="B3"> PIN : {userProfile.PIN}</Text>
        </Flex>
        <ProfileInfo info={userProfile} onProfileEdit={handleProfileEdit} />
        <ProfilePhotoSelectImage
          open={openSelectImage}
          setOpen={setOpenSelectImage}
          changeImage={setProfileImage}
        />
      </Flex>
    </DefaultBackgroundAndNavigationBar>
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
    <Flex color="white" gap="4px" flexDirection="column">
      <Text size="B5">{label}</Text>
      <Text size="B2">{value}</Text>
    </Flex>
  );
}

function UserProfilePicture({ src, setOpen }: { src?: string; setOpen: any }) {
  return (
    <Box position="relative" alignSelf="center">
      <ProfilePicture src={src} />
      <IconButton
        onClick={() => setOpen(true)}
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
  const [bio, setBio] = useState(info.Bio || "");
  const [instagram, setInstagram] = useState(info.Instagram || "");
  const [email, setEmail] = useState(info.Email || "");
  const [isEditMode, setIsEditMode] = useState(false);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onProfileEdit({ bio, instagram, email });
    setIsEditMode((isEditMode) => !isEditMode);
  }

  function handleCancel() {
    setBio(info.Bio ?? "");
    setInstagram(info.Instagram ?? "");
    setEmail(info.Email ?? "");
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
              placeholder={info.Bio ?? ""}
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
              placeholder={info.Instagram ?? ""}
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
              placeholder={info.Email ?? ""}
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
          "Nama",
          "NIM",
          "Fakultas",
          "Gender",
          "Kampus",
          "Bio",
          "Instagram",
          "Email",
        ].map((key) => (
          <LabelValueContainer
            label={key}
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

function ProfilePicture({
  src = "/defaultprofpict.svg",
  size = "164px",
  br = "full",
}: {
  src?: string;
  size?: ResponsiveValue<number | string>;
  br?: ResponsiveValue<number | string>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        src={src}
        alt="Profile Picture"
        borderRadius={br}
        boxSize={size}
        alignSelf="center"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="black" justifyContent="space-evenly">
          <ModalCloseButton size="24px" mx="24px" my="24px" />
          <ProfilePicture size="100%" br="0" />
        </ModalContent>
      </Modal>
    </>
  );
}

export {
  DefaultBackgroundAndNavigationBar,
  ProfilePicture,
  LabelValueContainer,
};
