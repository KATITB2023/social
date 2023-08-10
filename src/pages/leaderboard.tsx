import { Box, Container, Flex, Text, Image, Heading } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import CardLeaderboardTop3 from "~/components/leaderboard/CardLeaderboardTop3";
import CardLeaderboardSelf from "~/components/leaderboard/CardLeaderboardSelf";
import CardLeaderboardParticipant from "~/components/leaderboard/CardLeaderboardParticipant";
import Footer from "~/components/chat/Footer";
import NotFound from "./404";
import { api } from "~/utils/api";

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

const participantsPerPage: number = 18;

const LeaderboardTop3: React.FC<LeaderboardProps> = ({ data }) => {
  let dataTop3 = [];
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
          ranking={index === 0 ? 1 : paraData?.rank || 0}
          image={paraData?.profileImage || "-"}
          points={paraData?.point || 0}
          marginTop1={index === 0 || index === 2 ? "30px" : "-25px"}
        />
      ))}
    </Flex>
  );
};

interface LeaderboardParticipantProps {
  data: LeaderboardData[];
  currentPage: number;
}

const LeaderboardParticipant: React.FC<LeaderboardParticipantProps> = ({
  data,
  currentPage,
}) => {
  let dataRest = [];
  for (let i = 3; i < data.length; i++) {
    if (data[i]) {
      dataRest.push(data[i]);
    }
  }
  return (
    <Flex
      alignContent="center"
      marginLeft="24px"
      height="1353px"
      flexDirection="column"
      gap="15px"
    >
      {dataRest.map((item, index) => {
        if (
          index + 1 >= currentPage - 1 * Number(participantsPerPage) &&
          index + 1 <= currentPage * Number(participantsPerPage)
        ) {
          return (
            <CardLeaderboardParticipant
              key={item?.userId || "-"}
              name={item?.name || "-"}
              nim={item?.nim || "-"}
              ranking={item?.rank || 0}
              image={item?.profileImage || "-"}
              points={item?.point || 0}
            />
          );
        }
        return null;
      })}
    </Flex>
  );
};

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession({ required: true });
  const cursor = 1 as number;
  const limit = 40 as number;
  const getDataLeaderboard = api.leaderboard.getLeaderboard.useQuery({
    cursor,
    limit,
  });

  const students = getDataLeaderboard.data;
  if (!students) {
    return <NotFound />;
  }
  if (!session) {
    return <NotFound />;
  }
  const id = session?.user.id;

  const totalParticipants = students.data.length;
  const totalPages = Math.ceil(totalParticipants / participantsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = students.data.slice(
    (currentPage - 1) * participantsPerPage,
    currentPage * participantsPerPage
  );

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

  return (
    <Box
      w="375px"
      h="2332px"
      backgroundImage="/leaderboardbg.png"
      position="relative"
      backgroundSize="cover"
      marginTop="-100px"
      paddingTop="18%"
    >
      <Box
        backgroundImage="/leaderboardlogo.png"
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        right="0"
      ></Box>
      {/* <Navbar /> */}
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
          zIndex="13"
        >
          TOP SPACEFARERS
        </Heading>
      </Box>

      <LeaderboardTop3 data={students.data} />

      <Box marginLeft="5px">
        {students.data.map((item, i) => {
          if (item.userId === id) {
            return (
              <CardLeaderboardSelf
                key={i}
                name={item.name}
                nim={item.nim}
                image={item.profileImage}
                ranking={item.rank}
                points={item.point}
              />
            );
          }
          return null;
        })}
      </Box>

      <LeaderboardParticipant data={paginatedData} currentPage={currentPage} />
      <Container
        width={
          currentPage <= 3 || currentPage >= totalPages - 2 ? "266px" : "90%"
        }
        height="45px"
        padding="0"
        mt="50px"
        zIndex="2"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Image
            src="previouspage.svg"
            alt="Previous Page"
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
            zIndex="1"
          />

          {getPageButtons().map((button, index) => (
            <Container
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
            </Container>
          ))}
          <Image
            src="nextpage.svg"
            alt="Next Page"
            zIndex="1"
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              cursor: currentPage < totalPages ? "pointer" : "not-allowed",
            }}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Leaderboard;
