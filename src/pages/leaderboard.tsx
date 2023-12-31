import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Footer from "~/components/Footer";
import LoadingScreen from "~/components/LoadingScreen";
import Navbar from "~/components/Navbar";
import CardLeaderboardParticipant from "~/components/leaderboard/CardLeaderboardParticipant";
import CardLeaderboardSelf from "~/components/leaderboard/CardLeaderboardSelf";
import CardLeaderboardTop3 from "~/components/leaderboard/CardLeaderboardTop3";
import ComingSoon from "~/components/screen/ComingSoon";
import { FUTUREFLAG } from "~/constant";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

interface LeaderboardProps {
  data: LeaderboardData[];
}
interface LeaderboardData {
  userId: string;
  name: string;
  profileImage: string | null;
  point: number;
  rank: number;
  nim: string;
}

const LeaderboardTop3: React.FC<LeaderboardProps> = ({ data }) => {
  const dataTop3 = [];
  for (let i = 0; i < 3; i++) {
    if (data[i]) {
      dataTop3.push(data[i]);
    }
  }
  if (dataTop3.length >= 2) {
    const temp = dataTop3[0];
    dataTop3[0] = dataTop3[1];
    dataTop3[1] = temp;
  }

  return (
    <Flex
      height="183px"
      flexShrink="0"
      justifyContent="space-evenly"
      alignItems="center"
      margin="auto 12px"
    >
      {dataTop3.map((paraData, index) => (
        <CardLeaderboardTop3
          key={paraData?.userId || "-"}
          name={paraData?.name || "-"}
          nim={paraData?.nim || "-"}
          ranking={paraData ? paraData.rank : 999}
          image={paraData?.profileImage || "/defaultprofpict.svg"}
          points={paraData?.point || 0}
          marginTop1={index === 0 || index === 2 ? "30px" : "-25px"}
        />
      ))}
    </Flex>
  );
};

interface LeaderboardParticipantProps {
  data: LeaderboardData[];
  id: string;
}

const LeaderboardParticipant: React.FC<LeaderboardParticipantProps> = ({
  data,
  id,
}) => {
  return (
    <Flex alignContent="center" maxH="1353px" flexDirection="column" gap="15px">
      {data.map((item) => {
        if (item.userId != id) {
          return (
            <CardLeaderboardParticipant
              key={item?.userId || "-"}
              name={item?.name || "-"}
              nim={item?.nim || "-"}
              ranking={item?.rank || 0}
              image={item?.profileImage || "/defaultprofpict.svg"}
              points={item?.point || 0}
            />
          );
        }
      })}
    </Flex>
  );
};

const LeaderboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession({ required: true });
  const limit = 20 as number;
  const getDataLeaderboard = api.leaderboard.getLeaderboard.useQuery({
    cursor: currentPage,
    limit,
  });
  const getDataSelfLeaderboard = api.leaderboard.getSelfLeaderboard.useQuery();
  const students = getDataLeaderboard.data;
  const selfData = getDataSelfLeaderboard.data;
  if (!students || !session || !selfData) {
    return <LoadingScreen />;
  }

  const id = session?.user.id;

  const totalPages = students.totalPage;
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
    } else {
      const leftEllipsis = currentPage > 3;
      const rightEllipsis = currentPage < totalPages - 2;

      if (leftEllipsis) {
        pageButtons.push(1, "...");
      }

      let startPage = currentPage;
      let endPage = currentPage + 1;

      if (endPage > totalPages) {
        endPage = totalPages;
      }

      if (rightEllipsis) {
        endPage = totalPages - 2;
        startPage = Math.max(1, currentPage - 2);
      } else if (leftEllipsis) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      if (rightEllipsis) {
        if (currentPage <= 3) {
          for (let i = startPage; i <= startPage + 2; i++) {
            pageButtons.push(i);
          }
        } else {
          for (let i = startPage; i <= startPage + 2; i++) {
            pageButtons.push(i + 1);
          }
        }
      } else if (leftEllipsis) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageButtons.push(i);
        }
      }

      if (rightEllipsis) {
        pageButtons.push("...", totalPages);
      }
    }

    return pageButtons;
  };

  if (!FUTUREFLAG) {
    return <ComingSoon />;
  }

  return (
    <Layout title={"Leaderboard"}>
      <Box
        w="full"
        maxH="2332px"
        minH="100vh"
        backgroundImage="/leaderboardbg.png"
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        position="relative"
        paddingTop="1%"
      >
        <Box
          backgroundImage="/leaderboardlogo.png"
          backgroundSize={"cover"}
          position="absolute"
          w={"full"}
          h={"full"}
          top="0"
          left="0"
        />

        <Navbar />
        <Box
          w="full"
          h="29px"
          mt="80px"
          marginBottom="25px"
          display="flex"
          justifyContent="center"
        >
          <Heading
            size="H4"
            fontWeight="400"
            color="yellow.5"
            whiteSpace="nowrap"
            textAlign="center"
            zIndex="0"
          >
            TOP SPACEFARERS
          </Heading>
        </Box>

        {currentPage == 1 ? <LeaderboardTop3 data={students.data} /> : <></>}

        <Box mb={8}>
          <CardLeaderboardSelf
            key={id}
            name={selfData.name}
            nim={selfData.nim}
            image={selfData?.profileImage || "/defaultprofpict.svg"}
            ranking={selfData.rank.toString()}
            points={selfData.point}
          />
        </Box>

        <LeaderboardParticipant data={students.data} id={id} />

        <Container
          width={
            currentPage <= 3 || currentPage >= totalPages - 2 ? "266px" : "90%"
          }
          height="45px"
          padding="0"
          my="50px"
          zIndex="2"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box
              role="button"
              onClick={() => handlePageChange(currentPage - 1)}
              cursor={currentPage <= 1 ? "not-allowed" : "pointer"}
              zIndex="1"
            >
              <Image
                src="previouspage.svg"
                alt="Previous Page"
                margin={0}
                width={"24px"}
                height={"24px"}
              />
            </Box>

            {getPageButtons().map((button, index) => (
              <Button
                variant={"unstyled"}
                position="relative"
                key={index}
                w="40px"
                h="40px"
                borderRadius="full"
                bgColor={button === currentPage ? "yellow.5" : "navy.2"}
                onClick={() => {
                  if (typeof button === "number") {
                    handlePageChange(button);
                  }
                }}
              >
                <Container
                  position="absolute"
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  bgColor={button === currentPage ? "navy.2" : "yellow.5"}
                  top="50%"
                  left="50%"
                  transform="translate(-50%,-50%)"
                ></Container>
                <Text
                  position="absolute"
                  zIndex="1"
                  size="B2"
                  fontWeight="600"
                  color={button === currentPage ? "yellow.5" : "navy.2"}
                  textAlign="center"
                  lineHeight="40px"
                  top="50%"
                  left="50%"
                  transform="translate(-50%,-50%)"
                  width="100%"
                >
                  {button}
                </Text>
              </Button>
            ))}
            <Box
              role="button"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                cursor: currentPage < totalPages ? "pointer" : "not-allowed",
              }}
              zIndex="1"
            >
              <Image src="nextpage.svg" alt="Next Page" zIndex="1" />
            </Box>
          </Flex>
        </Container>

        <Footer />
      </Box>
    </Layout>
  );
};

export default LeaderboardPage;
