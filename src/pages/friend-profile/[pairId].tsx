import { Flex, Text, Heading, Button, Box } from "@chakra-ui/react";
import ProfilePage, {
  DefaultBackgroundAndNavigationBar,
  LabelValueContainer,
  ProfilePicture,
} from "../profile"
import { MdPersonPin, MdChatBubbleOutline } from "react-icons/md";
import Link from "next/link";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import NotFound from "../404";
import { useRouter } from "next/router";

export default function FriendProfilePage() {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const profileQuery = api.friend.getOtherUserProfile.useQuery({
    userId: pairId,
  });

  const removeFriend = api.friend.removeFriend.useMutation();
  const removeFriendExecutor = () => {
   removeFriend
     .mutateAsync({
       userId: pairId,
     })
     .then(() => {
        <ProfilePage />
        console.log("Teman berhasil dihapus")
     })
     .catch((error) => {
       console.error("Error while removing friend:", error);
     });
 };
  
  const student = profileQuery.data;

  if (!student) {
    return <NotFound />;
  }

  if (!session) {
    return <NotFound />;
  }

  if (student.image === null || "" || undefined)
  {
    student.image="/defaultprofpict.svg"
  }
  return (
    <DefaultBackgroundAndNavigationBar>
      <Flex mx="24px" my="36px" flexDirection="column" gap="20px">
        <Box>
          <Flex gap="14px">
            <ProfilePicture size="130px" src={student.image} />
            <Flex
              flexDirection="column"
              flexGrow="0"
              alignItems="flex-start"
              justifyContent="space-evenly"
            >
              <Heading size="SH4" color="yellow.5">
                {student.name}
              </Heading>
              <Flex alignItems="center" gap="12px" color="white">
                <MdPersonPin style={{ fontSize: "20px" }} />
                <Text size="B3"> PIN : {student.pin}</Text>
              </Flex>
              <Link href={`chat/${student.id}`}>
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
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Flex flexDirection="column" gap="16px">
          <LabelValueContainer label="NIM" value={student?.nim || "-"} />
          <LabelValueContainer
            label="Fakultas"
            value={student?.faculty || "-"}
          />
          <LabelValueContainer label="Gender" value={student?.gender || "-"} />
          <LabelValueContainer label="Kampus" value={student?.campus || "-"} />
          <LabelValueContainer label="Bio" value={student?.bio || "-"} />
          <LabelValueContainer
            label="Instagram"
            value={student?.instagram || "-"}
          />
          <LabelValueContainer label="Email" value={student?.email || "-"} />
        </Flex>
        <Button
          alignSelf="center"
          px="32px"
          py="12px"
          backgroundColor="yellow.1"
          color="white"
          onClick={() => removeFriendExecutor()}
        >
          <Text size="B3">delete</Text>
        </Button>
      </Flex>
    </DefaultBackgroundAndNavigationBar>
  );
}

 