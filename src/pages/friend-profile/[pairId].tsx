import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdChatBubbleOutline, MdPersonPin } from "react-icons/md";
import LoadingScreen from "~/components/LoadingScreen";
import LabelValueContainer from "~/components/profile/LabelValueContainer";
import ComingSoon from "~/components/screen/ComingSoon";
import { FUTUREFLAG } from "~/constant";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import { BackgroundAndNavigationBar, ProfilePicture } from "../profile";

export const getServerSideProps = withSession({ force: true });

export default function FriendProfilePage() {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const pairId = router.query.pairId as string;
  const profileQuery = api.friend.getOtherUserProfile.useQuery({
    userId: pairId,
  });

  const removeFriend = api.friend.removeFriend.useMutation();
  const addFriend = api.friend.addFriend.useMutation();
  const incrementVisit = api.friend.incrementVisitCounter.useMutation();

  const removeFriendExecutor = () => {
    removeFriend
      .mutateAsync({
        userId: pairId,
      })
      .catch(() => undefined);
    window.location.reload();
  };

  const addFriendExecutor = () => {
    addFriend
      .mutateAsync({
        userId: pairId,
      })
      .catch(() => undefined);
    window.location.reload();
  };

  useEffect(() => {
    incrementVisit.mutate({ userId: pairId });
  }, []);

  const student = profileQuery.data;

  if (!student || !session) {
    return <LoadingScreen />;
  }

  if (student.image === null || "" || undefined) {
    student.image = "/defaultprofpict.svg";
  }

  if (!FUTUREFLAG) {
    return <ComingSoon />;
  }
  return (
    <Layout title={`Profile: ${student.name}`}>
      <BackgroundAndNavigationBar>
        <Flex mx="24px" my="36px" flexDirection="column" gap="20px">

          {/* Friends Profile  */}
          <Flex
            gap="14px"
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ProfilePicture size={150} src={student.image} />
            <Flex
              flexDirection="column"
              flexGrow="0"
              alignItems="center"
              gap={2}
            >
              <Heading size="SH2" color="yellow.5" textAlign={"center"}>
                {student.name}
              </Heading>

              <Flex alignItems="center" gap="12px" color="white">
                <MdPersonPin style={{ fontSize: "20px" }} />
                <Text size="B3"> PIN : {student.pin}</Text>
              </Flex>

              <Link href={`/chat/${student.id}`}>
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

          <Flex flexDirection="column" gap="16px">
            <LabelValueContainer label="NIM" value={student?.nim || "-"} />
            <LabelValueContainer
              label="Fakultas"
              value={student?.faculty || "-"}
            />
            <LabelValueContainer
              label="Gender"
              value={student?.gender || "-"}
            />
            <LabelValueContainer
              label="Kampus"
              value={student?.campus || "-"}
            />
            <LabelValueContainer label="Bio" value={student?.bio || "-"} />
            <LabelValueContainer
              label="Instagram"
              value={student?.instagram || "-"}
            />
            <LabelValueContainer label="Email" value={student?.email || "-"} />
          </Flex>
          {student.status === "FRIEND" ? (
            <Button
              alignSelf="center"
              px="32px"
              py="12px"
              backgroundColor="pink.1"
              color="white"
              onClick={() => removeFriendExecutor()}
            >
              <Text size="B3">Delete Friend</Text>
            </Button>
          ) : student.status === "WAITING_FOR_ACCEPTANCE" ? (
            <>
              <Button
                alignSelf="center"
                px="32px"
                py="12px"
                backgroundColor="green.1"
                color="white"
                onClick={() => addFriendExecutor()}
              >
                <Text size="B3">Accept Friend Request</Text>
              </Button>
              <Button
                alignSelf="center"
                px="32px"
                py="12px"
                backgroundColor="yellow.1"
                color="white"
                onClick={() => removeFriendExecutor()}
              >
                <Text size="B3">Decline Friend Request</Text>
              </Button>
            </>
          ) : student.status === "REQUESTING_FRIENDSHIP" ? (
            <Button
              isDisabled
              alignSelf="center"
              px="32px"
              py="12px"
              backgroundColor="yellow.1"
              color="white"
            >
              <Text size="B3">Pending Friend Request</Text>
            </Button>
          ) : student.status === "NOT_FRIEND" ? (
            <Button
              alignSelf="center"
              px="32px"
              py="12px"
              backgroundColor="navy.5"
              color="white"
              onClick={() => addFriendExecutor()}
            >
              <Text size="B3">Add Friend</Text>
            </Button>
          ) : (
            <div />
          )}
        </Flex>
      </BackgroundAndNavigationBar>
    </Layout>
  );
}
