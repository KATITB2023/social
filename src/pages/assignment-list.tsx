import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbar from "~/components/Navbar";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

// Fungsi Background & Navbar
function BackgroundAndNavbar({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="background.png"
        alt="background"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
}

// Fungsi Toggle untuk switch Dailiy Quest & Side Quest
const DailySideQuest: React.FC<{
  handleBoxContentChange: (content: string) => void;
}> = ({ handleBoxContentChange }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    const content = isToggled ? "Daily Quest" : "Side Quest";
    handleBoxContentChange(content);
  };

  return (
    <Center>
      <Box // Box pertama
        backgroundColor="#ffffff"
        border="3px solid"
        borderColor="#2f2e2e"
        borderRadius="50px"
        boxShadow="inset 0px 4px 4px #00000040"
        height="41px"
        width="300px"
        position="absolute"
        onClick={handleToggle}
        cursor="pointer"
      >
        <Box // Box Kedua
          backgroundColor="#0B0A0A"
          border="3px solid var(--gray-color-gray-600, #2F2E2E)"
          borderColor="#2f2e2e"
          borderRadius="50px"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
          height="41px"
          width="166px"
          overflow="hidden"
          position="absolute"
          top="-10%"
          left={isToggled ? "65px" : "0"}
          transform={isToggled ? "translateX(65px)" : "translateX(-2px)"}
          transition="transform 0.07s"
          zIndex="2"
        >
          <Box // Box Komet
            width="300px"
            height="200px"
            position="absolute"
            bg={`url('komet.png') no-repeat center center / contain`}
            bgPosition="83px 0px"
            bgSize="76px"
            transform=""
          />
          <Box // Box Bintang
            width="200px"
            height="200px"
            position="absolute"
            background={`url('bintang.png') no-repeat center center / contain`}
            bgPosition="30px -2px"
            bgSize="45px"
          />
          <Text
            color="#FFFFFF"
            position="absolute"
            top="50%"
            left={isToggled ? "35px" : "unset"}
            right={isToggled ? "unset" : "35px"}
            fontSize="16px"
            fontFamily="subheading"
            transform="translateY(-50%)"
          >
            {isToggled ? "Side Quest" : "Daily Quest"}
          </Text>
        </Box>
        <Text
          color="#2F2E2E"
          position="absolute"
          top="50%"
          left={isToggled ? "25px" : "unset"}
          right={isToggled ? "unset" : "25px"}
          fontSize="16px"
          fontFamily="subheading"
          transform="translateY(-50%)"
        >
          {isToggled ? "Daily Quest" : "Side Quest"}
        </Text>
      </Box>
    </Center>
  );
};

// Chips untuk submission status (Terkumpul, Belum Terkumpul, dan Terlambat)

interface ChipsProps {
  property1: "donei" | "no" | "maybe";
  className: string;
  text: string;
}

const Chips: React.FC<ChipsProps> = ({
  property1,
  className,
  text = "hadir",
}) => {
  let chipsBg: string;
  let chipsBorderColor: string;
  let chipsLabelColor: string;

  if (property1 === "donei") {
    chipsBg = "#b8eadc"; // Hijau, Terkumpul
    chipsBorderColor = "#1c939a";
    chipsLabelColor = "#1c939a";
  } else if (property1 === "no") {
    chipsBg = "#f2a89d"; // Merah, Belum Terkumpul
    chipsBorderColor = "#e8553e";
    chipsLabelColor = "#e8553e";
  } else {
    chipsBg = "#fffcbf"; // Kuning, Terlambat
    chipsBorderColor = "#ffbe3b";
    chipsLabelColor = "#ffbe3b";
  }

  return (
    <div
      className={`chips ${property1} ${className}`}
      style={{
        alignItems: "center",
        border: "0.92px solid",
        borderRadius: "12px",
        display: "inline-flex",
        gap: "12px",
        justifyContent: "center",
        overflow: "hidden",
        padding: "4px 16px",
        position: "relative",
        backgroundColor: chipsBg,
        borderColor: chipsBorderColor,
      }}
    >
      <div
        className="label"
        style={{
          color: chipsLabelColor,
          fontFamily: "Somar Rounded-Bold, Helvetica",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: 0,
          lineHeight: "15px",
          marginTop: "-0.92px",
          position: "relative",
          whiteSpace: "nowrap",
          width: "fit-content",
        }}
      >
        {text}
      </div>
    </div>
  );
};

function getChipsData(
  statusTugas: "SUBMITTED" | "NOT_SUBMITTED" | "PASSED_DEADLINE"
) {
  let chipsText: string;
  let chipsColor: "donei" | "no" | "maybe";

  if (statusTugas === "SUBMITTED") {
    chipsText = "Terkumpul";
    chipsColor = "donei"; // Warna hijau
  } else if (statusTugas === "NOT_SUBMITTED") {
    chipsText = "Belum Terkumpul";
    chipsColor = "no"; // Warna merah
  } else {
    chipsText = "Terlambat";
    chipsColor = "maybe"; // Warna kuning
  }

  return { chipsText, chipsColor };
}

// Fungsi untuk menampilkan seluruh tugas Daily Quest

interface TugasDailyQuestProps {
  id: string;
  title: string;
  statusTugas: "SUBMITTED" | "NOT_SUBMITTED" | "PASSED_DEADLINE";
  deadline: Date;
}

export const TugasDailyQuest: React.FC<TugasDailyQuestProps> = ({
  id,
  title,
  statusTugas,
  deadline,
}) => {
  const { chipsText, chipsColor } = getChipsData(statusTugas);
  const router = useRouter();

  return (
    <Center>
      <Box
        width="350px"
        height="relative"
        padding={{ base: "16px", sm: "16px" }}
        justifyContent="space-between"
        alignItems="center"
        borderRadius="12px"
        background="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40)"
        marginTop="7px"
        marginBottom="-30px"
      >
        <Text
          color="var(--yellow-yellow-4, #FFE655)"
          fontFamily="subheading"
          fontSize="16px"
          marginBottom="8px"
        >
          {title}
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="row" gap="2px">
            <Text
              color="#ffffff"
              fontFamily="subheading"
              fontSize="12px"
              marginBottom="6px"
            >
              Deadline
            </Text>
            <Text color="#ffffff" fontFamily="body" fontSize="12px">
              : {deadline.toLocaleDateString()}
            </Text>
          </Flex>
          <Button
            padding="4px 16px"
            justifyContent="center"
            alignItems="center"
            borderRadius="12px"
            background="var(--yellow-yellow-5, #FFFC83)"
            fontFamily="subheading"
            fontSize="10px"
            width="58px"
            height="23px"
            color="#4909b3"
            onClick={() =>
              void router.push({
                pathname: "/submission",
                query: { taskId: id },
              })
            }
          >
            open
          </Button>
        </Flex>
        <Chips
          className="chips-instance"
          property1={chipsColor}
          text={chipsText}
        />
      </Box>
    </Center>
  );
};

// Fungsi untuk menampilkan seluruh tugas Side Quest

interface TugasSideQuestProps {
  id: string;
  title: string;
  statusTugas: "SUBMITTED" | "NOT_SUBMITTED" | "PASSED_DEADLINE";
}

const TugasSideQuest: React.FC<TugasSideQuestProps> = ({
  id,
  title,
  statusTugas,
}) => {
  const { chipsText, chipsColor } = getChipsData(statusTugas);
  const router = useRouter();

  return (
    <Center>
      <Box
        width="350px"
        height="87px"
        padding={{ base: "16px", sm: "16px" }}
        justifyContent="space-between"
        alignItems="center"
        borderRadius="12px"
        background="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40)"
        marginTop="7px"
        marginBottom="-30px"
      >
        <Text
          color="var(--yellow-yellow-4, #FFE655)"
          fontFamily="subheading"
          fontSize="16px"
          marginBottom="8px"
        >
          {title}
        </Text>
        <Chips
          className="chips-instance"
          property1={chipsColor}
          text={chipsText}
        />
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          position="relative"
          right="0px"
          transform="translateY(-170%)"
        >
          <Button
            padding="4px 16px"
            justifyContent="center"
            alignItems="center"
            borderRadius="12px"
            background="var(--yellow-yellow-5, #FFFC83)"
            fontFamily="subheading"
            fontSize="10px"
            width="58px"
            height="23px"
            color="#4909b3"
            onClick={() =>
              void router.push({
                pathname: "/submission",
                query: { taskId: id },
              })
            }
          >
            open
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

// Main function
export default function AssignmentListPage() {
  const [boxContent, setBoxContent] = useState("Daily Quest");
  const { data: session } = useSession({ required: true });
  const assignmentQuery = api.assignment.getAssignmentList.useQuery({});
  const tasks = assignmentQuery.data || [];

  const handleBoxContentChange = (content: string) => {
    setBoxContent(content);
  };

  return (
    <BackgroundAndNavbar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="40px"
        mx="24px"
        my="70px"
      >
        <Heading color="#ffe655" size="H4" alignSelf="center">
          Mission Hub
        </Heading>
        <DailySideQuest handleBoxContentChange={handleBoxContentChange} />
        {boxContent === "Daily Quest" ? (
          <>
            {tasks
              .filter((task) => task.type === "DAILY_QUEST")
              .map((task) => (
                <TugasDailyQuest
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  statusTugas={task.submissionStatus}
                  deadline={task.endTime}
                />
              ))}
          </>
        ) : boxContent === "Side Quest" ? (
          <>
            {tasks
              .filter((task) => task.type === "SIDE_QUEST")
              .map((task) => (
                <TugasSideQuest
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  statusTugas={task.submissionStatus}
                />
              ))}
          </>
        ) : null}
      </Flex>
    </BackgroundAndNavbar>
  );
}
