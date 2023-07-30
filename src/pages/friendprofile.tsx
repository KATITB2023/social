import { Flex, Text, Heading, Button, Box } from "@chakra-ui/react";
import {
  DefaultBackgroundAndNavigationBar,
  LabelValueContainer,
  ProfilePicture,
} from "./profile";
import { MdPersonPin, MdChatBubbleOutline } from "react-icons/md";

const defaultFriendProfile: { [key: string]: string | undefined } = {
  Nama: "Nyoman Ganadipa Narayana ",
  NIM: "19622191",
  Fakultas: "STEI-K",
  Gender: "Laki-laki",
  Kampus: "Ganesha",
  Bio: "Super tampan",
  Email: "gana.dipa05@gmail.com",
  PIN: "13pkI7Fr",
};

export default function friendProfilePage() {
  return (
    <DefaultBackgroundAndNavigationBar>
      <Flex mx="24px" my="36px" flexDirection="column" gap="20px">
        <Box>
          <Flex gap="14px">
            <ProfilePicture size="130px" />
            <Flex
              flexDirection="column"
              flexGrow="0"
              alignItems="flex-start"
              justifyContent="space-evenly"
            >
              <Heading size="SH4" color="yellow.5">
                {defaultFriendProfile.Nama}
              </Heading>
              <Flex alignItems="center" gap="12px" color="white">
                <MdPersonPin style={{ fontSize: "20px" }} />
                <Text size="B3"> PIN : {defaultFriendProfile.PIN}</Text>
              </Flex>
              <Button
                backgroundColor="purple.2"
                borderRadius="12px"
                px="16px"
                py="4px"
                height="24px"
              >
                <Flex gap="12px" color="white" alignItems="center" my="0px">
                  <MdChatBubbleOutline />
                  <Text size="B5"> CHAT</Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Flex flexDirection="column" gap="16px">
          {[
            "NIM",
            "Fakultas",
            "Gender",
            "Kampus",
            "Bio",
            "Instargram",
            "Email",
          ].map((key) => (
            <LabelValueContainer
              label={key}
              key={key}
              value={defaultFriendProfile?.[key] || "-"}
            />
          ))}
        </Flex>
        <Button
          alignSelf="center"
          px="32px"
          py="12px"
          backgroundColor="yellow.1"
          color="white"
        >
          <Text size="B3">delete</Text>
        </Button>
      </Flex>
    </DefaultBackgroundAndNavigationBar>
  );
}
