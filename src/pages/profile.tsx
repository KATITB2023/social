import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";

import { MdCameraAlt, MdPersonPin } from "react-icons/md";

import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import EditPasswordModal from "~/components/profile/EditPasswordModal";
import LabelValueContainer from "~/components/profile/LabelValueContainer";
import ProfilePicture from "~/components/profile/ProfilePicture";
import { SelectPhotoImageProfile } from "~/components/profile/SelectPhotoImageProfile";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EditingProfile from "~/components/profile/EditingProfile";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { type SelfProfile } from "~/server/types/user-profile";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

export interface EditableProps {
  bio?: string;
  instagram?: string;
  email?: string;
  image?: string;
}

export default function ProfilePage() {
  const { data: selfProfile } = api.profile.getUserProfile.useQuery();
  const [openSelectImage, setOpenSelectImage] = useState<boolean>(false);
  const sessionStatus = useSession();
  const router = useRouter();
  if (sessionStatus.status === "unauthenticated") {
    void router.push("/login");
  }
  if (!selfProfile) return <Layout title="Profile"></Layout>;
  return (
    <Layout title={`Profile: ${selfProfile.name}`}>
      <BackgroundAndNavbar bg="/profile_bg.png">
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
            src={selfProfile?.image ?? undefined}
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
          <ProfileInfo info={selfProfile} />
          <SelectPhotoImageProfile
            open={openSelectImage}
            setOpen={setOpenSelectImage}
            nim={selfProfile.nim}
          />
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
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
    <Box position="relative" alignSelf="center" width="164px" height="164px">
      <ProfilePicture src={src} size={164} />
      <IconButton
        onClick={() => {
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
function ProfileInfo({ info }: { info: SelfProfile }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isEditMode ? (
    <EditingProfile initialState={info} setIsEditMode={setIsEditMode} />
  ) : (
    <Box
      maxHeight="40vh"
      overflowY="scroll"
      sx={{
        "::-webkit-scrollbar": {
          width: "11px",
          position: "absolute",
          right: "5px",
        },
        "::-webkit-scrollbar-track": {
          background: "#2F2E2E",
          borderRadius: "5px",
          marginY: "10px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "white",
          borderRadius: "5px",
        },
      }}
    >
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
            value={info[value as keyof SelfProfile]?.toString() || "-"}
          />
        ))}
      </Flex>
      <HStack justifyContent="center" spacing={5} marginTop="5%">
        <Button
          paddingX="24px"
          paddingY="8px"
          backgroundColor="yellow.5"
          alignSelf="center"
          onClick={onOpen}
          fontFamily={"SomarRounded-Bold"}
          color={"#4909B3"}
          width={"114px"}
          borderRadius={"12px"}
        >
          <Text size="B5">Edit Password</Text>
        </Button>
        <EditPasswordModal isOpen={isOpen} onClose={onClose} />
        <Button
          paddingX="24px"
          paddingY="8px"
          backgroundColor="yellow.5"
          alignSelf="center"
          onClick={() => setIsEditMode((isEditMode) => !isEditMode)}
          fontFamily={"SomarRounded-Bold"}
          color={"#4909B3"}
          width={"114px"}
          borderRadius={"12px"}
        >
          <Text size="B5">Edit Profile</Text>
        </Button>
      </HStack>
    </Box>
  );
}
