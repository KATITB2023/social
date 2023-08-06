import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  Center,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { MdPersonPin, MdCameraAlt } from "react-icons/md";

import { SelectPhotoImageProfile } from "~/components/profile/SelectPhotoImageProfile";
import ProfilePicture from "~/components/profile/ProfilePicture";
import LabelValueContainer from "~/components/profile/LabelValueContainer";
import BackgroundAndNavigationBar from "~/components/profile/BackgroundAndNavigationBar";

import { api } from "~/utils/api";
import { type SelfProfile } from "~/server/types/user-profile";
import EditingProfile from "~/components/profile/EditingProfile";

export interface EditableProps {
  bio?: string;
  instagram?: string;
  email?: string;
  image?: string;
}

const defautProfile: SelfProfile = {
  bio: "something",
  campus: "GANESHA",
  email: "Vicenta_Ryan@hotmail.coui",
  faculty: "Sekolah Teknik Elektro dan Informatika",
  friendCount: 0,
  gender: "MALE",
  id: "5d42b047-2fff-45d0-9e07-567f3e6265a4",
  image: null,
  instagram: "@gana.dipaa",
  name: "Rufus Wiza",
  nim: "13521003",
  pin: "842081",
  point: 0,
  visitedCount: 0,
};

export default function ProfilePage() {
  const { data: selfProfile } = api.profile.getUserProfile.useQuery();
  const [openSelectImage, setOpenSelectImage] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  if (!selfProfile) return null;

  function handleProfileEdit({
    bio = "",
    instagram = "",
    email = "",
  }: EditableProps) {}
  return (
    <BackgroundAndNavigationBar>
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
          src={profileImage ? profileImage : selfProfile?.image ?? undefined}
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
          <Text size="B3"> PIN : {selfProfile.pin}</Text>
        </Flex>
        <ProfileInfo info={selfProfile} onProfileEdit={handleProfileEdit} />
        <SelectPhotoImageProfile
          open={openSelectImage}
          setOpen={setOpenSelectImage}
          changeImage={setProfileImage}
          nim={selfProfile.nim}
        />
      </Flex>
    </BackgroundAndNavigationBar>
  );
}

function UserProfilePicture({
  src,
  setOpen,
}: {
  src?: string;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}) {
  return (
    <Box position="relative" alignSelf="center">
      <ProfilePicture src={src} />
      <IconButton
        onClick={() => {
          console.log("working...");
          setOpen(true);
        }}
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

function ProfileInfo({
  info,
  onProfileEdit,
}: { info: SelfProfile } & {
  onProfileEdit: ({ bio, instagram, email }: EditableProps) => void;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [bio, setBio] = useState(info.bio || "");
  const [instagram, setInstagram] = useState(info.instagram || "");
  const [email, setEmail] = useState(info.email || "");

  return isEditMode ? (
    <EditingProfile
      initialState={info}
      setIsEditMode={setIsEditMode}
      onProfileEdit={onProfileEdit}
    />
  ) : (
    <>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height="85%"
        gap="16px"
      >
        {Object.entries({
          Nama: "name",
          NIM: "nim",
          Fakultas: "faculty",
          Gender: "gender",
          Kampus: "campus",
          Bio: "bio",
          Instagram: "instagram",
          Email: "email",
        }).map(([key, value]) => (
          <LabelValueContainer
            label={key}
            key={key}
            value={info[value] || "-"}
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

export { BackgroundAndNavigationBar, ProfilePicture };
