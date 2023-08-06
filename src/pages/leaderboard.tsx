import { Box, Container, Flex, Text, Image } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import CardLeaderboardTop3 from "~/components/Leaderboard/CardLeaderboardTop3";
import CardLeaderboardSelf from "~/components/Leaderboard/CardLeaderboardSelf";
import CardLeaderboardParticipant from "~/components/Leaderboard/CardLeaderboardParticipant";
import Footer from "~/components/chat/Footer";
import NotFound from "./404";
import { api } from "~/utils/api";
import { number, string } from "zod";

const leaderboardData = [
  {
    Name: "Filbert",
    Nim: 13522021,
    ranking: 1,
    image: "defaultprofpict.svg",
    points: "2500 PT",
  },
  {
    Name: "John",
    Nim: 13522022,
    ranking: 2,
    image: "defaultprofpict.svg",
    points: "2300 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 3,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
];

const LeaderboardParticipantData = [
  {
    Name: "Filbert",
    Nim: 13522021,
    ranking: 1,
    image: "defaultprofpict.svg",
    points: "2500 PT",
  },
  {
    Name: "John",
    Nim: 13522022,
    ranking: 2,
    image: "defaultprofpict.svg",
    points: "2300 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 3,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 4,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 5,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 6,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 7,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Filbert",
    Nim: 13522021,
    ranking: 19,
    image: "defaultprofpict.svg",
    points: "2501 PT",
  },
  {
    Name: "John",
    Nim: 13522022,
    ranking: 20,
    image: "defaultprofpict.svg",
    points: "2300 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 21,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 22,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 23,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 24,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 25,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 26,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 27,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 28,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 29,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 30,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 31,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 32,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 33,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 34,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 35,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 36,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 37,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 38,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 39,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 40,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 41,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 42,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 43,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 44,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 45,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 46,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 47,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 48,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 49,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 50,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 3,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 4,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 5,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 6,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 7,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 8,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 9,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 10,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 11,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 12,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 13,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 14,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 15,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 16,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 17,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
  {
    Name: "Alice",
    Nim: 13522023,
    ranking: 18,
    image: "defaultprofpict.svg",
    points: "2100 PT",
  },
];

const LeaderboardTop3 = () => {
  const getDataLeaderboard = api.leaderboard.getLeaderboard.useQuery();
  // console.log(getDataLeaderboard);
  const getDataUserPosition = api.leaderboard.userPosition.useQuery();

  return (
    <Flex
      height="183px"
      flexShrink="0"
      justifyContent="space-evenly"
      alignItems="center"
      margin="auto 12px"
    >
      {leaderboardData.map((item, index) => (
        <CardLeaderboardTop3
          key={getDataLeaderboard.data?.userId}
          Name={getDataLeaderboard.data?.name}
          Nim={item.Nim}
          ranking={getDataLeaderboard.data?.rank}
          image={getDataLeaderboard.data?.profileImage}
          points={getDataLeaderboard.data?.point}
          //   Name={item.Name}
          //   Nim={item.Nim}
          //   ranking={item.ranking}
          //   image={item.image}
          //   points={item.points}
          marginTop1={index === 0 || index === 2 ? "30px" : "-25px"}
        />
      ))}
    </Flex>
  );
};

interface ParticipantData {
  Name: string;
  Nim: number;
  ranking: number;
  image: string;
  points: string;
}

interface LeaderboardParticipantProps {
  polarisasi: ParticipantData[];
  currentPage: number;
}

const LeaderboardParticipant: React.FC<LeaderboardParticipantProps> = ({
  polarisasi,
  currentPage,
}) => {
  const getDataLeaderboard = api.leaderboard.getLeaderboard.useQuery();
  // console.log(getDataLeaderboard);
  const getDataUserPosition = api.leaderboard.userPosition.useQuery();
  return (
    <Flex
      alignContent="center"
      marginLeft="24px"
      height="1353px"
      flexDirection="column"
      gap="15px"
    >
      {polarisasi.map((item, index) => {
        if (
          index + 1 >= currentPage - 1 * 18 &&
          index + 1 <= currentPage * 18
        ) {
          return (
            <CardLeaderboardParticipant
              Name={getDataLeaderboard.data?.name}
              Nim={item.Nim}
              ranking={getDataLeaderboard.data?.rank}
              image={getDataLeaderboard.data?.profileImage}
              points={getDataLeaderboard.data?.point}
              // Name={item.Name}
              // Nim={item.Nim}
              // ranking={item.ranking}
              // image={item.image}
              // points={item.points}
            />
          );
        }
        return null; // Don't forget to handle the case where the condition is not met
      })}
    </Flex>
  );
};

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: session } = useSession();
  const page = 1 as number;
  const limit = 10 as number;
  const getDataLeaderboard = api.leaderboard.getLeaderboard.useQuery({
    page,
    limit,
  });
  console.log(getDataLeaderboard);
  const getDataUserPosition = api.leaderboard.userPosition.useQuery();
  console.log(getDataLeaderboard);

  const students = getDataLeaderboard.data;
  console.log(students);
  if (!students) {
    return <div>Loading ...</div>;
  }

  if (!session) {
    return <NotFound />;
  }

  const id = session?.user.id;

  const participantsPerPage = 18; // Number of participants per page
  const totalParticipants = LeaderboardParticipantData.length;
  const totalPages = Math.ceil(totalParticipants / participantsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = LeaderboardParticipantData.slice(
    (currentPage - 1) * participantsPerPage,
    currentPage * participantsPerPage
  );
  const getPageButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5; // Maximum visible page buttons excluding ellipsis

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
      console.log(startPage, endPage);
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
      backgroundImage="blur1a 3.svg"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Navbar />
      <Box w="156px" h="29px" margin="auto" mt="150px" marginBottom="25px">
        <Text size="H4" fontWeight="600" color="yellow.5" textAlign="center">
          LEADERBOARD
        </Text>
      </Box>
      <LeaderboardTop3 />
      <Box marginLeft="5px">
        <CardLeaderboardSelf
          Name={"Filbert"}
          Nim={13522021}
          image={"defaultprofpict.svg"}
          ranking={1}
          points={"2000 PT"}
        />
      </Box>

      <LeaderboardParticipant
        polarisasi={paginatedData}
        currentPage={currentPage}
      />

      <Container
        width={
          currentPage <= 3 || currentPage >= totalPages - 2 ? "266px" : "90%"
        }
        height="45px"
        padding="0"
        mt="50px"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Image
            src="arrow_back_ios (1).svg"
            alt="Previous Page"
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
          />

          {getPageButtons().map((button, index) => (
            <Container
              position="relative"
              // key={index}
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
            src="arrow_back_ios.svg"
            alt="Next Page"
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

// interface PageProps {
//   totalPages: number;
//   currentPage: number;
// }

// const Pagination = ({ totalPages, currentPage }: PageProps) => {
//   const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

//   return (
//     <Flex
//       position="relative"
//       width="266px"
//       height="45px"
//       justifyContent="center"
//       alignItems="center"
//     >
//       {currentPage > 1 && (
//         <Image
//           src="arrow_back_ios (1).svg"
//           alt="Left Arrow"
//           marginRight="10px"
//         />
//       )}

//       {pageNumbers.map((pageNumber) => (
//         <Box
//           key={pageNumber}
//           width="24px"
//           height="24px"
//           borderRadius="50%"
//           display="inline-flex"
//           justifyContent="center"
//           alignItems="center"
//           color={pageNumber === currentPage ? 'blue.500' : 'yellow.500'}
//           border="1px solid"
//           borderColor="yellow.500"
//           marginRight="5px"
//         >
//           <Text fontSize="xl">{pageNumber}</Text>
//         </Box>
//       ))}

//       {currentPage < totalPages && (
//         <Image src="arrow_back_ios.svg" alt="Right Arrow" marginLeft="10px" />
//       )}
//     </Flex>
//   );
// };

// const Leaderboard = () => {
//   const totalPages = Math.ceil(LeaderboardParticipantData.length / 10); // Assuming each page displays 10 participants
//   const [currentPage, setCurrentPage] = React.useState(1);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   const paginatedData = LeaderboardParticipantData.slice(
//     (currentPage - 1) * 10,
//     currentPage * 10
//   );

//   return (
//     <Box
//       w="375px"
//       h="2332px"
//       backgroundImage="blur1a 3.svg"
//       backgroundRepeat="no-repeat"
//       backgroundSize="cover"
//     >
//       <Navbar />
//       <Box w="156px" h="29px" margin="auto" mt="150px" marginBottom="25px">
//         <Text size="H4" fontWeight="600" color="yellow.5" textAlign="center">
//           LEADERBOARD
//         </Text>
//       </Box>
//       <LeaderboardTop3 />
//       <Box marginLeft="5px">
//         <CardLeaderboardSelf
//           Name={'Filbert'}
//           Nim={13522021}
//           image={'defaultprofpict.svg'}
//           ranking={1}
//           points={'2000 PT'}
//         />
//       </Box>
//       <LeaderboardParticipant data={paginatedData} />
//       {/* <Pagination totalPages={totalPages} currentPage={currentPage} /> */}
//       <Container width="266px" height="45px" padding="0" mt="50px">
//         <Flex justifyContent="space-between" alignItems="center">
//           <Image src="arrow_back_ios (1).svg" />
//           {Array.from({ length: totalPages }, (_, index) => (
//             <React.Fragment key={index + 1}>
//               {index === 3 && currentPage < totalPages - 1 ? (
//                 <Text
//                   position="relative"
//                   zIndex="10"
//                   fontSize="xl"
//                   color="yellow.500"
//                   textAlign="center"
//                   lineHeight="40px"
//                   top="50%"
//                   left="50%"
//                   transform="translate(-50%,-50%)"
//                   width="100%"
//                 >
//                   ...
//                 </Text>
//               ) : (
// <Container
//   position="relative"
//   key={index + 1}
//   w="40px"
//   h="40px"
//   borderRadius="full"
//   bgColor={index + 1 === currentPage ? 'yellow.5' : 'navy.2'}
// >
//   <Container
//     position="absolute"
//     w="36px"
//     h="36px"
//     borderRadius="full"
//     bgColor={index + 1 === currentPage ? 'navy.2' : 'yellow.5'}
//     top="50%"
//     left="50%"
//     transform="translate(-50%,-50%)"
//   ></Container>
//   <Text
//     position="relative"
//     zIndex="1"
//     size="B2"
//     textAlign="center"
//     fontWeight="600"
//     color={index + 1 === currentPage ? 'yellow.5' : 'navy.2'}
//     lineHeight="40px"
//     top="50%"
//     left="50%"
//     transform="translate(-50%,-50%)"
//     width="100%"
//   >
//     {index + 1}
//   </Text>
// </Container>
//               )}
//             </React.Fragment>
//           ))}
//           <Image src="arrow_back_ios.svg" />
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default Leaderboard;
